import './index.css'
import React from 'react';


const ModalAction = (props) => {
    
    const { visible, children, onClose } = props

    const onCloseHandler = () => {
        onClose && onClose()
    }

    if(visible){
        return(
            <div className="Operations-Modal-container">
                <div className="Operations-Modal">
                    <div className="Operations-Modal--close-icon" onClick={() => onCloseHandler()}></div>
                    { children }
                </div>
                <div className="Operations-Modal-Overlay"></div>
            </div>
        )
    } else {
        return null
    }
}

export default ModalAction