import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import Register from '../../components/users/Register.js';

const RegisterView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <Register />
            </Drawer>
        </div>
    )
}


export default RegisterView;