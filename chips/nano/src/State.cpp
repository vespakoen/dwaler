#include "State.h"

String State::liveToString()
{
  return String(timestamp) + "," +
    String(currentLocation.latitude, 4) + "," +
    String(currentLocation.longitude, 4) + "," +
    String(currentLocation.altitude, 2);
}

String State::toString()
{
  return String(destinationId) + "," +
    String(tripId) + "," +
    String(startingLocation.latitude, 4) + "," +
    String(startingLocation.longitude, 4) + "," + 
    String(destinationLocation.latitude, 4) + "," +
    String(destinationLocation.longitude, 4) + "," +
    String(satellites) + "," +
    String(fix ? "1" : "0") + "," +
    String(fixquality) + "," +
    String(topSpeed, 2) + "," +
    String(travelledDistance, 2);
}