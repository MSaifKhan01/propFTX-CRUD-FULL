

import {Routes,Route} from "react-router-dom"
import LandingPage from "../Pages/Landing";
import LoginPage from "../Pages/LoginPage";
import RegisaterPage from "../Pages/RegisterPage";
import MoviePage from "../Pages/MoviePage";
import UpadteMovie from "../Components/UpdateMovie";


function Path(){
    return (
        <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route path="/Register" element={<RegisaterPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Movie" element={<MoviePage />} />
                <Route path="/update/:id" element={<UpadteMovie />} />
               
               
            </Routes>
    )
}

export default Path;