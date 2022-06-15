import React, {useState} from 'react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                isAdmin:"false"
            })
        })

        const data = await response.json()

        console.log(data)
    }
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder='name' onChange={e=>setName(e.target.value)}/><br/>
                <input type="email" name="email" id="email" placeholder='email' onChange={e=>setEmail(e.target.value)}/><br/>
                <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/><br/>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register;