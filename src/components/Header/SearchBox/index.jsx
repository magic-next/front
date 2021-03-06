import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Search } from 'styled-icons/boxicons-regular/Search';
import Autosuggest from 'react-autosuggest';

import CardsService from '../../../services/cards';
import ApiContext from '@/contexts/Api';
import * as S from './styled';

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.name}
  </div>
);

const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const SearchBox = () => {
  const [cards, setCards] = useState([]);
  const { apiUrl } = useContext(ApiContext);
  const service = CardsService({ apiUrl });
  const [text, setText] = useState('');
  const [requestCtrl, setRequestCtrl] = useState(null);

  const handleSearch = debounce(async ({ value }) => {
    if (value.length < 3) return;
    if (requestCtrl) requestCtrl.abort();
    const [promise, controller] = service.search({ q: value });
    setRequestCtrl(controller);
    const res = await promise.catch(() => null);
    if (!res) return;
    setCards(res.results);
  }, 250);

  const onChange = (event, { newValue }) => setText(newValue);
  const inputProps = {
    onChange,
    placeholder: 'Pesquisar carta...',
    value: text,
  };

  const onSelect = (ev, { suggestion }) => {
    Router.push(`/card/${suggestion.slug}`);
  };

  return (
    <S.SearchWrapper action="/cards">
      <Search />
      <input type="hidden" name="q" value={text} />
      <Autosuggest
        name="q"
        className="suggest"
        suggestions={cards}
        onSuggestionsFetchRequested={handleSearch}
        onSuggestionsClearRequested={() => setCards([])}
        getSuggestionValue={(item) => item.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSelect}
      />
      {/* <input type="text" placeholder="Pesquisar carta..." /> */}
    </S.SearchWrapper>
  );
};

export default SearchBox;
