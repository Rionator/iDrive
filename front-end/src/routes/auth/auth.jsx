import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setLoginStatus(true)
            navigate('/my-drive')
        } else {
            navigate('/login')
        }

    }, [])
    return (
        <div></div>
    )
}

export default Auth