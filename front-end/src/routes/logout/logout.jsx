import React, { useContext, useEffect } from 'react'
import clearToken from '../auth/auth'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setIsLogged, setIsAdmin} = useContext(UserContext)
    
    useEffect(() => {
        const isCleared = async () => {
            clearToken();
            setIsLogged(false);
            setIsAdmin(false);
            navigate("/");
        }
        isCleared();
    }, [navigate,setIsLogged,setIsAdmin]);
    return (
        <div>Logout</div>
    )
}

export default Logout