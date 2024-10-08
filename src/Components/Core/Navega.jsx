import React from "react";
import { Link } from "react-router-dom";

const Navega = () => {
  return (
    <>
      <div className="nav_link">
        <ul className="text-container">
          <li>
            <Link className='nav-enlace' to="/">INICIO</Link>
          </li>
          <li>
            <Link className='nav-enlace' to="/personajes">PERSONAJES</Link>
          </li>
          <li>
            <Link className='nav-enlace' to="/houses">CASAS</Link>
          </li>
          <li>
            <Link className='nav-enlace' to="/Cronologia1">CRONOLOGIA</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navega;
