# English below

# Widget Jeedom
- Script customisable pour l'application iOS Scriptable qui permet d'afficher des informations de Jeedom
- Toutes les informations sont récupérées à partir des API natives Jeedom sur votre environnement
- Un grand merci à lwitzani (Homebridge Status Widget) dont le code a servi de base à la construction de ce widget


# Comment installer le widget (2 méthodes)
- La meilleur façon est d'utiliser le script est d'utiliser le script de mise à jour https://scriptdu.de (mise à jour automtique via GitHub):
  - le script permet de sauvegarder un fichier de configuration dans iCloud (contenant les informations à récupérer de Jeedom, l'URL, etc)
  - Cela signifie que si le widget est mis à jour, vous pourrez garder votre configuration sans la perdre
  - 3 variables controlent le système de configuration
     - configurationFileName = 'jeedomConfig.json' // nom du fichier de configuration, exemple 'jeedomConfigMaison.json' . Ce nom pourra être donné en paramètre du widget sous la forme 'USE_CONFIG:yourfilename.json' pour ne pas perdre la configuration suite aux éventuelles mises à jour du widget (tant que le format du fichier de configuration ne change pas)
     - usePersistedConfiguration = true; // false signifie que les données présentes dans le fichier actuel seront utilisées; true signifie que le fichier de configuration utilisé sera celui sauvegardé dans iCloud ou en local 
     - overwritePersistedConfig = false; // Si vous voulez écraser / mettre à jour votre fichier de configuration, mettez cette variable à true. Vous pourrez ensuite l'utiliser dans le paramètre du widget avec 'USE_CONFIG:yourfilename.json'
  - Vous devez donc faire les actions suivantes:
     - Choisir un nom de fichier de configuration (doit terminer par '.json')
     - Mettre overwritePersistedConfig à true
     - Personnaliser chaque variable désirée, sans oublier l'URL et l'API Key de Jeedom
     - Exécuter le script une fois pour générer le fichier de configuration
     - Mettre overwritePersistedConfig à false
     - Ajouter le widget et ajouter le paramètre 'USE_CONFIG:yourfilename.json'
  - Tant que la variable overwritePersistedConfig est à false, aucun changement ne sera appliqué à la configuration car le fichier précédemment généré sera utilisé avec usePersistedConfiguration à true

- Copier le contenu du script et modifier toutes les variables
- Aucun paramètre n'est donc nécessaire dans le widget et aucune modification ne sera appliquée si le projet est mis à jour

# Comment utiliser le widget pour Jeedom
- Définir l'URL public de Jeedom (ou local mais attention dans ce cas, le widget ne fonctionnera que sur le réseau local)
- Définir l'API Key (récupérée dans Jeedom > Réglage > Système > Configuration > API) 
- Éventuellement changer le nom du script de configuration
- Définir overwritePersistedConfig à true (uniquement à la 1ère exécution pour sauvegarder le fichier dans iCloud / local)
- Définir le tableau jeedomData avec vos données personnalisées (un exemple est fourni dans le répertoire examples )
 - On ne peut définir que 4 données d'en-tête
 - Chaque tableau contient les informations suivantes
   - Titre qui sera affiché
   - Type de requête dans Jeedom (example cmd)
   - Id de la commande à récupérer
   - Unité 
- Lancé le script 1 fois pour générer la configuration (puis passer la variable overwritePersistedConfig à false)
- Ajouter le widget et le paramètre : 'USE_CONFIG:yourfilename.json'

---------------

# Jeedom Widget
- Customizable script for the iOS App Scriptable that shows a small summary of your Jeedom instance
- All infos shown are based and provided by Jeedom API, on your current environment
- Many thanks to lwitzani (Homebridge Status Widget) for main features / functions reuse in this widget


# How to install (2 setup possibilities)
- the best way (updatable, supporting the install script from https://scriptdu.de (very recommended)):
  - the script has a configuration mechanism that saves all configurations (in the Configuration class) to iCloud persistently
  - this means the configuration you make can be reused once you install a newer version of this script
  - three variables controll this mechanism:
     - configurationFileName = 'jeedomConfig.json' // change this to an own name e.g. 'jeedomConfigMaison.json' . This name can then be given as a widget parameter in the form 'USE_CONFIG:yourfilename.json' so you don't loose your preferred configuration across script updates (but you will loose it if i have to change the configuration format)
     - usePersistedConfiguration = true; // false would mean to use the visible configuration below; true means the state saved in iCloud (or locally) will be used
     - overwritePersistedConfig = false; // if you like your configuration, run the script ONCE with this param to true, then it is saved and can be used via 'USE_CONFIG:yourfilename.json' in widget params
  - so basically what you need to do is:
     - choose a configurationFileName (must end with '.json')
     - set overwritePersistedConfig to true
     - configure every configuration-variable exactly as you want (including Jeedom API Key and the URL!)
     - run the script once (this creates a json file in icloud, you can always delete it to start from scratch)
     - set overwritePersistedConfig to false
     - set the widget up with a single parameter in the format 'USE_CONFIG:yourfilename.json'
  - as long as overwritePersistedConfig is false, any change to the config won't take any effect because the persisted one is used if usePersistedConfiguration is true

- Copy all content of script locally in Scriptable and update necessary configuration variables

# How to use
- Set your Jeedom public URL (or local but it won't work outside of you local network)
- Set your API key (found in Jeedom > Réglage > Système > Configuration > API) 
- Eventually change config json name
- Set overwritePersistedConfig to true (only the first time, to save configuration json file to iCloud / locally)
- Set variable jeedomData with your custom data (example located here)
 - You can set only 4 main data in header
 - Each array of data contains the following information
   - Title to be displayed
   - Type of query in Jeedom (cmd for example)
   - Id of cmd
   - Unit (null if empty)
- Run the script to save configuration
- Add a widget to your home screen and add the param : 'USE_CONFIG:yourfilename.json'