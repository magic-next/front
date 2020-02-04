import React from 'react';
import Link from 'next/link';

import * as S from './styled';
import RankingType from '../../../types/Ranking';

const Piece = ({ ranking }) => {
  const name = ranking.card.portugueseName || ranking.card.name;
  return (
    <S.RankingWrapper>
      <Link href={`/card/${ranking.card.slug}`}>
        <a>
          <S.CardWrapper
            version="normal"
            card={ranking.card}
          />
          <S.NameWrapper>{name}</S.NameWrapper>
          {ranking.count && (
            <S.TextWrapper>{`${ranking.count} decks`}</S.TextWrapper>
          )}
        </a>
      </Link>
    </S.RankingWrapper>
  );
};

Piece.propTypes = {
  ranking: RankingType.isRequired,
};

export default Piece;
