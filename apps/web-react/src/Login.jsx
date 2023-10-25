import { useState } from 'react'
import fetchData from './FetchData'
import App from './App'
import './Login.css'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [logged, setLogged] = useState("no")

    const handleSubmit = async (event) => {

        const user = await fetchData('post', '/login', { email, password })
        localStorage.setItem("token", user.token)
        event.preventDefault()
        console.log(user.name)
        setLogged("yes")
    }

    const GO = 
        <>
            <div className={"form-screen container bg-blue "}>
                <div className="content">

                    <h1>Entrar</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" id="senha" onChange={(e) => setPassword(e.target.value)} required />
                            <a href="#" >Esqueci a senha</a>
                        </div>

                        <div className="container">
                            <button className="form-btn" type="submit" >Entrar</button>
                        </div>

                        <div className="container">
                            <a href="#" >Cadastrar novo usuário</a>
                        </div>

                    </form>
                </div>
            </div>
        </>
    

    return (
        <>
        <div>
            {(logged == 'no')?
            GO:
            <App />
            }
        </div>
            
        </>
    )
}

export default Login