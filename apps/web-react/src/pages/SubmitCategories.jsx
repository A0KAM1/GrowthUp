import { Form, redirect, useNavigate } from "react-router-dom"
import arrow from '../assets/left.svg'
import { useState } from "react";
import fetchData from "../FetchData";

function SubmitCategories() {

    const navigate = useNavigate();
    const [title, setTitle] = useState()
    const [color, setColor] = useState()

    const handleSubmit = async () => {
        await fetchData('post', '/categories', { title, color })
    }


    return (
        <>
            <div className="form-screen bg-blue">

                <div className="content header">
                    <button className="back-btn" onClick={() => navigate("/app/categorias")}>
                        <img src={arrow} />
                        <span>Voltar</span>
                    </button>
                    <h1 style={{ marginTop: "5%" }}>Cadastro de Categoria</h1>
                </div>

                <Form className="form" onSubmit={handleSubmit} action={() => navigate("/app/categorias", {replace: true})}>
                    <div>
                        <div className="form-group">
                            <label>Titulo
                                <input type="text" onChange={(e) => setTitle(e.target.value)} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Cor
                                <input type="text" onChange={(e) => setColor(e.target.value)} />
                            </label>
                        </div>
                    </div>

                    <button className="form-btn" type="submit">Cadastrar</button>
                </Form>
            </div>
        </>
    )
}

export default SubmitCategories