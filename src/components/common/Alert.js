import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
const Alert = (message="hi"
    ) => {
        const [isDirty, setDirty] = useState(false);
    
        useEffect(() => {
            //Detecting browser closing
            window.onbeforeunload = isDirty && (() => message);
    
            return () => {
                window.onbeforeunload = null;
            };
        }, [isDirty]);
    
        const routerPrompt = <Prompt when={isDirty} message={"sahil"} />;
    
        return [routerPrompt, () => setDirty(true), () => setDirty(false)];
    };




export default Alert;
