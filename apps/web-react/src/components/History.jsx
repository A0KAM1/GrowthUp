import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import fetchData from "../FetchData"

function History() {
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState()
    const [categoria, setCategoria] = useState()

    useEffect(() => {
        const getTransactions = async () => {
            setTransactions(await fetchData("get", "/transactions"))
        }
        getTransactions()
    }, [])



    // function exclude(id) {
    //     fetchData("delete", "/categories/" + id)
    //     window.location.reload(false)
    // }

    return (
        <div className="content">
            <input className="search-input" type="text" />

            <Link className="add-btn" to="/adicionar-transacao">+ Criar Nova Categoria</Link>

            <ul>
                {
                    transactions && transactions.map(({ id, title, amount, type, category }) => (
                        <li key={id} >
                            <details >
                                <summary className="list-item">
                                    <span className="list-wrapper">
                                        <span><ion-icon name="chevron-down-outline"></ion-icon></span>
                                        <span>{title}</span>
                                    </span>
                                    <span className="list-wrapper">
                                        R$ {amount}
                                    </span>
                                </summary>
                                <div className="stretch">
                                    <div>
                                        {
                                            type == 'WITHDRAW' ?
                                                <span>Saída</span> :
                                                <span>Entrada</span>
                                        }
                                    </div>
                                    <div>
                                        {category}
                                    </div>
                                </div>

                                <div className="stretch">
                                    <button type="button">
                                        <ion-icon name="pencil"></ion-icon>
                                        <span>Editar</span>
                                    </button>
                                    <button type="button" onClick={() => exclude(id)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                        <span>Deletar</span>
                                    </button>
                                </div>
                            </details>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default History