import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

const auth = getAuth();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                setCurrentUser(user.uid)
                setPending(false)

            } else {
                setCurrentUser(null)
                /* console.log("User signed out: OnAuthstatgeChanged") */
            }
        })

        return unsubscribe;  //when unmount component, unsubscribe onAuthStateChanged 




    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};