import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';


function App() {
  const isAuthenticated = ()=>{

     return !!localStorage.getItem("authToken")
  }
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              path="/myOrder"
              element={
                isAuthenticated() ? <MyOrder /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
