import React from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, Modal, ModalContent, ModalNav} from './StyledTooltip'
import {CloseO} from '@styled-icons/evil/CloseO'
import DisplayContent from './DisplayContent'

const ModalComponent = props => {
    return ReactDOM.createPortal(
        <Dimmer onClick={() => props.onClose(false)}>
          <Modal>
            <ModalNav onClick={() => props.onClose(false)}>
              <div className="close">
                <CloseO size={20} />
              </div>
            </ModalNav>
            <ModalContent>
              <DisplayContent content={props.content} />
            </ModalContent>
          </Modal>
        </Dimmer>,
        document.querySelector('#modal')
    );
};

export default ModalComponent;