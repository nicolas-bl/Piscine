
let configurationFileName = 'jeedomConfig.json' // change this to an own name e.g. 'configName.json' . This name can then be given as a widget parameter in the form 'USE_CONFIG:yourfilename.json' so you don't loose your preferred configuration across script updates (but you will loose it if i have to change the configuration format)
const usePersistedConfiguration = true; // false would mean to use the visible configuration below; true means the state saved in iCloud (or locally) will be used
const overwritePersistedConfig = false; // if you like your configuration, run the script ONCE with this param to true, then it is saved and can be used via 'USE_CONFIG:yourfilename.json' in widget params
const CONFIGURATION_JSON_VERSION = 1; // never change this! If i need to change the structure of configuration class, i will increase this counter. Your created config files sadly won't be compatible afterwards.

// CONFIGURATION //////////////////////
class Configuration {
  // you must at least configure the next 3 lines to make this script work or use credentials in parameter when setting up the widget (see the readme on github)
  // as soon as credentials + URL are correct, a configuration is saved and then used. to make changes after that set overwritePersistedConfig to true
  jeedomBaseUrl = 'https://yourjeedomurl.com'; // location of your system running jeedom, local or external e.g. http://192.168.178.33:8581 or dns
  apiKey = ''; // find in Jeedom > Réglage > Système > Configuration > API
  notificationEnabled = true; // set to false to disable all notifications

  notificationIntervalInDays = 1; // minimum amount of days between the notification about the same topic; 0 means notification everytime the script is run (SPAM). 1 means you get 1 message per status category per day (maximum of 4 messages per day since there are 4 categories). Can also be something like 0.5 which means in a day you can get up to 8 messages
  fileManagerMode = 'ICLOUD'; // default is ICLOUD. If you don't use iCloud Drive use option LOCAL
  requestTimeoutInterval = 2; // in seconds; If requests take longer, the script is stopped. Increase it if it doesn't work or you
  adaptToLightOrDarkMode = true; // if one of the purple or black options is chosen, the widget will adapt to dark/light mode if true
  bgColorMode = 'BLACK_DARK'; // default is PURPLE_LIGHT. Other options: PURPLE_DARK, BLACK_LIGHT, BLACK_DARK, CUSTOM (custom colors will be used, see below)
  customBackgroundColor1_light = '#3e00fa'; // if bgColorMode CUSTOM is used a LinearGradient is created from customBackgroundColor1_light and customBackgroundColor2_light
  customBackgroundColor2_light = '#7a04d4'; // you can use your own colors here; they are saved in the configuration
  customBackgroundColor1_dark = '#3e00fa'; // if bgColorMode CUSTOM together with adaptToLightOrDarkMode = true is used, the light and dark custom values are used depending on the active mode
  customBackgroundColor2_dark = '#7a04d4';
  chartColor_light = '#FFFFFF'; // _light is the default color if adaptToLightOrDarkMode is false
  chartColor_dark = '#FFFFFF';
  fontColor_light = '#FFFFFF'; // _light the default color if adaptToLightOrDarkMode is false
  fontColor_dark = '#FFFFFF';
  failIcon = '❌';
  bulletPointIcon = '🔸';
  decimalChar = ','; // if you like a dot as decimal separator make the comma to a dot here
  jsonVersion = CONFIGURATION_JSON_VERSION; // do not change this
  enableSiriFeedback = true; // when running script via Siri, she should speak the text that is defined below BUT might be bugged atm, i wrote the dev about it

  // logo is downloaded only the first time! It is saved in iCloud and then loaded from there everytime afterwards
  logoUrl = 'https://jeedom.com/logo.png';

  // icons:
  icon_statusGood = 'checkmark.circle.fill'; // can be any SFSymbol
  icon_colorGood = '#' + Color.green().hex; // must have form like '#FFFFFF'
  icon_statusMedium = 'exclamationmark.triangle.fill'; // can be any SFSymbol
  icon_colorMedium = '#' + Color.yellow().hex; // must have form like '#FFFFFF'
  icon_statusBad = 'exclamationmark.triangle.fill'; // can be any SFSymbol
  icon_colorBad = '#' + Color.red().hex;// must have form like '#FFFFFF'
  icon_statusUnknown = 'questionmark.circle.fill'; // can be any SFSymbol
  icon_colorUnknown = '#' + Color.yellow().hex; // must have form like '#FFFFFF'

