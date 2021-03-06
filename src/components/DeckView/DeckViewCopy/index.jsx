import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';

const categoryText = (cards) => cards
  .map(({ name, count }) => `${count} ${name}`)
  .join('\n');

const genList = (entries) => entries
  .map(([, cards]) => categoryText(cards))
  .join('\n');

const DeckViewCopy = ({ deckEntries, onCopy, children }) => {
  if (typeof document !== 'undefined' && !document.queryCommandSupported('copy')) {
    return null;
  }

  const copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.value = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  const [copied, setCopied] = useState(false);
  const copyList = () => {
    copyToClipboard(genList(deckEntries));
    if (onCopy) onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const text = copied ? 'Deck copiado!' : 'Copiar Deck';

  return (
    <Button
      small
      primary
      flat={copied && !children}
      onClick={copyList}
    >
      {children || text}
    </Button>
  );
};

DeckViewCopy.propTypes = {
  deckEntries: PropTypes.arrayOf(PropTypes.array),
  onCopy: PropTypes.func,
  children: PropTypes.node,
};

DeckViewCopy.defaultProps = {
  deckEntries: [],
  onCopy: null,
  children: null,
};

export default DeckViewCopy;
