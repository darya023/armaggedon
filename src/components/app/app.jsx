import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import TerminationScreen from "../termination-screen/termination-screen";
import AsteroidScreen from "../asteroid-screen/asteroid-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import {AppRoute} from "../../const";
import {useDispatch} from "react-redux";
import {fetchAsteroids} from "../../store/api-actions";

const App = () => {
  const dispatch = useDispatch();

  const onLoadData = () => {
    dispatch(fetchAsteroids());
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={AppRoute.MAIN}
          component={MainScreen}
        />
        <Route
          exact
          path={AppRoute.TERMINATION}
          component={TerminationScreen}
        />
        <Route
          exact
          path={AppRoute.ASTEROID_SCHEMA}
          render={
            (props)=>{
              const id = props.match.params.id;

              return <AsteroidScreen currentAsteroidId={id} />;
            }
          }
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};
App.propTypes = {
  match: PropTypes.objectOf({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.objectOf({
      id: PropTypes.string.isRequired,
    })
  }),
};

export default App;
