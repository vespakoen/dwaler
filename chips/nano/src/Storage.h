#ifndef h_Storage
#define h_Storage

#include "Arduino.h"
#include <Fat16.h>
#include "Location.h"
#include "State.h"

typedef void (*OnValue)(const char* line);

class Storage {
  public:
    Storage(uint8_t csPin);
    void setup();
    void append(const char* file, const char* line);
    void getLines(const char* file, OnValue callback);
  private:
    uint8_t _csPin;
    SdCard _sd;
};

#endif
