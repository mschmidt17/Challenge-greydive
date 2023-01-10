import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { saveInDB } from "../Firebase.js";
import {validate} from "./validate.js";
import swal from 'sweetalert';
import {BsArrowDownShort, BsArrowUpShort, BsCheck} from "react-icons/bs";
import Footer from './Footer.js';
import "./CSS/home.css"


function Home() {
    const navigate = useNavigate()
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

    const [errors, setErrors] = useState(validate(input));

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    };

    
    const handleSelect = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            country_of_origin: e.target.value,
        });
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    };
    
    const handleCheckbox = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: !e.target.checked,
        }); 
        setErrors(validate({...input, [e.target.name]: e.target.checked}));
    };
        

    const handleSubmit = (e) => {
		e.preventDefault();
        if (input.full_name !== '' && input.email !== '' && input.birth_date !== '' && input.country_of_origin !== '') {
            saveInDB(input);
            setInput({ 
                full_name: "Juan Perez",
                email: "juan.perez@gmail.com",
                birth_date:"",
                country_of_origin: "",
                terms_and_conditions: false
            });
            swal({
                text: "Registro creado correctamente!",
                icon: "success",
                buttons: {
                    cancel: {
                    text: "Completar otro",
                    value: null,
                    visible: true,
                    className: "btn-modal-close",
                    closeModal: true,
                    },
                    confirm: {
                    text: "Ver respuestas",
                    value: true,
                    visible: true,
                    className: "btn-modal-answers",
                    closeModal: true
                    }
                    }
            })
              .then((show) => {
                if (show) {
                    navigate("/answers")
                } 
            });
        } else {
            swal("", "Debes completar todos los campos para continuar", "warning");
        }
        
	}

    const handleClickScroll = (e, id) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if(element) {
            element.scrollIntoView({behavior:"smooth"})
        }
    }

    const handleClickScrollBack = (e, id) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if(element) {
            element.scrollIntoView({behavior:"smooth"})
        }
    }


    return (
        <div className='home-container'>
            <img src="https://uploads-ssl.webflow.com/612fcc289671bc539ecd004e/612ff6936ef1a98f2a9b29cf_logo-greydive-gris.png" className="img-grey" alt="greydive" />
            
            <div  id="top" className='question'> 
                <button className='btn-formulario' onClick={(e) => handleClickScroll(e, "full_name")}> Completar formulario </button>
            </div>

            <form className='card-container' onSubmit={(e) => handleSubmit(e)}>
                { data.length > 0 ? data.map((e) => { 
                return(
                    <div className="item" key={i++}>
                        {
                            e.type === "select" ? 
                            <div id={e.name} className='question'>
                                <label className="label"> {e.label} </label>
                                <select className="inputCreate" defaultValue="Select" onChange={(e) => handleSelect(e)}>
                                <option className="select" disabled>País</option>
                                    {e.options?.map((e) => (<option className="select" value={e.value} key={e.label}> {e.label} </option>))}
                                </select>
                                <br></br>
                                <div className='bottom-input-container'>
                                    {errors.country_of_origin && ( <span className='error'>{errors.country_of_origin}</span>)} 
                                    <button className='button' onClick={(e) => handleClickScroll(e, "terms_and_conditions")}> Aceptar <BsCheck/> </button>
                                
                                    <div className='buttons-next-back'>
                                        <button className='btn-prev' onClick={(e) => handleClickScrollBack(e, "birth_date")}> <BsArrowUpShort className='icon-arrow'/> </button>
                                        <button className='btn-next' onClick={(e) => handleClickScroll(e, "terms_and_conditions")}> <BsArrowDownShort className='icon-arrow'/> </button>
                                    </div>
                                </div>
                            </div>
                        :
                            e.type === "submit" ? 
                            <div className='submit-container'>
                                <button className='btn-formulario'>{e.label}</button>
                                <div className='buttons-next-back'>
                                    <button className='btn-prev' onClick={(e) => handleClickScrollBack(e, "country_of_origin")}> <BsArrowUpShort className='icon-arrow'/> </button>
                                    <button className='btn-next' disabled> <BsArrowDownShort className='icon-arrow'/> </button>
                                </div>
                            </div>
                        :
                            e.type === "checkbox" ?
                            <div>
                                <div id={e.name} className="checkbox-container">
                                    <label className="label-checkbox"> {e.label} </label>
                                    <input
                                        className=""
                                        type={e.type}
                                        name={e.name}
                                        required={e.required}
                                        checked={input.name}
                                        onChange={(e) => handleCheckbox(e)}
                                    />  
                                </div> 
                                {errors.terms_and_conditions && ( <span className='error-checkbox'>{errors.terms_and_conditions}</span>)}   
                            </div>
                        :
                            <div id={e.name} className='question'>
                                <label className="label"> Por favor ingresa tu {e.label.toLowerCase()} </label>
                                <input
                                    className="inputCreate"
                                    type={e.type}
                                    name={e.name}
                                    value={input.name}
                                    required={e.required}
                                    placeholder={e.label}
                                    onChange={(e) => handleChange(e)}
                                />
                                <br></br>
                                {e.name === "full_name" ?
                                    <div className='bottom-input-container'>
                                        {errors.full_name && ( <span className='error'>{errors.full_name}</span>)}
                                        <button className='button' onClick={(e) => handleClickScroll(e, "email")}> Aceptar <BsCheck/> </button>
                                        <div className='buttons-next-back'>
                                            <button className='btn-prev' disabled> <BsArrowUpShort className='icon-arrow'/> </button>
                                            <button className='btn-next' onClick={(e) => handleClickScroll(e, "email")}> <BsArrowDownShort className='icon-arrow'/> </button>
                                        </div>  
                                    </div>
                                : e.name === "email" ?
                                    <div className='bottom-input-container'>
                                        {errors.email && ( <span className='error'>{errors.email}</span>)}
                                        <button className='button' onClick={(e) => handleClickScroll(e, "birth_date")}> Aceptar <BsCheck/> </button>
                                        <div className='buttons-next-back'>
                                            <button className='btn-prev' onClick={(e) => handleClickScrollBack(e, "full_name")}> <BsArrowUpShort className='icon-arrow'/> </button>
                                            <button className='btn-next' onClick={(e) => handleClickScroll(e, "birth_date")}> <BsArrowDownShort className='icon-arrow'/> </button>
                                        </div>                                    
                                    </div>
                                : <div className='bottom-input-container'>
                                    {errors.birth_date && ( <span className='error'>{errors.birth_date}</span>)}
                                    <button className='button' onClick={(e) => handleClickScroll(e, "country_of_origin")}> Aceptar <BsCheck/> </button>
                                    <div className='buttons-next-back'>
                                        <button className='btn-prev' onClick={(e) => handleClickScrollBack(e, "email")}> <BsArrowUpShort className='icon-arrow'/> </button>
                                        <button className='btn-next' onClick={(e) => handleClickScroll(e, "country_of_origin")}><BsArrowDownShort className='icon-arrow'/> </button>
                                    </div>                                 
                                </div>
                                } 
                                
                            </div>   
                        }
                    </div>
                )})
                : null }
            </form>
            <Footer/>
        </div>
  );
}

export default Home;