#include "Location.h"
#include "Trip.h"
#include "GPSManager.h"
#include "SDStorageFat16.h"
#include "State.h"
#include "LCDCycleScreen.h"

// SENSORS
NanoLiquidCrystal lcd(7, 8, 18, 17, 16, 15);   // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);           // (TX, RX)
Adafruit_GPS gps(&softwareSerial);
SDStorageFat16 store(4);

// DOMAIN
Trip trip;
GPSManager gpsManager(&gps, &trip, &store);

// SCREEN
LCDCycleScreen lcdCycleScreen(&gpsManager, &lcd, &trip, &store);

uint8_t activeScreen = 255;

// SETUP
void setup() {
  Serial.begin(115200);
  // move some LCD pins to analog
  pinMode(14, INPUT_PULLUP);
  for (uint8_t p = 15; p <= 18; p++) {
    pinMode(p, OUTPUT);
  }
  // setup the lcd
  lcd.begin(16, 2);
  // setup our trip
  store.setup();
  gpsManager.setup();
  startInterrupt();
  gpsManager.startLocus();
  lcdCycleScreen.setup();
  State state = store.getState();
  activeScreen = state.getActiveScreen();
  char tripName[12];
  state.getTripName(tripName, 12);
  Location tripDestination = store.getTripDestination(tripName);
  trip.setDestinationLocation(tripDestination);
}

// LOOP
int lastButtonState = 0;
unsigned long lastDebounceTime;
bool buttonLocked = false;
void loop() {
  static bool foundStartingLocation = false;
  gpsManager.loop();
  if (!foundStartingLocation && gpsManager.getFix()) {
    trip.setStartingLocation(gpsManager.getLocation());
    foundStartingLocation = true;
  }
  lcdCycleScreen.render(activeScreen);

  uint16_t reading = analogRead(14);
  if (!buttonLocked && reading < 500) {
    buttonLocked = true; // lock button
    delay(300); // wait a bit to see if it's a long press
    if (analogRead(14) < 300) {
      // long
      if (activeScreen == 255) {
        lcdCycleScreen.selectTrip();
        activeScreen = 0;
      } else {
        activeScreen = 255;
        lcdCycleScreen.resetTripSelectionIndex();
      }
      while (analogRead(14) < 300) {
        // hang up until released
        delay(50); // give it some breathing room
      }
    } else {
      // short
      if (activeScreen == 255) {
        lcdCycleScreen.scrollTrips();
      } else {
        activeScreen++;
        if (activeScreen == 6) {
          activeScreen = 0;
        }
      }
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
