import { useState } from "react"
import fetchData from "./FetchData"

function SignUp() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (event) => {

        const user = await fetchData('post', '/register', { name, email, password })
        localStorage.setItem("token", user.token)
        event.preventDefault()

    }

    return (
        <>
            <div className="bg-blue form-screen">
                <a className="back-btn" href="login.html">
                    <p>Voltar</p>
                </a>
                <div className="form-container">
                    <h1>Cadastro de Usuário</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-item">
                            <label>Nome Completo</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div className="form-item">
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <div className="form-item">
                            <label>Senha</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

                        <div className="container">
                            <button type="submit" className="form-btn">Cadastrar</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )

}

export default SignUp