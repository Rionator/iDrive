import React, { useEffect, useState } from 'react'
import clearToken from '../auth/auth'
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const isCleared = async () => {
            clearToken();
            navigate("/");
        }
        isCleared();
    }, [navigate]);
    return (
        <div>Logout</div>
    )
}

export default Logout