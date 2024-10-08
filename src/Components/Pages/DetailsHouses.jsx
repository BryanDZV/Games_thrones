import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navega from "../Core/Navega";
import './DetailsHouses.css'
const DetailsHouses = () => {
  const [house, setHouse] = useState([]);
  const { id } = useParams();
  console.log("sooy id en detaishouses:", id);

  useEffect(() => {
    const getHouses = async () => {
      const houseApi = await fetch(`http://localhost:3000/Houses/${id}`);
      const houseJson = await houseApi.json();
      console.log("soy resultado de fetch:", houseJson);
      setHouse(houseJson);
      console.log("soyhouseJson;", houseJson);
    };
    getHouses();
  }, []);

  return (
    <>
    <div className="houseDetails_contenedor_general">
      <Navega></Navega>
      
        {house && (
          <>
          <div className="contenedor_general_detail_houses"></div>
            <div className="image_namehouse">
          
                <img src={house.image} alt={house.name} />
                <h3>{house.name}</h3>
              
            </div>
            <div className="otras_casa_detalles">
              <div className="Lema">
                <h3>LEMA</h3>
                <p>{house.settlement}</p>
              </div>
              <div className="sede">
              <h3>SEDE</h3>
                <p>{house.settlement}</p>
              </div>
              <div className="region">
              <h3>REGION</h3>
                <p>{house.region}</p>
              </div>
              <div className="alianzas">
              <h3>ALIANZAS</h3>
                <p>{house.alliances}</p>
              </div>
              <div className="religiones">
              <h3>RELIGIONES</h3>
                <p>{house.religions}</p>
              </div>
              <div className="fundacion">
              <h3>FUNDACION</h3>
                <p>{house.foundation}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailsHouses;
