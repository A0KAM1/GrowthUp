import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import History from "./components/History.jsx";
import Home from './components/Home.jsx';
import Categories from './components/Categories.jsx';
import User from './components/User.jsx'

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import SignUp from './pages/SignUp.jsx';
import SubmitCategories from './pages/SubmitCategories.jsx';
import EditCategories from './pages/EditCategories.jsx';
import SubmitTransaction from './pages/SubmitTransaction.jsx';
import EditTransacion from './pages/EditTransaction.jsx';
import Error from './pages/Error.jsx';

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
        element: <Dashboard />,
        errorElement: <Error />,
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
            },
            {
                path: '*',
                element: <Error />
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
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App