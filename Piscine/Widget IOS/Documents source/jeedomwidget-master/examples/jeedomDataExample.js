  // Example title : "lumières", type : "cmd", id : 123
  jeedomData = {
    'header': [ // only 4 items in header MAX
      {
        'title': 'Mode', // title you want to display in widget
        'type': 'cmd', // type in Jeedom
        'id': 51, // id of data you want to get from Jeedom
        'icon': true, // true for green icon, false for red, medium for yellow, conditional for manual setting, next field should not be empty
        'idCondition': null, // id of data to dynamically change icon
        'typeCondition': 'cmd', // type in Jeedom for conditional icon
        'unit': null // unit to be displayed, null if you don't want to display any unit
      },
      {
        'title': 'Alarme',
        'type': 'cmd',
        'id': 1096,
        'icon': null,
        'idCondition': 1094,
        'typeCondition': 'cmd',
        'unit': null
      },
      {
        'title': 'Thermostat',
        'type': 'cmd',
        'id': 3982,
        'icon': true,
        'idCondition': null,
        'typeCondition': 'cmd',
        'unit': null
      },
      {
        'title': 'CO2',
        'type': 'cmd',
        'id': 3337,
        'icon': false,
        'idCondition': 5267,
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
            'id': 4992, // id of data you want to display,
            'unit': null // unit (null if empty)
          },
          {
            'title': 'Fenêtre(s)',
            'type': 'cmd',
            'id': 4977,
            'unit': null
          },
          {
            'title': 'Porte(s)',
            'type': 'cmd',
            'id': 5213,
            'unit': null
          },
          {
            'title': 'Présence(s)',
            'type': 'cmd',
            'id': 5257,
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
            'id': 3330, // id of data you want to display
            'unit': '°' // unit (null if empty)
          },
          {
            'title': 'Humidité',
            'type': 'cmd',
            'id': 3331,
            'unit': '%'
          },
        ]
      }
    }
  }