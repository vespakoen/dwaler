#include "lcd.h"
#include "lcd_display.h"
#include "bluetooth.h"
#include "gps.h"

int main(void) {
  lcd_init();
  lcd_display_init();
  bluetooth_init();
  gps_init();
  while (1);
}
