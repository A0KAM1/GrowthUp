import { Form, useNavigate } from "react-router-dom"
import arrow from '../assets/left.svg'
import { useEffect } from "react";
import fetchData from "../FetchData";


const EditCategories = () => {

    const navigate = useNavigate();

    return (
        <div className="form-screen bg-blue">

            <div className="content header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <img src={arrow} />
                    <span>Voltar</span>
                </button>
                <h1 style={{ marginTop: "5%" }}>Edição de Categoria</h1>
            </div>

            <Form className="form" action={() => navigate(-1)}>
                <div>
                    <div className="form-group">
                        <label>Titulo</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Cor</label>
                        <input type="text" />
                    </div>
                </div>

                <button className="form-btn" type="submit">Salvar</button>
            </Form>

        </div>
    )
}

export default EditCategories