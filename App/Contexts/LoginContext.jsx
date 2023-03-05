import { createContext } from "react";

export default LoginContext = createContext({
    loginDetails: {
        loginID: "",
        sessionID: ""
    },    
    setLoginDetails: null
});