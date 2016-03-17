#ifndef h_Trip
#define h_Trip

#include "Arduino.h"
#include "Location.h"

class Trip {
  public:
    Trip();
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
  private:
    Location _startingLocation;
    Location _destinationLocation;
    float _topSpeed;
    float _averageSpeed;
    float _travelledDistance;
};

#endif
