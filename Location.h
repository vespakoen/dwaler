#ifndef h_Location
#define h_Location

#include "Arduino.h"

class Location {
  public:
    Location(float latitude, float longitude, float altitude);
    Location(float latitude, float longitude);
    Location();
    float getLatitude();
    float getLongitude();
    float getAltitude();
    float distanceTo(Location location);
    uint16_t bearingTo(Location location);
    bool isNullIsland();
  private:
    float _latitude;
    float _longitude;
    float _altitude;
    float _calculateDistance(float sourceLatitude, float sourceLongitude, float targetLatitude, float targetLongitude);
    uint16_t _calculateBearing(float sourceLatitude, float sourceLongitude, float targetLatitude, float targetLongitude);
};

#endif
