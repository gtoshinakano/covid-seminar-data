import React from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, Modal, ModalContent, ModalNav} from './StyledTooltip'
import {CloseO} from '@styled-icons/evil/CloseO'

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
              teste
            </ModalContent>
          </Modal>
        </Dimmer>,
        document.querySelector('#modal')
    );
};

export default ModalComponent;