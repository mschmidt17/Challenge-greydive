import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";


function Home() {
   
    const [data, setData] = useState([]);

    const getData = async () => {
      const response = await axios.get("data.json")
      return(response.data.items)
    } 
  
    useEffect(()=>{
      setData(getData())
      console.log(data)
    },[])

    
    return (
        <div className='home-container'>
                <h1> FORMULARIO </h1>
            <div className='card-container'>
            </div>
        </div>
  );
}

export default Home;