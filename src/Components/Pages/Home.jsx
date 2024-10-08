import React from "react";

import "../Pages/Home";
import Navega from "../Core/Navega";

const Home = () => {
  return (
    <div className="fondo-home">
      <div className="span">
        <span className="titulo-texto">GAMES OF THRONES</span>
      </div>

      <div className="nav-home">
        <Navega />
      </div>
    </div>
  );
};
export default Home;
