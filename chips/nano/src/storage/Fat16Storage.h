#ifndef h_Fat16Storage
#define h_Fat16Storage

#include <Arduino.h>
#include <Fat16.h>

typedef void (*OnValue)(const char* line);

class Fat16Storage {
  public:
    Fat16Storage(uint8_t csPin);
    void setup();
    void append(const char* file, const char* line);
    void getLines(const char* file, OnValue callback);
    uint8_t countLines(const char* file);
  private:
    uint8_t _csPin;
    SdCard _sd;
};

#endif
