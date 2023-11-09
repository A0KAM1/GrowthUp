import { useState } from 'react'
import fetchData from '../FetchData'
import { Form, Link, redirect } from 'react-router-dom'
import './Login.css'
import logo from '../assets/logo.svg'
import nome from '../assets/logo2.svg'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (event) => {
        const user = await fetchData('post', '/login', { email, password })
        localStorage.setItem("token", user.token)
    }

    return (
        <>
            <div className="form-screen bg-blue container">
                <div className="content">

                    <div className='container'>
                        <div className='logo-container'>
                            <div>
                                <img src={logo} className='logo'/>
                            </div>
                            <div>
                                <img src={nome} className='nome'/>
                            </div>
                        </div>
                    </div>

                    <h1>Entrar</h1>

                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                            <a href="#" className='reset' >Esqueci a senha</a>
                        </div>

                        <button className="form-btn" type="submit" >Entrar</button>

                        <Link className="signUp-link" to="cadastrar" aria-label="Novo Usuário">Cadastrar Novo Usuário</Link>

                    </Form>
                </div >
            </div >
        </>
    )
}

export default Login