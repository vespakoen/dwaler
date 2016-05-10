# dwaler-nano

Dwaler for the Arduino Nano / Atmega328P

## Installation

- Install the [platformio cli tools](http://docs.platformio.org/en/latest/installation.html)
- Install the atmelavr platform `platformio platforms install atmelavr`
- Download dwaler project as a zip and extract it, or clone it via `git clone https://github.com/vespakoen/dwaler.git`
- Navigate to the nano folder on the terminal using `cd chips/nano`
- Upload to arduino nano (connected via USB) `platformio run`

## Hardware

- SD card reader for logging coordinates
- Fat16 formatted SD card (8MB up to 2GB)
- GPS module
- 16x2 LCD display
- Potentiometer or resistor with correct resistance for LCD brightness control

## Wiring

### SD

- **SS** D4
- **MOSI** D11
- **MISO** D12
- **SCK** D13
- **VCC** +5v or +3v depending on the reader
- **GND** GND

### LCD

- **RS** A5
- **E / ENABLE** A0
- **D4** A4
- **D5** A3
- **D6** A2
- **D7** A1

**Note: you need a couple of extra wires going to ground and add a potentiometer or resistor with the right value for brightness control**, more on that here https://www.google.com/search?q=lcd+wiring+arduino+nano

### GPS

- **TX** D3
