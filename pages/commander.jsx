import React from 'react';
import 'isomorphic-fetch';

import Layout from '../components/Layout';
import Container from '../components/Container';
import Commander from '../components/Commander';

import { commander } from '../services/ranking';
import CommanderType from '../types/Commander';

const CommanderPage = ({ card, decks, distribuition }) => (
  <Layout
    darkNavigator
    path={[
      { name: 'Início', icon: 'home', url: '/' },
      { name: 'Ranking', icon: 'ranking', url: '/ranking' },
      { name: card.name, icon: 'card', url: '/commander/blablabla' },
    ]}
  >
    <Container>
      <Commander
        distribuition={distribuition}
        card={card}
        decks={decks}
      />
    </Container>
  </Layout>
);

CommanderPage.propTypes = CommanderType;

CommanderPage.getInitialProps = async ({ query }) => {
  const { distribuition, ...infos } = await commander(query.cardId);
  const formatedData = distribuition.map((item) => ({
    id: item.type,
    label: item.type,
    value: item.count,
  }));
  return { ...infos, distribuition: formatedData };
};

export default CommanderPage;