#include "State.h"

String State::toString()
{
    return String(timestamp) + "," +
      String(currentLocation.latitude, 6) + "," +
      String(currentLocation.longitude, 6) + "," +
      String(currentLocation.altitude, 2); // + "," +
      // String(startingLocation.latitude, 6) + "," +
      // String(startingLocation.longitude, 6) + "," +
      // String(destinationLocation.latitude, 6) + "," +
      // String(destinationLocation.longitude, 6) + "," +
      // String(course) + "," +
      // String(satellites) + "," +
      // (fix ? "1" : "0") + "," +
      // String(fixquality) + "," +
      // String(speed, 2);// + "," +
      // String(topSpeed, 2); // + "," +
      // String(travelledDistance, 2);
}
