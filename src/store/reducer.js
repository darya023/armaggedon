import {LoadingStatus, Measure, FilterType} from '../const';
import {humanizeDate} from '../utils/humanize-date';
import {ActionType} from './actions';
const now = humanizeDate(new Date(), `YYYY-MM-DD`);

const initialState = {
  asteroids: [],
  loadingDataStatus: LoadingStatus.INITIAL,
  loadingAsteroidDataStatus: LoadingStatus.INITIAL,
  nextDate: now,
  distanceMeasure: Measure.KILOMETERS,
  activeFilter: FilterType.All,
  terminationList: [],
  currentAsteroidId: null,
  currentAsteroid: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ASTEROIDS:
      return {
        ...state,
        asteroids: [...state.asteroids, ...action.payload],
      };
    case ActionType.CHANGE_NEXT_DATE:
      const regexp = /\d{4}-\d{2}-\d{2}/;
      const newNextDate = action.payload.match(regexp)[0];
      return {
        ...state,
        nextDate: newNextDate,
      };
    case ActionType.CHANGE_LOADING_DATA_STATUS:
      return {
        ...state,
        loadingDataStatus: action.payload,
      };
    case ActionType.CHANGE_LOADING_ASTEROID_DATA_STATUS:
      return {
        ...state,
        loadingAsteroidDataStatus: action.payload,
      };
    case ActionType.CHANGE_DISTANCE_MEASURE:
      return {
        ...state,
        distanceMeasure: action.payload,
      };
    case ActionType.CHANGE_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
      };
    case ActionType.ADD_TO_TERMINATION_LIST:
      const list = state.terminationList;
      if (!list.includes(action.payload)) {
        list.push(action.payload);
      }
      return {
        ...state,
        terminationList: [...list],
      };
    case ActionType.REMOVE_FROM_TERMINATION_LIST:
      const prevTerminationList = state.terminationList;
      const index = prevTerminationList.findIndex((id) => id === action.payload);
      return {
        ...state,
        terminationList: [...prevTerminationList.slice(0, index), ...prevTerminationList.slice(index + 1)],
      };
    case ActionType.CLEAR_TERMINATION_LIST:
      return {
        ...state,
        terminationList: [],
      };
    case ActionType.CHANGE_CURRENT_ASTEROID_ID:
      return {
        ...state,
        currentAsteroidId: action.payload,
      };
    case ActionType.CHANGE_CURRENT_ASTEROID:
      return {
        ...state,
        currentAsteroid: action.payload,
      };

    default: return state;
  }
};
