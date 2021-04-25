import {ActionType} from "./actions";

export const setAsteroids = (data) => ({
  type: ActionType.SET_ASTEROIDS,
  payload: data
});

export const changeNextDate = (data) => ({
  type: ActionType.CHANGE_NEXT_DATE,
  payload: data
});

export const changeLoadingDataStatus = (status) => ({
  type: ActionType.CHANGE_LOADING_DATA_STATUS,
  payload: status
});

export const changeLoadingAsteroidDataStatus = (status) => ({
  type: ActionType.CHANGE_LOADING_ASTEROID_DATA_STATUS,
  payload: status
});

export const changeDistanceMeasure = (value) => ({
  type: ActionType.CHANGE_DISTANCE_MEASURE,
  payload: value
});

export const changeActiveFilter = (value) => ({
  type: ActionType.CHANGE_ACTIVE_FILTER,
  payload: value
});

export const changeAsteroidTerminateStatus = (id) => ({
  type: ActionType.CHANGE_ASTEROID_TERMINATE_STATUS,
  payload: id
});

export const addToTerminationList = (id) => ({
  type: ActionType.ADD_TO_TERMINATION_LIST,
  payload: id
});

export const removeFromTerminationList = (id) => ({
  type: ActionType.REMOVE_FROM_TERMINATION_LIST,
  payload: id
});

export const changeCurrentAsteroidId = (id) => ({
  type: ActionType.CHANGE_CURRENT_ASTEROID_ID,
  payload: id
});

export const changeCurrentAsteroid = (asteroid) => ({
  type: ActionType.CHANGE_CURRENT_ASTEROID,
  payload: asteroid
});

export const clearTerminationList = () => ({
  type: ActionType.CLEAR_TERMINATION_LIST,
});
