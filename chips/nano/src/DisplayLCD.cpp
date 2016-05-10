#include "DisplayLCD.h"

DisplayLCD::DisplayLCD(
  TinyLCD *lcd,
  State *state//,
  // Storage *store
)
{
  _lcd = lcd;
  _state = state;
  // _store = store;
}

void DisplayLCD::setup()
{
  // move some LCD pins to analog
  for (uint8_t p = 15; p <= 18; p++) {
    pinMode(p, OUTPUT);
  }
  // setup the lcd
  _lcd->begin(16, 2);
  // create lcd characters
  for (uint8_t i = 0; i < 8; i++) {
    uint8_t buffer[8];
    for (uint8_t j = 0; j < 8; j++) {
      buffer[j] = pgm_read_word_near(&(font[i][j]));
    }
    _lcd->createChar(i, buffer);
  }
  // count trips
  // _totalTrips = _store->countTrips();
}

void DisplayLCD::renderCompassScreen()
{
  // get the diff
  int16_t _relativeBearing = _state->currentLocation.bearingTo(&_state->destinationLocation) - _state->course;
  // make sure it's absolute
  if (_relativeBearing < 0) {
    _relativeBearing = 360 + _relativeBearing;
  }
  if (_relativeBearing >= 90 && _relativeBearing < 180) {
    // out of range, course right being shortest
    _lcd->setCursor(14, 0);
    _lcd->print("=>");
  } else if (_relativeBearing >= 180 && _relativeBearing <= 270) {
    // out of range, course left being shortest
    _lcd->setCursor(0, 0);
    _lcd->print("<=");
  } else {
    // destination within 180 degrees view
    if (_relativeBearing < 180) {
      _lcd->setCursor(round(_relativeBearing / 11.25) + 7, 0);
      _lcd->print("<>");
    } else {
      int8_t _cursorPos = 7 - round((360 - _relativeBearing) / 11.25);
      if (_cursorPos < 0) {
        _lcd->setCursor(0, 0);
        _lcd->print(">");
      } else {
        _lcd->setCursor(_cursorPos, 0);
        // in case of the cursor position being 16, the last character will automatically fall off
        _lcd->print("<>");
      }
    }
  }

  // get course string
  _lcd->setCursor(0, 1);
  uint8_t _cutStart = round(_state->course / 11.25);
  for (uint8_t k = _cutStart; k <= _cutStart + 16; k++) {
    char character;
    if (k > 31) {
      character = (char) pgm_read_byte_near(&_courseString[k - 32]);
    } else {
      character = (char) pgm_read_byte_near(&_courseString[k]);
    }
    if (character == 'n') {
      _lcd->write(byte(0));
    } else if (character == 'N') {
      _lcd->write(byte(1));
    } else if (character == 'e') {
      _lcd->write(byte(2));
    } else if (character == 'E') {
      _lcd->write(byte(3));
    } else if (character == 's') {
      _lcd->write(byte(4));
    } else if (character == 'S') {
      _lcd->write(byte(5));
    } else if (character == 'w') {
      _lcd->write(byte(6));
    } else if (character == 'W') {
      _lcd->write(byte(7));
    } else {
      _lcd->print(character);
    }
  }
}

void DisplayLCD::renderProgressScreen()
{
  // get distance between start & current
  float distanceTravelled = _state->startingLocation.distanceTo(&_state->currentLocation) / 1000;
  // get distance between current & end
  float distanceRemaining = _state->currentLocation.distanceTo(&_state->destinationLocation) / 1000;
  // get distance between start & current + current & end
  float totalDistance = distanceTravelled + distanceRemaining;
  uint8_t progress = (distanceTravelled / totalDistance) * 100;
  // get progress string
  _lcd->setCursor(0, 0);
  uint8_t progressBlocks = round(progress * 0.16);
  for (uint8_t j = 0; j < 16; j++) {
    if (j == progressBlocks) {
      _lcd->print(">");
    } else if (j > progressBlocks) {
      _lcd->print("-");
    } else {
      _lcd->print("=");
    }
  }
  // make sure we don't write the progress on top of the arrow
  if (progressBlocks > 5) {
    _lcd->setCursor(1, 0);
  } else {
    _lcd->setCursor(7, 0);
  }
  _lcd->print(progress); _lcd->print("%");
  _lcd->setCursor(0, 1);
  uint8_t decimalPrecision = 2;
  if (totalDistance > 999) {
    decimalPrecision = 1;
  }
  if (totalDistance > 9999) {
    decimalPrecision = 0;
  }
  _lcd->print("KM "); _lcd->print(String(distanceTravelled, decimalPrecision)); _lcd->print("/"); _lcd->print(String(totalDistance, decimalPrecision));
}

// void DisplayLCD::renderSpeedScreen()
// {
//   _lcd->setCursor(0, 0);
//   _lcd->print("NOW: "); _lcd->print(String(_gps->getSpeed(), 2)); _lcd->print(" km/h");
//   _lcd->setCursor(0, 1);
//   _lcd->print("TOP: "); _lcd->print(String(_state->topSpeed, 2)); _lcd->print(" km/h");
// }

