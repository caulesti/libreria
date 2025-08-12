import { BrowserRouter, useRoutes } from 'react-router-dom'

import Home from '../Home'
import NotFound from '../NotFound'
import Navbar from '../../Components/Navbar'

import '../App/App.css'
import { Proveedor } from '../../Context'
import Libro from '../Libro'
import Cliente from '../Cliente'
import Venta from '../Venta'
import Alquiler from '../Alquiler'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/*', element: <NotFound />},
    {path: '/libros', element: <Libro />},
    {path: '/clientes', element: <Cliente />},
    {path: '/ventas', element: <Venta />},
    {path: '/alquileres', element: <Alquiler />},


  ])
  return routes
}

const App = () => {

  return (
    <Proveedor>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </Proveedor>
        
  )
}

export default App