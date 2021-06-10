import {batch} from "react-redux";
import {LoadingStatus} from "../const";
import {adaptDataToClient} from "../utils/adapt-data-to-client";
import {changeLoadingDataStatus, setAsteroids, changeNextDate, changeLoadingAsteroidDataStatus, changeCurrentAsteroid} from "./action-creator";

export const fetchAsteroids = () => (dispatch, getState, api) => {
  const date = getState().nextDate;
  dispatch(changeLoadingDataStatus(LoadingStatus.FETCHING));
  return api.get(`/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`)
    .then(({data}) => {
      const newData = data.near_earth_objects[date];

      const result = {
        data: newData.map(adaptDataToClient),
        nextDate: data.links.next
      };

      return result;
    })
    .then(({data, nextDate}) => {
      dispatch(setAsteroids(data));
      return nextDate;
    })
    .then((nextDate) => {
      batch(() => {
        dispatch(changeNextDate(nextDate));
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
    .then(({data}) => adaptDataToClient(data))
    .then((data) => {
      batch(() => {
        dispatch(changeCurrentAsteroid(data));
        dispatch(changeLoadingAsteroidDataStatus(LoadingStatus.SUCCESS));
      });
    })
    .catch(() => {
      dispatch(changeLoadingAsteroidDataStatus(LoadingStatus.FAILURE));
    });
};
