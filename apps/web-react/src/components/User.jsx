import pencil from "../../src/assets/edit.svg"
import { useState, useEffect } from "react"
import fetchData from "../FetchData"


function User() {
    const [user, setUser] = useState()
    const [change, setchange] = useState("no")

    useEffect(() => {
        const getUser = async () => {
            setUser(await fetchData("get", "/users/me"))
        }
        getUser()
    }, [])

    return (
        <>
            <div className="content">
                <div className="container form-group" style={{ justifyContent: "space-between", color: "#071952" }}>
                    <h2>Informações pessoais</h2>
                    <button type="button" onClick={() => setchange("yes")}><img src={pencil} /></button>
                </div>
                <div className="form-group">
                    <label>Nome Completo</label>
                    {
                        (change == "no") ?
                            <input type="text" value={user?.name || ''} readOnly /> :
                            <input type="text" value={user?.name || ''} />
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    {
                        (change == "no") ?
                            <input type="text" value={user?.email || ''} readOnly /> :
                            <input type="text" value={user?.email || ''} />
                    }
                </div>
            </div>
        </>
    )
}

export default User