#include "SDStorage.h"

SDStorage::SDStorage(uint8_t csPin) {
  _csPin = csPin;
}

void SDStorage::setup()
{
}

uint8_t SDStorage::countTrips()
{
  return 3;
}

void SDStorage::getDestinations(uint8_t from, uint8_t to, OnDestination callback)
{
  callback("BERLIN", Location(52.52437, 13.41053));
  callback("ASIA", Location(43.01321, 163.47769));
  callback("MAASTRICHT", Location(50.85, 5.6833));
}

uint8_t SDStorage::countTraces(const char* destinationName)
{
  return 1;
}

void SDStorage::getTrace(const char* destinationName, uint8_t traceNum, OnTrace callback)
{
  callback("52.504811,13.431157,39.5");
  callback("52.503629,13.430138,39.5");
  callback("52.503490,13.430017,40.25");
  callback("52.503387,13.429931,40.5");
  callback("52.503337,13.429888,40.75");
  callback("52.502370,13.429070,41.0");
  callback("52.502123,13.428856,41.25");
  callback("52.501766,13.428546,41.75");
  callback("52.501195,13.428049,40.5");
  callback("52.500241,13.427219,40.0");
  callback("52.499473,13.426542,38.75");
  callback("52.499411,13.426488,38.75");
  callback("52.499321,13.426408,38.5");
  callback("52.499381,13.426186,39.0");
  callback("52.499396,13.426130,39.0");
  callback("52.499449,13.425927,39.5");
  callback("52.499643,13.425221,40.25");
  callback("52.500089,13.423597,40.0");
  callback("52.500235,13.423071,39.75");
  callback("52.500382,13.422565,39.75");
  callback("52.500416,13.422441,39.75");
  callback("52.500458,13.422289,40.0");
  callback("52.500867,13.420805,41.0");
  callback("52.501001,13.420316,41.0");
  callback("52.501186,13.419641,41.0");
  callback("52.501287,13.419277,41.0");
  callback("52.501352,13.419041,41.0");
  callback("52.501386,13.418918,41.0");
  callback("52.501999,13.416694,40.0");
  callback("52.502070,13.416589,40.0");
  callback("52.502167,13.416347,40.0");
  callback("52.502279,13.416084,40.5");
  callback("52.502359,13.415824,40.75");
  callback("52.502395,13.415692,41.0");
  callback("52.502427,13.415558,41.0");
  callback("52.502499,13.415143,41.75");
  callback("52.502494,13.414943,41.75");
  callback("52.502947,13.413291,39.25");
  callback("52.503147,13.412528,37.0");
  callback("52.503148,13.412428,36.75");
  callback("52.503119,13.412380,36.5");
  callback("52.503073,13.412355,36.5");
  callback("52.503008,13.412380,36.5");
  callback("52.502984,13.412414,36.5");
  callback("52.502844,13.412604,37.25");
  callback("52.502661,13.412852,37.75");
  callback("52.502607,13.412744,37.23");
}

void SDStorage::logTrace(const char* destinationName, uint8_t traceNum, Location location)
{
}

State SDStorage::getState()
{
  State state;
  return state;
}

void SDStorage::putState(State state)
{
}

