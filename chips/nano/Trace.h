#ifndef h_Trace
#define h_Trace

#include "Arduino.h"
#include "Location.h"

class Trace {
  public:
    Trace();
    void setStartingLocation(Location location);
    void setDestinationLocation(Location location);
    Location getStartingLocation();
    Location getDestinationLocation();
    void setTopSpeed(float topSpeed);
    float getTopSpeed();
    void setAverageSpeed(float averageSpeed);
    float getAverageSpeed();
    void setTravelledDistance(float travelledDistance);
    float getTravelledDistance();
    String toString();
  private:
    Location _startingLocation;
    Location _destinationLocation;
    float _topSpeed;
    float _averageSpeed;
    float _travelledDistance;
};

#endif
