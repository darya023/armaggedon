import React from "react";
import PropTypes from 'prop-types';

const Button = ({children, id, terminate, onClick}) => {
  return <button
    onClick={() => onClick(id)}
    className={`button ${terminate ? `button_theme_terminate` : ``}`}
    type="button">{children}
  </button>;
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  terminate: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
