#ifndef h_SDStorage
#define h_SDStorage

#include "Arduino.h"
#include "Location.h"
#include "State.h"

typedef void (*OnTrace)(const char* name);
typedef void (*OnDestination)(const char* name, Location location);

class SDStorage {
  public:
    SDStorage(uint8_t csPin);
    void setup();
    uint8_t countTrips();
    void getDestinations(uint8_t from, uint8_t to, OnDestination callback);
    uint8_t countTraces(const char* destinationName);
    void logTrace(const char* destinationName, uint8_t traceNum, Location location);
    void getTrace(const char* destinationName, uint8_t traceNum, OnTrace callback);
    State getState();
    void putState(State state);
  private:
    uint8_t _csPin;
};

#endif
