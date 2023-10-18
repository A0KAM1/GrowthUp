import './App.css'
import h from "./assets/table.svg"
import c from "./assets/pie-chart.svg"
import i from "./assets/home.svg"
import u from "./assets/user.svg"
import hs from "./assets/table-selected.svg"
import cs from "./assets/pie-chart-selected.svg"
import is from "./assets/home-selected.svg"
import us from "./assets/user-selected.svg"
import Header, { HeaderUser} from './Header'
import Home from "./Home.jsx"
import Categorias from './Categorias.jsx'
import Historico from './Historico.jsx'
import User from './User.jsx'
import { useState, useEffect } from 'react'

function App(){

    let content;
    let btnState, btnState1, btnState2, btnState3;
    
    const [page, setPage] = useState("home");

    if(page == 'historico'){
        content = <Historico />
        btnState= "selected"
    }
    else if(page =='categorias'){
        content = <Categorias />
        btnState1= "selected"
    }
    else if(page == 'home'){
        content = <Home />
        btnState2= "selected"
    }
    else{
        content = <User />
        btnState3= "selected"
    }

    return(
        <>
        <div className='App'>
            {
                (page == 'user')?
                <HeaderUser />:
                <Header />
            }
            <div className='container'>{content}</div>
            <footer className='nav'>
                <button className={btnState} onClick={() => setPage("historico")}>
                    {
                        (page == 'historico')?
                        <img src={hs} />:
                        <img src={h} />
                    }
                    <p>Histórico</p>
                </button>
                <button className={btnState1} onClick={() => setPage("categorias")}>
                    {
                        (page == 'categorias')?
                        <img src={cs} />:
                        <img src={c} />
                    }
                    <p>Categorias</p>
                </button>
                <button className={btnState2} onClick={() => setPage("home")}>
                    {
                        (page == 'home')?
                        <img src={is} />:
                        <img src={i}/>
                    }
                    <p>Início</p>
                </button>
                <button className={btnState3} onClick={() => setPage("user")}>
                    {
                        (page == 'user')?
                        <img src={us} />:
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