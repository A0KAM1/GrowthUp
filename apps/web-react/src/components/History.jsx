import { Link } from "react-router-dom"

function History(){
    return (
        <div className="content">
            <h1>Historico de categorias</h1>
            <div>
                <h2>Data **/**/****</h2>
                <ul>
                    <li>
                        <p>Transferencia 1</p>
                        <p>9999,99</p>
                        <Link to="/editar-transacao" aria-label="Editar Transferencia">Editar</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default History