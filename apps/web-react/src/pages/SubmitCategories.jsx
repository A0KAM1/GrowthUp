import { Form, redirect, useNavigate } from "react-router-dom"
import arrow from '../assets/left.svg'
import { useState } from "react";
import fetchData from "../FetchData";

function SubmitCategories() {

    const [title, setTitle] = useState()
    const [color, setColor] = useState()
    
    const handleSubmit = async (event) => {
        const categorie = await fetchData('post', '/categories', {title, color})
        event.preventDefault()
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="form-screen bg-blue">

                <div className="content header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <img src={arrow} />
                        <span>Voltar</span>
                    </button>
                    <h1 style={{ marginTop: "5%" }}>Cadastro de Categoria</h1>
                </div>

                <Form className="form" onSubmit={handleSubmit} action="/app/categorias">
                    <div>
                        <div className="form-group">
                            <label>Titulo</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Cor</label>
                            <input type="text" onChange={(e) => setColor(e.target.value)}/>
                        </div>
                    </div>

                    <button className="form-btn" type="submit">Cadastrar</button>
                </Form>
            </div>
        </>
    )
}

export default SubmitCategories