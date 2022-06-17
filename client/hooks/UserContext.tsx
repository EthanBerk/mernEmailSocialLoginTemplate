import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AxiosResponse } from 'axios';

export const userContext = createContext({});
export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:5000/auth/getuser", { withCredentials: true }).then((res: AxiosResponse) => {
            console.log(res);
            if (res.data) {
                setUserObject(res.data);
            }
        })
    }, [])
    return (
        <userContext.Provider value={userObject}>{props.children}</userContext.Provider>
    )
}