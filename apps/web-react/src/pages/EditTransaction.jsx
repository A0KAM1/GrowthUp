import { Form, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchData from "../FetchData"

function EditTransacion() {
    const location = useLocation()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getData = async () => {
            setTransaction(await fetchData("get", "/transactions/" + location.state.id))
            setCategories(await fetchData("get", "/categories"))
        }
        getData()
    }, [])

    const handleSubmit = async (e) => {
        const form = e.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())

        const title = formJson.title
        const amount = formJson.amount
        const type = formJson.type
        const category = formJson.category

        await fetchData("put", "/transactions/" + location.state.id, { title, amount, type, category })

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
                    <h1 style={{ marginTop: "5%" }}>Editar Transação</h1>
                </div>

                <Form className="form" onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label>Titulo
                                <input type="text" defaultValue={transaction?.title || ''} name="title" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Valor
                                <input type="float" defaultValue={transaction?.amount || ''} name="amount" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Tipo
                                <select defaultValue={transaction?.type || ''} name="type">
                                    <option value="WITHDRAW">Saída</option>
                                    <option value="DEPOSIT">Entrada</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Categoria
                                <div className="select">
                                    <select name="category">
                                        {
                                            categories && categories.map(({ id, title, color }) => (
                                                <option value={id}>
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

export default EditTransacion