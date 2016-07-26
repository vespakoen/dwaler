# dwaler-nano

Dwaler for the Arduino Nano / Atmega328P

## Installation

- Install the [platformio cli tools](http://docs.platformio.org/en/latest/installation.html)
- Install the atmelavr platform `platformio platforms install atmelavr`
- Download dwaler project as a zip and extract it, or clone it via `git clone https://github.com/vespakoen/dwaler.git`
- Navigate to the nano folder on the terminal using `cd chips/nano`
- Upload to arduino nano (connected via USB) `platformio run`
- Interact with it `platformio serialports monitor --baud 115200`

## Commands

Commands are sent to the dwaler as CSV.
The first "column" is the "command id", responses that will follow will "return" the command id as the first column.

In the following examples, the < and > characters are used to show the direction of the data.

### Get the destinations header

In this example, the command id is 1, and the command is `destsh`

```
> 1,destsh
< 1,name,lat,lng
```
### Get the destinations

```
> 2,dests
< 2,BERLIN,52.52437,13.41053,2
< 2,ASIA,43.01321,163.47769,2
```

### Get trips header

```
> 3,tripsh
< 3,ts
```

### Get the trips for a destination

Notice we are sending the destination name as the "first argument"

```
> 4,trips,BERLIN
< 4,12534
< 4,53551
```

### Get trip header

```
> 5,triph
< 5,ts,lat,lng,alt
```

### Get the trip for a destination and trip number

Notice we are sending the trip number as the "second argument"

```
> 6,trip,BERLIN,1
< 6,52.504811,13.431157,39.5
< 6,52.503629,13.430138,39.5
```

### Get the live updates header

```
> 7,liveh
< 7,ts,lat,lng,alt
```

### Start live updates

Notice that this command keeps producing output, and can be stopped with the next command

```
> 8,live
< 8,,1000.000000,1000.000000,0.00
< 8,,1000.000000,1000.000000,0.00
< 8,,1000.000000,1000.000000,0.00
```

### Stop live updates

```
> 9,liveoff
```

### Get the regular updates header

```
> 10,regularh
< 10,slat,slng,dlat,dlng,sats,fix,fix,top,distance,trip
```

### Start regular updates

Notice that this command keeps producing output, and can be stopped with the next command

```
> 11,regular
< 11,50.799706,5.730079,52.504971,13.428731,0,0,0,0.00,0.00,1
< 11,50.799706,5.730079,52.504971,13.428731,0,0,0,0.00,0.00,1
< 11,50.799706,5.730079,52.504971,13.428731,0,0,0,0.00,0.00,1
```

### Stop regular updates

```
> 12,regularoff
```

### Change the destination

```
> 13,chdest,ASIA
```

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
