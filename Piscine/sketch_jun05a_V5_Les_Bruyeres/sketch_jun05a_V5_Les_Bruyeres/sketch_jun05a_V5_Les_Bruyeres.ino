
//Release Note V3 : nouvel algo : On laisse couler un peu d'eau avant de tester la T° et on compare la T° de l'eau et de sortie.

//Paramétrage Compilateur :
//Type de carte : nodeMCU O.9
//Port : dev cu wchusbserial1420

#include <ESP8266WiFi.h>
#include <Wire.h> // Librairie Wire I2C
#include <LiquidCrystal_I2C.h> //librairie LDC I2C
#include <OneWire.h> // Inclusion de la librairie OneWire

#define DS18B20 0x28     // Adresse 1-Wire du DS18B20
#define BROCHE_ONEWIRE D6 // Broche utilisée pour le bus 1-Wire

// valeurs pour le WiFi
const char* ssid     = "Freebox Bruyeres 2.4G";
const char* password = "Caronicobron";

// Constantes de l'appel HTTP JEEDOM
const char* host = "192.168.1.2";
const char* privateKey = "OnZDArdmkGJGBPE6Hjd6s69eKHIQETuf";


// Les constantes pour gérer la temperature
//const float seuilDeclenchement = 3; // ecart de Temp pour le délenchement du chauffage
//const float tempEauMax = 30; // Temperature maximum de l'eau pour arret chauffage.
//const int pinRelay = D5; // pin squi pilote le relay.


//LiquidCrystal_I2C lcd(0x27,20,4);  // Déclaration du LCD 4 lignes

void setup() {

Serial.begin(115200);
  delay(10);

  // Lister les Wifi Disponibles
  //Serial.println("Scanning available networks...");
  //listNetworks();

  // Connexion au WiFi
  
  Serial.print("Connexion au WiFi ");
  Serial.println(ssid);
  
  
  WiFi.begin(ssid, password);    // On se connecte
  
  while (WiFi.status() != WL_CONNECTED) { // On attend
    delay(500);
    Serial.print(".");
  }

  Serial.println("");  // on affiche les paramÃ¨tres 
  Serial.println("WiFi connecté");  
  Serial.print("Adresse IP du module EPC: ");  
  Serial.println(WiFi.localIP());
  Serial.print("Adresse IP de la box : ");
  Serial.println(WiFi.gatewayIP());
  Serial.println();

  // Set des Pin de l'ESP
  //pinMode (pinRelay, OUTPUT); //Set la pin du relay en Output
  //digitalWrite (pinRelay, HIGH); // On ouvre le relai

}


OneWire ds(BROCHE_ONEWIRE); // Création de l'objet OneWire ds
 
// Fonction récupérant la température depuis le DS18B20
// Retourne true si tout va bien, ou false en cas d'erreur
boolean getTemperature(float *temp){
  byte data[9], addr[8];
  // data : Données lues depuis le scratchpad
  // addr : adresse du module 1-Wire détecté
 
  if (!ds.search(addr)) { // Recherche un module 1-Wire
    Serial.println("pas d'adresse");
    ds.reset_search();    // Réinitialise la recherche de module
    
    return false;         // Retourne une erreur
  }
   
  if (OneWire::crc8(addr, 7) != addr[7]){ // Vérifie que l'adresse a été correctement reçue
    Serial.println("message corrompu");
    return false;                        // Si le message est corrompu on retourne une erreur
    }
 
  if (addr[0] != DS18B20) { // Vérifie qu'il s'agit bien d'un DS18B20
    Serial.println("ce n'est pas un DS18B20");
    return false;         // Si ce n'est pas le cas on retourne une erreur
    }
 
  ds.reset();             // On reset le bus 1-Wire
  ds.select(addr);        // On sélectionne le DS18B20
   
  ds.write(0x44, 1);      // On lance une prise de mesure de température
  delay(800);             // Et on attend la fin de la mesure
   
  ds.reset();             // On reset le bus 1-Wire
  ds.select(addr);        // On sélectionne le DS18B20
  ds.write(0xBE);         // On envoie une demande de lecture du scratchpad
 
  for (byte i = 0; i < 9; i++) // On lit le scratchpad
    data[i] = ds.read();       // Et on stock les octets reçus
   
  // Calcul de la température en degré Celsius
  *temp = ((data[1] << 8) | data[0]) * 0.0625; 
   
  // Pas d'erreur
  return true;
}




