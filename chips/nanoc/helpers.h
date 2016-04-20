#ifndef HELPERS_H
#define HELPERS_H

#include <string.h>
#include <stdio.h>

#define BV(bit)               (1 << bit)
#define set_bit(byte, bit)    (byte |= BV(bit))  // old sbi()
#define clear_bit(byte, bit)  (byte &= ~BV(bit)) // old cbi()
#define toggle_bit(byte, bit) (byte ^= BV(bit))

void string_from_float(char *dest, float src, uint8_t decimals)
{
  char sprintfOp[7];
  memcpy(sprintfOp, "%.", 3);
  char decimalsStr[4];
  itoa(decimals, decimalsStr, 10);
  strcat(sprintfOp, decimalsStr);
  strcat(sprintfOp, "f");
  sprintf(dest, sprintfOp, src);
}

#endif
