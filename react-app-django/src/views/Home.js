import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import Home from '../components/Home.js';

const HomeView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <Home />
            </Drawer>
        </div>
    )
}


export default HomeView;