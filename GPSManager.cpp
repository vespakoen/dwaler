#include "GPSManager.h"

GPSManager::GPSManager(Adafruit_GPS *gps, Trip *trip, SDStorageFat16 *store)
{
  _gps = gps;
  _trip = trip;
  _store = store;
  uint32_t _timer = millis();
}

void GPSManager::setup()
{
  _gps->begin(9600);
  // set GPS output mode
  // _gps->sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  _gps->sendCommand(PMTK_SET_NMEA_OUTPUT_RMCONLY);
  // set update rate to once per second
  _gps->sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);
  _gps->sendCommand(PMTK_API_SET_FIX_CTL_1HZ);
}

void GPSManager::startLocus()
{
  // start locus
  // delay(500);
  // _gps->LOCUS_StartLogger();
  // delay(1000);
}

void GPSManager::loop()
{
  static Location lastLocation;
  float speed = getSpeed();
  if (speed > _topSpeed) {
    _trip->setTopSpeed(speed);
    _topSpeed = speed;
  }
  if (_gps->newNMEAreceived()) {
    _gps->parse(_gps->lastNMEA());
  }
  if (millis() - _timer > 10000) { //  && _gps->LOCUS_ReadStatus()
    Location currentLocation = getLocation();
    _store->logLocation(currentLocation);
    if (!lastLocation.isNullIsland()) {
      _trip->setTravelledDistance(_trip->getTravelledDistance() + lastLocation.distanceTo(currentLocation));
    }
    lastLocation = currentLocation;
    _timer = millis();
    // _trip->setTravelledDistance(_gps->LOCUS_distance);
    // _trip->setAverageSpeed(_gps->LOCUS_speed * 3.6); // m/s to km/h
  }
}

Location GPSManager::getLocation()
{
  float latitude = _nmeaToDecimalDegrees(_gps->latitude, _gps->lat);
  float longitude = _nmeaToDecimalDegrees(_gps->longitude, _gps->lon);
  return Location(latitude, longitude, _gps->altitude);
}

uint16_t GPSManager::getHeading()
{
  return (uint16_t) _gps->angle;
}

float GPSManager::getSpeed()
{
  return _gps->speed * 1.852; // convert to KM/h
}

bool GPSManager::getFix()
{
  return _gps->fix;
}

unsigned int GPSManager::getFixQuality()
{
  return (unsigned int) _gps->fixquality;
}

unsigned int GPSManager::getSatellites()
{
  return (unsigned int) _gps->satellites;
}

void GPSManager::clearLog()
{
  _gps->sendCommand(PMTK_LOCUS_ERASE_FLASH);
}

// Convert NMEA coordinate to decimal degrees
float GPSManager::_nmeaToDecimalDegrees(float nmeaCoord, char dir) {
  uint16_t wholeDegrees = 0.01 * nmeaCoord;
  int modifier = 1;
  if (dir == 'W' || dir == 'S') {
    modifier = -1;
  }
  return (wholeDegrees + (nmeaCoord - 100.0 * wholeDegrees) / 60.0) * modifier;
}
