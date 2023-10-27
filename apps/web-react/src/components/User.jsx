import "./User.css"
import edit from "../../src/assets/edit.svg"
import { useState, useEffect } from "react"
import fetchData from "../FetchData"


function User() {
    const [user, setUser] = useState()

    useEffect(() => {
        const getUser = async () => {
            setUser(await fetchData("get", "/users/me"))
        }
        getUser()
    }, [])

    return (
        <>
            <div className="content">
                <div className="title">
                    <h2>Informações pessoais</h2>
                    <a href="#"><img src={edit} /></a>
                </div>
                <div className="form-group">
                    <label>Nome Completo</label>
                    <input type="text" value={user?.name} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={user?.email} />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" value={user?.senha} />
                </div>

            </div>
        </>
    )
}

export default User