// void DisplayLCD::renderPositionScreen()
// {
//   Location* location = _gps->getLocation();
//   _lcd->setCursor(0, 0);
//   _lcd->print("LAT: "); _lcd->print(String(location->latitude, 8));
//   _lcd->setCursor(0, 1);
//   _lcd->print("LNG: "); _lcd->print(String(location->longitude, 8));
// }

// void DisplayLCD::renderStatsScreen()
// {
//   _lcd->setCursor(0, 0);
//   String speedStr = String(_state->topSpeed, 2);
//   _lcd->print("TOP: "); _lcd->print(speedStr); _lcd->print(" km/h");
//   _lcd->setCursor(0, 1);
//   String distanceStr = String(_state->travelledDistance / 1000, 2);
//   _lcd->print("DIS: "); _lcd->print(distanceStr); _lcd->print(" km");
// }

// void DisplayLCD::renderGPSScreen()
// {
//   _lcd->setCursor(0, 0);
//   _lcd->print("F: "); _lcd->print(_gps->getFix() ? "1" : "0"); _lcd->print(", FQ: "); _lcd->print(_gps->getFixQuality());
//   _lcd->setCursor(0, 1);
//   _lcd->print("SAT: "); _lcd->print(_gps->getSatellites());
// }

// static char _tripnames[2][13];
// static uint8_t _currentTrip = 0;
// void _onTrip(const char* tripname)
// {
//   for (uint8_t i = 0; i < 8; i++) {
//     _tripnames[_currentTrip][i] = tripname[i];
//   }
//   _currentTrip++;
// }

// void DisplayLCD::renderTripSelectorScreen()
// {
//   if (_tripSelectionIndex != _lastTripSelectionIndex || _forceRedraw) {
//     uint8_t page = floor(_tripSelectionIndex / 2);
//     // clear trips
//     _currentTrip = 0;
//     _tripnames[0][0] = '\0';
//     _tripnames[1][0] = '\0';
//     // get new trips
//     _store->getTripNames(page * 2, (page * 2) + 2, _onTrip);
//     _lcd->clear();
//     for (uint8_t row = 0; row < 2; row++) {
//       if (!_tripnames[row]) {
//         continue;
//       }
//       _lcd->setCursor(0, row);
//       _lcd->print(((page * 2) + row == _tripSelectionIndex) ? "-> " : "   ");  _lcd->print(_tripnames[row]);
//     }
//     _lastTripSelectionIndex = _tripSelectionIndex;
//     _forceRedraw = false;
//   }
// }

// void DisplayLCD::scrollTrips()
// {
//   _tripSelectionIndex++;
//   if (_tripSelectionIndex == _totalTrips) {
//     _tripSelectionIndex = 0;
//   }
// }

// void DisplayLCD::selectTrip()
// {
//   _state->activeScreen = 0;
//   Location newDestination =  _store->getTripDestination(_tripnames[_tripSelectionIndex % 2]);
//   _state->destinationLocation = &newDestination;
// }

// void DisplayLCD::resetTripSelectionIndex() {
//   _state->activeScreen = 255;
//   _tripSelectionIndex = 0;
//   _forceRedraw = true;
// }

// void DisplayLCD::next()
// {
//   if (_state->activeScreen == 255) {
//     scrollTrips();
//   } else {
//     _state->activeScreen++;
//     if (_state->activeScreen == 6) {
//       _state->activeScreen = 0;
//     }
//   }
// }

void DisplayLCD::renderWaitingScreen()
{
 _lcd->setCursor(0, 0);
 _lcd->print("Waiting on GPS..");
}

uint8_t activeScreen = 0;
void DisplayLCD::loop(bool shouldUpdate)
{
  unsigned long now = millis();
  if (now - _lastRenderTime >= _renderInterval) {
    // uint8_t activeScreen = _state->activeScreen;
    // if (activeScreen == 255) return renderTripSelectorScreen();
    // clear from here to reduce sketch size, renderTripSelectorScreen does it's own clearing
    _lcd->clear();
    _lastRenderTime = now;
    if (activeScreen == 2) {
      activeScreen = 0;
    } else {
      activeScreen++;
    }
    if (!_state->fix) return renderWaitingScreen();
    if (activeScreen == 0) return renderCompassScreen();
    if (activeScreen == 1) return renderCompassScreen();
    if (activeScreen == 2) return renderProgressScreen();
    // if (activeScreen == 2) return renderSpeedScreen();
    // if (activeScreen == 3) return renderPositionScreen();
    // if (activeScreen == 4) return renderStatsScreen();
    // if (activeScreen == 5) return renderGPSScreen();
    // if (activeScreen == 4) return renderStatsScreen();
    // if (activeScreen == 5) return renderGPSScreen();
  }
}
