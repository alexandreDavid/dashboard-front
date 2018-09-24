let configuration = {
  dashboard: {
    title: 'Dashboard',
    cards: [{
      'widthClass': 'col-md-6',
      'heightClass': 'height-medium',
      'widget': {
        'id': 'graph',
        'label': 'Graph',
        'formFields': [{
          'id': 'parameter',
          'label': 'Data to display',
          'type': 'select',
          'options': [{
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          }, {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          }, {
            'displayName': 'Relative humidity',
            'groupingId': 0,
            'paramDescription': 'Relative humidity',
            'paramName': 'relative_humidity',
            'workspaceName': 'twoDaysForecast',
            'unit': '%',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:relative_humidity',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity',
            'label': 'Relative humidity'
          }, {
            'displayName': 'Stratiform rainfall rate 0',
            'groupingId': 0,
            'paramDescription': 'Stratiform rainfall rate 0',
            'paramName': 'stratiform_rainfall_rate_0',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:stratiform_rainfall_rate_0',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0',
            'label': 'Stratiform rainfall rate 0'
          }, {
            'displayName': 'Surface downwelling longwave flux',
            'groupingId': 0,
            'paramDescription': 'Surface downwelling longwave flux',
            'paramName': 'surface_downwelling_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_downwelling_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux',
            'label': 'Surface downwelling longwave flux'
          }, {
            'displayName': 'Surface temperature',
            'groupingId': 0,
            'paramDescription': 'Surface temperature',
            'paramName': 'surface_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature',
            'label': 'Surface temperature'
          }, {
            'displayName': 'TOA outgoing longwave flux',
            'groupingId': 0,
            'paramDescription': 'TOA outgoing longwave flux',
            'paramName': 'toa_outgoing_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:toa_outgoing_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux',
            'label': 'TOA outgoing longwave flux'
          }, {
            'displayName': 'OUT BASEFLOW',
            'groupingId': 1,
            'paramDescription': 'OUT_BASEFLOW',
            'paramName': 'OUT_BASEFLOW',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_BASEFLOW',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW',
            'label': 'OUT BASEFLOW'
          }, {
            'displayName': 'OUT EVAP',
            'groupingId': 1,
            'paramDescription': 'OUT_EVAP',
            'paramName': 'OUT_EVAP',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_EVAP',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP',
            'label': 'OUT EVAP'
          }, {
            'displayName': 'OUT RUNOFF',
            'groupingId': 1,
            'paramDescription': 'OUT_RUNOFF',
            'paramName': 'OUT_RUNOFF',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_RUNOFF',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF',
            'label': 'OUT RUNOFF'
          }],
          'value': {
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          },
          'onChange': {
            '_custom': {
              'type': 'function',
              'display': '<span>ƒ</span> onChange(card)'
            }
          }
        }, {
          'id': 'graphType',
          'label': 'Graph type',
          'type': 'select',
          'options': [{
            'value': 'LineChart',
            'label': 'Line chart'
          }, {
            'value': 'PieChart',
            'label': 'Pie chart'
          }],
          'value': {
            'value': 'LineChart',
            'label': 'Line chart'
          }
        }]
      },
      'title': 'Air pressure at sea level',
      'id': 1
    }, {
      'widthClass': 'col-md-6',
      'heightClass': 'height-medium',
      'widget': {
        'id': 'map',
        'label': 'Map',
        'formFields': [{
          'id': 'parameter',
          'label': 'Data to display',
          'type': 'select',
          'options': [{
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          }, {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          }, {
            'displayName': 'Relative humidity',
            'groupingId': 0,
            'paramDescription': 'Relative humidity',
            'paramName': 'relative_humidity',
            'workspaceName': 'twoDaysForecast',
            'unit': '%',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:relative_humidity',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity',
            'label': 'Relative humidity'
          }, {
            'displayName': 'Stratiform rainfall rate 0',
            'groupingId': 0,
            'paramDescription': 'Stratiform rainfall rate 0',
            'paramName': 'stratiform_rainfall_rate_0',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:stratiform_rainfall_rate_0',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0',
            'label': 'Stratiform rainfall rate 0'
          }, {
            'displayName': 'Surface downwelling longwave flux',
            'groupingId': 0,
            'paramDescription': 'Surface downwelling longwave flux',
            'paramName': 'surface_downwelling_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_downwelling_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux',
            'label': 'Surface downwelling longwave flux'
          }, {
            'displayName': 'Surface temperature',
            'groupingId': 0,
            'paramDescription': 'Surface temperature',
            'paramName': 'surface_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature',
            'label': 'Surface temperature'
          }, {
            'displayName': 'TOA outgoing longwave flux',
            'groupingId': 0,
            'paramDescription': 'TOA outgoing longwave flux',
            'paramName': 'toa_outgoing_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:toa_outgoing_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux',
            'label': 'TOA outgoing longwave flux'
          }, {
            'displayName': 'OUT BASEFLOW',
            'groupingId': 1,
            'paramDescription': 'OUT_BASEFLOW',
            'paramName': 'OUT_BASEFLOW',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_BASEFLOW',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW',
            'label': 'OUT BASEFLOW'
          }, {
            'displayName': 'OUT EVAP',
            'groupingId': 1,
            'paramDescription': 'OUT_EVAP',
            'paramName': 'OUT_EVAP',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_EVAP',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP',
            'label': 'OUT EVAP'
          }, {
            'displayName': 'OUT RUNOFF',
            'groupingId': 1,
            'paramDescription': 'OUT_RUNOFF',
            'paramName': 'OUT_RUNOFF',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_RUNOFF',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF',
            'label': 'OUT RUNOFF'
          }],
          'value': {
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          },
          'onChange': {
            '_custom': {
              'type': 'function',
              'display': '<span>ƒ</span> onChange(card)'
            }
          }
        }]
      },
      'title': 'Air pressure at sea level',
      'id': 2
    }, {
      'widthClass': 'col-md-6',
      'heightClass': 'height-medium',
      'widget': {
        'id': 'graph',
        'label': 'Graph',
        'formFields': [{
          'id': 'parameter',
          'label': 'Data to display',
          'type': 'select',
          'options': [{
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          }, {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          }, {
            'displayName': 'Relative humidity',
            'groupingId': 0,
            'paramDescription': 'Relative humidity',
            'paramName': 'relative_humidity',
            'workspaceName': 'twoDaysForecast',
            'unit': '%',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:relative_humidity',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity',
            'label': 'Relative humidity'
          }, {
            'displayName': 'Stratiform rainfall rate 0',
            'groupingId': 0,
            'paramDescription': 'Stratiform rainfall rate 0',
            'paramName': 'stratiform_rainfall_rate_0',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:stratiform_rainfall_rate_0',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0',
            'label': 'Stratiform rainfall rate 0'
          }, {
            'displayName': 'Surface downwelling longwave flux',
            'groupingId': 0,
            'paramDescription': 'Surface downwelling longwave flux',
            'paramName': 'surface_downwelling_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_downwelling_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux',
            'label': 'Surface downwelling longwave flux'
          }, {
            'displayName': 'Surface temperature',
            'groupingId': 0,
            'paramDescription': 'Surface temperature',
            'paramName': 'surface_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature',
            'label': 'Surface temperature'
          }, {
            'displayName': 'TOA outgoing longwave flux',
            'groupingId': 0,
            'paramDescription': 'TOA outgoing longwave flux',
            'paramName': 'toa_outgoing_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:toa_outgoing_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux',
            'label': 'TOA outgoing longwave flux'
          }, {
            'displayName': 'OUT BASEFLOW',
            'groupingId': 1,
            'paramDescription': 'OUT_BASEFLOW',
            'paramName': 'OUT_BASEFLOW',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_BASEFLOW',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW',
            'label': 'OUT BASEFLOW'
          }, {
            'displayName': 'OUT EVAP',
            'groupingId': 1,
            'paramDescription': 'OUT_EVAP',
            'paramName': 'OUT_EVAP',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_EVAP',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP',
            'label': 'OUT EVAP'
          }, {
            'displayName': 'OUT RUNOFF',
            'groupingId': 1,
            'paramDescription': 'OUT_RUNOFF',
            'paramName': 'OUT_RUNOFF',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_RUNOFF',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF',
            'label': 'OUT RUNOFF'
          }],
          'value': {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          },
          'onChange': {
            '_custom': {
              'type': 'function',
              'display': '<span>ƒ</span> onChange(card)'
            }
          }
        }, {
          'id': 'graphType',
          'label': 'Graph type',
          'type': 'select',
          'options': [{
            'value': 'LineChart',
            'label': 'Line chart'
          }, {
            'value': 'PieChart',
            'label': 'Pie chart'
          }],
          'value': {
            'value': 'LineChart',
            'label': 'Line chart'
          }
        }]
      },
      'title': 'Air temperature',
      'id': 3
    }, {
      'widthClass': 'col-md-6',
      'heightClass': 'height-medium',
      'widget': {
        'id': 'map',
        'label': 'Map',
        'formFields': [{
          'id': 'parameter',
          'label': 'Data to display',
          'type': 'select',
          'options': [{
            'displayName': 'Air pressure at sea level',
            'groupingId': 0,
            'paramDescription': 'Air pressure at sea level',
            'paramName': 'air_pressure_at_sea_level',
            'workspaceName': 'twoDaysForecast',
            'unit': 'pa',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_pressure_at_sea_level',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_pressure_at_sea_level',
            'label': 'Air pressure at sea level'
          }, {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          }, {
            'displayName': 'Relative humidity',
            'groupingId': 0,
            'paramDescription': 'Relative humidity',
            'paramName': 'relative_humidity',
            'workspaceName': 'twoDaysForecast',
            'unit': '%',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:relative_humidity',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:relative_humidity',
            'label': 'Relative humidity'
          }, {
            'displayName': 'Stratiform rainfall rate 0',
            'groupingId': 0,
            'paramDescription': 'Stratiform rainfall rate 0',
            'paramName': 'stratiform_rainfall_rate_0',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:stratiform_rainfall_rate_0',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:stratiform_rainfall_rate_0',
            'label': 'Stratiform rainfall rate 0'
          }, {
            'displayName': 'Surface downwelling longwave flux',
            'groupingId': 0,
            'paramDescription': 'Surface downwelling longwave flux',
            'paramName': 'surface_downwelling_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_downwelling_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_downwelling_longwave_flux',
            'label': 'Surface downwelling longwave flux'
          }, {
            'displayName': 'Surface temperature',
            'groupingId': 0,
            'paramDescription': 'Surface temperature',
            'paramName': 'surface_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:surface_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:surface_temperature',
            'label': 'Surface temperature'
          }, {
            'displayName': 'TOA outgoing longwave flux',
            'groupingId': 0,
            'paramDescription': 'TOA outgoing longwave flux',
            'paramName': 'toa_outgoing_longwave_flux',
            'workspaceName': 'twoDaysForecast',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:toa_outgoing_longwave_flux',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:toa_outgoing_longwave_flux',
            'label': 'TOA outgoing longwave flux'
          }, {
            'displayName': 'OUT BASEFLOW',
            'groupingId': 1,
            'paramDescription': 'OUT_BASEFLOW',
            'paramName': 'OUT_BASEFLOW',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_BASEFLOW',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_BASEFLOW',
            'label': 'OUT BASEFLOW'
          }, {
            'displayName': 'OUT EVAP',
            'groupingId': 1,
            'paramDescription': 'OUT_EVAP',
            'paramName': 'OUT_EVAP',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_EVAP',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_EVAP',
            'label': 'OUT EVAP'
          }, {
            'displayName': 'OUT RUNOFF',
            'groupingId': 1,
            'paramDescription': 'OUT_RUNOFF',
            'paramName': 'OUT_RUNOFF',
            'workspaceName': 'hidrology',
            'unit': 'NO_UNIT_SPECIFIED',
            'hasTimeFrame': false,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'hidrology:OUT_RUNOFF',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=hidrology:OUT_RUNOFF',
            'label': 'OUT RUNOFF'
          }],
          'value': {
            'displayName': 'Air temperature',
            'groupingId': 0,
            'paramDescription': 'Air temperature',
            'paramName': 'air_temperature',
            'workspaceName': 'twoDaysForecast',
            'unit': 'K',
            'hasTimeFrame': true,
            'layerUrl': 'http://35.178.230.72:8180/geoserver/wms',
            'layerParameters': {
              'layers': 'twoDaysForecast:air_temperature',
              'format': 'image/png',
              'transparent': true
            },
            'legendUrl': 'http://35.178.230.72:8180/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=twoDaysForecast:air_temperature',
            'label': 'Air temperature'
          },
          'onChange': {
            '_custom': {
              'type': 'function',
              'display': '<span>ƒ</span> onChange(card)'
            }
          }
        }]
      },
      'title': 'Air temperature',
      'id': 4
    }]
  },
  area: {
    type: 'district',
    name: 'Abim',
    id: 5
  },
  activeSettings: {
    temperature: 'C',
    windSpeed: 'mph',
    pressure: 'Pa',
    rain: 'Kg/m2/s',
    floodWarning: false,
    stormWarning: false
  }
}

export default {
  getDashboardConfiguration () {
    return configuration.dashboard
  },
  getArea () {
    return configuration.area
  },
  getActiveSettings () {
    return configuration.activeSettings
  },
  setActiveSettings (activeSettings) {
    configuration.activeSettings = activeSettings
  }
}
