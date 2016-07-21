#include "State.h"

String State::liveHeaderToString()
{
  return "timestamp,currentLocation:latitude,longitude,altitude";
}

String State::liveToString()
{
  return String(timestamp) + "," +
    String(currentLocation.latitude, 6) + "," +
    String(currentLocation.longitude, 6) + "," +
    String(currentLocation.altitude, 2);
}

String State::regularHeaderToString()
{
  return "startingLocation:latitude,longitude,destinationLocation:latitude,longitude,satellites,fix,fixquality,topSpeed,travelledDistance";
}

String State::regularToString()
{
  return String(startingLocation.latitude, 6) + "," +
    String(startingLocation.longitude, 6) + "," +
    String(destinationLocation.latitude, 6) + "," +
    String(destinationLocation.longitude, 6) + "," +
    String(satellites) + "," +
    (fix ? "1" : "0") + "," +
    String(fixquality) + "," +
    String(topSpeed, 2) + "," +
    String(travelledDistance, 2);
}