import {batch} from "react-redux";
import {LoadingStatus} from "../const";
import {changeLoadingDataStatus, setAsteroids, changeNextDate, changeLoadingAsteroidDataStatus, changeCurrentAsteroid} from "./action-creator";

export const fetchAsteroids = () => (dispatch, getState, api) => {
  const date = getState().nextDate;
  dispatch(changeLoadingDataStatus(LoadingStatus.FETCHING));
  return api.get(`/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`)
    .then(({data}) => {
      dispatch(setAsteroids(data.near_earth_objects[date]));
      return data;
    })
    .then((data) => {
      batch(() => {
        dispatch(changeNextDate(data.links.next));
        dispatch(changeLoadingDataStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeLoadingDataStatus(LoadingStatus.FAILURE));
    });
};
export const fetchAsteroid = () => (dispatch, getState, api) => {
  dispatch(changeLoadingAsteroidDataStatus(LoadingStatus.FETCHING));
  return api.get(`/neo/${getState().currentAsteroidId}?api_key=DEMO_KEY`)
    .then(({data}) => {
      batch(() => {
        dispatch(changeCurrentAsteroid(data));
        dispatch(changeLoadingAsteroidDataStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeLoadingAsteroidDataStatus(LoadingStatus.FAILURE));
    });
};
