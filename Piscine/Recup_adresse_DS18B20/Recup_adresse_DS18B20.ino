// --- Programme Arduino ---
// Copyright X. HINAULT - Créé le 10/04/2010
// www.mon-club-elec.fr 

//  Code sous licence GNU GPL : 
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License,
//  or any later version.
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
//  

// --- Que fait ce programme ? ---
/* test simple de la détection des capteurs
de température One-wire de type DS18B20
présents sur une broche de la carte Arduino
*/

// --- Fonctionnalités utilisées ---
// Utilise la connexion série vers le PC 
// Utilise un ou plusieurs capteurs One Wire 

// --- Circuit à réaliser ---
// Connexion série entre la carte Arduino et le PC (utilise les broches 0 et 1)  
// Connecter  sur la broche 9 la broche de données du capteur One Wire

//**************** Entête déclarative *******
// A ce niveau sont déclarées les librairies, les constantes, les variables...

// --- Inclusion des librairies utilisées ---

#include <OneWire.h> // librairie pour capteur OneWire

// --- Déclaration des constantes ---

// --- constantes des broches ---

const int broche_OneWire=D1; //declaration constante de broche 

// --- Déclaration des variables globales ---
byte data[12]; // Tableau de 12 octets pour lecture des 9 registres de RAM et des 3 registres d'EEPROM du capteur One Wire
byte adresse[8]; // Tableau de 8 octets pour stockage du code d'adresse 64 bits du composant One Wire

int compt=0; // variable de comptage du nombre de capteurs sur le bus One Wire

// --- Déclaration des objets utiles pour les fonctionnalités utilisées ---
OneWire  capteur(broche_OneWire);  // crée un objet One Wire sur la broche voulue


//**************** FONCTION SETUP = Code d'initialisation *****
// La fonction setup() est exécutée en premier et 1 seule fois, au démarrage du programme

void setup()   { // debut de la fonction setup()

// --- ici instructions à exécuter au démarrage --- 

Serial.begin(115200); // initialise connexion série à 115200 bauds
// IMPORTANT : régler le terminal côté PC avec la même valeur de transmission 


//---- détection des capteurs présents sur le bus One Wire

Serial.println("*** Liste des elements presents sur le bus 1-wire *** ");

while (capteur.search(adresse)== true) // tant qu'un nouveau capteur est détecté
{
  // la fonction search renvoie la valeur VRAI si un élément 1-wire est trouvé. Stocke son adresse dans le tableau adresse
  // adresse correspond à l'adresse de début du tableau adresse[8] déclaré ... 

  // ce code est exécuté pour chaque capteur détecté
  compt=compt+1; // incrémente la variable de comptage du nombre de compteurs
  Serial.print ("Numero ");
  Serial.print (compt);
  Serial.print (": 1 capteur 1-wire present avec code adresse 64 bits : ");

  //--- affichage des 64 bits d'adresse au format hexadécimal
   for(int i = 0; i < 8; i++) { // l'adresse renvoyée par la fonction search est stockée sur 8 octets

    if (adresse[i]<16) Serial.print('0'); // pour affichage des O poids fort au format hexadécimal
    Serial.print(adresse[i], HEX); // affiche 1 à 1 les 8 octets du tableau adresse au format hexadécimal
    Serial.print(" ");
  }

  Serial.println(); 

  //---- test du type de capteur ---- 
  // le type du capteur est donné par le 1er octet du code adresse 64 bits
  // Valeur 0x28 pour capteur type DS18B20, 0x10 pour type DS18S20, 0x22 pour type DS1820
  if (adresse[0]==0x28) Serial.println ("Type : Capteur temperature DS18B20.");


  //----- contrôle du code CRC ----
  // le dernier octet de l'adresse 64bits est un code de contrôle CRC 
  // à l'aide de la fonction crc8 on peut vérifier si ce code est valide
  if (capteur.crc8( adresse, 7) == adresse[7]) // vérification validité code CRC de l'adresse 64 bits
  // le code CRC de l'adresse 64 bits est le 8ème octet de l'adresse (index 7 du tableau)
  {
    Serial.println ("Verification du code CRC de l'adresse 64 bits de ce capteur : VALIDE !"); 
  }
  else
  {
    Serial.println ("Verification du code CRC de l'adresse 64 bits de ce capteur : NON VALIDE !");     
  }

  Serial.println("------------"); 

} // fin boucle while test présence capteur

if (compt==0) // si aucun capteur n'a été détecté
{
  Serial.println("Aucun capteur present sur le bus 1-wire"); // affiche message + saut de ligne
}
else // si au moins 1 capteur a été détecté
{
  Serial.print(compt); // affiche nombre de capteurs détectés
  Serial.println (" capteur(s) detecte(s) sur ce bus 1-wire");   // affiche message + saut de ligne
  Serial.println ("**** Recherche terminee - fin de liste **** "); // affiche message + saut de ligne

}

} // fin de la fonction setup()
// ********************************************************************************

//*************** FONCTION LOOP = Boucle sans fin = coeur du programme *************
// la fonction loop() s'exécute sans fin en boucle aussi longtemps que l'Arduino est sous tension

void loop(){ // debut de la fonction loop()

// --- ici instructions à exécuter par le programme principal --- 

} // fin de la fonction loop() - le programme recommence au début de la fonction loop sans fin
// ********************************************************************************

//*************** Autres Fonctions du programme *************

// --- Fin programme ---
