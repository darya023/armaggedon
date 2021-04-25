import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import Header from "../header/header";
import Footer from "../footer/footer";
import AsteroidCardFullscreen from "../asteroid-card/asteroid-card-fullscreen";
import {useDispatch, useSelector} from "react-redux";
import {needShowErrorTextInsteadAsteroidData, needShowSpinnerInsteadAsteroidScreen, getCurrentAsteroid, needShowAsteroidCard} from "../../store/selectors";
import {fetchAsteroid} from "../../store/api-actions";
import Spinner from "../spinner/spinner";
import {changeCurrentAsteroidId} from "../../store/action-creator";
import {ERROR_TEXT} from "../../const";

const AsteroidScreen = ({currentAsteroidId}) => {
  const isSpinnerShown = useSelector(needShowSpinnerInsteadAsteroidScreen);
  const isErrorTextShown = useSelector(needShowErrorTextInsteadAsteroidData);
  const isAsteroidCardShown = useSelector(needShowAsteroidCard);
  const asteroid = useSelector(getCurrentAsteroid);

  const dispatch = useDispatch();

  const onChangeCurrentAsteroidId = (id) => {
    dispatch(changeCurrentAsteroidId(id));
  };

  useEffect(()=> {
    onChangeCurrentAsteroidId(currentAsteroidId);
    dispatch(fetchAsteroid(currentAsteroidId));
  }, [currentAsteroidId]);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  return <>
    <div className="container">
      <Header />
      {
        isAsteroidCardShown && <AsteroidCardFullscreen asteroid={asteroid} />
      }
      {
        isErrorTextShown && ERROR_TEXT
      }
    </div>
    <Footer />
  </>;
};

AsteroidScreen.propTypes = {
  currentAsteroidId: PropTypes.string.isRequired
};

export default AsteroidScreen;
