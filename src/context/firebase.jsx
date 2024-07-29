import { createContext, useContext, useEffect, useState } from "react";
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'


export const FirebaseContext=createContext(null);

const firebaseConfig = {
        apiKey: "AIzaSyDNLNQCTFSHZ-Q9768yhp2GsXBrx7WOlyY",
        authDomain: "byensell-40303.firebaseapp.com",
        projectId: "byensell-40303",
        storageBucket: "byensell-40303.appspot.com",
        messagingSenderId: "64651488885",
        appId: "1:64651488885:web:4eb31b2ca2725b2086523c",
        measurementId: "G-RNSL2RJGZD"
      };
          
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export const useFirebase=()=>useContext(FirebaseContext);

export const FirebaseProvider=(props)=>{
        let [user,setUser]=useState(null);
       useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
                setUser(user)
        })
       },[])
        return <FirebaseContext.Provider value={{user}}>
                {props.children}
        </FirebaseContext.Provider>
}

