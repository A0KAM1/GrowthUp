import {useState} from 'react'
import fetchData from './FetchData';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (event) => {

        const user = await fetchData('post', '/login', {email, password})
            localStorage.setItem("token", user.token)
            event.preventDefault()
    }

    return (
        <>
            <div className="form-screen">
                <div className="form-container">

                    <h1>Entrar</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-item">
                            <label>Email</label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-item">
                            <label>Senha</label>
                            <input type="password" name="senha" id="senha" onChange={(e) => setPassword(e.target.value)} required />
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
    )
}

export default Login