#ifndef SOFTUART_H
#define SOFTUART_H

#include <avr/interrupt.h>

// Bits in SW_UART_status
#define SWUART_IDLE_S 0x00
#define SWUART_TX_S   0x01
#define SWUART_RX_S   0x02

extern volatile char sw_uart_state; // State of the uart
extern volatile char sw_uart_rxdata; // Received byte

/****
 * Timer 0 Compare interrupt
 * Used for timing receive and transmits
 ****/
ISR(TIMER0_COMPA_vect);

/****
 * Receive interrupt -- External falling edge
 * Triggered on falling edge, beginning of
 * start bit.
 ****/
ISR(INT0_vect);

/****
 * Initializes sw_uart
 ****/
void sw_uart_init();

/****
 * Sets the microcontroller to enable
 * receiving a byte
 ****/
void sw_uart_receive_byte();

/****
 * Sets the microcontroller to send a byte
 * bit by bit. 
 ****/
void sw_uart_send_byte(char c);


/****
 * Reset serial communications
 * Clears interrupts
 ****/
void sw_uart_reset();
#endif
