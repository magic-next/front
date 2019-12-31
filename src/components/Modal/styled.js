import styled from 'styled-components';

export const ModalWrapper = styled.section`
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
`;

export const ModalContentWrapper = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: .5rem;
`;
