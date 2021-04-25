import React from "react";
import PropTypes from 'prop-types';

const AsteroidDescription = ({asteroidInfo}) => {
  return <ul className="asteroid-description">
    {
      asteroidInfo.map((item) => {
        return <li key={item.key} className="asteroid-description__item">
          <span className="asteroid-description__key">{item.key}</span>
          <span className="asteroid-description__value">{item.value}</span>
        </li>;
      })
    }
  </ul>;
};
AsteroidDescription.propTypes = {
  asteroidInfo: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default AsteroidDescription;
