import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { saveInDB } from "../Firebase.js"

function Home() {

    const [data, setData] = useState([]);
    const getData = async () => {
        const response = await axios.get("data.json")
        setData(response.data.items)
    } 

    useEffect(() => {
        getData()
    },[])
    
    var i= 0;
    const [input, setInput] = useState({ 
        uuid: uuidv4(),
        full_name: "",
        email: "",
        birth_date:"",
        country_of_origin: "",
        terms_and_conditions: false
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        }); 
    };

    
    const handleSelect = (e) => {
        setInput({
            ...input,
            country_of_origin: input.country_of_origin.includes(e.target.value)
            ? input.country_of_origin
            : [...input.country_of_origin, e.target.value],
        });
    };
    
    const handleCheckbox = (e) => {
        setInput({
            ...input,
            [e.target.name]: !e.target.checked,
        }); 
    };
        

    function handleSubmit(e) {
		e.preventDefault();
		saveInDB(input);
        setInput({ 
            full_name: "",
            email: "",
            birth_date:"",
            country_of_origin: "",
            terms_and_conditions: false
        });
        
	}

    return (
        <div className='home-container'>
            <h1> FORMULARIO </h1>
            <form className='card-container' onSubmit={(e) => handleSubmit(e)}>
                { data.length > 0 ? data.map((e) => {
                    
                return(
                    <div className="item" key={i++}>
                        {
                            e.type === "select" ? 
                            <div>
                                <label className="label"> {e.label} </label>
                                <select className="inputCreate" defaultValue="Select" onChange={(e) => handleSelect(e)}>
                                <option disabled>Select</option>
                                    {e.options?.map((e) => (<option className="select" value={e.value} key={e.label}> {e.label} </option>))}
                                </select>
                            </div>
                        :
                            e.type === "submit" ? 
                            <button>{e.label}</button>
                        :
                            e.type === "checkbox" ?
                            <div>
                                <label className="label"> {e.label} </label>
                                <input
                                    className="inputCreate"
                                    type={e.type}
                                    name={e.name}
                                    required={e.required}
                                    checked={input.name}
                                    onChange={(e) => handleCheckbox(e)}
                                />    
                            </div> 
                        :
                            <div>
                                <label className="label"> {e.label} </label>
                                <input
                                    className="inputCreate"
                                    type={e.type}
                                    name={e.name}
                                    value={input.name}
                                    required={e.required}
                                    placeholder={e.label}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>   
                        }
                    </div>
                )})
                : null }
            </form>
        </div>
  );
}

export default Home;