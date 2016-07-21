#ifndef h_State
#define h_State

#include "Arduino.h"
#include "Location.h"

typedef struct State {
    Location startingLocation;
    Location destinationLocation;
    Location currentLocation;
    char timestamp[32];
    uint16_t course;
    uint8_t satellites;
    bool fix;
    uint8_t fixquality;
    float speed;
    float topSpeed;
    float avgSpeed;
    float travelledDistance;
    String liveHeaderToString();
    String liveToString();
    String regularHeaderToString();
    String regularToString();
} State;

#endif
