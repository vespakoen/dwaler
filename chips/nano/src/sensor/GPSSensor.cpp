#include "GPSSensor.h"

TinyGPS nmeaParser;

GPSSensor::GPSSensor(SoftwareSerial* softwareSerial, State* state)
{
  _softwareSerial = softwareSerial;
  _state = state;
}

void GPSSensor::setup()
{
  _softwareSerial->begin(9600);
}

void GPSSensor::loop(bool shouldUpdate)
{
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
      sprintf(_state->timestamp, "%02d-%02d-%02d %02d:%02d:%02d", day, month, year, hour, minute, second);
    }
  }
}
