import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';


const Home = () => {
    const { name, changeName, deleteName } = useContext(GlobalContext);

    return (
        <>
            Home
        </>
    )
}


export default Home;