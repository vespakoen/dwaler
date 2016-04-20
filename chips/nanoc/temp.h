#include <string.h>
#include "helpers.h"

float temp = 120.352;

void temp_get_state(char* dest)
{
  char tempStr[7];
  string_from_float(tempStr, temp, 1);
  memcpy(dest, tempStr, 7);
}
