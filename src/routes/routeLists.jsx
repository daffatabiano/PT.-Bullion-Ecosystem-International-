import Dashboard from '../views/Dashboard';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import ProtectedRoute from './ProtectedRoute';

export const routeLists = [
    {
        name: 'Dashboard',
        path: '/',
        element: (
        <ProtectedRoute >
            <Dashboard />
        </ProtectedRoute>
    ) 
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
        element: (
        <ProtectedRoute>
            <Register />
        </ProtectedRoute>
            )
    }
]