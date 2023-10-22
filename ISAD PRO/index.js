import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Login from './Login'
// import Album from './Album'  s
import Newhome from './Newhome'
import Choosebus from './Choosebus'
import Reserve from './Reserve'
import History from './History'
import Detail from './reserve_items'
import After from './after_reserve'
// import Payment from './test'
import Emp from './ChooseEmp'
import Promo from './promotion'
import Login from './login'
import Regis from './regis'
// import Home from './Home'
// import RoutePage from './RoutePage'
// import Profile from './Profile'
// import History from './History';
// import Payment from './payment'
// import Review from './Review';
// import Checkout from './Checkout'
// import PaymentSuccess from './Success'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Newhome />} />
      <Route path="/newhome" element={<Newhome/>}/>
      <Route path="/choosebus" element={<Choosebus/>}/>
      <Route path="/reserve" element={<Reserve/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/after" element={<After/>}/>
      {/* <Route path="/payment" element={<Payment/>}/> */}
      <Route path="/chooseEmp" element={<Emp/>}/>
      <Route path="/promo" element={<Promo/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/regis" element={<Regis/>}/>
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/routepage" element={<RoutePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/payment" element={<Payment />} />
      <Route path="/history" element={<History />} />
      <Route path="/review" element={<Review />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<PaymentSuccess />} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();