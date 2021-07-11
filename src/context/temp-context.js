import React, { useState } from 'react';


export const TempContext = React.createContext({

});

export const TempContextProvider = props => {
    const [rows, setRows] = useState([]);
    const [man, setMan] = useState('');
    const [run, setRun] = useState('');

    const addRows = (rs) => {
        setRows(rs);
    }
    return <TempContext.Provider value={{
        rows,
        addRows
    }}
    >
        {props.children}
    </TempContext.Provider>
}


export default TempContextProvider;