export const ActionType = {
  SET_ASTEROIDS: `app/setAsteroids`,
  CHANGE_NEXT_DATE: `/changeNextDate`,
  CHANGE_LOADING_DATA_STATUS: `/changeLoadingDataStatus`,
  CHANGE_LOADING_ASTEROID_DATA_STATUS: `asteroids/:id/changeLoadingAsteroidDataStatus`,
  CHANGE_DISTANCE_MEASURE: `/changeDistanceMeasure`,
  CHANGE_ACTIVE_FILTER: `/changeActiveFilter`,
  CHANGE_CURRENT_ASTEROID_ID: `asteroids/:id/changeCurrentAsteroidId`,
  CHANGE_CURRENT_ASTEROID: `asteroids/:id/changeCurrentAsteroid`,
  ADD_TO_TERMINATION_LIST: `app/addToTerminationList`,
  REMOVE_FROM_TERMINATION_LIST: `app/removeFromTerminationList`,
  CLEAR_TERMINATION_LIST: `termination/clearTerminationList`,
};
