import "./Home.css"
import { useState, useEffect } from 'react'

function Chart(){
    
}

function GraphicCard(props){
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
                    <p>categoria</p>
                </div>
            </div>
        </>
    )
}

function Home(){
    return(
        <>
            <div className="content">
                <GraphicCard texto="Gastos"/>
                <GraphicCard texto="Ganhos"/>
            </div>
        </>
    )
}

export default Home