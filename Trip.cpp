#include "Trip.h"

Trip::Trip()
{
}

void Trip::setStartingLocation(Location location)
{
  _startingLocation = location;
}

void Trip::setDestinationLocation(Location location)
{
  _destinationLocation = location;
}

Location Trip::getStartingLocation()
{
  return _startingLocation;
}

Location Trip::getDestinationLocation()
{
  return _destinationLocation;
}

void Trip::setTopSpeed(float topSpeed)
{
  _topSpeed = topSpeed;
}

float Trip::getTopSpeed()
{
  return _topSpeed;
}

void Trip::setAverageSpeed(float averageSpeed)
{
  _averageSpeed = averageSpeed;
}

float Trip::getAverageSpeed()
{
  return _averageSpeed;
}

void Trip::setTravelledDistance(float travelledDistance)
{
  _travelledDistance = travelledDistance;
}

float Trip::getTravelledDistance()
{
  return _travelledDistance;
}
