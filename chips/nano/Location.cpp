#include "Location.h"

Location::Location(float latitude, float longitude, float altitude)
{
  _latitude = latitude;
  _longitude = longitude;
  _altitude = altitude;
}

Location::Location(float latitude, float longitude)
{
  _latitude = latitude;
  _longitude = longitude;
  _altitude = 0;
}

Location::Location()
  : _latitude(0)
  , _longitude(0)
{
}

float Location::getLatitude()
{
  return _latitude;
}

float Location::getLongitude()
{
  return _longitude;
}

float Location::getAltitude()
{
  return _altitude;
}

float Location::distanceTo(Location location)
{
  return _calculateDistance(_latitude, _longitude, location.getLatitude(), location.getLongitude());
}

uint16_t Location::bearingTo(Location location)
{
  return _calculateBearing(_latitude, _longitude, location.getLatitude(), location.getLongitude());
}

bool Location::isNullIsland()
{
  return _latitude == 0 && _longitude == 0;
}

uint16_t Location::_calculateBearing(float sourceLatitude, float sourceLongitude, float targetLatitude, float targetLongitude)
{
  float result;
  result = degrees(
    atan2(
      69.1 * (targetLongitude - sourceLongitude) * cos(sourceLatitude / 57.3),
      69.1 * (targetLatitude - sourceLatitude)
    )
  );
  if (result < 0) {
    result += 360;
  }
  return (uint16_t) result;
}

float Location::_calculateDistance(float sourceLatitude, float sourceLongitude, float targetLatitude, float targetLongitude)
{
  float distance = 0;
  float distance2 = 0;
  float latitudeDifference = 0;
  float longitudeDistance = 0;
  latitudeDifference = radians(targetLatitude - sourceLatitude);
  sourceLatitude = radians(sourceLatitude);
  targetLatitude = radians(targetLatitude);
  longitudeDistance = radians((targetLongitude) - (sourceLongitude));
  distance = (sin(latitudeDifference / 2.0) * sin(latitudeDifference / 2.0));
  distance2 = cos(sourceLatitude);
  distance2 *= cos(targetLatitude);
  distance2 *= sin(longitudeDistance / 2.0);
  distance2 *= sin(longitudeDistance / 2.0);
  distance += distance2;
  distance = (2 * atan2(sqrt(distance) , sqrt(1.0 - distance)));
  // convert to meters
  distance *= 6371000.0;
  return distance;
}

String Location::toString()
{
  return String(getLatitude(), 7) + "," + String(getLongitude(), 7) + "," + String(getAltitude(), 2);
}
