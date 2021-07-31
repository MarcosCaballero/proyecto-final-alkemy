// Componente de titulo principal en la pagina web

import './index.css';

const MainTitle = (props) => {

    const { TextTitle} = props

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                { TextTitle }
            </h1>
        </div>
    );
}

export default MainTitle;
