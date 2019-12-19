import styled from 'styled-components';
import styles from '../../../style.scss';

export const DatabaseText = styled.p`
  color: white;
  margin: 0;
  font-size: 0.9rem;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
`;

export const ChevronContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  align-items: center;
  margin-left: calc(2em - 4px);
  background-color: white;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    margin-left: 0;
    margin-bottom: calc(1em - 4px);
  }
`;

export const Chevron = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5em 2em;
  margin-left: calc(4px - 2em);
  background-color: ${styles.scanrdeepblueColor};
  -webkit-clip-path: polygon(0 0, calc(100% - 2em) 0, 100% 50%, calc(100% - 2em) 100%, 0 100%, 2em 50%);
  clip-path: polygon(0 0, calc(100% - 2em) 0, 100% 50%, calc(100% - 2em) 100%, 0 100%, 2em 50%);
  &:hover {
    background-color: ${styles.scanrelectricblueColor};
  }
  @media (max-width: 650px) {
    -webkit-clip-path: polygon(0 0, 0 calc(100% - 1em), 50% 100%, 100% calc(100% - 1em), 100% 0, 50% 1em);
    clip-path: polygon(0 0, 0 calc(100% - 1em), 50% 100%, 100% calc(100% - 1em), 100% 0, 50% 1em);
    padding: 1em 2em;
    margin-bottom: calc(4px - 1em);
  }

`;

export const ChevronStart = styled(Chevron)`
  -webkit-clip-path: polygon(0 0, calc(100% - 2em) 0, 100% 50%, calc(100% - 2em) 100%, 0 100%, 0 50%);
  clip-path: polygon(0 0, calc(100% - 2em) 0, 100% 50%, calc(100% - 2em) 100%, 0 100%, 0 50%);
`;

export const ChevronEnd = styled(Chevron)`
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 2em 50%);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 2em 50%);
`;
