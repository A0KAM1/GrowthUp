import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import fetchData from "../FetchData"

function History() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const [transactions, setTransactions] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getData = async () => {
            try{

                const [transactionsData, categoriesData] = await Promise.all([
                    fetchData("get", "/transactions"),
                    fetchData("get", "/categories")
                ])
                
                setTransactions(transactionsData)
                setCategories(categoriesData)
                setLoading(false)
            } catch(error){
                console.error("Erro ao carregar elemento: ", error)
                setLoading(true)
            }
        }

        getData()
    }, [])

    const transformData = (data, type) => {
        if(!data || !type) return []

        return data.map(data => {
            const categoryTitle = type.find(type => type.id === data.category)
            return {
                id: data.id,
                title: data.title,
                amount: data.amount,
                type: data.type,
                category: {
                    id: categoryTitle.id,
                    title: categoryTitle.title,
                    color: categoryTitle.color
                }
            }
        })
    }

    const data = transformData(transactions, categories)

    function exclude(id) {
        fetchData("delete", "/transactions/" + id)
        window.location.reload(false)
    }

    if(loading){
        return <p>Carregando...</p>
    }

    return (
        <div className="content">
            <input className="search-input" type="text" />

            <Link className="add-btn" to="/adicionar-transacao">+ Criar Nova Transação</Link>

            <ul>
                {
                    data && data.map(({ id, title, amount, type, category }) => (
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
                                        {category.title}
                                    </div>
                                </div>

                                <div className="stretch">
                                    <button type="button" onClick={() => { navigate("/editar-transacao", { replace: true, state: { id } }) }}>
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