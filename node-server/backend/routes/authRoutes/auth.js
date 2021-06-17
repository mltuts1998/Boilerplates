const router = require("express").Router();

const authContoller = require('../../controllers/authController');

router.post('/signin', authContoller.signin);
router.post('/signup', authContoller.signup);
router.put('/update-profile/', authContoller.updateProfile);
router.post("/sendOTP", authContoller.sendOtp);
router.post("/reset-password",authContoller.verifyOtpAndResetPassword);

module.exports = router;