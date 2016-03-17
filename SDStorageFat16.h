#ifndef h_SDStorageFat16
#define h_SDStorageFat16

#include "Arduino.h"
#include <Fat16.h>
#include "Location.h"
#include "State.h"
#include "Trip.h"

typedef void (*OnFile)(const char* name);
typedef void (*OnKey)(const char* key, const char* value);

class SDStorageFat16 {
  public:
    SDStorageFat16(uint8_t csPin);
    void setup();
    uint8_t countTrips();
    void getTripNames(uint8_t from, uint8_t to, OnFile callback);
    Location getTripDestination(const char* tripName);
    void logLocation(Location location);
    State getState();
    void putState(State state);
  private:
    uint8_t _csPin;
    SdCard _sd;
};

#endif
