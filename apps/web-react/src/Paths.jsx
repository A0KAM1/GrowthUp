import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import History from "./layouts/History.jsx";
import Home from './layouts/Home.jsx';
import Categories from './layouts/Categories.jsx';
import User from './layouts/User.jsx'

import App from "./components/App.jsx";
import Login from "./components/Login.jsx";
import SignUp from './components/SignUp.jsx';
import SubmitCategories from './components/SubmitCategories.jsx';
import EditCategories from './components/EditCategories.jsx';
import SubmitTransaction from './components/SubmitTransaction.jsx';
import EditTransacion from './components/EditTransaction.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "cadastrar",
        element: <SignUp />,
    },
    {
        path: "app",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "historico",
                element: <History />
            },
            {
                path: "categorias",
                element: <Categories />
            },
            {
                path: "perfil",
                element: <User />
            }
        ]
    },
    {
        path: "adicionar-categoria",
        element: <SubmitCategories />
    },
    {
        path: "editar-categoria",
        element: <EditCategories />
    },
    {
        path: "adicionar-transacao",
        element: <SubmitTransaction />
    },
    {
        path: "editar-transacao",
        element: <EditTransacion />
    }
])

function Paths() {
    return (
        <RouterProvider router={router} />
    )
}

export default Paths