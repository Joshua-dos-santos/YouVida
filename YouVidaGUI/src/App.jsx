import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Profile from "./Components/Profile";
import './App.css'

function App() {

  return (
    <main>
        <h1>Auth0 login</h1>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
    </main>
  )
}

export default App

