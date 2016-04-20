#include "lcd.h"
#include <avr/pgmspace.h>

const char _headingString[] PROGMEM = "W-+--+-nN-+--+-eE-+--+-sS-+--+-w";

const unsigned char font[8][8] PROGMEM = {
  { 0x1E,0x1F,0x1B,0x19,0x18,0x18,0x18,0x18 },
  { 0x3,0x3,0x3,0x13,0x1B,0x1F,0xF,0x7 },
  { 0xF,0xF,0xC,0xF,0xF,0xC,0xF,0xF },
  { 0x1E,0x1E,0x0,0x18,0x18,0x0,0x1E,0x1E },
  { 0x1F,0x1F,0x18,0x1F,0x1F,0x0,0x1F,0x1F },
  { 0x1F,0x1F,0x0,0x1F,0x1F,0x3,0x1F,0x1F },
  { 0x18,0x18,0x18,0x1C,0xD,0xD,0xF,0x7 },
  { 0x3,0x3,0x3,0x7,0x16,0x16,0x1E,0x1C }
};

void lcd_display_init(void)
{
  lcd_init();
  lcd_display_add_custom_chars();
  lcd_display_render_compass_screen();
}

void lcd_display_add_custom_chars(void)
{
  for (uint8_t i = 0; i < 8; i++) {
    uint8_t buffer[8];
    for (uint8_t j = 0; j < 8; j++) {
      buffer[j] = pgm_read_word_near(&(font[i][j]));
    }
    lcd_create_char(i, buffer);
  }
}

void lcd_display_render_compass_screen(void)
{
  lcd_set_cursor(0, 0);
  lcd_message("       <>       ");
  lcd_set_cursor(0, 1);
  uint8_t _cutStart = round(180 / 11.25);
  for (uint8_t k = _cutStart; k <= _cutStart + 16; k++) {
    char character;
    if (k > 31) {
      character = (char) pgm_read_byte_near(&_headingString[k - 32]);
    } else {
      character = (char) pgm_read_byte_near(&_headingString[k]);
    }
    if (character == 'n') {
      lcd_char(0x0);
    } else if (character == 'N') {
      lcd_char(0x1);
    } else if (character == 'e') {
      lcd_char(0x2);
    } else if (character == 'E') {
      lcd_char(0x3);
    } else if (character == 's') {
      lcd_char(0x4);
    } else if (character == 'S') {
      lcd_char(0x5);
    } else if (character == 'w') {
      lcd_char(0x6);
    } else if (character == 'W') {
      lcd_char(0x7);
    } else {
      lcd_char(character);
    }
  }
}
