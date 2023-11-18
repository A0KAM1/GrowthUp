import { Form, useNavigate } from "react-router-dom"
import logo from "../../src/assets/Logo.svg"
import logo2 from "../../src/assets/Logo2.svg"

function Header(props) {

    const navigate = useNavigate()

    return (
        <>
            <div className="Header bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>

                    <button type="button" className="logout-btn" onClick={() => {
                        navigate('/', { replace: true })
                    }} >
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>Sair</span>
                    </button>

                </div>

                <div>{props.information}</div>
            </div>
        </>
    )

}

export default Header