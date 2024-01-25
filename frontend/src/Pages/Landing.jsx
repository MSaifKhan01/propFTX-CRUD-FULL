import React from "react";
import Navbar from "../Components/Navbar";
import "../CSS/landing.css"


function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="body-wrap">
        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-inner">
                <div className="hero-copy">
                  <h1 className="hero-title mt-0">Manage Your Movies with Ease</h1>
                  <p className="hero-paragraph">Start by creating backups of your digital movie collection</p>
                  <div className="hero-cta">
                    <a className="button button-primary" href="/Login">Get Started</a>
                    <a className="button" href="/">Learn More</a>
                  </div>
                </div>
                <div className="heroimage">
                  <img src="https://img.freepik.com/free-photo/copy-space-cinema-equipment_23-2148470220.jpg?w=900&t=st=1706167777~exp=1706168377~hmac=db01eec99d0f5796d30f3c4eb675d6bd9fa419e2f09b162322014b3d4e1ac71c" alt="" />
                </div>
               
              </div>
            </div>
          </section>

          

          
        </main>
      </div>
  
    </div>
  );
}

export default LandingPage;