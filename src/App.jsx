import Login from "./pages/Login"
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";


function App() {

  const [isUserLogin, setIsUserLogin] = useState(false)

  useEffect(() => {
    checkAuthority()
  },[isUserLogin])

  const checkAuthority = () => {
    const token = window.localStorage.getItem('token')

    if(token !== null){
      setIsUserLogin(true)
    }else{
      setIsUserLogin(false)
    }
  }

  return (
    <div className="App bg-[#C6F6F1]">
      <Router >
          <Routes >
            {isUserLogin ?
              (
                <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/quiz" element={<Quiz />}></Route>
                </>
              ) :
              (
                <Route exact path="/" element={<Login userIsLogin={(data) => setIsUserLogin(data)}/>}></Route>
              )
            }
          </Routes >
      </Router>
    </div>
  )
}



export default App
