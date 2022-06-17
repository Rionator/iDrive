import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {
    const [loginStatus, setLoginStatus] = useState(false);

    
    
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setLoginStatus(true)
            navigate('/MyDrive')
        } else {
            navigate('/signin')
        }

    }, [navigate])
    return (
        <div></div>
    )
}

export default Auth