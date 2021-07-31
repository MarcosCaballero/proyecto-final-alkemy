// Componente de Titulos secundarios en la página web

import './index.css';

const Title = (props) => {

    const { TextTitle } = props

    return (
        <div>
            <h2>
                { TextTitle }
            </h2>
        </div>
    );
}

export default Title;