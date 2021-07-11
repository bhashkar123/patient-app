import React, { useState } from 'react';


export const CoreContext = React.createContext({

});

export const CoreContextProvider = props => {
    const [rows, setRows] = useState([]);
    const [man, setMan] = useState('');

    const addRows = (rs) => {
        setRows(rs);
    }
    return <CoreContext.Provider value={{
        rows,
        addRows
    }}
    >
        {props.children}
    </CoreContext.Provider>
}


export default CoreContextProvider;