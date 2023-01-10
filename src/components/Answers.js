import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';



function Answers() {

    const [datos, setDatos] = useState([]);

    const getData = async () => {
        const responseDB = await axios.get("https://greydive-2e644-default-rtdb.firebaseio.com/users.json")
        const cleanData = Object.entries(responseDB.data)
        const info = cleanData.map((e) => (e[1]))
        setDatos(info)
    } 

    useEffect(() => {
        getData()
    },[])
    
    return (
        <div className='answers-container'>
                <h1> RESPUESTAS </h1>

                <table>
                    <thead>
                        <tr className='table-header'>
                            <th className='columna-header'>Nombre</th>
                            <th className='columna-header'>Fecha de nacimiento</th>
                            <th className='columna-header'>Email</th>
                            <th className='columna-header'>Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(e =>
                            <tr key={e.uuid}>
                                <td className='columna-respuesta'> {e.full_name} </td>
                                <td className='columna-respuesta'> {e.birth_date} </td>
                                <td className='columna-respuesta'> {e.email} </td>
                                <td className='columna-respuesta'> {e.country_of_origin} </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Link to='/'>
                    <button>Completar otro formulario</button>
                </Link>
        </div>
    );
}

export default Answers;