import { NavLink } from "react-router-dom"
import './Menu.css'

const Menu = () => {
    return (
        <nav className="menu">
            <NavLink className="link" to="historico" aria-label="Historico de transações">
                <div>
                    <span className="icon history"></span>
                    <span>Histórico</span>
                </div>
            </NavLink>
            <NavLink className="link" to="categorias" aria-label="Visualizar categorias">
                <div>
                    <span className="icon categorie"></span>
                    <span>Categorias</span>
                </div>
            </NavLink>
            <NavLink className="link" to="" end aria-label="Inicio">
                <div>
                    <span className="icon home"></span>
                    <span>Início</span>
                </div>
            </NavLink>
            <NavLink className="link" to="perfil" aria-label="Dados pessoais">
                <div>
                    <span className="icon user"></span>
                    <span>Perfil</span>
                </div>
            </NavLink>
        </nav>
    )
}

export default Menu