import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();    

    useEffect(() => {
        
        axios.post('http://localhost:4000/api/login', {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
            window.location = '/'
        })

    }, [code]);

    useEffect(() => {
        
        if(!refreshToken || !expiresIn) return

        const interval = setInterval(() => { //setInterval helps to run code every single time our expires changes

            axios.post('http://localhost:4000/api/refresh', {
                refreshToken,
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                window.location = '/'
            })

        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval);

    }, [refreshToken, expiresIn]);

    return accessToken

}
