import logo from "./assets/Logo.svg"
import logo2 from "./assets/Logo2.svg"
import logOut from "./assets/log-out.svg"
import userIcon from "./assets/user-icon.svg"
import "./Header.css"


export function Header(){
    return(
        <>
            <div className="Header bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>
                    <button className="logout-btn">
                        <img src={logOut} />
                        <p>Sair</p>
                    </button>
                </div>
                
                <div className="saldo">
                    <h2>Saldo Disponível</h2>
                    <h2>R$ 0000,00</h2>
                </div>
            </div>
        </>
    )
}

export function HeaderUser(){
    return(
        <>
            <div className="Header bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>
                    <button className="logout-btn">
                        <img src={logOut} />
                        <p>Sair</p>
                    </button>
                </div>
                
                <div className="userData">
                    <div>
                        <img src={userIcon} />
                    </div>
                    <h2>Nome do Usuario</h2>
                </div>
            </div>
        </>
    )
}

export default Header