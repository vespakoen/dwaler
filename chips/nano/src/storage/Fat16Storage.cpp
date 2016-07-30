// #define MOCK 1
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
  #endif
}

void Fat16Storage::getLines(const char* file, OnValue callback)
{
  #ifndef MOCK
  Fat16 _file;
  char lineBuffer[100];
  char c;
  _file.open(file, O_READ);
  uint8_t i = 0;
  while ((c = _file.read()) > 0) {
    if (c == '\n') {
      // add eol char
      lineBuffer[i] = '\0';
      // call callback with line lineBuffer
      callback(lineBuffer);
      // reset lineBuffer and counter
      lineBuffer[0] = '\0';
      i = 0;
    } else {
      lineBuffer[i] = c;
      i++;
    }
  }
  _file.close();
  #else
  if (strcmp(file, "DESTS") == 0) {
    callback("BERLIN,52.52437,13.41053");
    callback("ASIA,43.01321,163.47769");
  }
  if (strcmp(file, "BERLIN-1") == 0) {
    callback("52.504811,13.431157,39.5");
    callback("52.503629,13.430138,39.5");
  }
  if (strcmp(file, "BERLIN.TRP") == 0) {
    callback("12534");
    callback("53551");
  }
  #endif
}

uint8_t Fat16Storage::countLines(const char* file)
{
  #ifndef MOCK
  Fat16 _file;
  char c;
  _file.open(file, O_READ);
  uint8_t lines = 0;
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
