import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {DataContext} from '../Context/Context';

function ProtectedRoute({children, msg, redirect}) {
  const navigate = useNavigate();

  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => { 
    if (!user) {
          console.log('Navigating with state:', { msg, redirect });
      navigate('/auth', {state: {msg, redirect}});
    }
  }, [user]);

  return children;
}

export default ProtectedRoute