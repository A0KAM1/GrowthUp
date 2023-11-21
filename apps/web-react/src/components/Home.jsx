import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fetchData from "../FetchData"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function Home() {
    const [loading, setloading] = useState()
    const [categories, setCategories] = useState()
    const [deposits, setDeposits] = useState()
    const [withdraws, setWithdraws] = useState()


    useEffect(() => {
        const getData = async () => {
            try {
                const [depositsData, withdrawsData, categoriesData] = await Promise.all([
                    fetchData("get", "/transactions", {}, { filter: "DEPOSIT" }),
                    fetchData("get", "/transactions", {}, { filter: "WITHDRAW" }),
                    fetchData("get", "/categories")
                ])

                setDeposits(depositsData)
                setWithdraws(withdrawsData)
                setCategories(categoriesData)
                setloading(false)
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
                setloading(true)
            }
        }

        getData()
    }, [])

    const transformData = (data, type) => {
        if (!data || !type) return []

        return data.map(data => {
            const categoryTitle = type.find(type => type.id === data.category)
            return {
                id: data.id,
                title: data.title,
                amount: data.amount,
                type: data.type,
                category: {
                    id: categoryTitle.id,
                    title: categoryTitle.title,
                    color: categoryTitle.color
                }
            }
        })
    }

    const depositsArray = transformData(deposits, categories)
    const withdrawsArray = transformData(withdraws, categories)

    const sumByCategory = (transaction) => {
        const groupedByCategory = {}

        transaction.forEach(transaction => {
            const categoryTitle = transaction.category.title

            if (!groupedByCategory[categoryTitle]) {
                groupedByCategory[categoryTitle] = {
                    category: transaction.category,
                    totalAmount: 0
                }
            }

            groupedByCategory[categoryTitle].totalAmount += transaction.amount
        })
        return Object.values(groupedByCategory)
    }

    const groupedDeposits = sumByCategory(depositsArray)
    const groupedWithdraws = sumByCategory(withdrawsArray)

    const depositsData = {
        labels: groupedDeposits ? groupedDeposits.map(groupedDeposits => groupedDeposits.category.title) : 'undefined',
        datasets: [
            {
                data: groupedDeposits ? groupedDeposits.map(groupedDeposits => groupedDeposits.totalAmount) : 'undefined',
                backgroundColor: groupedDeposits ? groupedDeposits.map(groupedDeposits => groupedDeposits.category.color) : '#000000',
                borderColor: 'transparent'
            }
        ]
    }

    const withdrawData = {
        labels: groupedWithdraws ? groupedWithdraws.map(groupedWithdraws => groupedWithdraws.category.title) : 'undefined',
        datasets: [
            {
                data: groupedWithdraws ? groupedWithdraws.map(groupedWithdraws => groupedWithdraws.totalAmount) : 'undefined',
                backgroundColor: groupedWithdraws ? groupedWithdraws.map(groupedWithdraws => groupedWithdraws.category.color) : 'undefined',
                borderColor: 'transparent'
            }
        ],
    }

    const options = {

        customCanvasBackgroundColor: {
            color: 'white'
        }

    }

    if (loading) {
        return <p>Carregando...</p>
    }


    return (
        <div className="content">
            <div>
                <h2>Gastos por Categoria</h2>
                <div className="chart-container">
                    <div style={{ width: '85%', margin:'0 auto'}}>
                        <Doughnut data={withdrawData} options={options}></Doughnut>
                    </div>
                </div>
            </div>

            <div>
                <h2>Ganhos por Categoria</h2>
                <div className="chart-container">
                    <div style={{ width: '85%', margin:'0 auto' }}>
                        <Doughnut data={depositsData} options={options}></Doughnut>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home