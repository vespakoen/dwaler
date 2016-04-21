#ifndef BLUETOOTH_H
#define BLUETOOTH_H

#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>
#include <string.h>
#include "helpers.h"
#include "config.h"

void bluetooth_init(void);
void bluetooth_char(char c);
void bluetooth_print(const char *str);
ISR(USART_RX_vect);

#endif
