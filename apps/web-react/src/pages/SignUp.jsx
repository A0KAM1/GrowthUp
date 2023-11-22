import { useState } from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import fetchData from "../FetchData"

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (event) => {

        const user = await fetchData('post', '/register', { name, email, password })
        localStorage.setItem("token", user.token)
        event.preventDefault()

        navigate("/app/", {replace: true})
    }

    return (
        <>
            <div className="bg-blue form-screen">

                <div className="content header">
                    <button className="back-btn" onClick={() => navigate("/", {replace: true})}>
                        <ion-icon name="chevron-back-outline"></ion-icon>
                        <span>Voltar</span>
                    </button>
                    <h1 style={{ marginTop: "5%" }}>Cadastro de Usuário</h1>
                </div>

                <Form className="form" onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label>Nome Completo
                                <input type="text" onChange={(e) => setName(e.target.value)} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Email
                                <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Senha
                                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="form-btn">Cadastrar</button>
                </Form>

            </div>
        </>
    )

}

export default SignUp