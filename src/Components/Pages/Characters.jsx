import Navega from '../Core/Navega'
import React, {useState, useEffect } from "react";
import axios from 'axios';
import CharactersDetails from './CharactersDetails';
import './Characters.css';
import { Link } from 'react-router-dom';


const Characters = () => {
  const[characters, setCharacters]= useState([]);
  const[selectedCharacter, setSelectedCharacter]= useState(null);
  const [searchTerm, setSearchTerm]=useState('')

  useEffect(()=>{
    const fetchCharacters= async()=>{
      try{
        const response = await axios.get("https://game-of-thrones-json-server.vercel.app/characters")
        console.log(response)
        setCharacters(response.data)
    }catch(error){
      console.log("Error al obtener los personajes")
    }
    };
    fetchCharacters();
},[]);

const handleCharacterClick=(character)=>{
  setSelectedCharacter(character);
}

const filteredCharacter= characters.filter((character)=>
character.name.toLowerCase().includes(searchTerm.toLowerCase())
)
const handleSearchChange=(event)=>{
  setSearchTerm(event.target.value);
}


  return (
    <div className='background'>
      <h1>BIENVENIDO A CHARACTERES</h1>
      <Navega></Navega>
      <div className='lupaybuscador'>
      <img className='lupa' src='https://baam.es/Imagenes/buscar.png' alt='lupa'/>
    <input type='text'
    placeholder='Buscar personaje'
    className='buscador'
    value={searchTerm}
    onChange={handleSearchChange}/>
     </div>

      <div className='conjunto-images'>
        {filteredCharacter.map((character)=>(
          <div className='all-images' key={character.id}  >
          
          <Link to = {`/personajes/${character.id}`}>
            <img className='personaje' src={character.image} alt='/' onClick={()=>handleCharacterClick()}/>
            <h4>{character.name}</h4>
            </Link>

            <div className='hover'>
            <h4>{character.name}</h4>
            </div>
          </div>
        ))};
      </div>
      {selectedCharacter && (<CharactersDetails character={selectedCharacter}/>)}
    </div>
  );
}

export default Characters
