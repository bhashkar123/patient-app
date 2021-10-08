import React, { useEffect, useContext } from "react";
import { CoreContext } from "../context/core-context";

const Logout = (props) => {
  const coreContext = useContext(CoreContext);

  const signOut = () => {
    coreContext.relogin();
  };

  useEffect(signOut, []);

  return <div>Please wait ...</div>;
};

export { Logout };
