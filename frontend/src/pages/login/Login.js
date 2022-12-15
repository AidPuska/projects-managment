import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-[400px] my-[60px] p-10 mx-auto border border-gray-200 shadow-xl bg-white'>
            <h2 className='font-bold text-2xl'>Login</h2>

            <label>
                <span>Email:</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>

            <label>
                <span>Password:</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button disabled className='btn'>Loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login