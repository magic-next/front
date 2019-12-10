import React from 'react';

import Summary from './Summary';
import CardsSection from '../CardsSection';

import * as S from './styled';
import CardDetailsType from '../../types/CardDetails';

const perc = (card) => parseFloat(card.perc)
  .toFixed(2)
  .replace('.', ',');

const Commander = ({
  card,
  decks,
  distribuition,
  top,
  commanders,
}) => (
  <S.CardWrapper>
    <Summary
      card={card}
      decks={decks}
      distribuition={distribuition}
    />
    {!commanders ? null : (
      <CardsSection
        cards={commanders}
        title="Top Comandantes"
        name={(cardData) => `${cardData.count} decks`}
      />
    )}
    <CardsSection
      cards={top}
      title="Cartas mais usadas"
      name={(cardData) => `Presente em ${perc(cardData)}%`}
    />
  </S.CardWrapper>
);

Commander.propTypes = CardDetailsType;

export default Commander;
