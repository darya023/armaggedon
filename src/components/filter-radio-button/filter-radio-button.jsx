import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {changeActiveFilter, changeDistanceMeasure} from "../../store/action-creator";
import {getDistanceMeasure, getLoadingDataStatus} from "../../store/selectors";
import {FilterType, LoadingStatus, Measure} from "../../const";

const FilterRadioButton = ({children, measure}) => {
  const distanceMeasure = useSelector(getDistanceMeasure);
  const loadingDataStatus = useSelector(getLoadingDataStatus);

  const dispatch = useDispatch();

  const onChangeDistanceMeasure = (newDistanceMeasure) => {
    dispatch(changeDistanceMeasure(newDistanceMeasure));
  };

  useEffect(() => {
    return () => {
      dispatch(changeActiveFilter(FilterType.All));
      dispatch(changeDistanceMeasure(Measure.KILOMETERS));
    };
  }, []);

  return <>
    <input
      id={`filter-distance-${measure}`}
      className="filters__radio visually-hidden"
      type="radio"
      name="filter-distance"
      value={measure}
      checked={distanceMeasure === measure}
      onChange={(event)=>onChangeDistanceMeasure(event.target.value)}
      disabled={loadingDataStatus === LoadingStatus.FETCHING}
    />
    <label className="filters__radio-label" htmlFor={`filter-distance-${measure}`}>
      {children}
    </label>
  </>;
};

FilterRadioButton.propTypes = {
  children: PropTypes.node.isRequired,
  measure: PropTypes.string.isRequired,
};

export default FilterRadioButton;
