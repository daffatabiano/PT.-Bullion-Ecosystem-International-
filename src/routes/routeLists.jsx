import Dashboard from '../views/Dashboard'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'

export const routeLists = [
    {
        name: 'Dashboard',
        path: '/',
        element: <Dashboard /> 
    },
    {
        name: 'Login' ,
        path: '/login',
        type: 'auth',
        element: <Login />
    },
    {
        name: 'Register' ,
        path: '/register',
        type: 'auth',
        element: <Register />
    }
]