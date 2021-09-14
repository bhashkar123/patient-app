import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
const Alert = (message="You have unsaved changes, Are you sure you want to leave?"
    ) => {
        const [isDirty, setDirty] = useState(false);
    
        useEffect(() => {
            //Detecting browser closing
            window.onbeforeunload = isDirty && (() => message);
    
            return () => {
                window.onbeforeunload = null;
            };
        }, [isDirty]);
    
        const routerPrompt = <Prompt when={isDirty} message={JSON.stringify({
            header: "Confirm",
            content: "You have unsaved changes, Are you sure you want to leave?",
          })} />;
    
        return [routerPrompt, () => setDirty(true), () => setDirty(false)];
    };




export default Alert;
