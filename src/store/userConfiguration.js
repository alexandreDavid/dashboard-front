let configuration = {
  dashboard: {
    'title': 'Dashboard',
    'cards': [
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air pressure at sea level',
        'id': 1,
        'widgetId': 'graph',
        'parameter': {'label': 'Air pressure at sea level', 'paramName': 'air_pressure_at_sea_level', 'type': 'interval', 'family': 'weather', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}], 'groupingId': 0, 'unit': 'Pa', 'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level', 'hasGraph': true, 'hasTimeFrame': true, 'data': [{'label': '2 days', 'layer': 'twoDaysForecast:air_pressure_at_sea_level', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}]}, {'label': '7 days', 'layer': 'mogreps:air_pressure_at_sea_level', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}]},
        'graphType': {'value': 'LineChart', 'label': 'Line chart'}
      }, {'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air pressure at sea level',
        'id': 2,
        'widgetId': 'map',
        'parameter': {'label': 'Air pressure at sea level', 'paramName': 'air_pressure_at_sea_level', 'type': 'interval', 'family': 'weather', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}], 'groupingId': 0, 'unit': 'Pa', 'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level', 'hasGraph': true, 'hasTimeFrame': true, 'data': [{'label': '2 days', 'layer': 'twoDaysForecast:air_pressure_at_sea_level', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}]}, {'label': '7 days', 'layer': 'mogreps:air_pressure_at_sea_level', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}]}
      }, {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air temperature',
        'id': 3,
        'widgetId': 'graph',
        'parameter': {'label': 'Air temperature', 'paramName': 'air_temperature', 'groupingId': 0, 'hasTimeFrame': true, 'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature', 'family': 'weather', 'unit': 'K', 'data': [{'label': '2 days', 'layer': 'twoDaysForecast:air_temperature', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}]}, {'label': '7 days', 'data': [{'label': 'min', 'layer': 'mogreps:air_temperature_0', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}, {'label': 'avg', 'layer': 'mogreps:air_temperature', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}, {'label': 'max', 'layer': 'mogreps:air_temperature_1', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}]}]},
        'graphType': {'value': 'LineChart', 'label': 'Line chart'}
      }, {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'title': 'Air temperature',
        'id': 4,
        'widgetId': 'map',
        'parameter': {'label': 'Air temperature', 'paramName': 'temperature', 'groupingId': 0, 'hasTimeFrame': true, 'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature', 'family': 'weather', 'unit': 'K', 'data': [{'label': '2 days', 'layer': 'twoDaysForecast:air_temperature', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538964000}, {'startTime': 1538964000, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538985600}, {'startTime': 1538985600, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539007200}, {'startTime': 1539007200, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539028800}, {'startTime': 1539028800, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539050400}, {'startTime': 1539050400, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539072000}, {'startTime': 1539072000, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539093600}, {'startTime': 1539093600, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539115200}, {'startTime': 1539115200, 'endTime': 1539126000}]}, {'label': '7 days', 'data': [{'label': 'min', 'layer': 'mogreps:air_temperature_0', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}, {'label': 'avg', 'layer': 'mogreps:air_temperature', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}, {'label': 'max', 'layer': 'mogreps:air_temperature_1', 'type': 'interval', 'times': [{'startTime': 1538953200, 'endTime': 1538974800}, {'startTime': 1538974800, 'endTime': 1538996400}, {'startTime': 1538996400, 'endTime': 1539018000}, {'startTime': 1539018000, 'endTime': 1539039600}, {'startTime': 1539039600, 'endTime': 1539061200}, {'startTime': 1539061200, 'endTime': 1539082800}, {'startTime': 1539082800, 'endTime': 1539104400}, {'startTime': 1539104400, 'endTime': 1539126000}, {'startTime': 1539126000, 'endTime': 1539147600}, {'startTime': 1539147600, 'endTime': 1539169200}, {'startTime': 1539169200, 'endTime': 1539190800}, {'startTime': 1539190800, 'endTime': 1539212400}, {'startTime': 1539212400, 'endTime': 1539234000}, {'startTime': 1539234000, 'endTime': 1539255600}, {'startTime': 1539255600, 'endTime': 1539277200}, {'startTime': 1539277200, 'endTime': 1539298800}, {'startTime': 1539298800, 'endTime': 1539320400}, {'startTime': 1539320400, 'endTime': 1539342000}, {'startTime': 1539342000, 'endTime': 1539363600}, {'startTime': 1539363600, 'endTime': 1539385200}, {'startTime': 1539385200, 'endTime': 1539406800}, {'startTime': 1539406800, 'endTime': 1539428400}, {'startTime': 1539428400, 'endTime': 1539450000}, {'startTime': 1539450000, 'endTime': 1539471600}, {'startTime': 1539471600, 'endTime': 1539493200}, {'startTime': 1539493200, 'endTime': 1539514800}, {'startTime': 1539514800, 'endTime': 1539536400}, {'startTime': 1539536400, 'endTime': 1539558000}]}]}]}
      }
    ]
  },
  activeArea: {
    type: 'district',
    name: 'Abim',
    id: 5
  },
  activeSettings: {
    temperature: 'C',
    windSpeed: 'mph',
    pressure: 'Pa',
    precipitations: 'Kg/m2/s',
    floodWarning: false,
    stormWarning: false
  },
  activeBaseMapLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
}

