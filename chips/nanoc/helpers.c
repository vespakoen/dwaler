#include "helpers.h"

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
