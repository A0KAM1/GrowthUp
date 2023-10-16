import './Menu.css'
import t from "./assets/table.svg"
import p from "./assets/pie-chart.svg"
import h from "./assets/home.svg"
import u from "./assets/user.svg"

function Menu(){
    return(
        <>
            <div className='container'>
                <div className='nav'>
                    <div className='nav-item'>
                        <button href="#">
                            <img src={t} />
                            <p>Histórico</p>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button href="#">
                            <img src={p} />
                            <p>Categorias</p>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button href="#">
                            <img src={h}/>
                            <p>Início</p>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button href="#">
                            <img src={u} />
                            <p>Perfil</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
        
}

export default Menu