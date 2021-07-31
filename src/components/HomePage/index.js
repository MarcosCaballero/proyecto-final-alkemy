//stylesheet
import './index.css';

import React from 'react';

// components 
import Title from '../MainTitle'
import ModalElement from '../ModalElement';
import CreateElement from '../CreateElement';
//Componente primario de toda la aplicación, Todo lo que se muestra por pantalla se tiene que colocar aqui dentro.

const HomePage = () => {
    
    return (
        <div className="main-container-app">
            <Title TextTitle="Vitual wallet"/>
            <div>
                <ModalElement TitleElementList="Incomes List" validador="incomes"  />
                <ModalElement TitleElementList="Expenses List" validador="expenses" />
            </div>
            <CreateElement buttonText="Crear Elemento" buttonClass="create" />
        </div>
    );
}

export default HomePage;
