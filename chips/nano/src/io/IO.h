#ifndef h_IO
#define h_IO

#include <Arduino.h>
// #include "../State.h"
#include "../config.h"

class IO {
  public:
    IO(
      // State *state
    );
    void setup();
    void loop(bool shouldUpdate);
  private:
    // State *_state;
    Fat16Storage *_store;
};

#endif
