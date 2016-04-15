#ifndef WiFiManager_h
#define WiFiManager_h

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <ESP8266mDNS.h>

class WiFiManager
{
  public:
    WiFiManager(const char *ssid, const char *hostname);
    void setupWebServer();
    void setupWiFi();
    void setupDNS();
    void setupMDNS();
    void setup();
    void loop();
  private:
    const char *_ssid;
    const char *_hostname;
    IPAddress _apIP;
    IPAddress _netMsk;
};

#endif
