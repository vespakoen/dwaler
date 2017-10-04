module.exports = {
  outdoors: {
    "version": 8,
    "name": "Mapbox Outdoors",
    "metadata": {
      "mapbox:autocomposite": true,
      "mapbox:type": "default",
      "mapbox:groups": {
        "1444934828655.3389": {
          "name": "Aeroways",
          "collapsed": true
        },
        "1444933322393.2852": {
          "name": "POI labels  (scalerank 1)",
          "collapsed": true
        },
        "1444934749452.0452": {
          "name": "Wetlands",
          "collapsed": true
        },
        "1444855786460.0557": {
          "name": "Roads",
          "collapsed": true
        },
        "1444933575858.6992": {
          "name": "Highway shields",
          "collapsed": true
        },
        "1444934295202.7542": {
          "name": "Admin boundaries",
          "collapsed": true
        },
        "1444856151690.9143": {
          "name": "State labels",
          "collapsed": true
        },
        "1444933721429.3076": {
          "name": "Road labels",
          "collapsed": true
        },
        "1444933358918.2366": {
          "name": "POI labels (scalerank 2)",
          "collapsed": true
        },
        "1444933808272.805": {
          "name": "Water labels",
          "collapsed": true
        },
        "1444855815295.714": {
          "name": "Hillshading",
          "collapsed": true
        },
        "1444855831248.8289": {
          "name": "Landcover",
          "collapsed": true
        },
        "1444933372896.5967": {
          "name": "POI labels (scalerank 3)",
          "collapsed": true
        },
        "1444855799204.86": {
          "name": "Bridges",
          "collapsed": true
        },
        "1444856087950.3635": {
          "name": "Marine labels",
          "collapsed": true
        },
        "1444862510685.128": {
          "name": "City labels",
          "collapsed": true
        },
        "1444855769305.6016": {
          "name": "Tunnels",
          "collapsed": true
        },
        "1444856144497.7825": {
          "name": "Country labels",
          "collapsed": true
        },
        "1444933456003.5437": {
          "name": "POI labels (scalerank 4)",
          "collapsed": true
        },
        "1444933837268.9458": {
          "name": "Contour lines",
          "collapsed": true
        }
      },
      "mapbox:trackposition": true
    },
    "sources": {},
    "sprite": "asset://www/sprite",
    "glyphs": "asset://www/fonts/{fontstack}/{range}.pbf",
    "layers": [
      {
        "id": "background",
        "type": "background",
        "layout": {

        },
        "paint": {
          "background-color": {
            "base": 1,
            "stops": [
              [
                11,
                "hsl(35, 32%, 91%)"
              ],
              [
                13,
                "hsl(35, 12%, 89%)"
              ]
            ]
          }
        }
      },
      {
        "id": "landcover_crop",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855831248.8289"
        },
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 12,
        "filter": [
          "==",
          "class",
          "crop"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 62%, 81%)",
          "fill-opacity": {
            "base": 1.5,
            "stops": [
              [
                2,
                0.3
              ],
              [
                12,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "landcover_grass",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855831248.8289"
        },
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 12,
        "filter": [
          "==",
          "class",
          "grass"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 62%, 81%)",
          "fill-opacity": {
            "base": 1.5,
            "stops": [
              [
                2,
                0.3
              ],
              [
                12,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "landcover_scrub",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855831248.8289"
        },
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 12,
        "filter": [
          "==",
          "class",
          "scrub"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 62%, 81%)",
          "fill-opacity": {
            "base": 1.5,
            "stops": [
              [
                2,
                0.3
              ],
              [
                12,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "landcover_wood",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855831248.8289"
        },
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 12,
        "filter": [
          "==",
          "class",
          "wood"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 62%, 81%)",
          "fill-opacity": {
            "base": 1.5,
            "stops": [
              [
                2,
                0.3
              ],
              [
                12,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "landcover_snow",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855831248.8289"
        },
        "source": "composite",
        "source-layer": "landcover",
        "filter": [
          "==",
          "class",
          "snow"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(0, 0%, 100%)",
          "fill-opacity": 0.2,
          "fill-antialias": false
        }
      },
      {
        "id": "national_park",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse_overlay",
        "filter": [
          "==",
          "class",
          "national_park"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(100, 59%, 76%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                0.75
              ],
              [
                9,
                0.75
              ],
              [
                10,
                0.35
              ]
            ]
          }
        }
      },
      {
        "id": "scrub",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 9,
        "filter": [
          "==",
          "class",
          "scrub"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 41%, 74%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                9,
                0
              ],
              [
                15,
                0.2
              ]
            ]
          }
        }
      },
      {
        "id": "grass",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 9,
        "filter": [
          "==",
          "class",
          "grass"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 41%, 74%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                9,
                0
              ],
              [
                15,
                0.4
              ]
            ]
          }
        }
      },
      {
        "id": "wood",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 6,
        "filter": [
          "==",
          "class",
          "wood"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 41%, 74%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                15,
                0.5
              ]
            ]
          }
        }
      },
      {
        "id": "agriculture",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 11,
        "filter": [
          "==",
          "class",
          "agriculture"
        ],
        "layout": {

        },
        "paint": {
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                11,
                0
              ],
              [
                14,
                0.75
              ]
            ]
          },
          "fill-color": "hsl(75, 37%, 81%)",
          "fill-outline-color": "hsl(75, 32%, 68%)"
        }
      },
      {
        "id": "national_park-tint-band",
        "type": "line",
        "source": "composite",
        "source-layer": "landuse_overlay",
        "minzoom": 9,
        "filter": [
          "==",
          "class",
          "national_park"
        ],
        "layout": {
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(100, 62%, 74%)",
          "line-width": {
            "base": 1.4,
            "stops": [
              [
                9,
                1
              ],
              [
                14,
                8
              ]
            ]
          },
          "line-offset": {
            "base": 1.4,
            "stops": [
              [
                9,
                0
              ],
              [
                14,
                -2.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9,
                0
              ],
              [
                10,
                0.75
              ]
            ]
          },
          "line-blur": 3
        }
      },
      {
        "id": "national_park-outline",
        "type": "line",
        "source": "composite",
        "source-layer": "landuse_overlay",
        "minzoom": 9,
        "filter": [
          "==",
          "class",
          "national_park"
        ],
        "layout": {

        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                12,
                "hsl(100, 49%, 71%)"
              ],
              [
                14,
                "hsl(100, 40%, 67%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                9,
                0.75
              ],
              [
                12,
                1
              ]
            ]
          },
          "line-offset": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "hospital",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "hospital"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(340, 37%, 87%)"
              ],
              [
                16,
                "hsl(340, 63%, 89%)"
              ]
            ]
          }
        }
      },
      {
        "id": "school",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "school"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(50, 47%, 81%)"
              ],
              [
                16,
                "hsl(50, 63%, 84%)"
              ]
            ]
          }
        }
      },
      {
        "id": "park",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "all",
          [
            "==",
            "class",
            "park"
          ],
          [
            "!in",
            "type",
            "garden",
            "golf_course",
            "playground",
            "zoo"
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(100, 59%, 76%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                5,
                0
              ],
              [
                6,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "other-green-areas",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "all",
          [
            "==",
            "class",
            "park"
          ],
          [
            "in",
            "type",
            "garden",
            "golf_course",
            "playground",
            "zoo"
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(100, 59%, 81%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                5,
                0
              ],
              [
                6,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "glacier",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 9,
        "filter": [
          "==",
          "class",
          "glacier"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(196, 71%, 93%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                9,
                0
              ],
              [
                10,
                0.5
              ]
            ]
          }
        }
      },
      {
        "id": "pitch",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "pitch"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(100, 57%, 72%)"
        }
      },
      {
        "id": "pitch-line",
        "type": "line",
        "source": "composite",
        "source-layer": "landuse",
        "minzoom": 15,
        "filter": [
          "==",
          "class",
          "pitch"
        ],
        "layout": {
          "line-join": "miter"
        },
        "paint": {
          "line-color": "hsl(75, 57%, 84%)"
        }
      },
      {
        "id": "cemetery",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "cemetery"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(75, 37%, 81%)"
        }
      },
      {
        "id": "industrial",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "industrial"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15.5,
                "hsl(230, 15%, 86%)"
              ],
              [
                16,
                "hsl(230, 29%, 89%)"
              ]
            ]
          }
        }
      },
      {
        "id": "sand",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": [
          "==",
          "class",
          "sand"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(60, 46%, 87%)"
        }
      },
      {
        "id": "contour-line",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444933837268.9458"
        },
        "source": "composite",
        "source-layer": "contour",
        "minzoom": 11,
        "filter": [
          "!in",
          "index",
          5,
          10
        ],
        "layout": {

        },
        "paint": {
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                11,
                0.15
              ],
              [
                12,
                0.3
              ]
            ]
          },
          "line-color": "hsl(100, 100%, 20%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                13,
                0.5
              ],
              [
                16,
                0.8
              ]
            ]
          },
          "line-offset": {
            "base": 1,
            "stops": [
              [
                13,
                1
              ],
              [
                16,
                1.6
              ]
            ]
          }
        }
      },
      {
        "id": "contour-line-index",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444933837268.9458"
        },
        "source": "composite",
        "source-layer": "contour",
        "minzoom": 11,
        "filter": [
          "in",
          "index",
          5,
          10
        ],
        "layout": {

        },
        "paint": {
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                11,
                0.25
              ],
              [
                12,
                0.5
              ]
            ]
          },
          "line-color": "hsl(100, 100%, 20%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                13,
                0.6
              ],
              [
                16,
                1.2
              ]
            ]
          },
          "line-offset": {
            "base": 1,
            "stops": [
              [
                13,
                0.6
              ],
              [
                16,
                1.2
              ]
            ]
          }
        }
      },
      {
        "id": "hillshade_highlight_bright",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "maxzoom": 18,
        "filter": [
          "==",
          "level",
          94
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(0, 0%, 100%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.15
              ],
              [
                18,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "hillshade_highlight_med",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "filter": [
          "==",
          "level",
          90
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(0, 0%, 100%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.15
              ],
              [
                18,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "hillshade_shadow_faint",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "maxzoom": 17,
        "filter": [
          "==",
          "level",
          89
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(56, 59%, 22%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.07
              ],
              [
                17,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "hillshade_shadow_med",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "filter": [
          "==",
          "level",
          78
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(56, 59%, 22%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.07
              ],
              [
                17,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "hillshade_shadow_dark",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "filter": [
          "==",
          "level",
          67
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(56, 59%, 22%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.08
              ],
              [
                17,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "hillshade_shadow_extreme",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855815295.714"
        },
        "source": "composite",
        "source-layer": "hillshade",
        "maxzoom": 17,
        "filter": [
          "==",
          "level",
          56
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(56, 59%, 22%)",
          "fill-opacity": {
            "stops": [
              [
                15,
                0.08
              ],
              [
                17,
                0
              ]
            ]
          },
          "fill-antialias": false
        }
      },
      {
        "id": "waterway-river-canal-shadow",
        "type": "line",
        "source": "composite",
        "source-layer": "waterway",
        "minzoom": 8,
        "filter": [
          "in",
          "class",
          "canal",
          "river"
        ],
        "layout": {
          "line-cap": {
            "base": 1,
            "stops": [
              [
                0,
                "butt"
              ],
              [
                11,
                "round"
              ]
            ]
          },
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(215, 84%, 69%)",
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                8.5,
                0.4
              ],
              [
                20,
                8
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                8,
                0
              ],
              [
                8.5,
                1
              ]
            ]
          },
          "line-translate": {
            "base": 1.2,
            "stops": [
              [
                7,
                [
                  0,
                  0
                ]
              ],
              [
                16,
                [
                  -1,
                  -1
                ]
              ]
            ]
          },
          "line-translate-anchor": "viewport"
        }
      },
      {
        "id": "waterway-river-canal",
        "ref": "waterway-river-canal-shadow",
        "paint": {
          "line-color": "hsl(205, 87%, 76%)",
          "line-width": {
            "base": 1.3,
            "stops": [
              [
                8.5,
                0.4
              ],
              [
                20,
                8
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                8,
                0
              ],
              [
                8.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "waterway-small",
        "type": "line",
        "source": "composite",
        "source-layer": "waterway",
        "minzoom": 13,
        "filter": [
          "!in",
          "class",
          "canal",
          "river"
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(205, 87%, 76%)",
          "line-width": {
            "base": 1.35,
            "stops": [
              [
                13.5,
                0.4
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "water-shadow",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(215, 84%, 69%)",
          "fill-translate": {
            "base": 1.2,
            "stops": [
              [
                7,
                [
                  0,
                  0
                ]
              ],
              [
                16,
                [
                  -1,
                  -1
                ]
              ]
            ]
          },
          "fill-translate-anchor": "viewport",
          "fill-opacity": 1
        }
      },
      {
        "id": "water",
        "ref": "water-shadow",
        "paint": {
          "fill-color": "hsl(196, 80%, 70%)"
        }
      },
      {
        "id": "wetlands",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444934749452.0452"
        },
        "source": "composite",
        "source-layer": "landuse_overlay",
        "filter": [
          "in",
          "class",
          "wetland",
          "wetland_noveg"
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(185, 43%, 74%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                10,
                0.25
              ],
              [
                10.5,
                0.15
              ]
            ]
          }
        }
      },
      {
        "id": "wetlands-pattern",
        "metadata": {
          "mapbox:group": "1444934749452.0452"
        },
        "ref": "wetlands",
        "paint": {
          "fill-color": "hsl(185, 43%, 74%)",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                10,
                0
              ],
              [
                10.5,
                1
              ]
            ]
          },
          "fill-pattern": "wetland",
          "fill-translate-anchor": "viewport"
        }
      },
      {
        "id": "barrier_line-land-polygon",
        "type": "fill",
        "source": "composite",
        "source-layer": "barrier_line",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "==",
            "class",
            "land"
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(35, 12%, 89%)"
        }
      },
      {
        "id": "barrier_line-land-line",
        "type": "line",
        "source": "composite",
        "source-layer": "barrier_line",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "class",
            "land"
          ]
        ],
        "layout": {
          "line-cap": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.99,
            "stops": [
              [
                14,
                0.75
              ],
              [
                20,
                40
              ]
            ]
          },
          "line-color": "hsl(35, 12%, 89%)"
        }
      },
      {
        "id": "aeroway-polygon",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444934828655.3389"
        },
        "source": "composite",
        "source-layer": "aeroway",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "!=",
            "type",
            "apron"
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(230, 23%, 82%)"
              ],
              [
                16,
                "hsl(230, 37%, 84%)"
              ]
            ]
          },
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                11,
                0
              ],
              [
                11.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "aeroway-runway",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934828655.3389"
        },
        "source": "composite",
        "source-layer": "aeroway",
        "minzoom": 9,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "type",
            "runway"
          ]
        ],
        "layout": {

        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(230, 23%, 82%)"
              ],
              [
                16,
                "hsl(230, 37%, 84%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                9,
                1
              ],
              [
                18,
                80
              ]
            ]
          }
        }
      },
      {
        "id": "aeroway-taxiway",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934828655.3389"
        },
        "source": "composite",
        "source-layer": "aeroway",
        "minzoom": 9,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "type",
            "taxiway"
          ]
        ],
        "layout": {

        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(230, 23%, 82%)"
              ],
              [
                16,
                "hsl(230, 37%, 84%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                0.5
              ],
              [
                18,
                20
              ]
            ]
          }
        }
      },
      {
        "id": "building-line",
        "type": "line",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "!=",
            "type",
            "building:part"
          ],
          [
            "==",
            "underground",
            "false"
          ]
        ],
        "layout": {

        },
        "paint": {
          "line-color": "hsl(35, 6%, 79%)",
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                0.75
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                15.5,
                0
              ],
              [
                16,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "!=",
            "type",
            "building:part"
          ],
          [
            "==",
            "underground",
            "false"
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(35, 11%, 88%)"
              ],
              [
                16,
                "hsl(35, 8%, 85%)"
              ]
            ]
          },
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                15.5,
                0
              ],
              [
                16,
                1
              ]
            ]
          },
          "fill-outline-color": "hsl(35, 6%, 79%)"
        }
      },
      {
        "id": "tunnel-street-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11.5,
                0
              ],
              [
                12,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-street_limited-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street_limited"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11.5,
                0
              ],
              [
                12,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-track-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "track"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-service-link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "service"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 19%, 75%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-street_limited-case",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-street_limited-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 19%, 75%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ],
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-street-case",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-street-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 19%, 75%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ],
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-secondary-tertiary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "secondary",
              "tertiary"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                10,
                0.75
              ],
              [
                18,
                2
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ],
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": "hsl(230, 19%, 75%)"
        }
      },
      {
        "id": "tunnel-primary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "primary"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ],
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(230, 19%, 75%)"
        }
      },
      {
        "id": "tunnel-trunk_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-motorway_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-trunk-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "==",
              "type",
              "trunk"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": 1,
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-motorway-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": 1,
          "line-dasharray": [
            3,
            3
          ]
        }
      },
      {
        "id": "tunnel-construction",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "construction"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-join": "miter"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  0.4,
                  0.8
                ]
              ],
              [
                15,
                [
                  0.3,
                  0.6
                ]
              ],
              [
                16,
                [
                  0.2,
                  0.3
                ]
              ],
              [
                17,
                [
                  0.2,
                  0.25
                ]
              ],
              [
                18,
                [
                  0.15,
                  0.15
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-path",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "!in",
              "type",
              "cycleway",
              "piste",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  3,
                  0.4
                ]
              ],
              [
                16,
                [
                  3,
                  0.35
                ]
              ],
              [
                17,
                [
                  3,
                  0.35
                ]
              ]
            ]
          },
          "line-color": "hsl(35, 26%, 95%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-cycleway-piste",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "in",
              "type",
              "cycleway",
              "piste"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  3,
                  0.4
                ]
              ],
              [
                16,
                [
                  3,
                  0.35
                ]
              ],
              [
                17,
                [
                  3,
                  0.35
                ]
              ]
            ]
          },
          "line-color": "hsl(35, 26%, 95%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-steps",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "==",
              "type",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                16,
                1.6
              ],
              [
                18,
                6
              ]
            ]
          },
          "line-color": "hsl(35, 26%, 95%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  1.75,
                  0.4
                ]
              ],
              [
                16,
                [
                  0.75,
                  0.4
                ]
              ],
              [
                17,
                [
                  0.3,
                  0.3
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-trunk_link",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-trunk_link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(46, 77%, 78%)",
          "line-opacity": 1,
          "line-dasharray": [
            1,
            0
          ]
        }
      },
      {
        "id": "tunnel-motorway_link",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-motorway_link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(26, 74%, 81%)",
          "line-opacity": 1,
          "line-dasharray": [
            1,
            0
          ]
        }
      },
      {
        "id": "tunnel-pedestrian",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "pedestrian"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": 1,
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  1,
                  0
                ]
              ],
              [
                15,
                [
                  1.5,
                  0.4
                ]
              ],
              [
                16,
                [
                  1,
                  0.2
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-track",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-track-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)"
        }
      },
      {
        "id": "tunnel-service-link",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-service-link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": [
            1,
            0
          ]
        }
      },
      {
        "id": "tunnel-street_limited",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-street_limited-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(35, 14%, 93%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-street",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-street-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "tunnel-secondary-tertiary",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-secondary-tertiary-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": 1,
          "line-dasharray": [
            1,
            0
          ],
          "line-blur": 0
        }
      },
      {
        "id": "tunnel-primary",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-primary-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": 1,
          "line-dasharray": [
            1,
            0
          ],
          "line-blur": 0
        }
      },
      {
        "id": "tunnel-oneway-arrows-blue-minor",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "path",
              "pedestrian",
              "service",
              "track"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                17,
                "oneway-small"
              ],
              [
                18,
                "oneway-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-padding": 2
        },
        "paint": {

        }
      },
      {
        "id": "tunnel-oneway-arrows-blue-major",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "primary",
              "secondary",
              "street",
              "street_limited",
              "tertiary"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-small"
              ],
              [
                17,
                "oneway-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-padding": 2
        },
        "paint": {

        }
      },
      {
        "id": "tunnel-trunk",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 77%, 78%)"
        }
      },
      {
        "id": "tunnel-motorway",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "ref": "tunnel-motorway-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-opacity": 1,
          "line-color": "hsl(26, 74%, 81%)",
          "line-blur": 0
        }
      },
      {
        "id": "tunnel-oneway-arrows-white",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855769305.6016"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "trunk"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "tunnel"
            ],
            [
              "!in",
              "type",
              "primary_link",
              "secondary_link",
              "tertiary_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-white-small"
              ],
              [
                17,
                "oneway-white-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-padding": 2
        },
        "paint": {
          "icon-opacity": 0.5
        }
      },
      {
        "id": "cliffs",
        "type": "line",
        "source": "composite",
        "source-layer": "barrier_line",
        "minzoom": 15,
        "filter": [
          "==",
          "class",
          "cliff"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                15,
                0
              ],
              [
                15.25,
                1
              ]
            ]
          },
          "line-width": 10,
          "line-pattern": "cliff"
        }
      },
      {
        "id": "ferry",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "type",
            "ferry"
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(205, 73%, 63%)"
              ],
              [
                17,
                "hsl(230, 73%, 63%)"
              ]
            ]
          },
          "line-opacity": 1,
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                20,
                1
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                12,
                [
                  1,
                  0
                ]
              ],
              [
                13,
                [
                  12,
                  4
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "ferry-auto",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "type",
            "ferry_auto"
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                15,
                "hsl(205, 73%, 63%)"
              ],
              [
                17,
                "hsl(230, 73%, 63%)"
              ]
            ]
          },
          "line-opacity": 1,
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                20,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-path-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "!in",
              "type",
              "corridor",
              "crossing",
              "piste",
              "sidewalk",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2.5
              ],
              [
                18,
                8
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-blur": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                17,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-piste-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "==",
              "type",
              "piste"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2
              ],
              [
                18,
                7
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          },
          "line-color": "hsl(230, 85%, 67%)",
          "line-blur": 0
        }
      },
      {
        "id": "road-sidewalk-corridor-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "in",
              "type",
              "corridor",
              "crossing",
              "sidewalk"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2
              ],
              [
                18,
                7
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-color": "hsl(230, 17%, 82%)",
          "line-blur": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                16,
                0
              ],
              [
                16.25,
                0.25
              ]
            ]
          }
        }
      },
      {
        "id": "road-steps-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "==",
              "type",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2.5
              ],
              [
                18,
                8
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-blur": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                17,
                1
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                0.25
              ]
            ]
          }
        }
      },
      {
        "id": "road-pedestrian-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "pedestrian"
            ],
            [
              "==",
              "structure",
              "none"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                2
              ],
              [
                18,
                14.5
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-street-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street"
            ],
            [
              "==",
              "structure",
              "none"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11,
                0
              ],
              [
                11.25,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "road-street_limited-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street_limited"
            ],
            [
              "==",
              "structure",
              "none"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11,
                0
              ],
              [
                11.25,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "road-track-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "track"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          }
        }
      },
      {
        "id": "road-service-link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "service"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          }
        }
      },
      {
        "id": "road-street_limited-case",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-street_limited-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-street-case",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-street-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-secondary-tertiary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "secondary",
              "tertiary"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                10,
                0.75
              ],
              [
                18,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-primary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "primary"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                9.99,
                0
              ],
              [
                10,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-motorway_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 10,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                10.99,
                0
              ],
              [
                11,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-trunk_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                10.99,
                0
              ],
              [
                11,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-trunk-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                6,
                0
              ],
              [
                6.1,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-motorway-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        }
      },
      {
        "id": "road-construction",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "construction"
            ],
            [
              "==",
              "structure",
              "none"
            ]
          ]
        ],
        "layout": {
          "line-join": "miter"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  0.4,
                  0.8
                ]
              ],
              [
                15,
                [
                  0.3,
                  0.6
                ]
              ],
              [
                16,
                [
                  0.2,
                  0.3
                ]
              ],
              [
                17,
                [
                  0.2,
                  0.25
                ]
              ],
              [
                18,
                [
                  0.15,
                  0.15
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "road-sidewalk-corridor",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-sidewalk-corridor-bg",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  3,
                  0.4
                ]
              ],
              [
                16,
                [
                  3,
                  0.35
                ]
              ],
              [
                17,
                [
                  3,
                  0.35
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                16,
                0
              ],
              [
                16.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-path-smooth",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "in",
              "type",
              "bridleway",
              "footway",
              "path"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  3,
                  0.4
                ]
              ],
              [
                16,
                [
                  3,
                  0.35
                ]
              ],
              [
                17,
                [
                  3,
                  0.35
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-path-rough",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "in",
              "type",
              "hiking",
              "mountain_bike",
              "trail"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  1.75,
                  0.4
                ]
              ],
              [
                16,
                [
                  1,
                  0.4
                ]
              ],
              [
                17,
                [
                  1,
                  0.35
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-cycleway-piste",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "in",
              "type",
              "cycleway",
              "piste"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-steps",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-steps-bg",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                16,
                1.6
              ],
              [
                18,
                6
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  1.75,
                  0.4
                ]
              ],
              [
                16,
                [
                  0.75,
                  0.4
                ]
              ],
              [
                17,
                [
                  0.3,
                  0.3
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-trunk_link",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-trunk_link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(46, 69%, 68%)",
          "line-opacity": 1
        }
      },
      {
        "id": "road-motorway_link",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-motorway_link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(26, 67%, 70%)",
          "line-opacity": 1
        }
      },
      {
        "id": "road-pedestrian",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-pedestrian-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": 1,
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  1,
                  0
                ]
              ],
              [
                15,
                [
                  1.5,
                  0.4
                ]
              ],
              [
                16,
                [
                  1,
                  0.2
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "road-pedestrian-polygon-fill",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "all",
            [
              "in",
              "class",
              "path",
              "pedestrian"
            ],
            [
              "==",
              "structure",
              "none"
            ]
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": {
            "base": 1,
            "stops": [
              [
                16,
                "hsl(230, 16%, 94%)"
              ],
              [
                16.25,
                "hsl(230, 50%, 98%)"
              ]
            ]
          },
          "fill-outline-color": "hsl(230, 26%, 88%)",
          "fill-opacity": 1
        }
      },
      {
        "id": "road-pedestrian-polygon-pattern",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-pedestrian-polygon-fill",
        "paint": {
          "fill-color": "hsl(0, 0%, 100%)",
          "fill-outline-color": "hsl(35, 10%, 83%)",
          "fill-pattern": "pedestrian-polygon",
          "fill-opacity": {
            "base": 1,
            "stops": [
              [
                16,
                0
              ],
              [
                16.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-polygon",
        "type": "fill",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Polygon"
          ],
          [
            "all",
            [
              "!in",
              "class",
              "motorway",
              "path",
              "pedestrian",
              "trunk"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {

        },
        "paint": {
          "fill-color": "hsl(0, 0%, 100%)",
          "fill-outline-color": "hsl(230, 19%, 75%)"
        }
      },
      {
        "id": "road-track",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-track-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)"
        }
      },
      {
        "id": "road-service-link",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-service-link-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)"
        }
      },
      {
        "id": "road-street_limited",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-street_limited-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(35, 14%, 93%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-street",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-street-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-secondary-tertiary",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-secondary-tertiary-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                8,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-primary",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-primary-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                5,
                "hsl(35, 32%, 91%)"
              ],
              [
                8,
                "hsl(0, 0%, 100%)"
              ]
            ]
          },
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-oneway-arrows-blue-minor",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "path",
              "pedestrian",
              "service",
              "track"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                17,
                "oneway-small"
              ],
              [
                18,
                "oneway-large"
              ]
            ]
          },
          "icon-rotation-alignment": "map",
          "icon-padding": 2,
          "symbol-spacing": 200
        },
        "paint": {

        }
      },
      {
        "id": "road-oneway-arrows-blue-major",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "primary",
              "secondary",
              "street",
              "street_limited",
              "tertiary"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-small"
              ],
              [
                17,
                "oneway-large"
              ]
            ]
          },
          "icon-rotation-alignment": "map",
          "icon-padding": 2,
          "symbol-spacing": 200
        },
        "paint": {

        }
      },
      {
        "id": "road-trunk",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-trunk-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                6,
                "hsl(0, 0%, 100%)"
              ],
              [
                6.1,
                "hsl(46, 80%, 60%)"
              ],
              [
                9,
                "hsl(46, 69%, 68%)"
              ]
            ]
          }
        }
      },
      {
        "id": "road-motorway",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-motorway-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(26, 87%, 62%)"
              ],
              [
                9,
                "hsl(26, 67%, 70%)"
              ]
            ]
          }
        }
      },
      {
        "id": "road-rail",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "major_rail",
              "minor_rail"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-color": {
            "stops": [
              [
                13,
                "hsl(50, 17%, 82%)"
              ],
              [
                16,
                "hsl(230, 10%, 74%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                20,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-rail-tracks",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "ref": "road-rail",
        "paint": {
          "line-color": {
            "stops": [
              [
                13,
                "hsl(50, 17%, 82%)"
              ],
              [
                16,
                "hsl(230, 10%, 74%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                4
              ],
              [
                20,
                8
              ]
            ]
          },
          "line-dasharray": [
            0.1,
            15
          ],
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.75,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "road-oneway-arrows-white",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "trunk"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "!in",
              "structure",
              "bridge",
              "tunnel"
            ],
            [
              "!in",
              "type",
              "primary_link",
              "secondary_link",
              "tertiary_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-white-small"
              ],
              [
                17,
                "oneway-white-large"
              ]
            ]
          },
          "icon-padding": 2,
          "symbol-spacing": 200
        },
        "paint": {
          "icon-opacity": 0.5
        }
      },
      {
        "id": "hedges",
        "type": "line",
        "source": "composite",
        "source-layer": "barrier_line",
        "minzoom": 16,
        "filter": [
          "==",
          "class",
          "hedge"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(100, 59%, 70%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                16,
                1
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-opacity": 1,
          "line-dasharray": [
            1,
            2,
            5,
            2,
            1,
            2
          ]
        }
      },
      {
        "id": "fences",
        "type": "line",
        "source": "composite",
        "source-layer": "barrier_line",
        "minzoom": 16,
        "filter": [
          "==",
          "class",
          "fence"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(46, 17%, 76%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                16,
                1
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-opacity": 1,
          "line-dasharray": [
            1,
            2,
            5,
            2,
            1,
            2
          ]
        }
      },
      {
        "id": "gates",
        "type": "line",
        "source": "composite",
        "source-layer": "barrier_line",
        "minzoom": 17,
        "filter": [
          "==",
          "class",
          "gate"
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(46, 17%, 76%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                16,
                1
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-opacity": 0.5,
          "line-dasharray": [
            1,
            2,
            5,
            2,
            1,
            2
          ]
        }
      },
      {
        "id": "bridge-path-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "!in",
              "type",
              "piste",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2.5
              ],
              [
                18,
                8
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-blur": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                17,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-piste-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "piste"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2
              ],
              [
                18,
                7
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-color": "hsl(205, 63%, 60%)",
          "line-blur": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-steps-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                2.5
              ],
              [
                18,
                8
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          },
          "line-blur": {
            "base": 1,
            "stops": [
              [
                14,
                0
              ],
              [
                17,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-pedestrian-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "pedestrian"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                2
              ],
              [
                18,
                14.5
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": 0,
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-street-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11.5,
                0
              ],
              [
                12,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-street_limited-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street_limited"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "stops": [
              [
                11.5,
                0
              ],
              [
                12,
                1
              ],
              [
                14,
                1
              ],
              [
                14.01,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-track-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "track"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(50, 100%, 40%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-service-link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "service"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-street_limited-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street_limited"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-street-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "street"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          },
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                13,
                0
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-secondary-tertiary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "secondary",
              "tertiary"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.2,
            "stops": [
              [
                10,
                0.75
              ],
              [
                18,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-translate": [
            0,
            0
          ]
        }
      },
      {
        "id": "bridge-primary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "primary"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-translate": [
            0,
            0
          ]
        }
      },
      {
        "id": "bridge-trunk_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                10.99,
                0
              ],
              [
                11,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-motorway_link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": 1
        }
      },
      {
        "id": "bridge-trunk-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-motorway-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-construction",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "construction"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "miter"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(230, 24%, 87%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          },
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  0.4,
                  0.8
                ]
              ],
              [
                15,
                [
                  0.3,
                  0.6
                ]
              ],
              [
                16,
                [
                  0.2,
                  0.3
                ]
              ],
              [
                17,
                [
                  0.2,
                  0.25
                ]
              ],
              [
                18,
                [
                  0.15,
                  0.15
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-path",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "!in",
              "type",
              "cycleway",
              "piste",
              "steps"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  3,
                  0.4
                ]
              ],
              [
                16,
                [
                  3,
                  0.35
                ]
              ],
              [
                17,
                [
                  3,
                  0.35
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-cycleway-piste",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "path"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "in",
              "type",
              "cycleway",
              "piste"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                4
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-steps",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "ref": "bridge-steps-bg",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                16,
                1.6
              ],
              [
                18,
                6
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  4,
                  0.4
                ]
              ],
              [
                15,
                [
                  1.75,
                  0.4
                ]
              ],
              [
                16,
                [
                  0.75,
                  0.4
                ]
              ],
              [
                17,
                [
                  0.3,
                  0.3
                ]
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13,
                0
              ],
              [
                13.25,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-trunk_link",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(46, 69%, 68%)"
        }
      },
      {
        "id": "bridge-motorway_link",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(26, 67%, 70%)"
        }
      },
      {
        "id": "bridge-pedestrian",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "ref": "bridge-pedestrian-case",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": 1,
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                14,
                [
                  1,
                  0
                ]
              ],
              [
                15,
                [
                  1.5,
                  0.4
                ]
              ],
              [
                16,
                [
                  1,
                  0.2
                ]
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-track",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "track"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                15,
                1
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)"
        }
      },
      {
        "id": "bridge-service-link",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "service",
              "track"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "!=",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                18,
                12
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)"
        }
      },
      {
        "id": "bridge-street_limited",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "ref": "bridge-street_limited-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(35, 14%, 93%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-street",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "ref": "bridge-street-low",
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12.5,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-secondary-tertiary",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "in",
              "type",
              "secondary",
              "tertiary"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                8.5,
                0.5
              ],
              [
                10,
                0.75
              ],
              [
                18,
                26
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-primary",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "primary"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-opacity": {
            "base": 1.2,
            "stops": [
              [
                5,
                0
              ],
              [
                5.5,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-oneway-arrows-blue-minor",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "path",
              "pedestrian",
              "service",
              "track"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                17,
                "oneway-small"
              ],
              [
                18,
                "oneway-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-rotation-alignment": "map",
          "icon-padding": 2
        },
        "paint": {

        }
      },
      {
        "id": "bridge-oneway-arrows-blue-major",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "primary",
              "secondary",
              "street",
              "street_limited",
              "tertiary"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-small"
              ],
              [
                17,
                "oneway-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-rotation-alignment": "map",
          "icon-padding": 2
        },
        "paint": {

        }
      },
      {
        "id": "bridge-trunk",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 69%, 68%)"
        }
      },
      {
        "id": "bridge-motorway",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              "!in",
              "layer",
              2,
              3,
              4,
              5
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 67%, 70%)"
        }
      },
      {
        "id": "bridge-rail",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "major_rail",
              "minor_rail"
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-color": {
            "stops": [
              [
                13,
                "hsl(50, 17%, 82%)"
              ],
              [
                16,
                "hsl(230, 10%, 74%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                20,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-rail-tracks",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "ref": "bridge-rail",
        "paint": {
          "line-color": {
            "stops": [
              [
                13,
                "hsl(50, 17%, 82%)"
              ],
              [
                16,
                "hsl(230, 10%, 74%)"
              ]
            ]
          },
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                4
              ],
              [
                20,
                8
              ]
            ]
          },
          "line-dasharray": [
            0.1,
            15
          ],
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                13.75,
                0
              ],
              [
                20,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-trunk_link-2-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                10.99,
                0
              ],
              [
                11,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-motorway_link-2-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.75
              ],
              [
                20,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-opacity": 1
        }
      },
      {
        "id": "bridge-trunk-2-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-motorway-2-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                10,
                1
              ],
              [
                16,
                2
              ]
            ]
          },
          "line-color": "hsl(0, 0%, 100%)",
          "line-gap-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          }
        }
      },
      {
        "id": "bridge-trunk_link-2",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "==",
              "type",
              "trunk_link"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(46, 69%, 68%)"
        }
      },
      {
        "id": "bridge-motorway_link-2",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway_link"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                12,
                0.5
              ],
              [
                14,
                2
              ],
              [
                18,
                18
              ]
            ]
          },
          "line-color": "hsl(26, 67%, 70%)"
        }
      },
      {
        "id": "bridge-trunk-2",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "trunk"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(46, 69%, 68%)"
        }
      },
      {
        "id": "bridge-motorway-2",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "==",
              "class",
              "motorway"
            ],
            [
              ">=",
              "layer",
              2
            ],
            [
              "==",
              "structure",
              "bridge"
            ]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                5,
                0.75
              ],
              [
                18,
                32
              ]
            ]
          },
          "line-color": "hsl(26, 67%, 70%)"
        }
      },
      {
        "id": "bridge-oneway-arrows-white",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444855799204.86"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 16,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "all",
            [
              "in",
              "class",
              "link",
              "trunk"
            ],
            [
              "==",
              "oneway",
              "true"
            ],
            [
              "==",
              "structure",
              "bridge"
            ],
            [
              "!in",
              "type",
              "primary_link",
              "secondary_link",
              "tertiary_link"
            ]
          ]
        ],
        "layout": {
          "symbol-placement": "line",
          "icon-image": {
            "base": 1,
            "stops": [
              [
                16,
                "oneway-white-small"
              ],
              [
                17,
                "oneway-white-large"
              ]
            ]
          },
          "symbol-spacing": 200,
          "icon-padding": 2
        },
        "paint": {
          "icon-opacity": 0.5
        }
      },
      {
        "id": "aerialway-bg",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "class",
            "aerialway"
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(0, 0%, 100%)",
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                2.5
              ],
              [
                20,
                3
              ]
            ]
          },
          "line-blur": 0.5
        }
      },
      {
        "id": "aerialway",
        "ref": "aerialway-bg",
        "paint": {
          "line-color": "hsl(230, 4%, 29%)",
          "line-width": {
            "base": 1.5,
            "stops": [
              [
                14,
                0.5
              ],
              [
                20,
                1
              ]
            ]
          }
        }
      },
      {
        "id": "admin-3-4-boundaries-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934295202.7542"
        },
        "source": "composite",
        "source-layer": "admin",
        "filter": [
          "all",
          [
            ">=",
            "admin_level",
            3
          ],
          [
            "==",
            "maritime",
            0
          ]
        ],
        "layout": {
          "line-join": "bevel"
        },
        "paint": {
          "line-color": {
            "base": 1,
            "stops": [
              [
                8,
                "hsl(35, 12%, 89%)"
              ],
              [
                16,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                3.75
              ],
              [
                12,
                5.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                7,
                0
              ],
              [
                8,
                0.75
              ]
            ]
          },
          "line-dasharray": [
            1,
            0
          ],
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                8,
                3
              ]
            ]
          }
        }
      },
      {
        "id": "admin-2-boundaries-bg",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934295202.7542"
        },
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 1,
        "filter": [
          "all",
          [
            "==",
            "admin_level",
            2
          ],
          [
            "==",
            "maritime",
            0
          ]
        ],
        "layout": {
          "line-join": "miter"
        },
        "paint": {
          "line-width": {
            "base": 1,
            "stops": [
              [
                3,
                3.5
              ],
              [
                10,
                8
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                6,
                "hsl(35, 12%, 89%)"
              ],
              [
                8,
                "hsl(230, 49%, 90%)"
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                4,
                0.5
              ]
            ]
          },
          "line-translate": [
            0,
            0
          ],
          "line-blur": {
            "base": 1,
            "stops": [
              [
                3,
                0
              ],
              [
                10,
                2
              ]
            ]
          }
        }
      },
      {
        "id": "admin-3-4-boundaries",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934295202.7542"
        },
        "source": "composite",
        "source-layer": "admin",
        "filter": [
          "all",
          [
            ">=",
            "admin_level",
            3
          ],
          [
            "==",
            "maritime",
            0
          ]
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-dasharray": {
            "base": 1,
            "stops": [
              [
                6,
                [
                  2,
                  0
                ]
              ],
              [
                7,
                [
                  2,
                  2,
                  6,
                  2
                ]
              ]
            ]
          },
          "line-width": {
            "base": 1,
            "stops": [
              [
                7,
                0.75
              ],
              [
                12,
                1.5
              ]
            ]
          },
          "line-opacity": {
            "base": 1,
            "stops": [
              [
                2,
                0
              ],
              [
                3,
                1
              ]
            ]
          },
          "line-color": {
            "base": 1,
            "stops": [
              [
                3,
                "hsl(230, 14%, 77%)"
              ],
              [
                7,
                "hsl(230, 8%, 62%)"
              ]
            ]
          }
        }
      },
      {
        "id": "admin-2-boundaries",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934295202.7542"
        },
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 1,
        "filter": [
          "all",
          [
            "==",
            "admin_level",
            2
          ],
          [
            "==",
            "disputed",
            0
          ],
          [
            "==",
            "maritime",
            0
          ]
        ],
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "hsl(230, 8%, 51%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                3,
                0.5
              ],
              [
                10,
                2
              ]
            ]
          }
        }
      },
      {
        "id": "admin-2-boundaries-dispute",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444934295202.7542"
        },
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 1,
        "filter": [
          "all",
          [
            "==",
            "admin_level",
            2
          ],
          [
            "==",
            "disputed",
            1
          ],
          [
            "==",
            "maritime",
            0
          ]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-dasharray": [
            1.5,
            1.5
          ],
          "line-color": "hsl(230, 8%, 51%)",
          "line-width": {
            "base": 1,
            "stops": [
              [
                3,
                0.5
              ],
              [
                10,
                2
              ]
            ]
          }
        }
      },
      {
        "id": "housenum-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "housenum_label",
        "minzoom": 17,
        "layout": {
          "text-field": "{house_num}",
          "text-font": [
            "Open Sans Italic"
          ],
          "text-padding": 4,
          "text-max-width": 7,
          "text-size": 9.5
        },
        "paint": {
          "text-color": "hsl(35, 2%, 69%)",
          "text-halo-color": "hsl(35, 8%, 85%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0
        }
      },
      {
        "id": "contour-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "contour",
        "minzoom": 11,
        "filter": [
          "in",
          "index",
          5,
          10
        ],
        "layout": {
          "text-field": "{ele} m",
          "symbol-placement": "line",
          "text-max-angle": 25,
          "text-padding": 5,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                15,
                9.5
              ],
              [
                20,
                12
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(100, 60%, 28%)",
          "text-halo-width": 1,
          "text-halo-blur": 0,
          "text-halo-color": "hsla(0, 0%, 100%, 0.5)"
        }
      },
      {
        "id": "waterway-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "waterway_label",
        "minzoom": 12,
        "filter": [
          "in",
          "class",
          "canal",
          "river"
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-font": [
            "Open Sans Italic"
          ],
          "symbol-placement": "line",
          "text-max-angle": 30,
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                12
              ],
              [
                18,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 0.5,
          "text-halo-color": "hsl(196, 80%, 70%)",
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-relevant-scalerank4-l15",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933456003.5437"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "minzoom": 17,
        "filter": [
          "all",
          [
            ">=",
            "localrank",
            15
          ],
          [
            "in",
            "maki",
            "amusement-park",
            "aquarium",
            "attraction",
            "bakery",
            "bank",
            "bar",
            "beer",
            "bus",
            "cafe",
            "castle",
            "college",
            "doctor",
            "fast-food",
            "ferry",
            "fire-station",
            "fuel",
            "grocery",
            "harbor",
            "hospital",
            "ice-cream",
            "lodging",
            "marker",
            "monument",
            "museum",
            "pharmacy",
            "police",
            "post",
            "restaurant",
            "rocket",
            "stadium",
            "swimming"
          ],
          [
            "==",
            "scalerank",
            4
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 1,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-relevant-scalerank4-l1",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933456003.5437"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "<=",
            "localrank",
            14
          ],
          [
            "in",
            "maki",
            "amusement-park",
            "aquarium",
            "attraction",
            "bakery",
            "bank",
            "bar",
            "beer",
            "bus",
            "cafe",
            "castle",
            "college",
            "doctor",
            "fast-food",
            "ferry",
            "fire-station",
            "fuel",
            "grocery",
            "harbor",
            "hospital",
            "ice-cream",
            "lodging",
            "marker",
            "monument",
            "museum",
            "pharmacy",
            "police",
            "post",
            "restaurant",
            "rocket",
            "stadium",
            "swimming"
          ],
          [
            "==",
            "scalerank",
            4
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 1,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-parks_scalerank4",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933456003.5437"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "==",
            "scalerank",
            4
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 1,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-scalerank3",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933372896.5967"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "!in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "==",
            "scalerank",
            3
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 1,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-parks-scalerank3",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933372896.5967"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "==",
            "scalerank",
            3
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "road-label-small",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933721429.3076"
        },
        "source": "composite",
        "source-layer": "road_label",
        "minzoom": 15,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "!in",
            "class",
            "aerialway",
            "link",
            "motorway",
            "path",
            "pedestrian",
            "primary",
            "secondary",
            "street",
            "street_limited",
            "tertiary",
            "trunk"
          ]
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                15,
                10
              ],
              [
                20,
                13
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Regular"
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "text-halo-blur": 1
        }
      },
      {
        "id": "road-label-medium",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933721429.3076"
        },
        "source": "composite",
        "source-layer": "road_label",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "class",
            "aerialway",
            "link",
            "path",
            "pedestrian",
            "street",
            "street_limited"
          ]
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                11,
                10
              ],
              [
                20,
                14
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Regular"
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "road-label-large",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933721429.3076"
        },
        "source": "composite",
        "source-layer": "road_label",
        "filter": [
          "in",
          "class",
          "motorway",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                9,
                10
              ],
              [
                20,
                16
              ]
            ]
          },
          "text-max-angle": 30,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Regular"
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "rgba(255,255,255, 0.75)",
          "text-halo-width": 1,
          "text-halo-blur": 1
        }
      },
      {
        "id": "road-shields-black",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933575858.6992"
        },
        "source": "composite",
        "source-layer": "road_label",
        "filter": [
          "all",
          [
            "<=",
            "reflen",
            6
          ],
          [
            "!in",
            "shield",
            "at-expressway",
            "at-motorway",
            "at-state-b",
            "bg-motorway",
            "bg-national",
            "ch-main",
            "ch-motorway",
            "cz-motorway",
            "cz-road",
            "de-motorway",
            "e-road",
            "fi-main",
            "gr-motorway",
            "gr-national",
            "hr-motorway",
            "hr-state",
            "hu-main",
            "hu-motorway",
            "nz-state",
            "pl-expressway",
            "pl-motorway",
            "pl-national",
            "ro-county",
            "ro-motorway",
            "ro-national",
            "rs-motorway",
            "rs-state-1b",
            "se-main",
            "si-expressway",
            "si-motorway",
            "sk-highway",
            "sk-road",
            "us-interstate",
            "us-interstate-business",
            "us-interstate-duplex",
            "us-interstate-truck",
            "za-metropolitan",
            "za-national",
            "za-provincial",
            "za-regional"
          ]
        ],
        "layout": {
          "text-size": 9,
          "icon-image": "{shield}-{reflen}",
          "icon-rotation-alignment": "viewport",
          "text-max-angle": 38,
          "symbol-spacing": {
            "base": 1,
            "stops": [
              [
                11,
                150
              ],
              [
                14,
                200
              ]
            ]
          },
          "text-font": [
            "Open Sans Bold"
          ],
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-padding": 2,
          "text-rotation-alignment": "viewport",
          "text-field": "{ref}",
          "text-letter-spacing": 0.05,
          "icon-padding": 2
        },
        "paint": {
          "text-color": "hsl(230, 21%, 37%)",
          "icon-halo-color": "rgba(0, 0, 0, 1)",
          "icon-halo-width": 1,
          "text-opacity": 1,
          "icon-color": "white",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0
        }
      },
      {
        "id": "road-shields-white",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933575858.6992"
        },
        "source": "composite",
        "source-layer": "road_label",
        "filter": [
          "all",
          [
            "<=",
            "reflen",
            6
          ],
          [
            "in",
            "shield",
            "at-expressway",
            "at-motorway",
            "at-state-b",
            "bg-motorway",
            "bg-national",
            "ch-main",
            "ch-motorway",
            "cz-motorway",
            "cz-road",
            "de-motorway",
            "e-road",
            "fi-main",
            "gr-motorway",
            "gr-national",
            "hr-motorway",
            "hr-state",
            "hu-main",
            "hu-motorway",
            "nz-state",
            "pl-expressway",
            "pl-motorway",
            "pl-national",
            "ro-county",
            "ro-motorway",
            "ro-national",
            "rs-motorway",
            "rs-state-1b",
            "se-main",
            "si-expressway",
            "si-motorway",
            "sk-highway",
            "sk-road",
            "us-interstate",
            "us-interstate-business",
            "us-interstate-duplex",
            "us-interstate-truck",
            "za-metropolitan",
            "za-national",
            "za-provincial",
            "za-regional"
          ]
        ],
        "layout": {
          "text-size": 9,
          "icon-image": "{shield}-{reflen}",
          "icon-rotation-alignment": "viewport",
          "text-max-angle": 38,
          "symbol-spacing": {
            "base": 1,
            "stops": [
              [
                11,
                150
              ],
              [
                14,
                200
              ]
            ]
          },
          "text-font": [
            "Open Sans Bold"
          ],
          "symbol-placement": {
            "base": 1,
            "stops": [
              [
                10,
                "point"
              ],
              [
                11,
                "line"
              ]
            ]
          },
          "text-padding": 2,
          "text-rotation-alignment": "viewport",
          "text-field": "{ref}",
          "text-letter-spacing": 0.05,
          "icon-padding": 2
        },
        "paint": {
          "text-color": "hsl(0, 0%, 100%)",
          "icon-halo-color": "rgba(0, 0, 0, 1)",
          "icon-halo-width": 1,
          "text-opacity": 1,
          "icon-color": "white",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0
        }
      },
      {
        "id": "motorway-junction",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933575858.6992"
        },
        "source": "composite",
        "source-layer": "motorway_junction",
        "minzoom": 14,
        "filter": [
          ">",
          "reflen",
          0
        ],
        "layout": {
          "text-field": "{ref}",
          "text-size": 9,
          "icon-image": "motorway-exit-{reflen}",
          "text-font": [
            "Open Sans Bold"
          ]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 100%)",
          "text-translate": [
            0,
            0
          ]
        }
      },
      {
        "id": "poi-outdoor-features",
        "type": "symbol",
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "in",
          "maki",
          "bicycle",
          "bicycle-share",
          "drinking-water",
          "information",
          "picnic-site",
          "toilet"
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{maki}-11",
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "mountain-peak-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "mountain_peak_label",
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": "{maki}-15",
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-offset": [
            0,
            0.65
          ],
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "mountain-peak-label-with-elevation",
        "type": "symbol",
        "source": "composite",
        "source-layer": "mountain_peak_label",
        "filter": [
          ">",
          "elevation_m",
          0
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": "{maki}-15",
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-offset": [
            0,
            0.65
          ],
          "text-anchor": "top",
          "text-field": "{name_en}, {elevation_m}m",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-scalerank2",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933358918.2366"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "!in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "==",
            "scalerank",
            2
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                14,
                11
              ],
              [
                20,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                14,
                "{maki}-11"
              ],
              [
                15,
                "{maki}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-parks-scalerank2",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933358918.2366"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "==",
            "scalerank",
            2
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                14,
                11
              ],
              [
                20,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                14,
                "{maki}-11"
              ],
              [
                15,
                "{maki}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "rail-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "rail_station_label",
        "minzoom": 12,
        "filter": [
          "!=",
          "maki",
          "entrance"
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                11
              ],
              [
                20,
                13
              ]
            ]
          },
          "icon-image": "{network}",
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-offset": [
            0,
            0.85
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": {
            "base": 1,
            "stops": [
              [
                0,
                ""
              ],
              [
                13,
                "{name_en}"
              ]
            ]
          },
          "text-letter-spacing": 0.01,
          "icon-padding": 0,
          "text-max-width": 7
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "icon-halo-width": 4,
          "icon-halo-color": "#fff",
          "text-opacity": {
            "base": 1,
            "stops": [
              [
                13.99,
                0
              ],
              [
                14,
                1
              ]
            ]
          },
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "water-label-sm",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933808272.805"
        },
        "source": "composite",
        "source-layer": "water_label",
        "minzoom": 15,
        "filter": [
          "<=",
          "area",
          10000
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-font": [
            "Open Sans Italic"
          ],
          "text-max-width": 7,
          "text-size": {
            "base": 1,
            "stops": [
              [
                16,
                13
              ],
              [
                20,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)"
        }
      },
      {
        "id": "water-label",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933808272.805"
        },
        "source": "composite",
        "source-layer": "water_label",
        "minzoom": 5,
        "filter": [
          ">",
          "area",
          10000
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-font": [
            "Open Sans Italic"
          ],
          "text-max-width": 7,
          "text-size": {
            "base": 1,
            "stops": [
              [
                13,
                13
              ],
              [
                18,
                18
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)"
        }
      },
      {
        "id": "poi-parks-scalerank1",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933322393.2852"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "<=",
            "scalerank",
            1
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{maki}-11"
              ],
              [
                14,
                "{maki}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(100, 100%, 20%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "poi-scalerank1",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444933322393.2852"
        },
        "source": "composite",
        "source-layer": "poi_label",
        "filter": [
          "all",
          [
            "!in",
            "maki",
            "campsite",
            "cemetery",
            "dog-park",
            "garden",
            "golf",
            "park",
            "picnic-site",
            "playground",
            "zoo"
          ],
          [
            "<=",
            "scalerank",
            1
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                14
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                13,
                "{maki}-11"
              ],
              [
                14,
                "{maki}-15"
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.65
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(25, 25%, 32%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "airport-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "airport_label",
        "minzoom": 9,
        "filter": [
          "<=",
          "scalerank",
          2
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                12
              ],
              [
                18,
                18
              ]
            ]
          },
          "icon-image": {
            "stops": [
              [
                12,
                "{maki}-11"
              ],
              [
                13,
                "{maki}-15"
              ]
            ]
          },
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Semibold"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0.75
          ],
          "text-rotation-alignment": "viewport",
          "text-anchor": "top",
          "text-field": {
            "stops": [
              [
                11,
                "{ref}"
              ],
              [
                12,
                "{name_en}"
              ]
            ]
          },
          "text-letter-spacing": 0.01,
          "text-max-width": 9
        },
        "paint": {
          "text-color": "hsl(230, 48%, 44%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "place-islet-archipelago-aboriginal",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "maxzoom": 16,
        "filter": [
          "in",
          "type",
          "aboriginal_lands",
          "archipelago",
          "islet"
        ],
        "layout": {
          "text-line-height": 1.2,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                16
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Regular"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0
          ],
          "text-rotation-alignment": "viewport",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "hsl(230, 29%, 35%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place-neighbourhood",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 10,
        "maxzoom": 16,
        "filter": [
          "==",
          "type",
          "neighbourhood"
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-transform": "uppercase",
          "text-letter-spacing": 0.1,
          "text-max-width": 7,
          "text-font": [
            "Open Sans Regular"
          ],
          "text-padding": 3,
          "text-size": {
            "base": 1,
            "stops": [
              [
                12,
                11
              ],
              [
                16,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "text-color": "hsl(230, 29%, 35%)",
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "place-suburb",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 10,
        "maxzoom": 16,
        "filter": [
          "==",
          "type",
          "suburb"
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-transform": "uppercase",
          "text-font": [
            "Open Sans Regular"
          ],
          "text-letter-spacing": 0.15,
          "text-max-width": 7,
          "text-padding": 3,
          "text-size": {
            "base": 1,
            "stops": [
              [
                11,
                11
              ],
              [
                15,
                18
              ]
            ]
          }
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "text-color": "hsl(230, 29%, 35%)",
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "place-hamlet",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 10,
        "maxzoom": 16,
        "filter": [
          "==",
          "type",
          "hamlet"
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-font": [
            "Open Sans Regular"
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                12,
                11.5
              ],
              [
                15,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "text-color": "hsl(0, 0%, 0%)"
        }
      },
      {
        "id": "place-village",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 8,
        "maxzoom": 15,
        "filter": [
          "==",
          "type",
          "village"
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-font": [
            "Open Sans Regular"
          ],
          "text-max-width": 7,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11.5
              ],
              [
                16,
                18
              ]
            ]
          }
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "text-color": "hsl(0, 0%, 0%)"
        }
      },
      {
        "id": "place-town",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 6,
        "maxzoom": 15,
        "filter": [
          "==",
          "type",
          "town"
        ],
        "layout": {
          "icon-image": "dot-9",
          "text-font": {
            "base": 1,
            "stops": [
              [
                11,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                12,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  0,
                  -0.15
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "bottom"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name_en}",
          "text-max-width": 7,
          "text-size": {
            "base": 1,
            "stops": [
              [
                7,
                11.5
              ],
              [
                15,
                20
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "place-island",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "maxzoom": 16,
        "filter": [
          "==",
          "type",
          "island"
        ],
        "layout": {
          "text-line-height": 1.2,
          "text-size": {
            "base": 1,
            "stops": [
              [
                10,
                11
              ],
              [
                18,
                16
              ]
            ]
          },
          "text-max-angle": 38,
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Regular"
          ],
          "text-padding": 2,
          "text-offset": [
            0,
            0
          ],
          "text-rotation-alignment": "viewport",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.01,
          "text-max-width": 7
        },
        "paint": {
          "text-color": "hsl(230, 29%, 35%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place-city-sm",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444862510685.128"
        },
        "source": "composite",
        "source-layer": "place_label",
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "!in",
            "scalerank",
            0,
            1,
            2,
            3,
            4,
            5
          ],
          [
            "==",
            "type",
            "city"
          ]
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                6,
                12
              ],
              [
                14,
                22
              ]
            ]
          },
          "icon-image": "dot-9",
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                8,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  -0.2
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "bottom"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name_en}",
          "text-max-width": 7
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1.25,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "place-city-md-s",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444862510685.128"
        },
        "source": "composite",
        "source-layer": "place_label",
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "in",
            "ldir",
            "E",
            "S",
            "SE",
            "SW"
          ],
          [
            "in",
            "scalerank",
            3,
            4,
            5
          ],
          [
            "==",
            "type",
            "city"
          ]
        ],
        "layout": {
          "text-field": "{name_en}",
          "icon-image": "dot-10",
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "top"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  0.1
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                8,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                5,
                12
              ],
              [
                12,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-halo-width": 1,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-blur": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          }
        }
      },
      {
        "id": "place-city-md-n",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444862510685.128"
        },
        "source": "composite",
        "source-layer": "place_label",
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "in",
            "ldir",
            "N",
            "NE",
            "NW",
            "W"
          ],
          [
            "in",
            "scalerank",
            3,
            4,
            5
          ],
          [
            "==",
            "type",
            "city"
          ]
        ],
        "layout": {
          "icon-image": "dot-10",
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                8,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  -0.25
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "bottom"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name_en}",
          "text-max-width": 7,
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                5,
                12
              ],
              [
                12,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          },
          "text-halo-blur": 1
        }
      },
      {
        "id": "place-city-lg-s",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444862510685.128"
        },
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 1,
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "in",
            "ldir",
            "E",
            "S",
            "SE",
            "SW"
          ],
          [
            "<=",
            "scalerank",
            2
          ],
          [
            "==",
            "type",
            "city"
          ]
        ],
        "layout": {
          "icon-image": "dot-11",
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                8,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  0.15
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "top"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name_en}",
          "text-max-width": 7,
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                4,
                12
              ],
              [
                10,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          },
          "text-halo-blur": 1
        }
      },
      {
        "id": "place-city-lg-n",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444862510685.128"
        },
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 1,
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "in",
            "ldir",
            "N",
            "NE",
            "NW",
            "W"
          ],
          [
            "<=",
            "scalerank",
            2
          ],
          [
            "==",
            "type",
            "city"
          ]
        ],
        "layout": {
          "icon-image": "dot-11",
          "text-font": {
            "base": 1,
            "stops": [
              [
                7,
                [
                  "Open Sans Regular"
                ]
              ],
              [
                8,
                [
                  "Open Sans Regular"
                ]
              ]
            ]
          },
          "text-offset": {
            "base": 1,
            "stops": [
              [
                7.99,
                [
                  0,
                  -0.25
                ]
              ],
              [
                8,
                [
                  0,
                  0
                ]
              ]
            ]
          },
          "text-anchor": {
            "base": 1,
            "stops": [
              [
                7,
                "bottom"
              ],
              [
                8,
                "center"
              ]
            ]
          },
          "text-field": "{name_en}",
          "text-max-width": 7,
          "text-size": {
            "base": 0.9,
            "stops": [
              [
                4,
                12
              ],
              [
                10,
                22
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(0, 0%, 0%)",
          "text-opacity": 1,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "icon-opacity": {
            "base": 1,
            "stops": [
              [
                7.99,
                1
              ],
              [
                8,
                0
              ]
            ]
          },
          "text-halo-blur": 1
        }
      },
      {
        "id": "marine-label-sm-ln",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 3,
        "maxzoom": 10,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            ">=",
            "labelrank",
            4
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                12
              ],
              [
                6,
                16
              ]
            ]
          },
          "symbol-spacing": {
            "base": 1,
            "stops": [
              [
                4,
                100
              ],
              [
                6,
                400
              ]
            ]
          },
          "text-font": [
            "Open Sans Italic"
          ],
          "symbol-placement": "line",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.1,
          "text-max-width": 5
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "marine-label-sm-pt",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 3,
        "maxzoom": 10,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            ">=",
            "labelrank",
            4
          ]
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-max-width": 5,
          "text-letter-spacing": 0.1,
          "text-line-height": 1.5,
          "text-font": [
            "Open Sans Italic"
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                3,
                12
              ],
              [
                6,
                16
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "marine-label-md-ln",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 2,
        "maxzoom": 8,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "in",
            "labelrank",
            2,
            3
          ]
        ],
        "layout": {
          "text-line-height": 1.1,
          "text-size": {
            "base": 1.1,
            "stops": [
              [
                2,
                12
              ],
              [
                5,
                20
              ]
            ]
          },
          "symbol-spacing": 250,
          "text-font": [
            "Open Sans Italic"
          ],
          "symbol-placement": "line",
          "text-field": "{name_en}",
          "text-letter-spacing": 0.15,
          "text-max-width": 5
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "marine-label-md-pt",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 2,
        "maxzoom": 8,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "in",
            "labelrank",
            2,
            3
          ]
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-max-width": 5,
          "text-letter-spacing": 0.15,
          "text-line-height": 1.5,
          "text-font": [
            "Open Sans Italic"
          ],
          "text-size": {
            "base": 1.1,
            "stops": [
              [
                2,
                14
              ],
              [
                5,
                20
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "marine-label-lg-ln",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 1,
        "maxzoom": 4,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "labelrank",
            1
          ]
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-max-width": 4,
          "text-letter-spacing": 0.25,
          "text-line-height": 1.1,
          "symbol-placement": "line",
          "text-font": [
            "Open Sans Italic"
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                1,
                14
              ],
              [
                4,
                30
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "marine-label-lg-pt",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856087950.3635"
        },
        "source": "composite",
        "source-layer": "marine_label",
        "minzoom": 1,
        "maxzoom": 4,
        "filter": [
          "all",
          [
            "==",
            "$type",
            "Point"
          ],
          [
            "==",
            "labelrank",
            1
          ]
        ],
        "layout": {
          "text-field": "{name_en}",
          "text-max-width": 4,
          "text-letter-spacing": 0.25,
          "text-line-height": 1.5,
          "text-font": [
            "Open Sans Italic"
          ],
          "text-size": {
            "base": 1,
            "stops": [
              [
                1,
                14
              ],
              [
                4,
                30
              ]
            ]
          }
        },
        "paint": {
          "text-color": "hsl(205, 83%, 88%)"
        }
      },
      {
        "id": "state-label-sm",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856151690.9143"
        },
        "source": "composite",
        "source-layer": "state_label",
        "minzoom": 3,
        "maxzoom": 9,
        "filter": [
          "<",
          "area",
          20000
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                6,
                10
              ],
              [
                9,
                14
              ]
            ]
          },
          "text-transform": "uppercase",
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": {
            "base": 1,
            "stops": [
              [
                0,
                "{abbr}"
              ],
              [
                6,
                "{name_en}"
              ]
            ]
          },
          "text-letter-spacing": 0.15,
          "text-max-width": 5
        },
        "paint": {
          "text-opacity": 1,
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "state-label-md",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856151690.9143"
        },
        "source": "composite",
        "source-layer": "state_label",
        "minzoom": 3,
        "maxzoom": 8,
        "filter": [
          "all",
          [
            "<",
            "area",
            80000
          ],
          [
            ">=",
            "area",
            20000
          ]
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                5,
                10
              ],
              [
                8,
                16
              ]
            ]
          },
          "text-transform": "uppercase",
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": {
            "base": 1,
            "stops": [
              [
                0,
                "{abbr}"
              ],
              [
                5,
                "{name_en}"
              ]
            ]
          },
          "text-letter-spacing": 0.15,
          "text-max-width": 6
        },
        "paint": {
          "text-opacity": 1,
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "id": "state-label-lg",
        "type": "symbol",
        "metadata": {
          "mapbox:group": "1444856151690.9143"
        },
        "source": "composite",
        "source-layer": "state_label",
        "minzoom": 3,
        "maxzoom": 7,
        "filter": [
          ">=",
          "area",
          80000
        ],
        "layout": {
          "text-size": {
            "base": 1,
            "stops": [
              [
                4,
                10
              ],
              [
                7,
                18
              ]
            ]
          },
          "text-transform": "uppercase",
          "text-font": [
            "Open Sans Bold"
          ],
          "text-padding": 1,
          "text-field": {
            "base": 1,
            "stops": [
              [
                0,
                "{abbr}"
              ],
              [
                4,
                "{name_en}"
              ]
            ]
          },
          "text-letter-spacing": 0.15,
          "text-max-width": 6
        },
        "paint": {
          "text-opacity": 1,
          "text-color": "hsl(0, 0%, 0%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1
        }
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                4,
                11
              ],
              [
                6,
                15
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            ">=",
            "scalerank",
            4
          ],
          [
            "in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_4_visa_free",
        "paint": {
          "text-color": "#00ff00",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                3,
                11
              ],
              [
                7,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            3
          ],
          [
            "in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_3_visa_free",
        "paint": {
          "text-color": "#00ff00",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                2,
                11
              ],
              [
                5,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            2
          ],
          [
            "in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_2_visa_free",
        "paint": {
          "text-color": "#00ff00",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                1,
                11
              ],
              [
                4,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            1
          ],
          [
            "in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_1_visa_free",
        "paint": {
          "text-color": "#00ff00",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },











      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                4,
                11
              ],
              [
                6,
                15
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            ">=",
            "scalerank",
            4
          ],
          [
            "in",
            "code",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_4_visa_on_arrival",
        "paint": {
          "text-color": "#0000ff",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                3,
                11
              ],
              [
                7,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            3
          ],
          [
            "in",
            "code",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_3_visa_on_arrival",
        "paint": {
          "text-color": "#0000ff",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                2,
                11
              ],
              [
                5,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            2
          ],
          [
            "in",
            "code",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_2_visa_on_arrival",
        "paint": {
          "text-color": "#0000ff",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                1,
                11
              ],
              [
                4,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            1
          ],
          [
            "in",
            "code",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_1_visa_on_arrival",
        "paint": {
          "text-color": "#0000ff",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },











      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                4,
                11
              ],
              [
                6,
                15
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            ">=",
            "scalerank",
            4
          ],
          [
            "!in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_4_need_visa",
        "paint": {
          "text-color": "#ffa500",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                3,
                11
              ],
              [
                7,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            3
          ],
          [
            "!in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_3_need_visa",
        "paint": {
          "text-color": "#ffa500",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                2,
                11
              ],
              [
                5,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            2
          ],
          [
            "!in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_2_need_visa",
        "paint": {
          "text-color": "#ffa500",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": true,
        "layout": {
          "text-font": [
            "Open Sans Bold"
          ],
          "text-field": "{name_en}",
          "text-max-width": 6.25,
          "text-transform": "uppercase",
          "text-size": {
            "stops": [
              [
                1,
                11
              ],
              [
                4,
                17
              ]
            ]
          }
        },
        "metadata": {
          "mapbox:group": "1444849242106.713"
        },
        "filter": [
          "all",
          [
            "==",
            "scalerank",
            1
          ],
          [
            "!in",
            "code",
            "NL",
            "AL",
            "AD",
            "AG",
            "AR",
            "AM",
            "AT",
            "BS",
            "BB",
            "BE",
            "BZ",
            "BO",
            "BA",
            "BW",
            "BR",
            "BN",
            "BG",
            "CL",
            "CO",
            "CR",
            "HR",
            "CY",
            "CZ",
            "DK",
            "DM",
            "DO",
            "EC",
            "SV",
            "EE",
            "FJ",
            "FI",
            "FR",
            "GM",
            "GE",
            "DE",
            "GR",
            "GD",
            "GT",
            "GY",
            "HT",
            "HN",
            "HK",
            "HU",
            "IS",
            "ID",
            "IE",
            "IL",
            "IT",
            "JM",
            "JP",
            "KZ",
            "KI",
            "RK",
            "KG",
            "LV",
            "LS",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MY",
            "MT",
            "MH",
            "MU",
            "MX",
            "MD",
            "MC",
            "MN",
            "ME",
            "MA",
            "NA",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "WS",
            "SM",
            "SN",
            "RS",
            "SG",
            "SK",
            "SI",
            "ZA",
            "KR",
            "ES",
            "KN",
            "LC",
            "VC",
            "SZ",
            "SE",
            "CH",
            "TW",
            "TH",
            "TL",
            "TO",
            "TT",
            "TN",
            "TV",
            "UA",
            "AE",
            "UY",
            "VU",
            "VA",
            "VE",
            "UK",
            "FM",
            "PS",
            "ST",
            "BD",
            "BF",
            "BI",
            "KH",
            "CV",
            "KM",
            "DJ",
            "EG",
            "ET",
            "GW",
            "IR",
            "JO",
            "KE",
            "KW",
            "LA",
            "LB",
            "MG",
            "MW",
            "MV",
            "MR",
            "MZ",
            "NP",
            "OM",
            "PW",
            "PG",
            "QA",
            "SC",
            "SB",
            "SR",
            "TJ",
            "TZ",
            "TG",
            "TR",
            "UG",
            "ZM",
            "ZW",
            "BH"
          ]
        ],
        "type": "symbol",
        "source": "composite",
        "id": "country_label_1_need_visa",
        "paint": {
          "text-color": "#ffa500",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 2,
          "text-halo-blur": 1
        },
        "source-layer": "country_label"
      },
      {
        "interactive": false,
        "layout": {
          "line-join": "round"
        },
        "metadata": {},
        "type": "line",
        "source": "route",
        "source-layer": "route",
        "id": "route",
        "paint": {
          "line-color": "#ff0000",
          "line-width": {
            "base": 2.2,
            "stops": [
              [
                15,
                4
              ],
              [
                16,
                6
              ],
              [
                20,
                11
              ]
            ]
          }
        }
      }
    ],
    "created": 0,
    "modified": 0,
    "owner": "mapbox",
    "id": "outdoors-v9",
    "draft": false
  }
}