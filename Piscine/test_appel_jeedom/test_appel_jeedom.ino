#include <ESP8266WiFi.h>

// valeurs pour le WiFi
const char* ssid     = "Caro et Nico";
const char* password = "caronicobron";

// valeurs pour le serveur Web
const char* host     = "192.168.0.47";
const char* apikey   = "Y3cYF53psL61ZrrMSPNvBg1j5sLEJE7He1FCSgIbJlsBv2wehb1IhPSBY6fIZ4yWRV9Bbg6CtMlEe2Al3ZL2O6SERXvQ2CMiytKrsfSBRefNwFYN7CetfWPWLbNcD0lSKNibSb5BX2ytWnX4PbDNP3JA5xDXOGQ94Y2lRLEOkbYYhV2OOVBDwlmH0P8w6nLOlcRVN6BXyAW76nktiENxPZdpG35bFnHJr9EdcnTsNHFjUPuV4gsiYmyEFR9kWnT";
const char* type     = "virtual"

void setup() {
Serial.begin(115200);
  delay(10);

  // Connexion au WiFi
  
  Serial.print("Connexion au WiFi ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);    // On se connecte
  
  while (WiFi.status() != WL_CONNECTED) { // On attend
    delay(500);
    Serial.print(".");
  }

  Serial.println("");  // on affiche les paramÃ¨tres 
  Serial.println("WiFi connectÃ©");  
  Serial.print("Adresse IP du module EPC: ");  
  Serial.println(WiFi.localIP());
  Serial.print("Adresse IP de la box : ");
  Serial.println(WiFi.gatewayIP());

}

void loop() {
Serial.print("Connexion au serveur : ");
  Serial.println(host);
  
  // On se place dans le role du  client en utilisant WifiClient
  WiFiClient client;

  // le serveur Web attend tradionnellement sur le port 80
  const int httpPort = 9080;

  // Si la connexio échoue ca sera pour la prochaine fois
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  
  // La connexion a réussie on forme le chemin 
  // URL  complexe composée du chemin et de deux 
  // questions contenant le nom de ville et l'API key
  
  String url = String("/core/api/jeeApi.php?apikey=") + apikey + "&appid=" + apikey;
  
  Serial.print("demande URL: ");
  Serial.println(url);
  
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");

  // On attend 1 seconde
  delay(10000);
  
  inBody = false; // on est dans l'en-tÃªte
  
  // On lit les données recues, s'il y en a
  while(client.available()){
    String line = client.readStringUntil('\r');
        
    if (line.length() == 1) inBody = true; /* passer l'entete jusqu'à  une ligne vide */
    if (inBody) {  // ligne du corps du message, on cherche le mot clÃ©
       int pos = line.indexOf(keyword);

      if (pos > 0) { /* mot clé trouvé */
       // indexOf donne la position du début du mot clé, en ajoutant sa longueur
       // on se place Ã  la fin.
       pos += keyword.length(); 

       Serial.println (&line[pos]);

       deg = atoi(&line[pos]); // Conversion de la chaine en Entier (int).

     } /* fin récupération de l'entier */
    } /* fin de la recherche du mot clé */
  } /* fin data avalaible */

}
