const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const mail = require('../utils/mailHandler');
const otpGenerator = require('otp-generator');
const OTP = require("../models/otpConfig");

const {
  loginValidation
} = require("../middlewares/validation/validation");


exports.signup = catchAsync(async (req, res, next) => {

  console.log(req.body);

  const password = req.body.password
  console.log(`password : ${password}`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;

  const user = new User(req.body);
  await user.save();
  const newUser = JSON.parse(JSON.stringify(user));
  delete newUser.password;

  const expiresIn = 60 * 60 * 60;
  const accessToken = jwt.sign({ id: newUser._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });

  const emailConfig = {
    recipientMails: newUser.email,
    subject: "Account Created",
    htmlEmail: `<h1> Welcome User </h>`
  }
  await mail.sendMail(emailConfig)


  res.status(200).send({ "user": newUser, "access_token": accessToken, "expires_in": expiresIn });
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token, check if it's there
  let token;
  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // 3) Check if user still exists
  const foundUser = await User.findById(decoded.id);
  if (!foundUser) {
    return next(
      new AppError('The user associated with this token no longer exists.', 401)
    );
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  changedUser = foundUser.toObject();
  delete changedUser.password
  res.locals.user = changedUser;
  next();
});


exports.restrictTo = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(res.locals.user.role)) {
      return next(
        new AppError(`You do not have permission to peform this action.${res.locals.user.role}`, 403)
      );
    }

    next();
  };
};

exports.signin = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  const { error } = loginValidation(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 500));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  //Check if Password is correct
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return next(new AppError('Password not valid!', 401));
  }

  const expiresIn = 1 * 60 * 60;
  const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });

  res.status(200).send({ "message": "Successfully Signed In", "access_token": accessToken, "expires_in": expiresIn, user });
});


// Update Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  // JWT Authenticated;
  
  console.log(res.locals.user);

  const email = res.locals.user.email
  const user = await User.findOne({email})

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password  
  );
  console.log(validPassword);

  if(validPassword) {
    const user = await User.updateOne({ email }, req.body);
    res.status(200).send({ message: "Successfully Updated The Profile" })
  }
  else {
    return next(new AppError('Password not valid!', 401));
  }
  
});


// UserDetail
exports.detail = catchAsync(async (req, res, next) => {
  // JWT Authenticated;
  
  console.log(res.locals.user);
  
  const email = res.locals.user.email

  const user = await User.findOne({ email });

  res.status(200).send(user)
});


exports.verify = catchAsync(async (req, res, next) => {
   // 1) Get token, check if it's there
   let { token } = req.body;

   // 2) Verify token
   const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
 
   // 3) Check if user still exists
   const foundUser = await User.findById(decoded.id);
   if (!foundUser) {
     return next(
       new AppError('The user associated with this token no longer exists.', 401)
     );
   }
   else {
     return res.status(200).send({});
   }
})

exports.sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("User not found", 404))


  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
  const emailConfig = {
    recipientMails: user.email,
    subject: "OTP from ",
    htmlEmail: `<h3></h3><h1>${otp}</h1><h3></h3>`
  }
  var alreadyPresentOtp = await OTP.findOne({ userId: user._id })
  if (alreadyPresentOtp) {
    return next(new AppError("OTP already sent"), 500)
  }

  const otpModel = new OTP()
  otpModel.otp = otp
  otpModel.userId = user._id
  otpModel.ttl = "5m"
  await otpModel.save()
  await mail.sendMail(emailConfig)
  return res.send({ message: "OTP sent Succesfully " });
});


exports.verifyOtpAndResetPassword = catchAsync(async (req, res, next) => {
  const { otp, email, newPassword } = req.body
  const user = await User.findOne({ email });
  if (!newPassword)
    return next(new AppError("No Password Provided", 404))
  if (!user)
    return next(new AppError("User not found", 404))

  var alreadyPresentOtp = await OTP.findOne({ userId: user._id })
  if (!alreadyPresentOtp) {
    return next(new AppError("OTP not present"), 500)
  }
  if (otp != alreadyPresentOtp.otp)
    return next(new AppError("OTP Not Matched"), 500)

  const password = newPassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  await user.save()
  await OTP.findByIdAndDelete(alreadyPresentOtp._id)
  const emailConfig = {
    recipientMails: user.email,
    subject: "OTP from Joey Tribbiani",
    htmlEmail: `<h1>Password Reset SuccessFull</h1>`
  }
  await mail.sendMail(emailConfig)
  res.status(200).send({ message: "Password reset Successfully" })

});
