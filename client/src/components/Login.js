import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3300/api/auth/login', user)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            props.history.push('/jokes');
        })
    }

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='username' onChange={handleChanges} value={user.username} placeholder='Username' />
            <input type='password' name='password' onChange={handleChanges} value={user.password} placeholder="Password" />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login;