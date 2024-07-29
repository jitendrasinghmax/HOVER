import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/layout'
import 'semantic-ui-css/semantic.min.css'

//pages
import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'
import Sell from './pages/sell'
import Confirmed from './pages/confirmed'
import { MyProduct } from './pages/myProduct'
import { DeliveryDetails } from './pages/deliveryDetails'


function App() {
  
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/sell" element={<Sell/>}></Route>
            <Route path="/confirmed/:msg" element={<Confirmed/>}></Route>
            <Route path="/myproducts" element={<MyProduct/>}></Route>
            <Route path="/deliverydetails/:productId" element={<DeliveryDetails/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
