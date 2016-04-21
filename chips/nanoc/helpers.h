#ifndef HELPERS_H
#define HELPERS_H

#include <string.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define BV(bit)               (1 << bit)
#define set_bit(byte, bit)    (byte |= BV(bit))  // old sbi()
#define clear_bit(byte, bit)  (byte &= ~BV(bit)) // old cbi()
#define toggle_bit(byte, bit) (byte ^= BV(bit))

void string_from_float(char *dest, float src, uint8_t decimals);

#endif
