import { useState } from "react"
import { NavLink } from "react-router-dom"
import fetchData from "../FetchData"

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
                <NavLink className="back-btn" to="/">
                    Voltar
                </NavLink>
                <div className="content">
                    <h1>Cadastro de Usuário</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome Completo</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div>
                            <button type="submit" className="form-btn">Cadastrar</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )

}

export default SignUp