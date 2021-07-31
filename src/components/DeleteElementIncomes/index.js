import React, { useState, useEffect } from "react";
import Button from "../Button";
import ModalAction from "../ModalAction";
import Title from "../Title";

const DeleteElementIncomes = (props) => {
    
    const { buttonText, buttonClass, selectedElement} = props

    const [ visible, setVisible ] = useState(false) //Este State nos sirve para poder mostrar el modal de confimacion de eliminacion de objeto
    const [ aprobation, setAprobation] = useState(false) //Este State nos sirve para poder verificar si el usuario en verdad quiere eliminar un elemento o quiere cancelar la operacion
    
    const onButtonClick = async () => {
        if(selectedElement === null || selectedElement === undefined){
            await console.log('Elije un elemento a eliminar')
        } else {
            setVisible(true)
        }
    }
    
    const onClose = () => {
        setVisible(false)
        setAprobation(false)
    }

    useEffect(() => {
        const deletePetition = async () => {
            const response = await fetch(`https://challenge-js-node-mysql.herokuapp.com/api/operaciones/${ selectedElement }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }})
            const definiteResponse = await response.status
            await console.log(definiteResponse)
        }
        if(selectedElement !== null && aprobation === true){
            deletePetition()
            onClose()
        }

    }, [selectedElement, aprobation])

    const deleteElement = () => { //Con este el elemento se borra
        setAprobation(true)
    }

    const onAbort = async () => { //Este nos sirve para cancelar la operacion de borrar un elemento
        await onClose()
    }
    
    return(
        <div>
            <Button buttonText={ buttonText } buttonClass={ buttonClass } onClick={ onButtonClick } /> 
            <ModalAction visible={ visible } onClose={ onClose }>
                <Title TextTitle="¿Estas seguro de querer eliminarlo?"/> 
                <div className="Delete Element">
                    <form>
                        <Button buttonText={ 'Aceptar' } buttonClass='create' onClick={() => deleteElement() }/>
                        <Button buttonText={ 'Rechazar' } buttonClass={ buttonClass }  onClick={() => onAbort()}/>
                    </form>
                </div>
            </ModalAction>
        </div>
    );
}

export default DeleteElementIncomes

