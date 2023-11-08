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

    const botao = () => {
        console.log("clicado")
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
                                <div className="categories-color">
                                    <span className="color" style={{ backgroundColor: color }}></span>
                                    {title}
                                </div>
                                <div>
                                    <Link to="/editar-categoria">
                                        <img src={pencil} />
                                    </Link>
                                    <Form action="deleteAction">
                                        <button type="submit">
                                            <img src={trash} />
                                        </button>
                                    </Form>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Categories