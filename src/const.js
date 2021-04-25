export const AppRoute = {
  MAIN: `/`,
  TERMINATION: `/termination`,
  ASTEROID: (id)=>(`/asteroids/${id}`),
  ASTEROID_SCHEMA: `/asteroids/:id`,
};

export const LoadingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};

export const Measure = {
  KILOMETERS: `kilometers`,
  LUNAR: `lunar`
};

export const FilterType = {
  All: `All`,
  DANGEROUS: `DANGEROUS`,
  TERMINATION_LIST: `TERMINATION_LIST`,
};

export const ERROR_TEXT = `Что-то пошло не так. Попробуйте позже.`;