  // if you change the descriptions in the status columns, you must adapt the spacers between the columns, so that it looks good again :)
  spacer_beforeFirstStatusColumn = 8;
  spacer_betweenStatusColumns = 5;
  spacer_afterSecondColumn = 0;

  label_updated = 'Updated at : '; // update date (bottom of widget)

  notification_expandedButtonText = 'Show me!';
  notification_ringTone = 'event'; // all ringtones of Scriptable are possible: default, accept, alert, complete, event, failure, piano_error, piano_success, popup

  siriGui_icon_version = 'arrow.right.square.fill'; // can be any SFSymbol
  siriGui_icon_version_color = '#' + Color.blue().hex; // must have form like '#FFFFFF'


  // Example title : "lumières", type : "cmd", id : 123
  jeedomData = {
    'header': [ // only 4 items in header MAX
      {
        'title': 'Title 1', // title you want to display in widget
        'type': 'cmd', // type in Jeedom
        'id': 111, // id of data you want to get from Jeedom
        'icon': true, // true for green icon, false for red, medium for yellow, conditional for manual setting, next field should not be empty
        'idCondition': null, // id of data to dynamically change icon
        'typeCondition': 'cmd', // type in Jeedom for conditional icon
        'unit': null // unit to be displayed, null if you don't want to display any unit
      },
      {
        'title': 'Title 2',
        'type': 'cmd',
        'id': 222,
        'icon': null,
        'idCondition': 2222,
        'typeCondition': 'cmd',
        'unit': null
      },
      {
        'title': 'Title 3',
        'type': 'cmd',
        'id': 333,
        'icon': true,
        'idCondition': null,
        'typeCondition': 'cmd',
        'unit': null
      },
      {
        'title': 'Title 4',
        'type': 'cmd',
        'id': 444,
        'icon': false,
        'idCondition': 4444,
        'typeCondition': 'cmd',
        'unit': null
      }
    ],
    'content': {
      'firstColumn': {
        'title': 'Informations',
        'data': [
          {
            'title': 'Lumière(s)', // title you want to display in widget
            'type': 'cmd', // type in jeedom API query
            'id': 1111, // id of data you want to display,
            'unit': null // unit (null if empty)
          },
          {
            'title': 'Fenêtre(s)',
            'type': 'cmd',
            'id': 2222,
            'unit': null
          },
          {
            'title': 'Porte(s)',
            'type': 'cmd',
            'id': 3333,
            'unit': null
          },
          {
            'title': 'Présence(s)',
            'type': 'cmd',
            'id': 4444,
            'unit': null
          }
        ],
      },
      'secondColumn': {
        'title': 'Extérieur',
        'data': [
          {
            'title': 'Température', // title you want to display in widget
            'type': 'cmd', // type in jeedom
            'id': 5555, // id of data you want to display
            'unit': '°' // unit (null if empty)
          },
          {
            'title': 'Humidité',
            'type': 'cmd',
            'id': 6666,
            'unit': '%'
          },
        ]
      }
    }
  }

}


let CONFIGURATION = new Configuration();
const apiUrl = () => CONFIGURATION.jeedomBaseUrl + '/core/api/jeeApi.php?apikey=' + CONFIGURATION.apiKey;

const maxLineWidth = 300; // if layout doesn't look good for you,
const normalLineHeight = 35; // try to tweak the (font-)sizes & remove/add spaces below
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = 'dd.MM.yyyy HH:mm:ss';
const headerFont = Font.boldMonospacedSystemFont(12);
const infoFont = Font.systemFont(10);
const chartAxisFont = Font.systemFont(7);
const updatedAtFont = Font.systemFont(7);

const purpleBgGradient_light = createLinearGradient('#421367', '#481367');
const purpleBgGradient_dark = createLinearGradient('#250b3b', '#320d47');
const blackBgGradient_light = createLinearGradient('#707070', '#3d3d3d');
const blackBgGradient_dark = createLinearGradient('#111111', '#222222');

const UNAVAILABLE = 'UNAVAILABLE';

const NOTIFICATION_JSON_VERSION = 1; // never change this!
const NOTIFICATION_JSON_FILE_NAME = 'notificationState.json'; // never change this!
const HB_LOGO_FILE_NAME = 'jeedomLogo.png'; // never change this!

