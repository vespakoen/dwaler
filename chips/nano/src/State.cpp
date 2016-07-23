#include "State.h"

String State::liveHeaderToString()
{
  return "ts,lat,lng,alt";
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
  return "slat,slng,dlat,dlng,sats,fix,fix,top,distance";
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