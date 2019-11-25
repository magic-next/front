import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { ChevronRight } from 'styled-icons/boxicons-regular/ChevronRight';
import Icons from './icons';

import Nav from '../Nav';
import Container from '../Container';

import NavLinkType from '../../types/NavLink';
import * as S from './styled';

const NavItem = ({
  name,
  last,
  icon,
  url,
}) => {
  const Icon = Icons[icon];
  return (
    <li>
      {url ? (
        <a title={name} href={url}>
          {icon && (<Icon />)}
          {name}
        </a>
      ) : (
        <span title={name}>
          {icon && (<Icon />)}
          {name}
        </span>
      )}
      {}
      {!last && (
        <ChevronRight className="arrow" />
      )}
    </li>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  last: PropTypes.bool,
  url: PropTypes.string,
};

NavItem.defaultProps = {
  icon: null,
  last: false,
  url: null,
};

const Navigator = ({ path, dark }) => {
  if (!path.length) {
    return null;
  }
  return (
    <Nav flat dark={dark}>
      <S.NavWrapper dark={dark}>
        <Container>
          <ul>
            {path.map((link, index) => (
              <NavItem
                name={link.name}
                icon={link.icon}
                url={link.url}
                key={index.toString()}
                last={index === path.length - 1}
              />
            ))}
          </ul>
        </Container>
      </S.NavWrapper>
    </Nav>
  );
};

Navigator.propTypes = {
  path: PropTypes.arrayOf(NavLinkType).isRequired,
  dark: PropTypes.bool,
};

Navigator.defaultProps = {
  dark: false,
};

export default Navigator;
