import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import Login from '../../components/users/Login.js';

const LoginView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <Login />
            </Drawer>
        </div>
    )
}


export default LoginView;