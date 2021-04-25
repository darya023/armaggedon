import React, {useEffect, useState} from "react";
import Header from "../header/header";
import Filters from "../filters/filters";
import AsteroidCards from "../asteroid-cards/asteroid-cards";
import Footer from "../footer/footer";
import Spinner from "../spinner/spinner";
import {useDispatch, useSelector} from "react-redux";
import {needShowSpinner, needShowErrorText, getActiveFilter, getLoadingDataStatus, getAsteroids} from "../../store/selectors";
import {fetchAsteroids} from "../../store/api-actions";
import {ERROR_TEXT, FilterType, LoadingStatus} from "../../const";

const MainScreen = () => {
  const isSpinnerShown = useSelector(needShowSpinner);
  const isErrorTextShown = useSelector(needShowErrorText);
  const activeFilter = useSelector(getActiveFilter);
  const asteroids = useSelector(getAsteroids[FilterType.All]);
  const loadingDataStatus = useSelector(getLoadingDataStatus);

  const dispatch = useDispatch();

  const onLoadData = () => {
    dispatch(fetchAsteroids());
  };

  const [isLoadAsteroidsDataNeeded, setIsLoadAsteroidsDataNeeded] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const onScrollList = (event) => {
    const scrollHeight = event.target.scrollingElement.scrollTop + event.target.scrollingElement.clientHeight;
    const isScrolledBottom = scrollHeight >= event.target.scrollingElement.scrollHeight;

    if (isScrolledBottom) {
      setIsScrolledToBottom(true);

      return;
    }
    setIsScrolledToBottom(false);
  };

  useEffect(() => {
    if (isLoadAsteroidsDataNeeded) {
      onLoadData();
      setIsLoadAsteroidsDataNeeded(false);
    }
  }, [isLoadAsteroidsDataNeeded]);

  useEffect(() => {
    window.addEventListener(`scroll`, onScrollList);

    return () => window.removeEventListener(`scroll`, onScrollList);
  }, []);

  useEffect(() => {
    const offset = document.documentElement.clientHeight - document.body.clientHeight;

    if ((isScrolledToBottom || offset === 0 && asteroids.some(Boolean)) && (loadingDataStatus === LoadingStatus.SUCCESS || loadingDataStatus === LoadingStatus.INITIAL)) {
      setIsLoadAsteroidsDataNeeded(true);
    }
    if (isScrolledToBottom) {
      setIsScrolledToBottom(false);
    }
  }, [activeFilter, loadingDataStatus, isScrolledToBottom]);

  return <>
    <div className="container">
      <Header />
      <main>
        <Filters />
        <AsteroidCards />
      </main>
      {
        isSpinnerShown && <Spinner />
      }
      {
        isErrorTextShown && ERROR_TEXT
      }
    </div>
    <Footer />
  </>;
};

export default MainScreen;
