import React from 'react'
import { useState } from 'react'
import { ButtonPrimary } from '../components/Button'
import { useNavigate } from 'react-router-dom'


import axios from 'axios'

export default function Login(props) {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doLogin = (e) => {
        e.preventDefault()
        axios
        .post('https://reqres.in/api/login', {
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res)
            if(res.status === 200) {
               window.localStorage.setItem('token', res.data.token) 
               props.userIsLogin(true)
            }  
        })
        .catch((err) => {
            console.log(err)
        })
    }
    

    return (
        <section className='h-screen flex justify-center items-center flex-col'>
            <div className='px-6 py-10 bg-white rounded-lg w-1/3 border-[1px] shadow-xl'>
                <div>
                    <p className='text-2xl font-semibold mb-1'>
                        Login 👋
                    </p>
                    <p className='mb-4'>
                        Please input your email and password to start the quiz 📃
                    </p>
                </div>
                <form>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className='mb-1'>Email</label>
                        <input id='email' type="email" name='email' onChange={(e) => setEmail(e.target.value)} className="border-[1px] py-2 px-4 focus:outline-blue-300"/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password" name='password' onChange={(e) => setPassword(e.target.value)} className="border-[1px] py-2 px-4 focus:outline-blue-300"/>
                    </div>
                    <div className='mt-4'>
                        <ButtonPrimary text="login" type="submit" click={(e) => doLogin(e)}/>
                    </div>
                </form>
            </div>
        </section>
    )
}
