#ifndef h_Location
#define h_Location

#include "Arduino.h"

typedef struct Location {
  float latitude;
  float longitude;
  float altitude;
  float distanceTo(Location location);
  uint16_t bearingTo(Location location);
} Location;

#endif
