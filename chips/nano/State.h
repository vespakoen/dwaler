#ifndef h_State
#define h_State

#include "Arduino.h"
#include "Location.h"

class State {
  public:
    State();
    State(uint8_t activeScreen, const char* tripName);
    uint8_t getActiveScreen();
    void setActiveScreen(uint8_t activeScreen);
    void getTripName(char *buffer, uint8_t size);
    void setStartingLocation(Location location);
    void setDestinationLocation(Location location);
    Location getStartingLocation();
    Location getDestinationLocation();
    void setTopSpeed(float topSpeed);
    float getTopSpeed();
    void setTravelledDistance(float travelledDistance);
    float getTravelledDistance();
    String toString();
    void toString(char* buff);
  private:
    uint8_t _activeScreen;
    const char* _tripName;
    Location _startingLocation;
    Location _destinationLocation;
    float _topSpeed;
    float _travelledDistance;
};

#endif
