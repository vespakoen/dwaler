#ifndef h_GPSManager
#define h_GPSManager

#include "Arduino.h"
#include <SoftwareSerial.h>
#include "Adafruit_GPS.h"
#include "Location.h"
#include "State.h"
#include "SDStorageFat16.h"

class GPSManager {
  public:
    GPSManager(Adafruit_GPS *gps, State *state, SDStorageFat16 *store);
    void setup();
    void loop();
    // void startLocus();
    Location getLocation();
    uint16_t getHeading();
    float getSpeed();
    bool getFix();
    unsigned int getFixQuality();
    unsigned int getSatellites();
    // void clearLog();
    float _nmeaToDecimalDegrees(float nmeaCoord, char dir);
  private:
    Adafruit_GPS *_gps;
    State *_state;
    SDStorageFat16 *_store;
    uint32_t _timer;
    float _topSpeed = 0;
};

#endif
