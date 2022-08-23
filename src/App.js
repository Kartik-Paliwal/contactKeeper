import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import ContactState from "./Context/contact/ContactState";
import Home from "./Components/Home";
function App() {
  return (
    <ContactState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Singup/>} />
          </Routes>
        </div>
      </Router>
    </ContactState>
  );
}
export default App;