export default {
  getDashboardConfiguration () {
    let dashboard
    if (localStorage.getItem('dashboard')) {
      try {
        dashboard = JSON.parse(localStorage.getItem('dashboard'))
      } catch (e) {
        localStorage.removeItem('dashboard')
      }
    }
    return dashboard || configuration.dashboard
  },
  setDashboardConfiguration (dashboard) {
    const parsed = JSON.stringify(dashboard)
    localStorage.setItem('dashboard', parsed)
  },
  getArea () {
    let activeArea
    if (localStorage.getItem('activeArea')) {
      try {
        activeArea = JSON.parse(localStorage.getItem('activeArea'))
      } catch (e) {
        localStorage.removeItem('activeArea')
      }
    }
    return activeArea || configuration.activeArea
  },
  setActiveArea (activeArea) {
    const parsed = JSON.stringify(activeArea)
    localStorage.setItem('activeArea', parsed)
  },
  getActiveSettings () {
    let activeSettings
    if (localStorage.getItem('activeSettings')) {
      try {
        activeSettings = JSON.parse(localStorage.getItem('activeSettings'))
      } catch (e) {
        localStorage.removeItem('activeSettings')
      }
    }
    return activeSettings || configuration.activeSettings
  },
  setActiveSettings (activeSettings) {
    const parsed = JSON.stringify(activeSettings)
    localStorage.setItem('activeSettings', parsed)
  },
  getActiveBaseMapLayer () {
    let activeBaseMapLayer
    if (localStorage.getItem('activeBaseMapLayer')) {
      try {
        activeBaseMapLayer = JSON.parse(localStorage.getItem('activeBaseMapLayer'))
      } catch (e) {
        localStorage.removeItem('activeBaseMapLayer')
      }
    }
    return activeBaseMapLayer || configuration.activeBaseMapLayer
  },
  setActiveBaseMapLayer (activeBaseMapLayer) {
    const parsed = JSON.stringify(activeBaseMapLayer)
    localStorage.setItem('activeBaseMapLayer', parsed)
  },
  getSelectedLayers () {
    let selectedLayers
    if (localStorage.getItem('selectedLayers')) {
      try {
        selectedLayers = JSON.parse(localStorage.getItem('selectedLayers'))
      } catch (e) {
        localStorage.removeItem('selectedLayers')
      }
    }
    return selectedLayers || []
  },
  setSelectedLayers (selectedLayers) {
    const parsed = JSON.stringify(selectedLayers)
    localStorage.setItem('selectedLayers', parsed)
  }
}
