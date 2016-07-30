# dwaler

[![Build Status](https://ci.koenschmeets.nl/api/badges/vespakoen/dwaler/status.svg)](https://ci.koenschmeets.nl/vespakoen/dwaler)

**Wander round without being commanded**

Dwaler is an navigation system for on your ((motor)cycle) and runs on a Arduino Nano.

## Features

- **Select destination** This allows you to choose between destinations that are uploaded to the dwaler via USB (bluetooth in the future).

![Trip selector](https://github.com/vespakoen/dwaler/blob/master/screenshots/tripselector.png?raw=true)

- **Compass** This is the main feature, it shows you where you should be heading, and where you are currently heading to. I even added some custom characters (stored in PROGMEM) to clearly see where you are heading.

This image shows you are almost heading in the right direction, just have to turn left a bit.  
![Compass in range](https://github.com/vespakoen/dwaler/blob/master/screenshots/compass-in-range.png?raw=true)

This image shows you should turn right (90 degrees)  
![Compass out of range](https://github.com/vespakoen/dwaler/blob/master/screenshots/compass-out-of-range.png?raw=true)

- **Progress** This shows you how far away the destination is from your starting point and how far the destination is from your current position. On top of that, it shows a little progress bar for a quick overview.

![Progress](https://github.com/vespakoen/dwaler/blob/master/screenshots/progress.png?raw=true)

- **Speed** This shows you the current and average speed.

![Speed](https://github.com/vespakoen/dwaler/blob/master/screenshots/speed.png?raw=true)

- **Statistics** This shows you the top speed and the distance travelled so far.

![Stats](https://github.com/vespakoen/dwaler/blob/master/screenshots/stats.png?raw=true)

- **Location** Simply shows your latitude and longitude

![Position](https://github.com/vespakoen/dwaler/blob/master/screenshots/position.png?raw=true)

- **GPS** Shows if you've got a fix, fix quality and the amount of satellites within view.

![GPS](https://github.com/vespakoen/dwaler/blob/master/screenshots/gps.png?raw=true)

- **Logging** Logs your latitude, longitude and altitude to an SD

## Planned features

- **More chips** Add support for the ESP8266 and the CC3200.
- **Mobile apps** IOS & Android app using `react-native`, able to connect to the dwaler and retrieve all information / update trips.
- **Desktop apps** Linux, OSX, Windows app using `electron`, able to connect to the dwaler and retrieve all information / update trips, the focus will be on Linux first.
- **Websocket server** Expose a websocket server over a Wifi "hotspot" (for the ESP8266 and CC3200) which can be used for retrieving & update state, traces, trips etc.
- **Web management interface** Expose a web application via Captive Portal to display the state and manage the trips.

## Parts list

- Arduino Nano (Others should work as well)
- Adafruit ultimate GPS (MTK3339 chipset)
- Hitachi HD44780 LCD
- Catalex MicroSD Adapter V1.1 (you will need google translate to acquire one of those)
- A button, some wires and a soldering iron

![On the breadboard](https://github.com/vespakoen/dwaler/blob/master/screenshots/breadboard.jpg?raw=true)

## Dependencies

Make sure to add the [Fat16 library](https://github.com/greiman/Fat16) to your Arduino's libraries folder.
Other dependencies are included in the source (for (manual) dead code removal / tree shaking).

## FAQ

(based on gutfeeling)

**Q: How do I wire this up?**
A: Check the dwaler.ino file for pinouts, more on this soon.

**Q: Why are some libraries included in the source?**
A: The Arduino Nano is really really small, as I don't know enough Assembly or C, I had to optimize the sketch size by removing unused code.

**Q: Can you build one for me?**
A: I am going to put one together for myself, with an ESP8266 or an CC3200.
If I get enough time to work on this project and you report your interest you might pursuade me into putting together a couple more.
