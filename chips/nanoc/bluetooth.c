#include "bluetooth.h"

void bluetooth_init(void)
{
  // set baudrate
  UBRR0 = BLUETOOTH_BAUD_PRESCALER;
  // enable serial
  set_bit(UCSR0B, RXEN0);
  set_bit(UCSR0B, TXEN0);
  // enable interrupt
  set_bit(UCSR0B, RXCIE0);
  // asynchronous
  set_bit(UCSR0C, UCSZ01);
  // 8N1 mode
  set_bit(UCSR0C, UCSZ00);
  sei();
}

void bluetooth_char(char c)
{
  loop_until_bit_is_set(UCSR0A, UDRE0);
  UDR0 = c;
}

void bluetooth_print(const char *str)
{
  while (*str) {
    bluetooth_char(*str++);
  }
}

ISR(USART_RX_vect)
{
  char c = UDR0;
  // get header
  if (c == 'h') {
    bluetooth_print("gps:heading,latitude,longitude;temp:degrees");
  }
  // get state
  if (c == 's') {
    // char stateStr[35];
    // char gpsStateStr[28];
    // gps_get_state(stateStr);
    // strcat(stateStr, gpsStateStr);
    // strcat(stateStr, ";");
    // char tempStateStr[7];
    // temp_get_state(tempStateStr);
    // strcat(stateStr, tempStateStr);
    // bluetooth_print(stateStr);
  }
}
