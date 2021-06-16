import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.js';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));

const formatDate = (date) => {
    let processed_date = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
    return processed_date;
};


const Login = () => {
    const classes = useStyles();
    const { name, changeName, deleteName } = useContext(GlobalContext);
    const [values, setValues] = React.useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        confirm_password: '',
        date_of_birth: new Date()
      });
    

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    
    const handleDateChange = (date) => {
        setValues({ ...values, date_of_birth: date });
    };

    const submitForm = (event) => {
        // Make Request Here
        console.log(values);
    }
    
    return (    
        <>
            <Card
                style={{
                    maxWidth: "600px",
                    margin: "auto"
                }}
            >
                
                <Typography variant="h4" gutterBottom style={{textAlign: "center"}}>
                    Register
                </Typography>

                <Divider />
                
                <div
                    style={{width: "100%", padding: "20px"}}
                >
                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
                        value={values.username}
                        onChange={handleChange('username')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="text"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-firstname">First Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-firstname"
                        value={values.firstname}
                        onChange={handleChange('firstname')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="text"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />


                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Last Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-lastname"
                        value={values.lastname}
                        onChange={handleChange('lastname')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="text"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        value={values.email}
                        onChange={handleChange('email')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="email"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={values.password}
                        onChange={handleChange('password')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="password"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        value={values.confirm_password}
                        onChange={handleChange('confirm_password')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="password"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />
                    

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date Of Birth"
                            format="MM/dd/yyyy"
                            value={values.date_of_birth}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{
                                width: "100%"
                            }}
                        />
                    </MuiPickersUtilsProvider>


                </div>
                
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <Button variant="contained" color="primary"
                        style={{
                            margin: "10px auto",
                            textAlign: "center",
                        }}

                        onClick={ () => submitForm() } 
                        disabled={ values.password != values.confirm_password }
                    >
                        Register
                    </Button>
                </div>

            </Card>  
        </>
    )
}


export default Login;