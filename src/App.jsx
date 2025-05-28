import React, { useContext, useEffect } from 'react'
import Routing from './Router';
import { DataContext } from './components/Context/Context';
import { auth } from '../firebase/firebase';
import { Type } from './Utility/action.type';
import { ToastContainer } from 'react-toastify';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => { 
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        });
      }
    })
  }, []);

  return (
    <>
      <ToastContainer />
      <Routing />
    </>
  );
}

export default App