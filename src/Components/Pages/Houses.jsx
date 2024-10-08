import React, { useEffect, useState } from 'react'
import Navega from '../Core/Navega'
import axios from 'axios';
import './Houses.css';
import { Link } from 'react-router-dom';
import DetailsHouses from './DetailsHouses';

const Houses = () => {

    const[houses,setHouses]= useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);

    useEffect(() => {
      const fetchHouses = async () => {
        try {
          const llamada = await axios.get('http://localhost:3000/Houses')
            console.log(llamada)

            setHouses (llamada.data)
          }
          catch (error) { console.log ("Error")}
      };
      
      fetchHouses();
    },[]);

    const handleHouseClick = (house)=>{
      setSelectedHouse (house);
    };



  return (
    <div className='housesPage'>
      <h1>BIENVENIDO A HOUSES</h1>
      <Navega></Navega>
      <div className='houses'>
        {houses.map ((house,index) => (
          <div key = {index} className='houses-object'> 
            <Link to = {`/houses/${house.id}`}>
            <img className='houseImage' src={house.image} alt='imagen no encontrada' onClick={() => handleHouseClick ()}></img>
            <h3 className='houseType'> {house.name}</h3> </Link>
            
          </div>
        ))}
      </div>
      {selectedHouse && (<DetailsHouses house={selectedHouse}/>)}
    </div>
  )
}

export default Houses
