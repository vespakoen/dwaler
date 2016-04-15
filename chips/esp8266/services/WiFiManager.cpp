#include "WiFiManager.h"

DNSServer dnsServer;
ESP8266WebServer webServer(80);

WiFiManager::WiFiManager(const char *ssid, const char *hostname)
{
  _ssid = ssid;
  _hostname = hostname;
  _apIP = IPAddress(192, 168, 1, 1);
  _netMsk = IPAddress(255, 255, 255, 0);
}

void WiFiManager::setupWiFi()
{
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(_apIP, _apIP, _netMsk);
  WiFi.softAP(_ssid);
  //  WiFi.begin("TP-LINK_D22646", "12389827");
  //  WiFi.begin("FRITZ!Box Fon WLAN 7360", "19898785076382373498");
  //  WiFi.begin("AARDVARK", "roflcopter");
  //  WiFi.begin("o2-WLAN96", "6057609245278592");
  uint8_t i;
  while (WiFi.status() != WL_CONNECTED && i++ < 20) delay(500);
  if (i == 21) {
    // @todo reboot the thing?
    while (1) delay(500);
  }
  Serial.print("Dwaler is up, listening on ");
  Serial.print(WiFi.softAPIP());
  Serial.println(":{80,8081}");
}

void WiFiManager::setupWebServer()
{
  // webServer.on("/", _handleRoot);
  // webServer.on("/generate_204", _handleRoot);
  // webServer.on("/fwlink", _handleRoot);
  webServer.onNotFound([]() {
    webServer.send(200, "text/html", "<h1>Hi from Dwaler!</h1>");
  });
  webServer.begin();
}

void WiFiManager::setupDNS()
{
  dnsServer.setErrorReplyCode(DNSReplyCode::NoError);
  const byte dnsPort = 53;
  dnsServer.start(dnsPort, "*", _apIP);
}

void WiFiManager::setupMDNS()
{
  if (!MDNS.begin(_hostname)) {
    Serial.println("Error setting up MDNS responder!");
  } else {
    Serial.println("mDNS responder started");
    // Add service to MDNS-SD
    MDNS.addService("http", "tcp", 80);
  }
}

void WiFiManager::setup()
{
  Serial.println("Setting up Wi-Fi");
  setupWiFi();
  Serial.println("Setting up DNS");
  setupDNS();
  Serial.println("Setting up WebServer");
  setupWebServer();
  Serial.println("Setting up MDNS");
  setupMDNS();
}

void WiFiManager::loop()
{
  dnsServer.processNextRequest();
  webServer.handleClient();
}
