#include "Location.h"
#include "GPSManager.h"
#include "SDStorageFat16.h"
#include "State.h"
#include "LCDCycleScreen.h"

// SENSORS
NanoLiquidCrystal lcd(7, 8, 18, 17, 16, 15);   // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);           // (TX, RX)
Adafruit_GPS gps(&softwareSerial);
SDStorageFat16 store(4);                       // (CS)

// DOMAIN
State state;
GPSManager gpsManager(&gps, &state, &store);

// SCREEN
LCDCycleScreen lcdCycleScreen(&gpsManager, &lcd, &state, &store);

// SETUP
void setup() {
  Serial.begin(9600);
  // move some LCD pins to analog
  pinMode(14, INPUT_PULLUP);
  for (uint8_t p = 15; p <= 18; p++) {
    pinMode(p, OUTPUT);
  }
  store.setup();
  gpsManager.setup();
  startInterrupt();
  lcdCycleScreen.setup();
  state = store.getState();
  char tripName[12];
  state.getTripName(tripName, 12);
  Location tripDestination = store.getTripDestination(tripName);
  state.setDestinationLocation(tripDestination);
}

// LOOP
int lastButtonState = 0;
unsigned long lastDebounceTime;
bool buttonLocked = false;
String inputString = "";
char junk;
void loop() {
  if (Serial.available()) {
    while (Serial.available()) {
      char inChar = (char) Serial.read();
      inputString += inChar;
    }
    Serial.println(state.toString());
    while (Serial.available() > 0) {
      junk = Serial.read();
    }
    if (inputString == "t") {
      lcdCycleScreen.resetTripSelectionIndex();
    } else if (inputString == "s") {
      lcdCycleScreen.selectTrip();
    } else if (inputString == "n") {
      lcdCycleScreen.next();
    }
    inputString = "";
  }

  static bool foundStartingLocation = false;
  gpsManager.loop();
  if (!foundStartingLocation && gpsManager.getFix()) {
    state.setStartingLocation(gpsManager.getLocation());
    foundStartingLocation = true;
  }
  lcdCycleScreen.render();

  uint16_t reading = analogRead(14);
  if (!buttonLocked && reading < 500) {
    buttonLocked = true; // lock button
    delay(300); // wait a bit to see if it's a long press
    if (analogRead(14) < 300) {
      // long
      if (state.getActiveScreen() == 255) {
        lcdCycleScreen.selectTrip();
      } else {
        lcdCycleScreen.resetTripSelectionIndex();
      }
      while (analogRead(14) < 300) {
        // hang up until released
        delay(50); // give it some breathing room
      }
    } else {
      // short
      lcdCycleScreen.next();
    }
    // prevent double clicks
    // unlock
    buttonLocked = false;
  }
}

void startInterrupt()
{
  OCR0A = 0xAF;
  TIMSK0 |= _BV(OCIE0A);
}

// Interrupt that parses incoming GPS data
SIGNAL(TIMER0_COMPA_vect) {
  gps.read();
}
