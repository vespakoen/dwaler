#include "State.h"

String State::liveToString()
{
  return String(timestamp) + "," +
    String(currentLocation.latitude, 5) + "," +
    String(currentLocation.longitude, 5) + "," +
    String(currentLocation.altitude, 2);
}

String State::toString()
{
  return String(destinationId) + "," +
    String(tripId) + "," +
    String(startingLocation.latitude, 5) + "," +
    String(startingLocation.longitude, 5) + "," + 
    String(destinationLocation.latitude, 5) + "," +
    String(destinationLocation.longitude, 5) + "," +
    String(satellites) + "," +
    String(fix ? "1" : "0") + "," +
    String(fixquality) + "," +
    String(topSpeed, 2) + "," +
    String(travelledDistance, 2);
}