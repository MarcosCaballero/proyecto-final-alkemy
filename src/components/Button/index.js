//stylesheet
import './index.css'
//components
import React from 'react'

const Button = (props) => {

    const { buttonText, buttonClass, onClick} = props;

    const onClickHandler = () => {
        onClick && onClick();
         // Esto sirve para validar que se hizo un click y lo que hara en consecuencia va a hacer que se ejecute el click y para que la app no falle

    }



    // if(modify){
        
    // }

    return (
        <div className={ `form-button ${ buttonClass }` }  onClick={() => onClickHandler()}>
            { buttonText }
        </div>
    );
}

export default Button;