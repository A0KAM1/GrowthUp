import { Form, useNavigate } from "react-router-dom"
import arrow from '../assets/left.svg'

function EditTransacion() {

    const navigate = useNavigate();

    return (
        <>
            <div className="form-screen bg-blue">

                <div className="content header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <img src={arrow} />
                        <span>Voltar</span>
                    </button>
                    <h1 style={{ marginTop: "5%" }}>Editar Transação</h1>
                </div>

                <Form className="form">
                    <div>
                        <div className="form-group">
                            <label>Titulo</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>Categoria</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="number" />
                        </div>
                    </div>

                    <button className="form-btn" type="submit">Cadastrar</button>
                </Form>
            </div>
        </>
    )
}

export default EditTransacion