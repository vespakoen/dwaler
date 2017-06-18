#include "Fat16Storage.h"

Fat16Storage::Fat16Storage(uint8_t csPin) {
  _csPin = csPin;
}

void Fat16Storage::setup()
{
  #ifndef MOCK
  pinMode(_csPin, OUTPUT);
  _sd.begin(_csPin, SPI_EIGHTH_SPEED);
  Fat16::init(&_sd);
  #endif
}

void Fat16Storage::append(const char* file, const char* line)
{
  #ifndef MOCK
  Fat16 _file;
  _file.open(file, O_CREAT | O_APPEND | O_WRITE);
  _file.println(line);
  _file.close();
  #else
  Serial.print("Writing: ");
  Serial.print(line);
  Serial.print(" to file: ");
  Serial.println(file);
  #endif
}

void Fat16Storage::getLines(const char* file, OnValue callback)
{
  #ifndef MOCK
  Fat16 _file;
  char lineBuffer[100];
  if (!_file.open(file, O_READ)) {
    return;
  }
  while ((_file.fgets(lineBuffer, 100)) > 0)  {
    callback(lineBuffer);
  }
  _file.close();
  #else
  if (strcmp(file, "STATE") == 0) {
    callback((char *)"BERLIN");
  }
  if (strcmp(file, "DESTS") == 0) {
    callback((char *)"BERLIN");
    callback((char *)"ASIA");
    callback((char *)"PORTO");
  }
  if (strcmp(file, "BERLIN.1") == 0) {
    callback((char *)"52.504811,13.431157,39.5");
    callback((char *)"52.503629,13.430138,39.5");
  }
  if (strcmp(file, "BERLIN.TRP") == 0) {
    callback((char *)"12534");
    callback((char *)"53551");
  }
  if (strcmp(file, "ASIA.TRP") == 0) {
    callback((char *)"12534");
    callback((char *)"14534");
    callback((char *)"24534");
    callback((char *)"53551");
  }
  if (strcmp(file, "BERLIN.LOC") == 0) {
    callback((char *)"52.52437,13.41053");
  }
  #endif
}

void Fat16Storage::getFirstLine(const char* file, OnValue callback)
{
  #ifndef MOCK
  Fat16 _file;
  char lineBuffer[100];
  if (!_file.open(file, O_READ)) {
    return;
  }
  while ((_file.fgets(lineBuffer, 100)) > 0)  {
    callback(lineBuffer);
    break;
  }
  _file.close();
  #else
  if (strcmp(file, "TRIP.1") == 0) {
    callback((char *)"52.504811,13.431157,39.5");
  }
  #endif
}

uint16_t Fat16Storage::countLines(const char* file)
{
  #ifndef MOCK
  Fat16 _file;
  char c;
  if (!_file.open(file, O_READ)) {
    return 0;
  }
  uint16_t lines = 0;
  while ((c = _file.read()) > 0) {
    if (c == '\n') {
      // call callback with line lineBuffer
      lines++;
    }
  }
  _file.close();
  return lines;
  #else
  return 2;
  #endif
}
