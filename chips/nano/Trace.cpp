#include "Trace.h"

Trace::Trace()
{
  _startingLocation = Location(0, 0)
  _topSpeed = 0;
  _averageSpeed = 0;
  _travelledDistance = 0;
}

void Trace::setStartingLocation(Location location)
{
  _startingLocation = location;
}

void Trace::setDestinationLocation(Location location)
{
  _destinationLocation = location;
}

Location Trace::getStartingLocation()
{
  return _startingLocation;
}

Location Trace::getDestinationLocation()
{
  return _destinationLocation;
}

void Trace::setTopSpeed(float topSpeed)
{
  _topSpeed = topSpeed;
}

float Trace::getTopSpeed()
{
  return _topSpeed;
}

void Trace::setAverageSpeed(float averageSpeed)
{
  _averageSpeed = averageSpeed;
}

float Trace::getAverageSpeed()
{
  return _averageSpeed;
}

void Trace::setTravelledDistance(float travelledDistance)
{
  _travelledDistance = travelledDistance;
}

float Trace::getTravelledDistance()
{
  return _travelledDistance;
}

String Trace::toString()
{
  return _startingLocation->toString() + String(_topSpeed, 2) + "," + String(_averageSpeed, 2) + "," + String(_travelledDistance, 2);
}
