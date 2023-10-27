import './App.css'
import h from "../../src/assets/table.svg"
import c from "../../src/assets/pie-chart.svg"
import i from "../../src/assets/home.svg"
import u from "../../src/assets/user.svg"
import hs from "../../src/assets/table-selected.svg"
import cs from "../../src/assets/pie-chart-selected.svg"
import is from "../../src/assets/home-selected.svg"
import us from "../../src/assets/user-selected.svg"
import userIcon from "../../src/assets/user-icon.svg"

import Header from './Header'
import Home from "./Home.jsx"
import Categories from './Categories.jsx'
import History from './History.jsx'
import User from './User.jsx'
import Login from './Landing'

import { useState, useEffect } from 'react'
import fetchData from '../FetchData'


function App() {

    const [users, setUsers] = useState()

    useEffect(() => {
        const getUser = async () => {
            setUsers(await fetchData("get", "/users/me"))
        }
        getUser()
    }, [])

    let content;
    let btnState, btnState1, btnState2, btnState3;

    const [page, setPage] = useState("home");

    if (page == 'historico') {
        content = <History />
        btnState = "selected"
    }
    else if (page == 'categorias') {
        content = <Categories />
        btnState1 = "selected"
    }
    else if (page == 'home') {
        content = <Home />
        btnState2 = "selected"
    }
    else {
        content = <User />
        btnState3 = "selected"
    }

    return (
        <>
            <div className='App'>
                {
                    (page == 'user') ?
                        <Header information={<>
                            <div className="userData">
                                <div>
                                    <img src={userIcon} />
                                </div>
                                <h2>{users?.name}</h2>
                            </div>
                        </>} /> :
                        <Header information={<>
                            <div className="saldo">
                                <h2>Saldo Disponível</h2>
                                <h2>R$ {users?.account.balance}</h2>
                            </div>
                        </>} />
                }
                <div className='container'>{content}</div>
                <footer className='nav'>
                    <button className={btnState} onClick={() => setPage("historico")}>
                        {
                            (page == 'historico') ?
                                <img src={hs} /> :
                                <img src={h} />
                        }
                        <p>Histórico</p>
                    </button>
                    <button className={btnState1} onClick={() => setPage("categorias")}>
                        {
                            (page == 'categorias') ?
                                <img src={cs} /> :
                                <img src={c} />
                        }
                        <p>Categorias</p>
                    </button>
                    <button className={btnState2} onClick={() => setPage("home")}>
                        {
                            (page == 'home') ?
                                <img src={is} /> :
                                <img src={i} />
                        }
                        <p>Início</p>
                    </button>
                    <button className={btnState3} onClick={() => setPage("user")}>
                        {
                            (page == 'user') ?
                                <img src={us} /> :
                                <img src={u} />
                        }
                        <p>Perfil</p>
                    </button>
                </footer>
            </div>

        </>
    )
}



export default App