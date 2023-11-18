import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import fetchData from "../FetchData"


function Categories() {

    const [categories, setCategories] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getCategories = async () => {
            setCategories(await fetchData("get", "/categories"))
        }
        getCategories()
    }, [])

    function exclude(id) {
        fetchData("delete", "/categories/" + id)
        window.location.reload(false)
    }

    return (
        <>
            <div className="content">
                <input className="search-input" type="text" />

                <Link className="add-btn" to="/adicionar-categoria">+ Criar Nova Categoria</Link>

                <ul>
                    {
                        categories && categories.map(({ id, title, color }) => (
                            <li key={id} className="list-item">
                                <span className="list-wrapper">
                                    <span className="color" style={{ backgroundColor: color }}></span>
                                    <span>{title}</span>
                                </span>
                                <span className="list-wrapper">
                                    <button type="button" onClick={() => { navigate("/editar-categoria", { replace: true, state: { id } }) }}>
                                        <ion-icon name="pencil"></ion-icon>
                                    </button>
                                    <button type="button" onClick={() => exclude(id)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Categories