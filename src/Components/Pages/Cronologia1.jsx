

import "./Cronologia1"
import Navega from "../Core/Navega";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Cronologia1() {
  const [cronologias1, setCronologias1] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true); // asi muestro el orden ascendente o descendente
  const [edadMostrada, setEdadMostrada] = useState("20"); // asi muestro la edad más joven o más vieja


  useEffect(() => {
    const getCharacters = async () => {
      const response = await axios.get("http://localhost:3000/characters");
      console.log(response);
      setCronologias1(response.data);
    };
    getCharacters();
  }, []);


  const ordenarAge = () => {
    // Creamos una copia de las cronologías para no modificar el estado directamente
    const cronologiasOrdenadas = [...cronologias1];
    //usa el sort siempre que quieras ordenar
    cronologiasOrdenadas.sort((a, b) => {
      if (ordenAscendente) {
        return a.age - b.age; 
      } else {
        return b.age - a.age; 
      }
    });
    setCronologias1(cronologiasOrdenadas);
    
setOrdenAscendente(!ordenAscendente); // Cambiamos el estado para cambiar el orden la próxima vez

  // Calculamos la edad mostrada
  const edades = cronologiasOrdenadas.map(cronologia => cronologia.age);


  //SI USO FILTROOOOOO
//   const edadesFiltradas = edades.filter(edad => edad > 0);//tengo que usar filtro o me detecta 0 y al usar match min de devuelve 0 
  //TAMBIEN PEUOD INICIAR EL ESTADO CON 20 pero ME PODRIA SACAR OTRO MENORES DE ESA EDAD
  //O PODRIA PODER TAMBIEN QUE ME PINTE SOLO SI LA EDAD ES MAYOR DE 20 O 15 .. QUE NO SEA 0 PARA QUE VALGA EL MATCH
// const edadMostradaCalculada = ordenAscendente ? Math.min(...edadesFiltradas) : Math.max(...edadesFiltradas);

//SINO USO FILTRO00

const edadMostradaCalculada = ordenAscendente ? Math.min(...edades) : Math.max(...edades);
setEdadMostrada(edadMostradaCalculada === 0 ? "20" : edadMostradaCalculada); //obligo que mi arary sea 20 asi no me da 0

};
 {/* condicional sin filtromas dificil.... de pensar */}
        {/* condicional si usas filtro  {ordenAscendente.age>15&& 
        <div className="circulo_numero" onClick={ordenarAge}>{edadMostrada}</div>} mas facil de pensar*/}
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
        <div className="flecha_imagen_abajo">
        {ordenAscendente ? <FontAwesomeIcon icon={faChevronUp} /> : null}
        </div>
        <div className="flecha_imagen_arriba">
        {!ordenAscendente ? <FontAwesomeIcon icon={faChevronDown} /> : null}
        </div>
    </div>
      <div className="contenedor_cronologia">
      {cronologias1.map((cronologia1, index) => (

       
    cronologia1.age && <div key={index} className={`item ${index % 2 === 0 ? "izquierda" : "derecha"}`}>
      <div className="crono_image">
        <div className="contenido">
          <div className="info">
            <div className="crono_name">{cronologia1.name}</div>
            <div className="crono_age">{cronologia1.age}</div>
          </div>
          <img className="imagen_cronologia1" src={cronologia1.image} alt="foto_cronologia" />
        </div>
        {index !== cronologias1.length - 1 && (
          <div className="linea"></div>
        )}
      </div>
    </div>
        ))}
      </div>
      </div>
    </>
    
  );
}
