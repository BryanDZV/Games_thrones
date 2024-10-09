import Navega from "../Core/Navega";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Cronologia1.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Cronologia1() {
  const [cronologias1, setCronologias1] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [edadMostrada, setEdadMostrada] = useState("20");

  useEffect(() => {
    const getCharacters = async () => {
      const response = await axios.get(
        "https://servidor-tronos.vercel.app/characters"
      );
      console.log(response);
      setCronologias1(response.data);
    };
    getCharacters();
  }, []);

  const ordenarAge = () => {
    const cronologiasOrdenadas = [...cronologias1];
    cronologiasOrdenadas.sort((a, b) => {
      if (ordenAscendente) {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setCronologias1(cronologiasOrdenadas);
    setOrdenAscendente(!ordenAscendente);

    const edades = cronologiasOrdenadas.map((cronologia) => cronologia.age);
    const edadMostradaCalculada = ordenAscendente
      ? Math.min(...edades)
      : Math.max(...edades);
    setEdadMostrada(edadMostradaCalculada === 0 ? "20" : edadMostradaCalculada);
  };

  return (
    <>
      <div className="cronologia_contendor_general">
        <div className="navega_cronologia">
          <Navega />
        </div>

        <div className="circulo_contenedor">
          {edadMostrada !== "0" && (
            <div className="circulo_numero" onClick={ordenarAge}>
              {edadMostrada}
            </div>
          )}
        </div>

        <div className="flecha_contenedor">
          <div className="flecha_imagen">
            {ordenAscendente ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
        </div>

        <div className="contenedor_cronologia">
          {cronologias1.map(
            (cronologia1, index) =>
              cronologia1.age && (
                <div
                  key={index}
                  className={`item ${
                    index % 2 === 0 ? "izquierda" : "derecha"
                  }`}
                >
                  <div className="crono_image">
                    <div className="contenido">
                      <div className="info">
                        <div className="crono_name">{cronologia1.name}</div>
                        <div className="crono_age">{cronologia1.age}</div>
                      </div>
                      <img
                        className="imagen_cronologia1"
                        src={cronologia1.image}
                        alt="foto_cronologia"
                      />
                    </div>
                    {index !== cronologias1.length - 1 && (
                      <div className="linea"></div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
