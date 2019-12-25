import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Confirmation from '../SuccessInfo';

import UserType from '../../../types/User';

const SignIn = ({ onSubmit, user, onResend }) => {
  const logged = !!user;
  if (!logged) {
    return (
      <Form onSubmit={onSubmit} />
    );
  }
  if (user.status > 0) {
    return (
      <h1>REDIRECT</h1>
    );
  }
  return (
    <Confirmation
      title="Confirme seu email!"
      onSubmit={onResend}
      user={user}
    />
  );
};

SignIn.propTypes = {
  onSubmit: PropTypes.func,
  onResend: PropTypes.func,
  user: UserType,
};

SignIn.defaultProps = {
  onSubmit: () => Promise.resolve(null),
  onResend: () => Promise.resolve(null),
  user: null,
};

export default SignIn;
