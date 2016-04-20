#include <string.h>
#include "helpers.h"
#include "softuart.h"

float latitude = 50.21553;
float longitude = 5.12453;
uint16_t heading = 284;

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

void gps_command(const char* cmd)
{
  while (*cmd) {
    sw_uart_send_byte(*cmd++);
  }
}

void gps_init(void) {
  sw_uart_init();
  const char* PMTK_SET_NMEA_OUTPUT_RMCONLY = "$PMTK314,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0*29";
  gps_command(PMTK_SET_NMEA_OUTPUT_RMCONLY);
  const char* PMTK_SET_NMEA_UPDATE_1HZ = "$PMTK220,1000*1F";
  gps_command(PMTK_SET_NMEA_UPDATE_1HZ);
  const char* PMTK_API_SET_FIX_CTL_1HZ = "$PMTK300,1000,0,0,0,0*1C";
  gps_command(PMTK_API_SET_FIX_CTL_1HZ);
  // char c;
  // while (1) {
  //   if (sw_uart_state == SWUART_IDLE_S) {
  //     sw_uart_receive_byte();
  //     if (sw_uart_rxdata) {
  //       lcd_char(sw_uart_rxdata);
  //     }
  //   }
  // }
}
