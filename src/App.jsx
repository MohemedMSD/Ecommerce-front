import {React, Suspense, useEffect} from 'react';
import './App.css'
import { RouterProvider } from 'react-router-dom';
import Axios from './assets/constants/axios/axios'
import routes from './routes.jsx'
import { useStateContext } from './context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components';

const checkTokenExpiration = () => {

  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('expirationTime');

  if (token && expirationTime) {

      const now = new Date();
      const expired = now.getTime() > parseInt(expirationTime, 10);

      if (expired) {

          Axios.post('/logout')
          .then((res) => console.log(res))
          .catch((rej) => console.log(rej))

          // Token expired, clear localStorage and log out
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('expirationTime');

          // Redirect or show a message indicating that the user has been logged out
          window.location.href = '/'
      }

  }

};

function App() {
    const {user} = useStateContext()
    // check if user is logged in or not from server
    useEffect(() => {
      
      (async()=>{

        if (user) {
          
          try {
            
            const res = await Axios.get('/user');
            localStorage.setItem('user', JSON.stringify({
              ...user, 
              number : res.data.id, 
              adress : res.data.adress, 
              verified_at : res.data.verified_at,
              patient : res.data.patient
            }));

          } catch (rej) {
            
            if(rej.response.status === 401){

              localStorage.removeItem('user');
              localStorage.removeItem('token');
              localStorage.removeItem('expirationTime');
              
            }

          }

        }

      })()

      // Check token expiration every hour
      const interval = setInterval(checkTokenExpiration, 15000);
      // const interval = setInterval(checkTokenExpiration, 1 * 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);

    }, []);

  return (
    <Suspense fallback={<Loading/>}>
      <Toaster/>
      <RouterProvider router={routes}/>
    </Suspense>
  );

}

export default App;
