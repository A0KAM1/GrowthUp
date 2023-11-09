import { Form, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Categories.css"
import fetchData from "../FetchData"
import pencil from '../assets/edit.svg'
import trash from '../assets/trash.svg'

function Categories() {
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            setCategories(await fetchData("get", "/categories"))
        }
        getCategories()
    }, [])

    function exclude(id) {
        const category = fetchData("delete", "/categories/" + id)
        window.location.reload(false)
    }

    return (
        <>
            <div className="content">
                <input className="search-input" type="text" />

                <Link className="cat-add-btn" to="/adicionar-categoria">+ Criar Nova Categoria</Link>

                <ul>
                    {
                        categories && categories.map(({ id, title, color }) => (
                            <li key={id} className="categories-list-item">
                                <span className="categories-color">
                                    <span className="color" style={{ backgroundColor: color }}></span>
                                    <span>{title}</span>
                                </span>
                                <span>
                                    <Form style={{display: "inline"}} method="post">
                                        <button type="submit">
                                            <img src={pencil} />
                                        </button>
                                    </Form>

                                    <button type="button" onClick={() => exclude(id)}>
                                        <img src={trash} />
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