let widget = await createWidget();
if (!config.runsInWidget) {
  await widget.presentMedium();
}

Script.setWidget(widget);
Script.complete();

async function createWidget() {

  // fileManagerMode must be LOCAL if you do not use iCloud drive
  let fm = CONFIGURATION.fileManagerMode === 'LOCAL' ? FileManager.local() : FileManager.iCloud();

  if (args.widgetParameter) {
    // you can either provide as parameter:
    //  - the config.json file name you want to load the credentials from (must be created before it can be used but highly recommended)
    //      valid example: 'USE_CONFIG:yourfilename.json' (the 'yourfilename' part can be changed by you)
    //      this single parameter must start with USE_CONFIG: and end with .json
    // - credentials + URL directly (all other changes to the script are lost when you update it e.g. via https://scriptdu.de )
    //      credentials must be separated by two commas like <jeedomUrl>,<apiKey>
    //      a valid real example: https://yourJeedomUrl.com,123456
    if (args.widgetParameter.length > 0) {
      let foundCredentialsInParameter = useCredentialsFromWidgetParameter(args.widgetParameter);
      let fileNameSuccessfullySet = false;
      if (!foundCredentialsInParameter) {
        fileNameSuccessfullySet = checkIfConfigFileParameterIsProvided(fm, args.widgetParameter);
      }
      if (!foundCredentialsInParameter && !fileNameSuccessfullySet) {
        throw ('Format of provided parameter not valid\n2 Valid examples: 1. USE_CONFIG:yourfilename.json\n2. https://yourJeedomUrl.com,123456');
      }
    }
  }

  let pathToConfig = getFilePath(configurationFileName, fm);

  if (usePersistedConfiguration && !overwritePersistedConfig) {
    CONFIGURATION = getPersistedObject(fm, pathToConfig, CONFIGURATION_JSON_VERSION, CONFIGURATION, false);
    log('Configuration ' + configurationFileName + ' has been loaded and is used!')
  }

  if (usePersistedConfiguration || overwritePersistedConfig) {
    // if here, the configuration seems valid -> save it for next time
    log('The valid configuration ' + configurationFileName + ' has been saved. Changes can only be applied if overwritePersistedConfig is set to true. Should be set to false after applying changes again!')
    persistObject(fm, CONFIGURATION, pathToConfig);
  }

  let widget = new ListWidget()
  handleSettingOfBackgroundColor(widget);

  // LOGO AND HEADER //////////////////////
  let titleStack = widget.addStack();
  titleStack.size = new Size(maxLineWidth, normalLineHeight);
  const logo = await getJeedomLogo(fm);
  const imgWidget = titleStack.addImage(logo);
  imgWidget.imageSize = new Size(40, 30);

  // uncomment 2 next lines to display header
  //let headerText = addStyledText(titleStack, 'text here', headerFont);
  //headerText.size = new Size(60, normalLineHeight);

  // LOGO AND HEADER END //////////////////////


  // HEADER -  4 main informations ///////////////////
  titleStack.addSpacer(CONFIGURATION.spacer_beforeFirstStatusColumn);
  let statusInfo = titleStack.addStack();
  let firstColumn = statusInfo.addStack();
  firstColumn.layoutVertically();
  let secondColumn = statusInfo.addStack();
  secondColumn.layoutVertically();


  titleStack.addSpacer(CONFIGURATION.spacer_afterSecondColumn);
  // HEADER END ////////////////

  widget.addSpacer(10);

  // MAIN DATA
  let mainColumns = widget.addStack();
  mainColumns.size = new Size(maxLineWidth, 77);
  mainColumns.addSpacer(4)

  // LEFT COLUMN START //////////////////////
  let leftColumn = mainColumns.addStack();
  leftColumn.layoutVertically();

  addTitle(leftColumn, CONFIGURATION.jeedomData.content.firstColumn.title);

  let bulletPointStack = leftColumn.addStack();
  bulletPointStack.layoutVertically();
  for (bullet of CONFIGURATION.jeedomData.content.firstColumn.data) {
    const value = await fetchData(bullet.type, bullet.id);
    const unit = bullet.unit !== null ? bullet.unit : '';
    addStyledText(bulletPointStack, CONFIGURATION.bulletPointIcon + bullet.title + ' : ' + value + unit, infoFont);
  }

  mainColumns.addSpacer(80);
  // LEFT COLUMN END //////////////////////

  // RIGHT COLUMN START //////////////////////
  let rightColumn = mainColumns.addStack();
  rightColumn.layoutVertically();

  let rightBulletPoint = rightColumn.addStack();
  rightBulletPoint.layoutVertically();

  // RIGHT COLUMN END //////////////////////
  widget.addSpacer(10);

  // BOTTOM UPDATED TEXT //
  let updatedAt = addStyledText(widget, CONFIGURATION.label_updated + timeFormatter.string(new Date()), updatedAtFont);
  updatedAt.centerAlignText();

  return widget;
}