void loop() {

float temp; // Temperature retournée par la sonde
float tempEau; // Tempearture de l'eau
float tempAir; // Temperature de l'air
float tempSortie; //Temperature en sortie de chauffage
bool chauff; //chauffage en marche ou pas

delay (15000); // Un check toutes les 15

WiFi.begin(ssid, password);    // On se connecte
while (WiFi.status() != WL_CONNECTED) { // On attend
    delay(500);
    Serial.print(".");
  }
//lcd.begin();

  //digitalWrite (pinRelay, LOW); // le relai est cablé en NO "normalement ouvert"//On ouvre le relai pour laisser couler un peu l'eau avant de faire la mesure.
  //delay (5000);

if(getTemperature(&temp)) {
     tempAir = temp;
    // Affiche la température de la sonde 1 (Noire) dans le moniteur serie
    Serial.print("Temp Air: ");
    Serial.print(tempAir);
    Serial.println("°C");

  }
  else {
    Serial.println ("mesure de la temperature de l'air non faite");
    tempAir = 0;
  }


  // Lit la température ambiante à ~1Hz
  if(getTemperature(&temp)) {

    tempEau = temp;
    // Affiche la température de la sonde 2 dans le moniteur serie
    Serial.print("Temp Eau : ");
    Serial.print(tempEau);
    Serial.println("°C");
    
  }
  else {
    Serial.println ("mesure de la temperature de l'eau  non faite");
    tempEau = 0;
  }

 

 if(getTemperature(&temp)) {
     tempSortie = temp;
    // Affiche la température de la sonde 3 dans le moniteur serie
    Serial.print("Temp Sortie: ");
    Serial.print(tempSortie);
    Serial.println(" °C");
  }
  else {
    Serial.println ("mesure de la temperature de sortie non faite");
    tempAir = 0;
  }


ds.reset_search();    // Réinitialise la recherche de module





//      -------------------------------
//                  JEEDOM
//      -------------------------------

  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  
// -------------------------------
//  Envoi Temperature de l'eau à Jeedom
// -------------------------------

  
   // creation URI pour temperature de l'eau
  String urlEau = "/core/api/jeeApi.php?apikey=";
  urlEau += privateKey;
  urlEau += "&type=";
  urlEau += "virtual";
  urlEau += "&id=";
  urlEau += "267";
  urlEau += "&value=";
  urlEau += tempEau;
  
  //Serial.print("Requesting URL: ");
  //Serial.println(urlEau);
  
  // Envoi de la terature de l'eau à Jeedom
  client.print(String("POST ") + urlEau + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "httpPort: " + httpPort + "\r\n" +
               "Connection: close\r\n\r\n");
               
 /// Affiche le retour serveur
             
   while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.println(line);          
   }
   
// --------------------------------------
//  Envoi Temperature de l'air à Jeedom
// --------------------------------------

    // URI pour la temperature de l'air
  String urlAir = "/core/api/jeeApi.php?apikey=";
  urlAir += privateKey;
  urlAir += "&type=";
  urlAir += "virtual";
  urlAir += "&id=";
  urlAir += "268";
  urlAir += "&value=";
  urlAir += tempAir;
  
  //Serial.print("Requesting URL: ");
  //Serial.println(urlAir);

  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // Envoi de la temperature de l'air
  client.print(String("POST ") + urlAir + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "httpPort: " + httpPort + "\r\n" +
               "Connection: close\r\n\r\n");

    // Affiche le retour serveur            
   while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.println(line);          
   }

// --------------------------------------
//  Envoi Temperature de sortie à Jeedom
// --------------------------------------

    // URI pour la temperature de sortie
  String urlSortie = "/core/api/jeeApi.php?apikey=";
  urlSortie += privateKey;
  urlSortie += "&type=";
  urlSortie += "virtual";
  urlSortie += "&id=";
  urlSortie += "269";
  urlSortie += "&value=";
  urlSortie += tempSortie;
  
  //Serial.print("Requesting URL: ");
  //Serial.println(urlSortie);

  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // Envoi de la temperature de sortie
  client.print(String("POST ") + urlSortie + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "httpPort: " + httpPort + "\r\n" +
               "Connection: close\r\n\r\n");

    // Affiche le retour serveur            
   while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.println(line);          
   }

    
// ---------------------------------------
//  Gestion statut du chauffage à Jeedom
// ---------------------------------------


   // URI pour la gestion du chauffage
  String urlChauff = "/core/api/jeeApi.php?apikey=";
  urlChauff += privateKey;
  urlChauff += "&type=";
  urlChauff += "virtual";
  urlChauff += "&id=";
  urlChauff += "270";
  urlChauff += "&value=";
  urlChauff += chauff;
  
  //Serial.print("Requesting URL: ");
  //Serial.println(urlChauff);

  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // Postage
  client.print(String("POST ") + urlChauff + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "httpPort: " + httpPort + "\r\n" +
               "Connection: close\r\n\r\n");
               
   // Affiche le retour serveur           
   while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.println(line);          
   }

    WiFi.disconnect();
    Serial.println("déconnecté");
 }

 void listNetworks() {
  // scan for nearby networks:
  Serial.println("** Scan Networks **");
  int numSsid = WiFi.scanNetworks();
  if (numSsid == -1)
  { 
    Serial.println("Couldn't get a wifi connection");
    while(true);
  } 

  // print the list of networks seen:
  Serial.print("number of available networks:");
  Serial.println(numSsid);

  // print the network number and name for each network found:
  for (int thisNet = 0; thisNet<numSsid; thisNet++) {
    Serial.print(thisNet);
    Serial.print(") ");
    Serial.print(WiFi.SSID(thisNet));
    Serial.print("\tSignal: ");
    Serial.print(WiFi.RSSI(thisNet));
    Serial.print(" dBm");
  }
}
