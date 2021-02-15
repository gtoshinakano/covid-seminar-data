import styled from 'styled-components'

export const StyledTooltip = styled.div`
  background-color: rgb(255,255,255,0.9);
  padding: 5px 10px;
  border: 1px solid #ccc;
  ul{padding: 0; margin: 0;}
  ul li{padding: 0; margin: 0; list-style-type: none;}
`

export const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0,0,0,0.6);
`

export const Modal = styled.div`
  background-color: white;
  min-width: 95%;
  min-height: 95%;
  transform: translate(-50%,-50%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
`

export const ModalNav = styled.div`
  width:100%;
  
  .close{
    float: right;
    margin: 3px 4px 0;
  }
`
export const ModalContent = styled.div`
  flex-grow:1;
`