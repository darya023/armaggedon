import React from "react";
import AsteroidCard from "../asteroid-card/asteroid-card";
import {getActiveFilter, getAsteroids, needShowAsteroidCard} from "../../store/selectors";
import {useSelector} from "react-redux";

const AsteroidCards = () => {
  const activeFilter = useSelector(getActiveFilter);
  const asteroids = useSelector(getAsteroids[activeFilter]);
  const isAsteroidCardShown = useSelector(needShowAsteroidCard);

  return <div className="asteroid-cards">
    {
      asteroids.map((asteroid)=>{
        return isAsteroidCardShown && <AsteroidCard key={`${asteroid.id}${asteroid.approachData[0] && asteroid.approachData[0].date ? asteroid.approachData[0].date : ``}`} asteroid={asteroid} />;
      })
    }
  </div>;
};

export default AsteroidCards;
