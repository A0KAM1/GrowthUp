import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from "./components/Login.jsx";
import SignUp from './components/SignUp.jsx';
import Menu from './components/Menu.jsx';
import History from './components/History.jsx';
import Categories from './components/Categories.jsx';
import Home from './components/Home.jsx';
import User from './components/User.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <h1>Erro! Rota não encontrada...</h1>
    },
    {
        path: "/cadastrar",
        element: <SignUp />,
        errorElement: <h1>Erro! Rota não encontrada...</h1>
    },
    {
        path: "/menu",
        element: <Menu />,
        errorElement: <h1>Erro! Rota não encontrada...</h1>,
        children: [
            {
                path: "historico",
                element: <History />,
                errorElement: <h1>Erro! Rota não encontrada...</h1>
            },
            {
                path: "categorias",
                element: <Categories />,
                errorElement: <h1>Erro! Rota não encontrada...</h1>
            },
            {
                path: "inicio",
                element: <Home />,
                errorElement: <h1>Erro! Rota não encontrada...</h1>
            },
            {
                path: "usuario",
                element: <User />,
                errorElement: <h1>Erro! Rota não encontrada...</h1>
            }
        ]
    },
    // {
    //     path: "cadastrar-categoria",
    //     element: <CategoriesSubmit />,
    //     errorElement: <h1>Erro! Rota não encontrada...</h1>
    // },
    // {
    //     path: "cadastrar-transacao",
    //     element: <TransactionSubmit />,
    //     errorElement: <h1>Erro! Rota não encontrada...</h1>
    // }
])

function App(){
    return(
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App