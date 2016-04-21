#ifndef LCD_H
#define LCD_H

#include <avr/io.h>
#include <util/delay.h>
#include <string.h>
#include <stdlib.h>
#include "config.h"
#include "helpers.h"

#define LCD_CLEARDISPLAY 0x01
#define SETCURSOR 0x80
#define LCD_SETCGRAMADDR 0x40

void lcd_init();
void lcd_set_ports();
void lcd_pulse_enable();
void lcd_send_nibble(uint8_t data);
void lcd_send_byte(uint8_t data);
void lcd_command(uint8_t cmd);
void lcd_data(uint8_t data);
void lcd_clear();
void lcd_set_cursor(uint8_t x, uint8_t y);
void lcd_char(uint8_t ch);
void lcd_print(const char *text);
void lcd_create_char(uint8_t location, uint8_t charmap[]);

#endif
