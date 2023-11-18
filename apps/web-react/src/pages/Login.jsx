import { useEffect, useState } from 'react'
import fetchData from '../FetchData'
import { Form, Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import nome from '../assets/logo2.svg'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem("token", "")
    }, [])

    const handleSubmit = async (event) => {
        const user = await fetchData('post', '/login', { email, password })
        localStorage.setItem("token", user.token)
        navigate('/app', { replace: true })
    }

    return (
        <>
            <div className="form-screen bg-blue container">
                <div className="content">

                    <div className='container'>
                        <div className='logo-container'>
                            <img src={logo} className='logo' />
                            <img src={nome} className='nome' />
                        </div>
                    </div>

                    <h1>Entrar</h1>

                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email
                                <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Senha
                                <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                            </label>
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