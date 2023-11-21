import { Form, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import fetchData from "../FetchData";

function SubmitTransaction() {

    const navigate = useNavigate()
    const [categories, setCategories] = useState()

    const [title, setTitle] = useState()
    const [amount, setAmount] = useState()

    useEffect(() => {
        const getCategories = async () => {
            setCategories(await fetchData("get", "/categories"))
        }
        getCategories()
    }, [])

    const handleSubmit = async (e) => {

        const form = e.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())

        const type = formJson.type
        const category = formJson.category

        await fetchData("post", "/transactions", { title, amount, type, category })

        navigate("/app/historico", { replace: true })
    }

    return (
        <>
            <div className="form-screen bg-blue">

                <div className="content header">
                    <button className="back-btn" onClick={() => navigate("/app/historico", { replace: true })}>
                        <ion-icon name="chevron-back-outline"></ion-icon>
                        <span>Voltar</span>
                    </button>
                    <h1 style={{ marginTop: "5%" }}>Cadastro de Transação</h1>
                </div>

                <Form className="form" onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label>Titulo
                                <input type="text" onChange={(e) => setTitle(e.target.value)} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Valor
                                <input type="float" onChange={(e) => setAmount(e.target.value)} />
                            </label>
                        </div>

                        <div className="form-group">
                            <div id="category-select">
                                <label>
                                    Tipo
                                    <select name="type">
                                        <option value="WITHDRAW">Saída</option>
                                        <option value="DEPOSIT">Entrada</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                Categoria
                                <div className="select">

                                    <select name="category">
                                        {
                                            categories && categories.map(({ id, title, color }) => (
                                                <option value={id} key={id}>
                                                    {title}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button className="form-btn" type="submit">Cadastrar</button>
                </Form>
            </div>
        </>
    )
}

export default SubmitTransaction