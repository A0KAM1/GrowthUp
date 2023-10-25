import logo from "./assets/Logo.svg"
import logo2 from "./assets/Logo2.svg"
import logOut_img from "./assets/log-out.svg"
import "./Header.css"
import { useState, useEffect } from 'react'
import fetchData from "./FetchData"

function Header(props) {



    function funcao() {
        window.location.reload(false)
        console.log("clicado")
    }

    return (
        <>
            <div className="Header bg-blue">
                <div className="top">
                    <div className="logo">
                        <img src={logo} />
                        <img src={logo2} />
                    </div>

                    <button type="button" className="logout-btn" onClick={funcao} >
                        <img src={logOut_img} />
                        <p>Sair</p>
                    </button>
                </div>

                <div>{props.information}</div>
            </div>
        </>
    )
}

export default Header