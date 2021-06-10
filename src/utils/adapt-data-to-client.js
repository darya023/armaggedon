const Unit = {
  KILOMETERS: `км`,
  METERS: `м`,
  LUNAR: `лун`,
  KILOMETERS_PER_SECOND: `км/с`
};

export const adaptDataToClient = (data) => {
  const adaptedData = {};
  if (Object.keys(data).length !== 0) {
    adaptedData.id = data.id ? data.id : null;
    adaptedData.name = data.name ? data.name : null;
    adaptedData.isDangerous = `is_potentially_hazardous_asteroid` in data
      ? data.is_potentially_hazardous_asteroid
      : true;
    adaptedData.diameter = data.estimated_diameter && data.estimated_diameter.meters && data.estimated_diameter.meters.estimated_diameter_max
      ? {
        value: Number(data.estimated_diameter.meters.estimated_diameter_max),
        unit: Unit.KILOMETERS
      }
      : {
        value: null,
        unit: Unit.KILOMETERS
      };
    adaptedData.approachData = [];
    if (data.close_approach_data) {
      data.close_approach_data.forEach((element) => {
        const approachData = {};
        if (element) {
          approachData.date = element.close_approach_date_full
            ? element.close_approach_date_full
            : null;
          approachData.orbite = element.orbiting_body
            ? element.orbiting_body
            : null;
          approachData.velocity = element.relative_velocity && element.relative_velocity.kilometers_per_second
            ? {
              value: Number(element.relative_velocity.kilometers_per_second),
              unit: Unit.KILOMETERS_PER_SECOND
            }
            : {
              value: null,
              unit: Unit.KILOMETERS_PER_SECOND
            };
          approachData.distanceInKilometers = element.miss_distance && element.miss_distance.kilometers
            ? {
              value: Number(element.miss_distance.kilometers),
              unit: Unit.KILOMETERS
            }
            : {
              value: null,
              unit: Unit.KILOMETERS
            };
          approachData.distanceInLunar = element.miss_distance && element.miss_distance.lunar
            ? {
              value: Number(element.miss_distance.lunar),
              unit: Unit.LUNAR
            }
            : {
              value: null,
              unit: Unit.LUNAR
            };
        } else {
          return;
        }

        adaptedData.approachData.push(approachData);
      });
    }
  }

  return adaptedData;
};
