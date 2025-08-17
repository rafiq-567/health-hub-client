import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    console.log(location)

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (!user) {
       return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;