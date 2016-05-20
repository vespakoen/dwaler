#include "Location.h"

float Location::distanceTo(Location toLocation)
{
  float distance = 0;
  float distance2 = 0;
  float latitudeDifference = 0;
  float longitudeDistance = 0;
  latitudeDifference = radians(toLocation.latitude - latitude);
  longitudeDistance = radians((toLocation.longitude) - (longitude));
  distance = (sin(latitudeDifference / 2.0) * sin(latitudeDifference / 2.0));
  distance2 = cos(radians(latitude));
  distance2 *= cos(radians(toLocation.latitude));
  distance2 *= sin(longitudeDistance / 2.0);
  distance2 *= sin(longitudeDistance / 2.0);
  distance += distance2;
  distance = (2 * atan2(sqrt(distance) , sqrt(1.0 - distance)));
  // convert to meters
  distance *= 6371000.0;
  return distance;
}

uint16_t Location::bearingTo(Location toLocation)
{
  float result;
  result = degrees(
    atan2(
      69.1 * (toLocation.longitude - longitude) * cos(latitude / 57.3),
      69.1 * (toLocation.latitude - latitude)
    )
  );
  if (result < 0) {
    result += 360;
  }
  return (uint16_t) result;
}


/*
// A (tiny bit) less accurate method of calculating distance, in case you need some sketch space ;)
// Taken from https://github.com/mplewis/sternidae

// For calculating distance
// Earth's radius, in mi
const double EARTH_RADIUS = 3959;
// Radians per degree
const double RADS_PER_DEG = 2 * 3.14159 / 360;
// Uses Haversine formula
// http://www.movable-type.co.uk/scripts/gis-faq-5.1.html
// http://andrew.hedges.name/experiments/haversine/
float Location::distanceTo(Location *toLocation)
  double dlat = (toLocation->latitude - latitude) * RADS_PER_DEG;
  double dlng = (toLocation->longitude - longitude) * RADS_PER_DEG;
  double a = pow(sin(dlat/2), 2) + cos(latitude) * cos(toLocation->latitude) * pow(sin(dlng/2), 2);
  double c = 2 * atan2(sqrt(a), sqrt(1-a));
  return EARTH_RADIUS * c;
}
*/
