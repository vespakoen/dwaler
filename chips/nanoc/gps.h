#ifndef GPS_H
#define GPS_H

#include <string.h>
#include <stdint.h>
#include <stdio.h>
#include <avr/interrupt.h>
#include "helpers.h"
#include "lcd.h"
#include "bluetooth.h"
#include "softuart.h"

float latitude;
float longitude;
uint16_t heading;

void gps_get_state(char* dest);
void gps_init();
void gps_command(const char* cmd);

#endif
