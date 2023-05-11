import React from 'react'
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

/* TODO: check how to optimize loading of movieList
 * or modify modal to display "one" movie details
*/

const Modal = ({isOpen, setModalOpen, children}) => {

  if (isOpen) {
    return (
      <BackgroundStyle>
        <ModalStyle>
          <ChildrenWrapper>
            {children}
          </ChildrenWrapper>
          <CloseButton onClick={setModalOpen}>
            <MdClose />
          </CloseButton>
        </ModalStyle>
      </BackgroundStyle>
    );
  }
}

export default Modal;

const BackgroundStyle = styled.div`
  position: fixed;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
`;

const ModalStyle = styled.div`
 box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 100%;
  max-height: 900px;
  overflow-y: auto;
  padding: 20px;
  padding: 50px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.125);
  filter: drop-shadow(0 30px 10px rgba(0,0,0,0.125));
  border-radius: 5px;

`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  & > * {
    flex: 1 0 200px;
    margin: 0 10px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 40px;
  right: 100px;
  cursor: pointer;
  font-size: 38px;
  color: var(--color-primary-5);
`;


