## Generating TopoJson

**Dependencies**

1. gdal (`brew install gdal`)
2. mapshaper (`npm install -g mapshaper`)

**Generation**

1. Download Natural Earth's [states and provinces global dataset](http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces_lakes.zip) and unzip

2. `ogr2ogr -f GeoJSON  -where "iso_a2 IN ('US', 'CA') AND name NOT IN ('Nunavut', 'Northwest Territories', 'Hawaii', 'Alaska', 'Yukon')" -select "adm0_sr, iso_a2, name" countries.json ne_10m_admin_1_states_provinces_lakes.shp && mapshaper countries.json -simplify 3% -o format=topojson countries.topo.json`
  - This selects US and Canada, excludes certain provinces/states, and select the
  country name, province (i.e. state) name, and country codes.

3. `mapshaper countries.json -simplify 3% -o format=topojson countries.topo.json`
  - This reduces file size by smoothing out geographical details and converts to topojson format
