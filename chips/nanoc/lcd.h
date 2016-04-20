#include <avr/io.h>
#include <util/delay.h>
#include <string.h>
#include <stdlib.h>
#include "config.h"
#include "helpers.h"

#define LCD_CLEARDISPLAY 0x01
#define SETCURSOR 0x80
#define LCD_SETCGRAMADDR 0x40

void lcd_set_ports()
{
  LCD_DDR = LCD_ALL_OUTPUT;
}

void lcd_pulse_enable()
{
  set_bit(LCD_PORT, LCD_E); // take LCD enable line high
  _delay_us(40); // wait 40 microseconds
  clear_bit(LCD_PORT, LCD_E); // take LCD enable line low
}

void lcd_send_nibble(uint8_t data)
{
  LCD_PORT &= CLEAR_DATA_BITS;
  if (data & _BV(4)) set_bit(LCD_PORT, LCD_DAT4);
  if (data & _BV(5)) set_bit(LCD_PORT, LCD_DAT5);
  if (data & _BV(6)) set_bit(LCD_PORT, LCD_DAT6);
  if (data & _BV(7)) set_bit(LCD_PORT, LCD_DAT7);
  lcd_pulse_enable(); // clock 4 bits into controller
}

void lcd_send_byte(uint8_t data)
{
  lcd_send_nibble(data); // send upper 4 bits
  lcd_send_nibble(data << 4); // send lower 4 bits
}

void lcd_command(uint8_t cmd)
{
  clear_bit(LCD_PORT, LCD_RS); // R/S line 0 = command data
  lcd_send_byte(cmd); // send it
}

void lcd_data(uint8_t data)
{
  set_bit(LCD_PORT, LCD_RS); // R/S line 0 = command data
  lcd_send_byte(data); // send it
}

void lcd_init()
{
  lcd_set_ports();
  lcd_command(0x33); // initialize controller
  lcd_command(0x32); // set to 4-bit input mode
  lcd_command(0x28); // 2 line, 5x7 matrix
  lcd_command(0x0C); // turn cursor off (0x0E to enable)
  lcd_command(0x06); // cursor direction = right
  lcd_command(LCD_CLEARDISPLAY); // start with clear display
  _delay_ms(3); // wait for LCD to initialize
}

void lcd_clear() // clear the LCD display
{
  lcd_command(LCD_CLEARDISPLAY);
  _delay_ms(3); // wait for LCD to process command
}

void lcd_set_cursor(uint8_t x, uint8_t y) // put LCD cursor on specified line
{
  uint8_t addr = 0; // line 0 begins at addr 0x00
  switch (y)
  {
    case 1: addr = 0x40; break; // line 1 begins at addr 0x40
    case 2: addr = 0x14; break;
    case 3: addr = 0x54; break;
  }
  lcd_command(SETCURSOR + addr + x); // update cursor with x,y position
}

void lcd_char(uint8_t ch)
{
  set_bit(LCD_PORT, LCD_RS); // R/S line 1 = character data
  lcd_send_byte(ch); // send it
}

void lcd_message(const char *text) // display string on LCD
{
  while (*text) // do until /0 character
  lcd_char(*text++); // send char & update char pointer
}

void lcd_create_char(uint8_t location, uint8_t charmap[]) {
  location &= 0x7; // we only have 8 locations 0-7
  lcd_command(LCD_SETCGRAMADDR | (location << 3));
  for (int i=0; i<8; i++) {
    lcd_data(charmap[i]);
  }
}
