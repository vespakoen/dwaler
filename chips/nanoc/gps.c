#include "gps.h"

// #include <util/delay.h>

float latitude = 50.21553;
float longitude = 5.12453;
uint16_t heading = 284;

void gps_init() {
  // softuart_init();
  // softuart_turn_rx_on();
  sw_uart_init();
  const char* PMTK_LOCUS_QUERY_STATUS = "$PMTK183*38";
  const char* PMTK_SET_NMEA_OUTPUT_RMCONLY = "$PMTK314,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0*29";
  const char* PMTK_SET_NMEA_UPDATE_1HZ = "$PMTK220,1000*1F";
  const char* PMTK_API_SET_FIX_CTL_1HZ = "$PMTK300,1000,0,0,0,0*1C";
  gps_command(PMTK_SET_NMEA_OUTPUT_RMCONLY);
  // _delay_ms(40);
  gps_command(PMTK_SET_NMEA_UPDATE_1HZ);
  // _delay_ms(40);
  gps_command(PMTK_API_SET_FIX_CTL_1HZ);
  // _delay_ms(40);
  // gps_command(PMTK_LOCUS_QUERY_STATUS);
  lcd_set_cursor(0, 0);
  lcd_print("boy");
  lcd_char('s');
  bluetooth_print("oohs");
  // char c;
  for (;;) {
    // lcd_char(sw_uart_state);
    if (sw_uart_state == SWUART_IDLE_S) {
      lcd_char('i');
      bluetooth_char('i');
      if (sw_uart_rxdata) {
        lcd_char(sw_uart_rxdata);
        bluetooth_char(sw_uart_rxdata);
      }
    } else {
      lcd_char('r');
      bluetooth_char('r');
      sw_uart_receive_byte();
    }
    // uint8_t Adafruit_GPS::parseHex(char c) {
    //     if (c < '0')
    //       return 0;
    //     if (c <= '9')
    //       return c - '0';
    //     if (c < 'A')
    //        return 0;
    //     if (c <= 'F')
    //        return (c - 'A')+10;
    //     // if (c > 'F')
    //     return 0;
    // }

    // if (softuart_kbhit()) {
      // lcd_char('b');
      // c = softuart_getchar();
      // sw_uart_receive_byte();
      // lcd_char(c);
      // bluetooth_char(c);
    // }
  }
}

void gps_command(const char* cmd)
{
  while (*cmd) {
    // softuart_putchar(*cmd++);
    sw_uart_send_byte(*cmd++);
  }
}

void gps_get_state(char* dest)
{
  char headingStr[4];
  itoa(heading, headingStr, 10);
  memcpy(dest, headingStr, 4);
  strcat(dest, ",");
  char latitudeStr[12];
  string_from_float(latitudeStr, latitude, 7);
  strcat(dest, latitudeStr);
  strcat(dest, ",");
  char longitudeStr[12];
  string_from_float(longitudeStr, longitude, 7);
  strcat(dest, longitudeStr);
}
