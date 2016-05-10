#ifndef h_LCDDisplay
#define h_LCDDisplay

#include <avr/pgmspace.h>
#include <Arduino.h>
#include <TinyLCD.h>
#include "../State.h"

const char _courseString180[] PROGMEM = "W+nNwW+nN+nNeE+eE+eEsS+sS+sSwW+w";
const char _courseString90[]  PROGMEM = "W--+--nNwW--+--nN--+--nNeE--+--eE--+--eEsS--+--sS--+--sSwW--+--w";

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

class LCDDisplay {
  public:
    LCDDisplay(
      TinyLCD *lcd,
      State *state
    );
    void setup();
    // void renderTripSelectorScreen();
    void renderCompassScreen();
    void renderProgressScreen();
    // void renderSpeedScreen();
    // void renderPositionScreen();
    // void renderStatsScreen();
    // void renderGPSScreen();
    // void scrollTrips();
    // void selectTrip();
    // void resetTripSelectionIndex();
    // void next();
    void renderWaitingScreen();
    void loop(bool shouldUpdate);
  private:
    TinyLCD *_lcd;
    State *_state;
    // SDStorageFat16 *_store;
    // uint8_t _totalTrips;
    // bool _forceRedraw = false;

    // cycle
    uint16_t _renderInterval = 2000;
    unsigned long _lastRenderTime;

    // trip selector
    // uint8_t _tripSelectionIndex = 0;
    // uint8_t _lastTripSelectionIndex = 255;
};

#endif
