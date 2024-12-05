import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
  const authenticated = false;
  return (
    <Route {...rest}>
      {!authenticated ? <Navigate to="login" /> : children}
    </Route>
  );
}

export default PrivateRoute;