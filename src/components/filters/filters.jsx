import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeActiveFilter, changeDistanceMeasure} from "../../store/action-creator";
import {getActiveFilter, getLoadingDataStatus} from "../../store/selectors";
import {FilterType, LoadingStatus, Measure} from "../../const";
import FilterRadioButton from "../filter-radio-button/filter-radio-button";


const Filters = () => {
  const activeFilter = useSelector(getActiveFilter);
  const loadingDataStatus = useSelector(getLoadingDataStatus);

  const dispatch = useDispatch();

  const onChangeActiveFilter = (filter) => {
    if (activeFilter === FilterType.DANGEROUS) {
      dispatch(changeActiveFilter(FilterType.All));
      return;
    }
    dispatch(changeActiveFilter(filter));
  };

  useEffect(() => {
    return () => {
      dispatch(changeActiveFilter(FilterType.All));
      dispatch(changeDistanceMeasure(Measure.KILOMETERS));
    };
  }, []);

  return <div className="filters flex-wrapper">
    <div className="flex-wrapper__item">
      <div className="checkbox">
        <input
          id="filter-dangerous"
          className="checkbox__input visually-hidden"
          type="checkbox"
          name="filter-dangerous"
          value={FilterType.DANGEROUS}
          checked={activeFilter === FilterType.DANGEROUS}
          disabled={loadingDataStatus === LoadingStatus.FETCHING}
          onChange={(event)=>onChangeActiveFilter(event.target.value)}
        />
        <label className="checkbox__label" htmlFor="filter-dangerous">
          Показать только опасные
        </label>
      </div>
    </div>
    <div className="filters__right flex-wrapper__item">
      <span className="filters__radio-text">Расстояние</span>
      <FilterRadioButton measure={Measure.KILOMETERS}>
      в километрах
      </FilterRadioButton>
      <FilterRadioButton measure={Measure.LUNAR}>
      в дистанциях до луны
      </FilterRadioButton>
    </div>
  </div>;
};

export default Filters;
