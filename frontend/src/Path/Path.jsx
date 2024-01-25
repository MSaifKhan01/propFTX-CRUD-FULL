

import {Routes,Route} from "react-router-dom"
import LandingPage from "../Pages/Landing";
import LoginPage from "../Pages/LoginPage";
import RegisaterPage from "../Pages/RegisterPage";


function Path(){
    return (
        <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route path="/Register" element={<RegisaterPage />} />
                <Route path="/Login" element={<LoginPage />} />
                {/* <Route path="/Files" element={<FilePage />} /> */}
               
               
            </Routes>
    )
}

export default Path;