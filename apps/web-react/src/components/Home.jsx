import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import fetchData from "../FetchData"

function Home() {
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState()
    const [depositos, setDepositos] = useState()
    const [retirar, setRetirar] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getTransactions = async () => {
            setDepositos(await fetchData("get", "/transactions", {}, {filter: "DEPOSIT"}))
            setRetirar(await fetchData("get", "/transactions", {}, {filter: "WITHDRAW"}))
        }

        getTransactions()

    }, [])


    console.log(depositos, retirar)

    return(
        <div className="content">
            <ul>

            </ul>
        </div>
    )
}

export default Home