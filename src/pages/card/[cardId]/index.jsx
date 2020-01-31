import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import CardStats from '@/components/CardStats';

import CardsService from '@/services/cards';
import { commander } from '@/services/ranking';
import CardDetailsType from '@/types/CardDetails';
import ApiContext from '@/contexts/Api';

const CardPage = ({
  card,
  decks,
  distribuition,
  top,
  commanders,
  mode,
  isCommander,
  apiUrl,
  ...topTypes
}) => (
  <ApiContext.Provider value={apiUrl}>
    <Layout title={`${card.name}`}>
      <Container>
        <CardStats
          distribuition={distribuition}
          card={card}
          decks={decks}
          top={top}
          topTypes={topTypes}
          viewAs={mode}
          isCommander={isCommander}
          commanders={commanders}
        />
      </Container>
    </Layout>
  </ApiContext.Provider>
);

CardPage.propTypes = {
  ...CardDetailsType,
  apiUrl: PropTypes.string.isRequired,
};

const getMode = ({ isCommander, disableCommander }) => {
  if (!isCommander || disableCommander) {
    return 'card';
  }
  return 'stats';
};

CardPage.getInitialProps = async ({ query }) => {
  const disableCommander = query.commander === '0' || query.commander === 'false';
  const apiUrl = process.env.API_URL;
  const service = CardsService({ apiUrl });

  const {
    card,
    decks,
    distribuition,
  } = await service.getStats({ cardId: query.cardId, asCommander: !disableCommander });

  const skills = (card.leadershipSkills || [])[0] || {};

  const isCommander = !!skills.commander;

  const infos = await commander({
    isCommander: isCommander && !disableCommander,
    cardId: query.cardId,
    maxResults: 15,
    card,
  });

  return {
    ...infos,
    card,
    decks,
    isCommander,
    distribuition,
    apiUrl,
    mode: getMode({ isCommander, disableCommander }),
  };
};

export default CardPage;
