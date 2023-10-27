import { NavLink, Outlet } from "react-router-dom"
import Header from "./Header"

const Menu = () => {
    return (
        <div>
            <header>
                <Header information={<>
                    <div className="userData">
                        <div>
                            <img src={userIcon} />
                        </div>
                        <h2>{users?.name}</h2>
                    </div>
                </>} />
            </header>
            <main>
                <Outlet />
            </main>
            <nav>
                <NavLink to="/historico" aria-label="Visualizar historico">
                    <img src={h} />
                    <p>Histórico</p>
                </NavLink>
                <button>
                    
                </button>
                <button>
                    <img src={c} />
                    <p>Categorias</p>
                </button>
                <button >
                    <img src={i} />
                    <p>Início</p>
                </button>
                <button>
                    <img src={u} />
                    <p>Perfil</p>
                </button>
            </nav>
        </div>
    )
}

export default Menu