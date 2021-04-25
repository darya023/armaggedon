import {createSelector} from 'reselect';
import {FilterType, LoadingStatus} from '../const';

export const getDistanceMeasure = (state) => state.distanceMeasure;
export const getLoadingDataStatus = (state) => state.loadingDataStatus;
export const getLoadingAsteroidDataStatus = (state) => state.loadingAsteroidDataStatus;
export const getActiveFilter = (state) => state.activeFilter;
export const getDate = (state) => state.nextDate;
export const getTerminationList = (state) => state.terminationList;
export const getCurrentAsteroid = (state) => state.currentAsteroid;

export const getAsteroids = {
  [FilterType.All]: (state) => state.asteroids,
  [FilterType.DANGEROUS]: (state) => state.asteroids.filter((asteroid) => asteroid.is_potentially_hazardous_asteroid === true),
  [FilterType.TERMINATION_LIST]: (state) => state.asteroids.filter((asteroid) => state.terminationList.includes(asteroid.id)),
};

export const needShowSpinner = createSelector(
    [getLoadingDataStatus],
    (loadingDataStatus) => loadingDataStatus === LoadingStatus.FETCHING
);

export const needShowSpinnerInsteadAsteroidScreen = createSelector(
    [getLoadingAsteroidDataStatus],
    (loadingDataStatus) => loadingDataStatus === LoadingStatus.FETCHING || loadingDataStatus === LoadingStatus.INITIAL
);

export const needShowErrorText = createSelector(
    [getLoadingDataStatus],
    (loadingDataStatus) => loadingDataStatus === LoadingStatus.FAILURE
);
export const needShowErrorTextInsteadAsteroidData = createSelector(
    [getLoadingAsteroidDataStatus],
    (loadingDataStatus) => loadingDataStatus === LoadingStatus.FAILURE
);

export const needShowAsteroidsForTermination = createSelector(
    [getTerminationList],
    (terminationList) => !terminationList.some(Boolean)
);

export const needShowAsteroidCard = createSelector(
    [getCurrentAsteroid],
    (asteroid) => asteroid || asteroid && Object.keys(asteroid).length === 0
);

export const needChangeTerminationButton = (id) => {
  return createSelector(
      [getTerminationList],
      (terminationList) => {
        const index = terminationList.findIndex((item)=> item === id);
        return index !== -1;
      }
  );
};
