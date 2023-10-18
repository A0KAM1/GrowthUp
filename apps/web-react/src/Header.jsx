import logo from "./assets/Logo.svg"
import logo2 from "./assets/Logo2.svg"
import logOut from "./assets/log-out.svg"
import "./Header.css"

function Header(){
    return(
        <>
            <div className="bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>
                    <div>
                        <button>
                            <img src={logOut} />
                            <p>Sair</p>
                        </button>
                    </div>            
                </div>
                <div>
                    <h2>Saldo Disponível</h2>
                    <h2>R$ 0000,00</h2>
                </div>
            </div>
        </>
    )
}

export default Header