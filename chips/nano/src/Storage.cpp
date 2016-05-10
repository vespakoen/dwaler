#include "Storage.h"

Storage::Storage(uint8_t csPin) {
  _csPin = csPin;
}

void Storage::setup()
{
  pinMode(_csPin, OUTPUT);
  _sd.begin(_csPin, SPI_EIGHTH_SPEED);
  Fat16::init(&_sd);
}

void Storage::append(const char* file, const char* line)
{
  Fat16 _file;
  _file.open(file, O_CREAT | O_APPEND | O_WRITE);
  _file.println(line);
  _file.close();
}

void Storage::getLines(const char* file, OnValue callback)
{
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
}
