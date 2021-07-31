import './index.css'

import React, { useEffect, useState } from "react";

import Title from "../Title";
import Button from '../Button'
import DeleteElementIncomes from "../DeleteElementIncomes";

const Api_URl = 'https://challenge-js-node-mysql.herokuapp.com/api/operaciones'
let className = 'operation-element'

const ModalElement = (props) => {
    
    const { validador,  TitleElementList } = props //El validador lo que hace es validar el tipo de dato, entre expense e income que el usuario quiere que se muestre en el componente

    // const [ refreshPage, setRefreshPage ] = useState(false) // Esta funcion actualmente se encuentra sin uso

    const [selectedElement, setSelectedElement] = useState(null) //Este valor nos va a servir para poder hacer que el usuario elija un valor para que este pueda ser modificado o eliminado si el usuario quiere
    const [ incomes, setIncomes ] = useState([])
    const [ expenses, setExpenses ] = useState([])

    const [ error, setError ] = useState(false)

    //useEffect para cargar datos

    useEffect(() => {
        LoadData()    
    }, []) //En teoria la pagina tendria que renderizar la pagina cuando existan cambios en el refresh page para que el usuario despues de crear un elemento pueda verlo reflejado al instante
    
    const LoadData = async () => { //Con esta funcion llamamos los datos a la api además filtramos la informacion en income e expense y los asignamos a los useStates para el siguiente paso
        try {
            const response = await fetch(Api_URl)
            const serverResponse = await response.json()
            const dataIncomes = await serverResponse.filter((data) => {
                if(data.type === 'income'){
                    return data
                } 
            })
            const dataExpenses = await serverResponse.filter((data) => {
                if(data.type === 'expense'){
                    return data
                }
            })
            setIncomes(dataIncomes)
            setExpenses(dataExpenses)
        } catch (error) { 
            await console.log(error)
            setError(true) //Aca seteamos el error en true para mostrar que ocurrio un error al usuario
        }
    }

    const addClass = async (element) => { //Esta funcion lo que hace es que cuando el usuario le de click a un elemento este se va a mostrar resaltado ademas el id del elemento se va a asignar a una variable la cual va a ser pasada a otro componente con el cual va a poder eliminar un elemento o modificarlo
        if(selectedElement === null || selectedElement !== element.id) { //Esta primera condicion verifica si la variable tiene algun dato, de no contener esta se ejecuta en true y en el caso de contener algun dato pero este al no ser igual al id del elemento clickeado va a ejecutar en true y este valor sera actualizado
            setSelectedElement(element.id)
        } else if(selectedElement === element.id) { //Esta condicion va a evaluar si el usuario esta seleccionnando el mismo elemento, de ser true este va a defaultear la variable y le va a quitar la clase selected
            setSelectedElement(null)
            className = 'operation-element'
        } else {
            console.log('Ya has seleccionado este elemento')
        }
    }

    const IncomesElement = incomes.map((element) => { //Con este elemento creamos un nuevo array con los elementos incomes listos para renderizar en el DOM
        return(
                <li className={`${ className } ${selectedElement === element.id ? 'selected' : ''}`} key={element.id} onClick={() => {
                    addClass(element) }}>
                    <span>{element.concept}</span>
                    <span>{element.amount}</span>
                </li>
        )
    })

    const ExpensesElement = expenses.map((element) => {//Con este elemento creamos un nuevo array con los elementos expenses listos para renderizar en el DOM
        return(
                <li className={`${ className } ${selectedElement === element.id ? 'selected' : ''}`} key={`${element.id} `} onClick={() => {
                    addClass(element) }}>
                    <span>{element.concept}</span>
                    <span>{element.amount}</span>
                </li>
        )
    })
    
    const prueba = () => { //Esta funcion lo que hace es verificar que el useState de incomes contenga datos, de ser asi retornaria una funcion con los datos renderizados
        if(validador === "incomes") {
            if(incomes !== []) {
                return IncomesElement                
            } else {
                return
            }
        }else if( validador === 'expenses') {
            if(expenses !== []) {
                return ExpensesElement
            } else {
                return
            }
        } else {
            return console.log('No hay datos')
        }    
    }

    return(
        <div>
           <div className="operations-container--container-list" >
                <div className="operations-container--container-list---container">
                    <Title TextTitle={ TitleElementList } />
                    <div className="operations-container--container-list---container-options">
                        <Button buttonText="Modify Element" buttonClass="put"/> 
                        <DeleteElementIncomes buttonText="Delete Element" buttonClass="delete" selectedElement={selectedElement} /> {/* Con la propiedad de selectedElement le pasamos el elemento seleccionado por el usuario al componente delete para que este ejecute la eliminacion del componente si el usuario asi lo desea */}
                    </div>
                </div>
                <div style={{width:'calc(100% - 40px)'}}>
                    <ul >
                        { error === false ? prueba() : <div><h3>El servidor no responde</h3><p>Recarga la página en unos minutos</p><li className="preloader"></li></div>} {/*Si hay un error y no se logra una llamada al servidor con exito lo que hará es mostrar un state loading hasta que se soluciune el problema*/}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ModalElement