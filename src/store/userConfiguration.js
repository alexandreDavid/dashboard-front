let configuration = {
  dashboard: {
    title: 'Dashboard',
    cards: [
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'widget': {
          'id': 'graph',
          'label': 'Graph',
          'formFields': [
            {
              'id': 'parameter',
              'label': 'Parameter',
              'type': 'select',
              'options': [
                {
                  'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                  'paramName': 'air_pressure_at_sea_level',
                  'unit': 'Pa',
                  'workspaceName': 'air_pressure_at_sea_level',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'PRESSURE AT MEAN SEA LEVEL'
                },
                {
                  'displayName': 'TEMPERATURE AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TEMPERATURE AT 1.5M',
                  'paramName': 'air_temperature',
                  'unit': 'K',
                  'workspaceName': 'air_temperature',
                  'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                  'layerParameters': {
                    'layers': 'metoffice:air_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'interactiveLegend': true,
                  'label': 'TEMPERATURE AT 1.5M'
                },
                {
                  'displayName': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'paramName': 'stratiform_rainfall_rate_0',
                  'unit': 'kg/m^2*s',
                  'workspaceName': 'stratiform_rainfall_rate_0',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'stratiform_rainfall_rate_0:stratiform_rainfall_rate_0',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=stratiform_rainfall_rate_0:stratiform_rainfall_rate_0&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'TOTAL PRECIPITATION RATE KG/M2/S'
                },
                {
                  'displayName': 'RELATIVE HUMIDITY AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'RELATIVE HUMIDITY AT 1.5M',
                  'paramName': 'relative_humidity',
                  'unit': '%',
                  'workspaceName': 'relative_humidity',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'relative_humidity:relative_humidity',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=relative_humidity:relative_humidity&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'RELATIVE HUMIDITY AT 1.5M'
                },
                {
                  'displayName': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'paramName': 'surface_downwelling_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'surface_downwelling_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'surface_downwelling_longwave_flux:surface_downwelling_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=surface_downwelling_longwave_flux:surface_downwelling_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)'
                },
                {
                  'displayName': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'paramName': 'toa_outgoing_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'toa_outgoing_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'toa_outgoing_longwave_flux:toa_outgoing_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=toa_outgoing_longwave_flux:toa_outgoing_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)'
                },
                {
                  'displayName': 'NDVI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Normalised Difference Vegetation Index',
                  'paramName': 'NDVI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'NDVI'
                },
                {
                  'displayName': 'BAI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Burned Area Index',
                  'paramName': 'BAI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'BAI'
                },
                {
                  'displayName': 'Land Surface Temperature',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Land Surface Temperature',
                  'paramName': 'land_surface_temperature',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'land_surface_temperature',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'land_surface_temperature:land_surface_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=land_surface_temperature:land_surface_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Land Surface Temperature'
                },
                {
                  'displayName': 'Soil Moisture',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Soil Moisture',
                  'paramName': 'soil_moisture_content',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'soil_moisture_content',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'soil_moisture_content:soil_moisture_content',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=soil_moisture_content:soil_moisture_content&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Soil Moisture'
                }
              ],
              'value': {
                'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                'groupingId': 0,
                'hasGraph': true,
                'hasTimeFrame': true,
                'isActive': true,
                'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                'paramName': 'air_pressure_at_sea_level',
                'unit': 'Pa',
                'workspaceName': 'air_pressure_at_sea_level',
                'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                'layerParameters': {
                  'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                  'format': 'image/png',
                  'transparent': true
                },
                'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                'label': 'PRESSURE AT MEAN SEA LEVEL'
              },
              'onChange': {
                '_custom': {
                  'type': 'function',
                  'display': '<span>ƒ</span> onChange(card)'
                }
              }
            },
            {
              'id': 'graphType',
              'label': 'Graph type',
              'type': 'select',
              'options': [
                {
                  'value': 'LineChart',
                  'label': 'Line chart'
                },
                {
                  'value': 'PieChart',
                  'label': 'Pie chart'
                }
              ],
              'value': {
                'value': 'LineChart',
                'label': 'Line chart'
              }
            }
          ]
        },
        'title': 'PRESSURE AT MEAN SEA LEVEL',
        'id': 1
      },
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'widget': {
          'id': 'map',
          'label': 'Map',
          'formFields': [
            {
              'id': 'parameter',
              'label': 'Parameter',
              'type': 'select',
              'options': [
                {
                  'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                  'paramName': 'air_pressure_at_sea_level',
                  'unit': 'Pa',
                  'workspaceName': 'air_pressure_at_sea_level',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'PRESSURE AT MEAN SEA LEVEL'
                },
                {
                  'displayName': 'TEMPERATURE AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TEMPERATURE AT 1.5M',
                  'paramName': 'air_temperature',
                  'unit': 'K',
                  'workspaceName': 'air_temperature',
                  'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                  'layerParameters': {
                    'layers': 'metoffice:air_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'interactiveLegend': true,
                  'label': 'TEMPERATURE AT 1.5M'
                },
                {
                  'displayName': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'paramName': 'stratiform_rainfall_rate_0',
                  'unit': 'kg/m^2*s',
                  'workspaceName': 'stratiform_rainfall_rate_0',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'stratiform_rainfall_rate_0:stratiform_rainfall_rate_0',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=stratiform_rainfall_rate_0:stratiform_rainfall_rate_0&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'TOTAL PRECIPITATION RATE KG/M2/S'
                },
                {
                  'displayName': 'RELATIVE HUMIDITY AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'RELATIVE HUMIDITY AT 1.5M',
                  'paramName': 'relative_humidity',
                  'unit': '%',
                  'workspaceName': 'relative_humidity',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'relative_humidity:relative_humidity',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=relative_humidity:relative_humidity&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'RELATIVE HUMIDITY AT 1.5M'
                },
                {
                  'displayName': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'paramName': 'surface_downwelling_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'surface_downwelling_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'surface_downwelling_longwave_flux:surface_downwelling_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=surface_downwelling_longwave_flux:surface_downwelling_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)'
                },
                {
                  'displayName': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'paramName': 'toa_outgoing_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'toa_outgoing_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'toa_outgoing_longwave_flux:toa_outgoing_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=toa_outgoing_longwave_flux:toa_outgoing_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)'
                },
                {
                  'displayName': 'NDVI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Normalised Difference Vegetation Index',
                  'paramName': 'NDVI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'NDVI'
                },
                {
                  'displayName': 'BAI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Burned Area Index',
                  'paramName': 'BAI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'BAI'
                },
                {
                  'displayName': 'Land Surface Temperature',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Land Surface Temperature',
                  'paramName': 'land_surface_temperature',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'land_surface_temperature',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'land_surface_temperature:land_surface_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=land_surface_temperature:land_surface_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Land Surface Temperature'
                },
                {
                  'displayName': 'Soil Moisture',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Soil Moisture',
                  'paramName': 'soil_moisture_content',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'soil_moisture_content',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'soil_moisture_content:soil_moisture_content',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=soil_moisture_content:soil_moisture_content&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Soil Moisture'
                }
              ],
              'value': {
                'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                'groupingId': 0,
                'hasGraph': true,
                'hasTimeFrame': true,
                'isActive': true,
                'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                'paramName': 'air_pressure_at_sea_level',
                'unit': 'Pa',
                'workspaceName': 'air_pressure_at_sea_level',
                'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                'layerParameters': {
                  'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                  'format': 'image/png',
                  'transparent': true
                },
                'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                'label': 'PRESSURE AT MEAN SEA LEVEL'
              },
              'onChange': {
                '_custom': {
                  'type': 'function',
                  'display': '<span>ƒ</span> onChange(card)'
                }
              }
            }
          ]
        },
        'title': 'PRESSURE AT MEAN SEA LEVEL',
        'id': 2
      },
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'widget': {
          'id': 'graph',
          'label': 'Graph',
          'formFields': [
            {
              'id': 'parameter',
              'label': 'Parameter',
              'type': 'select',
              'options': [
                {
                  'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                  'paramName': 'air_pressure_at_sea_level',
                  'unit': 'Pa',
                  'workspaceName': 'air_pressure_at_sea_level',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'PRESSURE AT MEAN SEA LEVEL'
                },
                {
                  'displayName': 'TEMPERATURE AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TEMPERATURE AT 1.5M',
                  'paramName': 'air_temperature',
                  'unit': 'K',
                  'workspaceName': 'air_temperature',
                  'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                  'layerParameters': {
                    'layers': 'metoffice:air_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'interactiveLegend': true,
                  'label': 'TEMPERATURE AT 1.5M'
                },
                {
                  'displayName': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'paramName': 'stratiform_rainfall_rate_0',
                  'unit': 'kg/m^2*s',
                  'workspaceName': 'stratiform_rainfall_rate_0',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'stratiform_rainfall_rate_0:stratiform_rainfall_rate_0',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=stratiform_rainfall_rate_0:stratiform_rainfall_rate_0&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'TOTAL PRECIPITATION RATE KG/M2/S'
                },
                {
                  'displayName': 'RELATIVE HUMIDITY AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'RELATIVE HUMIDITY AT 1.5M',
                  'paramName': 'relative_humidity',
                  'unit': '%',
                  'workspaceName': 'relative_humidity',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'relative_humidity:relative_humidity',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=relative_humidity:relative_humidity&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'RELATIVE HUMIDITY AT 1.5M'
                },
                {
                  'displayName': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'paramName': 'surface_downwelling_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'surface_downwelling_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'surface_downwelling_longwave_flux:surface_downwelling_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=surface_downwelling_longwave_flux:surface_downwelling_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)'
                },
                {
                  'displayName': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'paramName': 'toa_outgoing_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'toa_outgoing_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'toa_outgoing_longwave_flux:toa_outgoing_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=toa_outgoing_longwave_flux:toa_outgoing_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)'
                },
                {
                  'displayName': 'NDVI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Normalised Difference Vegetation Index',
                  'paramName': 'NDVI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'NDVI'
                },
                {
                  'displayName': 'BAI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Burned Area Index',
                  'paramName': 'BAI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'BAI'
                },
                {
                  'displayName': 'Land Surface Temperature',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Land Surface Temperature',
                  'paramName': 'land_surface_temperature',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'land_surface_temperature',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'land_surface_temperature:land_surface_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=land_surface_temperature:land_surface_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Land Surface Temperature'
                },
                {
                  'displayName': 'Soil Moisture',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Soil Moisture',
                  'paramName': 'soil_moisture_content',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'soil_moisture_content',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'soil_moisture_content:soil_moisture_content',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=soil_moisture_content:soil_moisture_content&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Soil Moisture'
                }
              ],
              'value': {
                'displayName': 'TEMPERATURE AT 1.5M',
                'groupingId': 0,
                'hasGraph': true,
                'hasTimeFrame': true,
                'isActive': true,
                'paramDescription': 'TEMPERATURE AT 1.5M',
                'paramName': 'air_temperature',
                'unit': 'K',
                'workspaceName': 'air_temperature',
                'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                'layerParameters': {
                  'layers': 'metoffice:air_temperature',
                  'format': 'image/png',
                  'transparent': true
                },
                'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                'interactiveLegend': true,
                'label': 'TEMPERATURE AT 1.5M'
              },
              'onChange': {
                '_custom': {
                  'type': 'function',
                  'display': '<span>ƒ</span> onChange(card)'
                }
              }
            },
            {
              'id': 'graphType',
              'label': 'Graph type',
              'type': 'select',
              'options': [
                {
                  'value': 'LineChart',
                  'label': 'Line chart'
                },
                {
                  'value': 'PieChart',
                  'label': 'Pie chart'
                }
              ],
              'value': {
                'value': 'LineChart',
                'label': 'Line chart'
              }
            }
          ]
        },
        'title': 'TEMPERATURE AT 1.5M',
        'id': 3
      },
      {
        'widthClass': 'col-md-6',
        'heightClass': 'height-medium',
        'widget': {
          'id': 'map',
          'label': 'Map',
          'formFields': [
            {
              'id': 'parameter',
              'label': 'Parameter',
              'type': 'select',
              'options': [
                {
                  'displayName': 'PRESSURE AT MEAN SEA LEVEL',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'PRESSURE AT MEAN SEA LEVEL',
                  'paramName': 'air_pressure_at_sea_level',
                  'unit': 'Pa',
                  'workspaceName': 'air_pressure_at_sea_level',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'air_pressure_at_sea_level:air_pressure_at_sea_level',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_pressure_at_sea_level:air_pressure_at_sea_level&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'PRESSURE AT MEAN SEA LEVEL'
                },
                {
                  'displayName': 'TEMPERATURE AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TEMPERATURE AT 1.5M',
                  'paramName': 'air_temperature',
                  'unit': 'K',
                  'workspaceName': 'air_temperature',
                  'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                  'layerParameters': {
                    'layers': 'metoffice:air_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'interactiveLegend': true,
                  'label': 'TEMPERATURE AT 1.5M'
                },
                {
                  'displayName': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'TOTAL PRECIPITATION RATE KG/M2/S',
                  'paramName': 'stratiform_rainfall_rate_0',
                  'unit': 'kg/m^2*s',
                  'workspaceName': 'stratiform_rainfall_rate_0',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'stratiform_rainfall_rate_0:stratiform_rainfall_rate_0',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=stratiform_rainfall_rate_0:stratiform_rainfall_rate_0&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'TOTAL PRECIPITATION RATE KG/M2/S'
                },
                {
                  'displayName': 'RELATIVE HUMIDITY AT 1.5M',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'RELATIVE HUMIDITY AT 1.5M',
                  'paramName': 'relative_humidity',
                  'unit': '%',
                  'workspaceName': 'relative_humidity',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'relative_humidity:relative_humidity',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=relative_humidity:relative_humidity&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'RELATIVE HUMIDITY AT 1.5M'
                },
                {
                  'displayName': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)',
                  'paramName': 'surface_downwelling_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'surface_downwelling_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'surface_downwelling_longwave_flux:surface_downwelling_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=surface_downwelling_longwave_flux:surface_downwelling_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'DOWNWARD LW RAD FLUX: SURFACE - mean: time (1 hour)'
                },
                {
                  'displayName': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'groupingId': 0,
                  'hasGraph': true,
                  'hasTimeFrame': true,
                  'isActive': true,
                  'paramDescription': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)',
                  'paramName': 'toa_outgoing_longwave_flux',
                  'unit': 'W/m^2',
                  'workspaceName': 'toa_outgoing_longwave_flux',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'toa_outgoing_longwave_flux:toa_outgoing_longwave_flux',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=toa_outgoing_longwave_flux:toa_outgoing_longwave_flux&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'OUTGOING LW RAD FLUX (TOA) - mean: time (1 hour)'
                },
                {
                  'displayName': 'NDVI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Normalised Difference Vegetation Index',
                  'paramName': 'NDVI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_NDVI_EPSG4326_JPEG:NDVI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'NDVI'
                },
                {
                  'displayName': 'BAI',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Burned Area Index',
                  'paramName': 'BAI',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=S2_Uganda_Jan2018_10m_BAI_EPSG4326_JPEG:BAI&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'BAI'
                },
                {
                  'displayName': 'Land Surface Temperature',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Land Surface Temperature',
                  'paramName': 'land_surface_temperature',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'land_surface_temperature',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'land_surface_temperature:land_surface_temperature',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=land_surface_temperature:land_surface_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Land Surface Temperature'
                },
                {
                  'displayName': 'Soil Moisture',
                  'groupingId': 2,
                  'hasGraph': false,
                  'hasTimeFrame': false,
                  'isActive': true,
                  'paramDescription': 'Soil Moisture',
                  'paramName': 'soil_moisture_content',
                  'unit': 'NO_UNIT_SPECIFIED',
                  'workspaceName': 'soil_moisture_content',
                  'layerUrl': 'http://demo.dfms.co.uk/geoserver/wms',
                  'layerParameters': {
                    'layers': 'soil_moisture_content:soil_moisture_content',
                    'format': 'image/png',
                    'transparent': true
                  },
                  'legendUrl': 'http://demo.dfms.co.uk/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=soil_moisture_content:soil_moisture_content&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                  'label': 'Soil Moisture'
                }
              ],
              'value': {
                'displayName': 'TEMPERATURE AT 1.5M',
                'groupingId': 0,
                'hasGraph': true,
                'hasTimeFrame': true,
                'isActive': true,
                'paramDescription': 'TEMPERATURE AT 1.5M',
                'paramName': 'air_temperature',
                'unit': 'K',
                'workspaceName': 'air_temperature',
                'layerUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms',
                'layerParameters': {
                  'layers': 'metoffice:air_temperature',
                  'format': 'image/png',
                  'transparent': true
                },
                'legendUrl': 'http://35.178.87.6/proxy/geoserver/metoffice/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=air_temperature:air_temperature&legend_options=fontName:Roboto%20Light;fontAntiAliasing:true;fontColor:0x333132;fontSize:10;bgColor:0xFFFFFF;dpi:180;&format_options=layout:legend;',
                'interactiveLegend': true,
                'label': 'TEMPERATURE AT 1.5M'
              },
              'onChange': {
                '_custom': {
                  'type': 'function',
                  'display': '<span>ƒ</span> onChange(card)'
                }
              }
            }
          ]
        },
        'title': 'TEMPERATURE AT 1.5M',
        'id': 4
      }
    ]
  },
  area: {
    type: 'district',
    name: 'Abim',
    id: 5
  },
  units: {
    temperature: 'C'
  }
}

export default {
  getDashboardConfiguration () {
    return configuration.dashboard
  },
  getArea () {
    return configuration.area
  },
  getUnitByFamily (family) {
    return configuration.units[family]
  }
}
