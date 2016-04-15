#include "SDStorageFat16.h"

SDStorageFat16::SDStorageFat16(uint8_t csPin) {
  _csPin = csPin;
}

void SDStorageFat16::setup()
{
  pinMode(_csPin, OUTPUT);
  _sd.begin(_csPin, SPI_HALF_SPEED);
  Fat16::init(&_sd);
}

uint8_t SDStorageFat16::countTrips()
{
  dir_t d;
  Fat16 _file;
  uint8_t count = 0;
  for (uint16_t i = 0; _file.readDir(&d, &i, DIR_ATT_VOLUME_ID); i++) {
    // does the file end with .TRP?
    if (d.name[8] == 'T' && d.name[9] == 'R' && d.name[10] == 'P') {
      count++;
    }
  }
  _file.close();
  return count;
}

void SDStorageFat16::getTripNames(uint8_t from, uint8_t to, OnValue callback)
{
  dir_t d;
  Fat16 _file;
  uint8_t tripIndex = 0;
  for (uint16_t j = 0; _file.readDir(&d, &j, DIR_ATT_VOLUME_ID); j++) {
    char filename[8];
    for (uint8_t i = 0; i < 8; i++) {
      filename[i] = d.name[i];
    }
    // does the file end with .TRP?
    if (d.name[8] == 'T' && d.name[9] == 'R' && d.name[10] == 'P') {
      if (tripIndex >= from && tripIndex < to) {
        callback(filename);
      }
      tripIndex++;
    }
  }
  _file.close();
}

Location SDStorageFat16::getTripDestination(const char* tripName) {
  Fat16 _file;
  char tripNameWithExt[12];
  sprintf(tripNameWithExt, "%s.%s", tripName, "TRP");
  _file.open(tripNameWithExt, O_READ);
  char tripData[21];
  uint8_t res = _file.fgets(tripData, sizeof(tripData));
  _file.close();
  float latitude = atof(strtok(tripData, ","));
  float longitude = atof(strtok(NULL, ","));
  String BREAKS_WITHOUT_THIS(latitude);
  return Location(latitude, longitude);
}

uint8_t countTraces(const char* tripName)
{
  dir_t d;
  Fat16 _file;
  uint8_t count = 0;
  for (uint16_t i = 0; _file.readDir(&d, &i, DIR_ATT_VOLUME_ID); i++) {
    bool mismatch = false
    for (uint8_t j = 0; j < sizeof(tripName); j++) {
      if (d.name[j] !== tripName[j]) {
        mismatch = true
      }
    }
    // is the filename equal to the tripname and does the file NOT end with .TRP?
    if (!mismatch && d.name[8] != 'T' && d.name[9] != 'R' && d.name[10] != 'P') {
      count++;
    }
  }
  _file.close();
  return count;
}

void getTrace(const char* tripName, uint8_t traceNum, OnValue callback)
{
  Fat16 _file;
  char lineBuffer[20];
  _file.open(printf("%s.%.2d", tripName, traceNum), O_READ);
  uint8_t i = 0;
  while ((c = _file.read() > 0) {
    if (c == '\n') {
      // call callback with line lineBuffer
      callback(lineBuffer);
      // reset lineBuffer and counter
      lineBuffer[0] = '\0';
      i = 0;
    }
    lineBuffer[i] = c;
    i++;
  }
  _file.close();
}

void SDStorageFat16::logLocation(const char* tripName, uint8_t traceId, Location location)
{
  if (location.isNullIsland()) {
    return;
  }
  Fat16 _file;
  _file.open(printf("%s.%3.d", tripName, traceId), O_CREAT | O_APPEND | O_WRITE);
  _file.println(String(location.getLatitude(), 7) + "," + String(location.getLongitude(), 7) + "," + String(location.getAltitude(), 2));
  _file.close();
}

void getTrace(const char* tripName, uint8_t traceNum, OnValue callback);

State SDStorageFat16::getState()
{
  Fat16 _file;
  char stateData[14];
  _file.open("STATE.CFG", O_READ);
  _file.fgets(stateData, sizeof(stateData));
  _file.close();
  uint8_t activeScreen = (uint8_t) atoi(strtok(stateData, ","));
  const char *tripName = strtok(NULL, ",");
  return State(activeScreen, tripName);
}

void SDStorageFat16::putState(State state)
{
  Fat16 _file;
  char stateData[18];
  state.toString(stateData);
  _file.open("STATE.CFG", O_CREAT | O_WRITE);
  _file.println(stateData);
  _file.close();
}
