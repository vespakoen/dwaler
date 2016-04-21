#ifndef LCD_DISPLAY_H
#define LCD_DISPLAY_H

#include "lcd.h"
#include <avr/pgmspace.h>

void lcd_display_init();
void lcd_display_add_custom_chars();
void lcd_display_render_compass_screen();

#endif
