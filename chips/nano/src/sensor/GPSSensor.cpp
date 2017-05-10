#include "GPSSensor.h"

TinyGPS nmeaParser;

GPSSensor::GPSSensor(SoftwareSerial* softwareSerial, State* state)
{
  _softwareSerial = softwareSerial;
  _state = state;
}

void GPSSensor::setup()
{
  #ifndef MOCK
  _softwareSerial->begin(9600);
  #endif
}

void GPSSensor::loop(bool shouldUpdate)
{
  #ifndef MOCK
  // parse incoming data
  if (_softwareSerial->available()) {
    nmeaParser.encode(_softwareSerial->read());
  }
  // update state
  if (shouldUpdate) {
    // remember previous location for distance calculation
    Location lastLocation = {_state->currentLocation.latitude, _state->currentLocation.longitude};
    // update location
    unsigned long age;
    nmeaParser.f_get_position(&_state->currentLocation.latitude, &_state->currentLocation.longitude, &age);
    // update fix
    _state->fix = age != TinyGPS::GPS_INVALID_AGE;
    if (_state->fix) {
      _state->currentLocation.altitude = nmeaParser.f_altitude();
      // update speed
      _state->speed = nmeaParser.f_speed_kmph();
      // update fix quality
      // _state->fixquality = nmeaParser.fixquality;
      // update course
      _state->course = (uint16_t) nmeaParser.f_course();
      // update top speed
      if (_state->speed > _state->topSpeed) {
        _state->topSpeed = _state->speed;
      }
      // update travelled distance
      _state->travelledDistance = _state->travelledDistance + _state->currentLocation.distanceTo(lastLocation);
      // update timestamp
      int year;
      byte month, day, hour, minute, second, hundredths;
      nmeaParser.crack_datetime(&year, &month, &day, &hour, &minute, &second, &hundredths, &age);
      sprintf(_state->timestamp, "%02d%02d%02d%02d%02d%02d", year, month, day, hour, minute, second);
    }
  }
  #else
  if (shouldUpdate) {
    _state->fix = 1;
    _state->currentLocation.latitude = _state->currentLocation.latitude ? _state->currentLocation.latitude + 0.005 : 50.85;
    _state->currentLocation.longitude = _state->currentLocation.longitude ? _state->currentLocation.longitude + 0.005 : 5.6833;
    _state->currentLocation.altitude = _state->currentLocation.altitude ? _state->currentLocation.altitude + 0.005 : 50;
    _state->speed = _state->speed ? _state->speed + 1 : 30;
    _state->course = _state->course ? _state->course + 10 : _state->currentLocation.bearingTo(_state->destinationLocation);
    if (_state->course > 360) {
      _state->course = 0;
    }
    _state->travelledDistance = _state->travelledDistance ? _state->travelledDistance + 1 : 12;
    strncpy(_state->timestamp, "20170421223912", 15);
  }
  #endif
}
