import styled from 'styled-components';
import styles from '../../../style.scss';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => `${(props.minWidth)}px`}, 1fr));
  grid-gap: 32px;
`;

export const Button = styled.button`
  margin: auto;
  display: flex;
  padding: 0.5em;
  height: 2.3rem;
  align-items: center;
  background-color: ${styles.scanrblueColor};
  border-radius: 8px;
  &:hover {
    background-color: ${styles.scanrgreyColor}
  }
  > p {
    color: white;
    margin: 0;
  }
  > i {
    color: white;
    font-size: 1.2em;
    margin-left: 16px;
  }
`;

export const Title = styled.h2`
  color: ${styles.scanrdeepblueColor}
  font-size: 1.3rem;
  padding-bottom: 0.75em;
  font-weight: bold;
  margin: 0;
`;

export const DescriptiveText = styled.p`
  color: ${styles.scanrgreyColor}
  font-size: 0.9rem;
  padding-bottom: 0.5em;
  margin: 0;
`;

export const Section = styled.div`
  background-color: aliceblue;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
`;

export const Separator = styled.div`
  background-color: ${props => (props.color ? styles[`${props.color}Color`] : styles.scanrelectricblueColor)};
  height: 3px;
  margin-left: 0;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  width: 15%;
`;

export const TitleLeft = styled(Title)`
  font-size: 1.8rem;
  padding: 0;
`;

export const Icon = styled.i`
  color: ${styles.scanrelectricblueColor}
  font-size: 2.5rem;
  padding-bottom: 0.5em;
`;
