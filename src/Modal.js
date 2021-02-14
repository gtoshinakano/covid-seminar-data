import React from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, ModalContent} from './StyledTooltip'

const Modal = props => {
    return ReactDOM.createPortal(
        <Dimmer onClick={() => props.onClose(false)}>
            <ModalContent>
                Modal Content
            </ModalContent>
        </Dimmer>,
        document.querySelector('#modal')
    );
};

export default Modal;