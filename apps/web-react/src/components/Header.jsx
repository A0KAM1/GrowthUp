import { Form } from "react-router-dom"
import logo from "../../src/assets/Logo.svg"
import logo2 from "../../src/assets/Logo2.svg"
import logOut_img from "../../src/assets/log-out.svg"

import "./Header.css"

function Header(props) {

    function funcao() {
        window.location.reload(false)
    }

    return (
        <>
            <div className="Header bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>

                    <Form>
                        <button type="submit" className="logout-btn" onClick={funcao} >
                            <img src={logOut_img} />
                            <span>Sair</span>
                        </button>
                    </Form>
                </div>

                <div>{props.information}</div>
            </div>
        </>
    )

}

export default Header