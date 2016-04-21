/*****
 * Software Half-duplex UART Driver
 * Henry Chan (hc352 @cornell.edu)
 * Based on AVR304
 *
 * Sample Usage:
 * RECEIVING
 * sw_uart_receive_byte();
 * // Other instructions while receiving
 * if (sw_uart_state == IDLE) {
 *    x = sw_uart_rxdata;
 * }
 *
 * TRANSMITTING
 * sw_uart_send_byte(c);
 * // Other instructions while transmitting
 * if (sw_uart_state == IDLE) {
 *    //Stuff when transmission done
 * }
 ****/

#include "softuart.h"

/****
 * sw_uart_states:
 * IDLE -- Neither transmitting or receiving
 * TX -- Transmitting a byte
 * RX -- Receiving a byte
 ****/
volatile char sw_uart_state;

volatile char sw_uart_rxdata; // Received byte
char sw_uart_txdata; // Byte to transmit

volatile char bitcount; // Bits received or transmitted

void sw_uart_init() {
  // Set pin directions
  SWUART_DDR |= (1<<SWUART_TXPIN);
  //  SWUART_DDR &= ~(1<<SWUART_RXPIN);
  // Tri-state receive port pull-up
  //  SWUART_PORT |= (1<<SWUART_RXPIN);
  // Output high on transmit port
  SWUART_PORT |= (1<<SWUART_TXPIN);
  // Setup timer 0 for compare match and prescaler
  TCCR0A |= (1<<WGM01); // CTC mode
  // Turn off clock
  TCCR0B &= ~((1<<CS01) | (1<<CS00)); // Prescaler = 64
  // Enable interrupt on clock 0
  TIMSK0 |= (1<<OCIE0A);
  // Setup external interrupt 0 for falling edge
  EICRA |= (1<<ISC01);
  // Set default state and bitcount
  sw_uart_state = SWUART_IDLE_S;
  sw_uart_rxdata = 0x00;
  sw_uart_txdata = 0x00;
  bitcount = 0;
  // Enable interrupts
  sei();
}

ISR(INT0_vect) {
  // Disable external interrupt
  EIMSK &= ~(1<<INT0);
  // Setup timer 0 for 1.5 bit delay
  TCCR0B &= ~((1<<CS01) | (1<<CS00));
  //OCR0A = 119; // 1.5*80=120 for 3125bps
  OCR0A = SWUART_TIMERTOP;// 1.5*54 = 81
  TCNT0 = 0;
  // Enable timer 0 cmp match interrupt
  TCCR0B |= (1<<CS01) | (1<<CS00);
}

ISR(TIMER0_COMPA_vect) {
  switch(sw_uart_state) {
    // RECEIVING
  case SWUART_RX_S:
    // Check if byte has been read
    // If read byte already,
    if (bitcount >= 8) {
      // Disable timer
      TCCR0B &= ~((1<<CS01) | (1<<CS00));
      // Set IDLE
      sw_uart_state = SWUART_IDLE_S;
    } else {
      // If still needs reading, proceed
      // Load bit into received data
      sw_uart_rxdata |= ( ( (SWUART_PIN & ( 1<<SWUART_RXPIN ) ) >>
          SWUART_RXPIN )<<bitcount );
      // Increment bit count
      bitcount++;
      // Setup timer 0 for 1 bit delay
      TCCR0B &= ~((1<<CS01) | (1<<CS00));
      // OCR0A = 53;//~4629BPS
      OCR0A = SWUART_TIMERTOP;
      // Reset timer
      TCNT0 = 0;
      TCCR0B |= (1<<CS01) | (1<<CS00);
    }
    break;

    // TRANSMITTING
  case SWUART_TX_S:
    // Check if byte transmitted
    if (bitcount < 8) {
      // If byte not done transmitting
      // Transmit bit
      if (sw_uart_txdata & (1<<bitcount)) {
  SWUART_PORT |= (1<<SWUART_TXPIN); // Transmit HIGH
      } else {
  SWUART_PORT &= ~(1<<SWUART_TXPIN); // Transmit LOW
      }
      // Increment bitcount
      bitcount++;
    } else if (bitcount == 8) {
      // If byte transmitted
      // Send stop bit
      SWUART_PORT |= (1<<SWUART_TXPIN);
      // Increment bitcount
      bitcount++;
    } else if (bitcount > 8) {
      // If byte+1bit (stop bit) transmitted
      TCCR0B &= ~((1<<CS01) | (1<<CS00));
      // Set IDLE
      sw_uart_state = SWUART_IDLE_S;
    }
    break;
    // Weird state...
  default:
    sw_uart_state = SWUART_IDLE_S;
  }
}

void sw_uart_send_byte(char c) {
  // Check to see if idle
  // If not idle, wait until idle
  while (sw_uart_state != SWUART_IDLE_S);
  // Set state to transmit
  sw_uart_state = SWUART_TX_S;
  // Reset transmit bit count
  bitcount = 0;
  // Put character in transmit buffer
  sw_uart_txdata = c;
  // Stop counter
  TCCR0B &= ~((1<<CS01) | (1<<CS00)); // Prescaler = 64
  // Reset count
  TCNT0 = 0;
  // Setup timer 0 for baud rate
  // OCR0A = 53;
  OCR0A = SWUART_TIMERTOP;

  // Set transmit port low (falling edge start bit)
  SWUART_PORT &= ~(1<<SWUART_TXPIN);
  // Enable counter
  TCCR0B |= (1<<CS01) | (1<<CS00);

}

void sw_uart_receive_byte() {
  // Check to see if idle
  // If not idle, wait until idle
  while (sw_uart_state != SWUART_IDLE_S);
  // Set state to receive
  sw_uart_state = SWUART_RX_S;
  // Reset receive bit count
  bitcount = 0;
  // Empty received data
  sw_uart_rxdata = 0x00;
  // Clear flags.
  EIFR |= (1<<INTF0);
  // Enable external interrupt
  EIMSK |= (1<<INT0);
}

void sw_uart_reset() {
  // Disable timer
  TCCR0B &= ~((1<<CS01) | (1<<CS00));
  // Set IDLE
  sw_uart_state = SWUART_IDLE_S;
  EIMSK &= ~(1<<INT0);
  // Reset receive bit count
  bitcount = 0;
  // Empty received data
  sw_uart_rxdata = 0x00;
  // Clear flags.
  EIFR |= (1<<INTF0);
}
