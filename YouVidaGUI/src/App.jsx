import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavbarAuthenticated from "./Components/NavbarAuthenticated";
import UserProfile from "./Pages/UserProfile";
import UnauthenticatedNavbar from "./Components/UnauthenticatedNavbar";
import Timeline from "./Pages/Timeline"
import AddNewPost from "./Pages/AddNewPost";

function App() {

  return (
      <Router>
          <NavbarAuthenticated />
          <UnauthenticatedNavbar/>
          <Routes>
              <Route path='/' element={<Timeline/>} />
              <Route path='/profile' element={<UserProfile/>} />
              <Route path='/AddNewPost' element={<AddNewPost/>} />
          </Routes>
      </Router>
  );
}

export default App

