#ifndef h_SDStorageFat16
#define h_SDStorageFat16

#include "Arduino.h"
#include <Fat16.h>
#include "Location.h"
#include "State.h"

typedef void (*OnValue)(const char* name);

class SDStorageFat16 {
  public:
    SDStorageFat16(uint8_t csPin);
    void setup();
    uint8_t countTrips();
    void getTripNames(uint8_t from, uint8_t to, OnValue callback);
    Location getTripDestination(const char* tripName);
    uint8_t countTraces(const char* tripName);
    void logLocation(const char* tripName, uint8_t traceNum, Location location);
    // void getTrace(const char* tripName, uint8_t traceNum, OnValue callback);
    State getState();
    void putState(State state);
  private:
    uint8_t _csPin;
    SdCard _sd;
};

#endif
