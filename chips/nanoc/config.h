// Bluetooth baudrate (hardware serial)
#define BAUDRATE 9600

// GPS ports (software serial)
#define SWUART_PORT  PORTD
#define SWUART_PIN   PIND
#define SWUART_TXPIN PIND3
#define SWUART_RXPIN PIND2
#define SWUART_DDRD  DDRD

// LCD ports (configured as analog pins 0 to 5)
#define LCD_DDR DDRC
#define LCD_PORT PORTC
#define LCD_RS 5 // pin for LCD R/S (eg PB0)
#define LCD_E 0 // pin for LCD enable
#define LCD_DAT4 4 // pin for d4
#define LCD_DAT5 3 // pin for d5
#define LCD_DAT6 2 // pin for d6
#define LCD_DAT7 1 // pin for d7
#define CLEAR_DATA_BITS 0xE1; // 1110.0001 = clear 4 data lines
#define LCD_ALL_OUTPUT 0x3F; // 0011.1111; set C0-C5 as outputs

// internals
#define BAUD_PRESCALER (((F_CPU / (BAUDRATE * 16UL))) - 1)
