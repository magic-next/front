import styled from 'styled-components';
import media from 'styled-media-query';

import CardSymbols from '../../CardSymbols';

export const SummaryWrapper = styled.section`
  display: grid;
  ${media.greaterThan('medium')`
    grid-template-columns: 4fr 4fr 4fr;
  `}
  grid-column-gap: 1rem;
  margin-bottom: 2rem;
`;

export const FlavorWrapper = styled.em`
  margin: 2rem 0;
  font-family: "MPlantin", Georgia, "Times New Roman", serif;
`;

export const SymbolWrapper = styled(CardSymbols)`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 .25rem .25rem 0;
  font-size: 1.4rem;
`;

export const ImageWrapper = styled.div`
  text-align: center;
  img {
    box-shadow: 0 0 10px -1px #333;
    border-radius: 12px;
    background-color: black;
    width: 80%;
    margin: auto;
    ${media.greaterThan('medium')`
      width: 100%;
    `}
  }
  p {
    margin-top: .5rem;
    font-size: 1.4rem;
  }
`;

export const BottomWrapper = styled.span`
  font-weight: 500;
`;

export const TextWrapper = styled.article`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  .title {
    ${media.lessThan('medium')`
      text-align: center;
    `}
  }
  em {
    font-style: italic;
  }
  p {
    margin-top: 1rem;
    line-height: 1.8rem;
  }
  h4 {
    margin: 0 0 1rem 0;
  }
`;