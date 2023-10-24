import "./Home.css"
import { useState, useEffect } from 'react'

function Chart(){
    
}

function ChartCard(props){
    return(
        <>
            <div className="ChartCard">
                <h2>
                    {props.texto} por Categoria
                </h2>
                

                <div className="Chart">
                    {
                        <Chart />
                    }
                </div>

                <div>
                    <div className="container">
                        <p>categoria</p>
                        <p>R$ 0000,00</p>
                    </div>
                </div>
            </div>
        </>
    )
}


function Total(props){
    return(
        <>
            <div className={props.classe}>
                <h2>{props.tipo}</h2>
                <h2>R$ 0000,00</h2>
            </div>
        </>
    )
}


function Home(){
    return(
        <>
            <div className="content">
                <div className="container total">
                    <Total classe="entradas" tipo="Entradas"/>
                    <Total classe="saidas" tipo="Saídas" />
                </div>
                <ChartCard texto="Gastos"/>
                <ChartCard texto="Ganhos"/>
            </div>
        </>
    )
}

export default Home