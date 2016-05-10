#include "TinyLCD.h"

#include <stdio.h>
#include <string.h>
#include <inttypes.h>
#include "Arduino.h"

TinyLCD::TinyLCD(uint8_t rs,  uint8_t enable, uint8_t d0, uint8_t d1, uint8_t d2, uint8_t d3)
{
  _rs_pin = rs;
  _rw_pin = 255;
  _enable_pin = enable;
  _data_pins[0] = d0;
  _data_pins[1] = d1;
  _data_pins[2] = d2;
  _data_pins[3] = d3;
  _displayfunction = LCD_4BITMODE | LCD_1LINE | LCD_5x8DOTS;
}

void TinyLCD::begin(uint8_t cols, uint8_t lines, uint8_t dotsize) {
  if (lines > 1) {
    _displayfunction |= LCD_2LINE;
  }
  _numlines = lines;
  setRowOffsets(0x00, 0x40, 0x00 + cols, 0x40 + cols);
  pinMode(_rs_pin, OUTPUT);
  pinMode(_enable_pin, OUTPUT);
  // Do these once, instead of every time a character is drawn for speed reasons.
  for (uint8_t i=0; i<4; ++i)
  {
    pinMode(_data_pins[i], OUTPUT);
  }
  delayMicroseconds(50000);
  // Now we pull both RS and R/W low to begin commands
  digitalWrite(_rs_pin, LOW);
  digitalWrite(_enable_pin, LOW);
  // we start in 8bit mode, try to set 4 bit mode
  write4bits(0x03);
  delayMicroseconds(4500); // wait min 4.1ms
  // second try
  write4bits(0x03);
  delayMicroseconds(4500); // wait min 4.1ms
  // third go!
  write4bits(0x03);
  delayMicroseconds(150);
  // finally, set to 4-bit interface
  write4bits(0x02);
  // finally, set # lines, font size, etc.
  command(LCD_FUNCTIONSET | _displayfunction);
  // turn the display on with no cursor or blinking default
  _displaycontrol = LCD_DISPLAYON | LCD_CURSOROFF | LCD_BLINKOFF;
  display();
  // clear it off
  clear();
  // Initialize to default text direction (for romance languages)
  _displaymode = LCD_ENTRYLEFT | LCD_ENTRYSHIFTDECREMENT;
  // set the entry mode
  command(LCD_ENTRYMODESET | _displaymode);
}

void TinyLCD::setRowOffsets(int row0, int row1, int row2, int row3)
{
  _row_offsets[0] = row0;
  _row_offsets[1] = row1;
  _row_offsets[2] = row2;
  _row_offsets[3] = row3;
}

/********** high level commands, for the user! */
void TinyLCD::clear()
{
  command(LCD_CLEARDISPLAY);  // clear display, set cursor position to zero
  delayMicroseconds(2000);  // this command takes a long time!
}

void TinyLCD::setCursor(uint8_t col, uint8_t row)
{
  const size_t max_lines = sizeof(_row_offsets) / sizeof(*_row_offsets);
  if ( row >= max_lines ) {
    row = max_lines - 1;    // we count rows starting w/0
  }
  if ( row >= _numlines ) {
    row = _numlines - 1;    // we count rows starting w/0
  }
  command(LCD_SETDDRAMADDR | (col + _row_offsets[row]));
}

void TinyLCD::display() {
  _displaycontrol |= LCD_DISPLAYON;
  command(LCD_DISPLAYCONTROL | _displaycontrol);
}

// Allows us to fill the first 8 CGRAM locations
// with custom characters
void TinyLCD::createChar(uint8_t location, uint8_t charmap[]) {
  location &= 0x7; // we only have 8 locations 0-7
  command(LCD_SETCGRAMADDR | (location << 3));
  for (int i=0; i<8; i++) {
    write(charmap[i]);
  }
}

inline void TinyLCD::command(uint8_t value) {
  send(value, LOW);
}

inline size_t TinyLCD::write(uint8_t value) {
  send(value, HIGH);
  return 1; // assume sucess
}

void TinyLCD::send(uint8_t value, uint8_t mode) {
  digitalWrite(_rs_pin, mode);
  // if there is a RW pin indicated, set it low to Write
  write4bits(value>>4);
  write4bits(value);
}

void TinyLCD::pulseEnable(void) {
  digitalWrite(_enable_pin, LOW);
  delayMicroseconds(1);
  digitalWrite(_enable_pin, HIGH);
  delayMicroseconds(1);    // enable pulse must be >450ns
  digitalWrite(_enable_pin, LOW);
  delayMicroseconds(100);   // commands need > 37us to settle
}

void TinyLCD::write4bits(uint8_t value) {
  for (uint8_t i = 0; i < 4; i++) {
    digitalWrite(_data_pins[i], (value >> i) & 0x01);
  }
  pulseEnable();
}
