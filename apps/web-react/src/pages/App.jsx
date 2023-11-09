import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"
import Header from "../components/Header"
import fetchData from "../FetchData"
import { useState, useEffect } from "react"

function App() {
    const [users, setUsers] = useState()

    useEffect(() => {
        const getUser = async () => {
            setUsers(await fetchData("get", "/users/me"))
        }
        getUser()
    }, [])

    return (
        <div className="App">
            <Header information={<>
                <div className="saldo">
                    <h2>Saldo Disponível</h2>
                    <h2>R$ {users?.account.balance}</h2>
                </div>
            </>} />
            <main className="container">
                <Outlet />
            </main>
            <Menu />
        </div>
    )
}

export default App