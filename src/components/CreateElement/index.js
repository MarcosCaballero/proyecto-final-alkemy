import './index.css'

import React, { useEffect, useState } from "react";
import Button from "../Button";
import ModalAction from "../ModalAction";
import Title from "../Title";

const Api_URl = "https://challenge-js-node-mysql.herokuapp.com/api/operaciones"

const CreateElement = (props) => {
    
    const { buttonText, buttonClass } = props 

    const [ visible, setVisible ] = useState(false) //Esta State nos sirve para mostrar el modal del formulario create al usuario
    const [ visibleTemp, setVisibleTemp ] = useState(false)

    const onButtonClick = () => { //Con esta funcion muestro cambio el valor de visible para mostrarle el formulario al usuario
        setVisible(true) 
    }
    
    const [elementCreated, setElementCreated ] = useState(false)
    const [concept, setConcept ] = useState('') // Variable para el concepto de la operacion / Valor String
    const [ amount, setAmount ] = useState(0) // Variable para el monto de la operacion / Valor numerico
    const [ date, setDate ] = useState(null) // Variable para la fecha de creacion / Valor String
    const [ type, setType ] = useState(null) //Variable para el tipo de operacion / Valor String
    
    useEffect(() => { //Con este useEffect hacemos que la pagina se recargue luego del que usuario cree un elemento
        if(elementCreated){
            setVisibleTemp(true) 
        }
    }, [elementCreated])
    
    const onClose = async () => { //Esta funcion sirve para que el usuario cierre el formulario luego de que creo un elemento o si decide no crear uno / Ademas devuelve todos los valores a estados iniciales o defualt
        if(setVisibleTemp === true) {
            setVisibleTemp(false)
            setVisible(false)
            setConcept('')
            setAmount(0)
            setDate(null) 
            setType(null)                
        } else {
            setVisible(false)
            setConcept('')
            setAmount(0)
            setDate(null) 
            setType(null)                
        }        
    }

    const handleChange = async e => { //Esta funcion lo que hace es que cuando el usuario esta esribiendo alguna informacion que quiera guardar el escuchador va a ir actualizando los distintos campose dependiendo si cumplen con las condiciones o no
        if(e.target.name === 'concept'){
            setConcept(e.target.value)
        } else if(e.target.name === 'amount'){
            setAmount(e.target.value)
        } else if(e.target.name === 'date'){
            setDate(e.target.value)
        } else if(e.target.name === 'type'){
            setType(e.target.value)
        }
    }

    const onSend = async (e) => { //Funcion para realiar la peticion de tipo post e impactar los datos en la base de datos
        e.preventDefault() //Esta funcion de aca previene que el evento recargue la pagina
        const response = await fetch(Api_URl, { //Peticion a la base de datos
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json', 
            },
            body: JSON.stringify({ concept, amount, date, type })
        })
        const response2 = await response.status
        if(response2 === 201){
            console.log('creado') 
            setElementCreated(true)
        } else {
            console.log('Algo salio mal')
        }
    }
    
    return(
        <div>
            <Button buttonText={ buttonText } buttonClass={ buttonClass } onClick={ onButtonClick } /> 
            <ModalAction visible={ visible } onClose={() =>  onClose() }>
                <Title titleText="Crear elemento"/> 
                <div>
                    <form className="create-form" >
                        <label>Concept</label>
                        <input 
                            className="input-value"
                            name="concept"
                            type="text"
                            placeholder="Bills, Taxes"
                            onChange={handleChange}
                            required
                        />
                        <label>Amount</label>
                        <input 
                            className="input-value"
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            required
                        />
                        <label>Date</label>
                        <input 
                            className="input-value"
                            name="date"
                            type="date"
                            placeholder="Set Time"
                            onChange={handleChange}
                            required
                        />
                        
                        <select onChange={handleChange} className="input-value" required name="type">
                            <option>Choose one value</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <input type="submit" onClick={(e) => onSend(e) }/>
                    </form>
                </div>
                <ModalAction visible={ visibleTemp } onClose={() =>  onClose() }> {/* Con esto le mostramos al usuario que su elemento se creo con exito */}
                    <div>Elemento Creado con exito</div>
                </ModalAction>
            </ModalAction>
        </div>
    );
}

export default CreateElement