function handleSettingOfBackgroundColor(widget) {
  if (!CONFIGURATION.adaptToLightOrDarkMode) {
    switch (CONFIGURATION.bgColorMode) {
      case "CUSTOM":
        widget.backgroundGradient = createLinearGradient(CONFIGURATION.customBackgroundColor1_light, CONFIGURATION.customBackgroundColor2_light);
        break;
      case "BLACK_LIGHT":
        widget.backgroundGradient = blackBgGradient_light;
        break;
      case "BLACK_DARK":
        widget.backgroundGradient = blackBgGradient_dark;
        break;
      case "PURPLE_DARK":
        widget.backgroundGradient = purpleBgGradient_dark;
        break;
      case "PURPLE_LIGHT":
      default:
        widget.backgroundGradient = purpleBgGradient_light;
    }
  } else {
    switch (CONFIGURATION.bgColorMode) {
      case "CUSTOM":
        setGradient(widget,
          createLinearGradient(CONFIGURATION.customBackgroundColor1_light, CONFIGURATION.customBackgroundColor2_light),
          createLinearGradient(CONFIGURATION.customBackgroundColor1_dark, CONFIGURATION.customBackgroundColor2_dark));
        break;
      case "BLACK_LIGHT":
      case "BLACK_DARK":
        setGradient(widget, blackBgGradient_light, blackBgGradient_dark);
        break;
      case "PURPLE_DARK":
      case "PURPLE_LIGHT":
      default:
        setGradient(widget, purpleBgGradient_light, purpleBgGradient_dark);
    }
  }
}
function useCredentialsFromWidgetParameter(givenParameter) {
  if (givenParameter.includes(',,')) {
    let credentials = givenParameter.split(',,');
    if (credentials.length === 3 && credentials[0].length > 0 && credentials[1].length > 0 &&
      credentials[2].length > 0 && credentials[2].startsWith('http')) {
      CONFIGURATION.userName = credentials[0].trim();
      CONFIGURATION.apiKey = credentials[1].trim();
      CONFIGURATION.jeedomBaseUrl = credentials[2].trim();
      return true;
    }
  }
  return false;
}

async function getJeedomLogo(fm) {
  let path = getFilePath(HB_LOGO_FILE_NAME, fm);
  if (fm.fileExists(path)) {
    return fm.readImage(path);
  } else {
    // logo did not exist -> download it and save it for next time the widget runs
    const logo = await loadImage(CONFIGURATION.logoUrl);
    fm.writeImage(path, logo);
    return logo;
  }
}

async function loadImage(imgUrl) {
  let req = new Request(imgUrl);
  req.timeoutInterval = CONFIGURATION.requestTimeoutInterval;
  let image = await req.loadImage();
  return image;
}

function createLinearGradient(color1, color2) {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color(color1), new Color(color2)];
  return gradient;
}

function getFilePath(fileName, fm) {
  let dirPath = fm.joinPath(fm.documentsDirectory(), 'jeedomWidget');
  if (!fm.fileExists(dirPath)) {
    fm.createDirectory(dirPath);
  }
  return fm.joinPath(dirPath, fileName);
}
function checkIfConfigFileParameterIsProvided(fm, givenParameter) {
  if (givenParameter.trim().startsWith('USE_CONFIG:') && givenParameter.trim().endsWith('.json')) {
    configurationFileName = givenParameter.trim().split('USE_CONFIG:')[1];
    if (!fm.fileExists(getFilePath(configurationFileName, fm))) {
      throw ('Config file with provided name ' + configurationFileName + ' does not exist!\nCreate it first by running the script once providing the name in variable configurationFileName and maybe with variable overwritePersistedConfig set to true');
    }
    return true;
  }
  return false;
}

