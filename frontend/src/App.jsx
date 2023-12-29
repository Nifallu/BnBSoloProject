import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotsList from './components/Spots/SpotsList'
import SpotDetail from './components/Spots/SpotDetails';
import CreateSpotForm from './components/CreateSpot/CreateSpot';
import ManageSpots from './components/ManageSpot/ManageSpots';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}

    </>
  );
}

function Spots(){
  const [spots, setSpots] = useState([]);

  useEffect(()=>{
    const fetchSpots = async () => {
      try{
      const response = await fetch('/api/spots')
      const data = await response.json();
      setSpots(data);
      }
      catch (error) {
        console.error('unable to fetch spots', error)
      }
    };

    fetchSpots();
  }, [])

  return (
    <div>
    <SpotsList spots={spots}/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <>
        <Spots />
        </>
      },
      {
        path: 'spots/current',
        element:
        <ManageSpots />
      },
      {
        path: 'spot/:spotId',
        element: <>
        <SpotDetail />
        </>,
      },
      {
        path: 'spots/new',
        element: 
        <CreateSpotForm />
      },

    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
