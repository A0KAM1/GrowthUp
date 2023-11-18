import pencil from "../../src/assets/edit.svg"
import { useState, useEffect } from "react"
import fetchData from "../FetchData"
import { Form } from "react-router-dom"


function User() {
    const [user, setUser] = useState()
    const [change, setChange] = useState("no")

    useEffect(() => {
        const getUser = async () => {
            setUser(await fetchData("get", "/users/me"))
        }
        getUser()
    }, [])

    const handleSubmit = async (e) => {
        const form = e.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())

        const name = formJson.name
        const email = formJson.email

        await fetchData("put", "/users/me", { name, email })

        setChange("no")
        
        window.location.reload(false)
    }

    return (
        <>
            <div className="content">
                <div className="container form-group" style={{ justifyContent: "space-between", color: "#071952" }}>
                    <h2>Informações pessoais</h2>
                    <button type="button" onClick={() => setChange("yes")}><ion-icon name="pencil"></ion-icon></button>
                </div>
                {
                    (change == 'no') ?
                        <div>
                            <div className="form-group">
                                <label>
                                    Nome Completo
                                    <input type="text" value={user?.name || ''} readOnly />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Email
                                    <input type="text" value={user?.email || ''} readOnly />
                                </label>
                            </div>
                        </div> :
                        <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>
                                    Nome Completo
                                    <input type="text" defaultValue={user?.name || ''} name="name" />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Email
                                    <input type="email" defaultValue={user?.email || ''} name="email" />
                                </label>
                            </div>
                            <button className="form-btn" type="submit">Salvar</button>
                        </Form>
                }
            </div>
        </>
    )
}

export default User