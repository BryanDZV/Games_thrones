import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CharactersDetails.css";
// import Rutas from '../Core/Rutas';
import { useNavigate } from "react-router-dom";

const CharactersDetails = () => {
  const [character, setCharacter] = useState([]);
  const [houses, setHouses] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      const characterApi = await fetch(
        `https://game-of-thrones-json-server.vercel.app/characters/${id}`
      );
      const characterJson = await characterApi.json();
      console.log(characterJson);
      console.log(id);
      setCharacter(characterJson);
      const housesApi = await fetch(
        `https://game-of-thrones-json-server.vercel.app/houses/${characterJson.house}`
      );
      const housesJson = await housesApi.json();
      setHouses(housesJson[0]);
    };

    getCharacters();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="characterDetails_contenedor_general">
      <div className="character-details">
        <h3 className="nombre-personaje">{character.name}</h3>
        <img
          className="imagen-personaje"
          src={character.image}
          alt={character.name}
        />
        <h3>{character.name}</h3>
        <ul>
          <div className="otros-detalles-characters">
            <img src={houses} alt={houses} />
            <p>{character.parents}</p>
            <p>{character.siblings}</p>
            <p>{character.titles}</p>
            <p>{character.alliances}</p>
            <p>{character.episodes}</p>
            <p>{character.age}</p>
          </div>
        </ul>
      </div>
      <div>
        <button onClick={goBack} class="ov-btn-slide-top">
          Volver atrás
        </button>
      </div>
      <p>g</p>
    </div>
  );
};
export default CharactersDetails;
