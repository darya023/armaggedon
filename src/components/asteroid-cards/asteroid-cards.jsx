import React from "react";
import AsteroidCard from "../asteroid-card/asteroid-card";
import {getActiveFilter, getAsteroids} from "../../store/selectors";
import {useSelector} from "react-redux";

const AsteroidCards = () => {
  const activeFilter = useSelector(getActiveFilter);
  const asteroids = useSelector(getAsteroids[activeFilter]);

  return <div className="asteroid-cards">
    {
      asteroids.map((asteroid)=>{
        return <AsteroidCard key={`${asteroid.id}${asteroid.close_approach_data[0].close_approach_date_full}`} asteroid={asteroid} />;
      })
    }
  </div>;
};

export default AsteroidCards;
