import React, { Component, useState, createContext } from 'react';

export const GlobalContext = createContext();


const GlobalContextProvider = (props) => {
    const [drawer, setDrawer] = useState("JPMC NGO");

    const [name, setName] = useState("jhabar");

    const changeName = (newName) => {
        setName(newName);
    }

    const deleteName = () => {
        setName(null);
    }

    return (    
        <GlobalContext.Provider value={{ drawer, name, changeName, deleteName }}>
            { props.children }
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;