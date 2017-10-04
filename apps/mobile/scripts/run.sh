#!/bin/bash

cp "../ios/www/track.geojson" "/Users/koen/Desktop/VV/`date`.geojson"
cp "$1" ../ios/www/track.geojson
rm -rf ../ios/www/map
mkdir ../ios/www/map
cp metadata.json ../ios/www/map/metadata.json
cat ../ios/www/track.geojson | MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoidmVzcGFrb2VuIiwiYSI6IldheG83a1kifQ.I1iQXvyeN8f-CLzp6EAQOQ node ./download-tiles.js
gunzip -S "" ../ios/www/map/*/*/*.pbf --force
