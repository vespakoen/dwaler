#ifndef h_LCDCycleScreen
#define h_LCDCycleScreen

#include <avr/pgmspace.h>
#include "Arduino.h"
#include "GPSManager.h"
#include "NanoLiquidCrystal.h"
#include "Trip.h"
#include "SDStorageFat16.h"

const char _headingString[] PROGMEM = "W-+--+-nN-+--+-eE-+--+-sS-+--+-w";

const uint8_t n[8] PROGMEM = {
  B11110,
  B11111,
  B11011,
  B11001,
  B11000,
  B11000,
  B11000,
  B11000
};
const uint8_t N[8] PROGMEM = {
  B00011,
  B00011,
  B00011,
  B10011,
  B11011,
  B11111,
  B01111,
  B00111
};
const uint8_t e[8] PROGMEM = {
  B01111,
  B01111,
  B01100,
  B01111,
  B01111,
  B01100,
  B01111,
  B01111
};
const uint8_t E[8] PROGMEM = {
  B11110,
  B11110,
  B00000,
  B11000,
  B11000,
  B00000,
  B11110,
  B11110
};
const uint8_t s[8] PROGMEM = {
  B11111,
  B11111,
  B11000,
  B11111,
  B11111,
  B00000,
  B11111,
  B11111
};
const uint8_t S[8] PROGMEM = {
  B11111,
  B11111,
  B00000,
  B11111,
  B11111,
  B00011,
  B11111,
  B11111
};
const uint8_t w[8] PROGMEM = {
  B11000,
  B11000,
  B11000,
  B11100,
  B01101,
  B01101,
  B01111,
  B00111
};
const uint8_t W[8] PROGMEM = {
  B00011,
  B00011,
  B00011,
  B00111,
  B10110,
  B10110,
  B11110,
  B11100
};

const uint8_t* const font[8] = {n, N, e, E, s, S, w, W};

class LCDCycleScreen {
  public:
    LCDCycleScreen(GPSManager *gps, NanoLiquidCrystal *lcd, Trip *trip, SDStorageFat16 *store);
    void setup();
    void renderTripSelectorScreen();
    void renderCompassScreen();
    void renderProgressScreen();
    void renderSpeedScreen();
    void renderPositionScreen();
    void renderStatsScreen();
    void renderGPSScreen();
    void scrollTrips();
    void selectTrip();
    void resetTripSelectionIndex();
    void render(uint8_t activeScreen);
  private:
    GPSManager *_gps;
    NanoLiquidCrystal *_lcd;
    Trip *_trip;
    SDStorageFat16 *_store;
    uint8_t _totalTrips;
    bool _forceRedraw = false;

    // cycle
    uint16_t _renderInterval = 500;
    uint8_t _totalScreens = 4;
    uint8_t _currentScreen = 255;
    unsigned long _lastRenderTime;

    // trip selector
    uint8_t _tripSelectionIndex = 0;
    uint8_t _lastTripSelectionIndex = 255;
};

#endif