function getPersistedObject(fm, path, versionToCheckAgainst, initialObjectToPersist, createIfNotExisting) {
  if (fm.fileExists(path)) {
    let raw, persistedObject;
    try {
      raw = fm.readString(path);
      persistedObject = JSON.parse(raw);
    } catch (e) {
      // file corrupted -> remove it
      fm.remove(path);
    }

    if (persistedObject && (persistedObject.jsonVersion === undefined || persistedObject.jsonVersion < versionToCheckAgainst)) {
      // the version of the json file is outdated -> remove it and recreate it
      log('Unfortunately, the configuration structure changed and your old config is not compatible anymore. It is now removed and a new one is created with the initial configuration. ')
      fm.remove(path);
    } else {
      return persistedObject;
    }
  }
  if (createIfNotExisting) {
    // create a new state json
    persistObject(fm, initialObjectToPersist, path);
  }
  return initialObjectToPersist;
}

function persistObject(fm, object, path) {
  let raw = JSON.stringify(object);
  fm.writeString(path, raw);
}
function setGradient(widget, lightOption, darkOption) {
  if (Device.isUsingDarkAppearance()) {
    widget.backgroundGradient = darkOption;
  } else {
    widget.backgroundGradient = lightOption;
  }
}
function checkIfConfigFileParameterIsProvided(fm, givenParameter) {
  if (givenParameter.trim().startsWith('USE_CONFIG:') && givenParameter.trim().endsWith('.json')) {
    configurationFileName = givenParameter.trim().split('USE_CONFIG:')[1];
    if (!fm.fileExists(getFilePath(configurationFileName, fm))) {
      throw ('Config file with provided name ' + configurationFileName + ' does not exist!\nCreate it first by running the script once providing the name in variable configurationFileName and maybe with variable overwritePersistedConfig set to true');
    }
    return true;
  }
  return false;
}

function addStyledText(stackToAddTo, text, font) {
  let textHandle = stackToAddTo.addText(text);
  textHandle.font = font;
  setTextColor(textHandle);
  return textHandle;
}
function setTextColor(textWidget) {
  if (CONFIGURATION.adaptToLightOrDarkMode && Device.isUsingDarkAppearance()) {
    textWidget.textColor = new Color(CONFIGURATION.fontColor_dark);
  } else {
    textWidget.textColor = new Color(CONFIGURATION.fontColor_light);
  }
}

function addStatusInfo(lineWidget, statusBool, shownText) {
  let itemStack = lineWidget.addStack();
  addStatusIcon(itemStack, statusBool);
  itemStack.addSpacer(2);
  let text = itemStack.addText(shownText);
  text.font = Font.semiboldMonospacedSystemFont(10);
  setTextColor(text);
}

function addStatusIcon(widget, statusBool) {
  let name = '';
  let color;
  switch (statusBool) {
    case true:
    case 1:
      name = CONFIGURATION.icon_statusGood;
      color = new Color(CONFIGURATION.icon_colorGood);
      break;
    case false:
    case 0:
      name = CONFIGURATION.icon_statusBad;
      color = new Color(CONFIGURATION.icon_colorBad);
      break;
    case 'medium':
      name = CONFIGURATION.icon_statusMedium;
      color = new Color(CONFIGURATION.icon_colorMedium);
      break;
    default:
      name = CONFIGURATION.icon_statusUnknown;
      color = new Color(CONFIGURATION.icon_colorUnknown);
      break;
  }
  addIcon(widget, name, color);
}

/**
 * Add icon to widget
 * @param {widget} widget 
 * @param {string} name 
 * @param {string} color 
 */
function addIcon(widget, name, color) {
  let sf = SFSymbol.named(name);
  sf.applyFont(Font.heavySystemFont(50));
  let iconImage = sf.image;
  let imageWidget = widget.addImage(iconImage);
  imageWidget.resizable = true;
  imageWidget.imageSize = new Size(13, 13);
  imageWidget.tintColor = color;
}

/**
 * Call jeedom API request URL with
 * @param {string} type type of request
 * @param {string} id id requested
 */
async function fetchData(type, id) {
  let url = apiUrl() + '&type=' + type + '&id=' + id;
  let req = new Request(url);
  let result;
  try {
    result = req.loadString();
  }
  catch (e) {
    return '';
  }
  return result;
}

function addTitle(column, titleText) {
  let title = column.addText(titleText);
  title.font = infoFont;
  setTextColor(title);
}
