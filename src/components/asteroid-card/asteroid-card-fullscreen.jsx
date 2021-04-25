import React from "react";
import PropTypes from 'prop-types';
import AsteroidCard from "./asteroid-card";

const AsteroidCardFullscreen = ({asteroid}) => {
  return <AsteroidCard isFullscreenMode={true} asteroid={asteroid} />;
};

AsteroidCardFullscreen.propTypes = {
  asteroid: PropTypes.object.isRequired,
};

export default AsteroidCardFullscreen;
