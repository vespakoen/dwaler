#!/bin/sh

MCU="atmega328p"
F_CPU="16000000"
PROJECT_PATH="/home/koen/lcdtest"
BUILD_PATH="build"
USB_PORT="/dev/ttyUSB3"

rm -rf $BUILD_PATH
mkdir $BUILD_PATH
avr-gcc -w -Os -Wl,--gc-sections -Wl,-u,vfprintf -lprintf_flt -lm -mmcu=$MCU -DF_CPU=$F_CPU -Wall -Wextra -o $BUILD_PATH/main.elf main.c -L$PROJECT_PATH -lm
avr-objcopy -O ihex -j .eeprom --set-section-flags=.eeprom=alloc,load --no-change-warnings --change-section-lma .eeprom=0  $BUILD_PATH/main.elf $BUILD_PATH/main.eep
avr-objcopy -O ihex -R .eeprom  $BUILD_PATH/main.elf $BUILD_PATH/main.hex
avrdude -v -p$MCU -carduino -P$USB_PORT -b57600 -D -Uflash:w:$BUILD_PATH/main.hex:i
