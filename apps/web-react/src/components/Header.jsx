import { Form, useNavigate } from "react-router-dom"
import logo from "../../src/assets/Logo.svg"
import logo2 from "../../src/assets/Logo2.svg"
import logOut_img from "../../src/assets/log-out.svg"

import "./Header.css"

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
                        localStorage.removeItem("token")
                        navigate('/', { replace: true })
                    }} >
                        <img src={logOut_img} />
                        <span>Sair</span>
                    </button>

                </div>

                <div>{props.information}</div>
            </div>
        </>
    )

}

export default Header