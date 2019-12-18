
import styled from 'styled-components';

export const Separator = styled.div`
  background-color: ${props => (props.color ? styles[`${props.color}Color`] : styles.scanrelectricblueColor)};
  height: 5px;
  margin-left: 0;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  width: 25%;
`;
