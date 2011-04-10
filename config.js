
  var config = {
    fileExt:     '{imgformat}',
    tileSize:     384,
    defaultZoom:  4,
    maxZoom:      {maxzoom},
    cacheMinutes: 0, // Change this to have browsers automatically request new images every x minutes
    bg_color:     '#1A1A1A',
    debug:        false
  };


/* signGroups -- A list of signpost groups.  A signpost can fall into zero, one, or more than one
 * group.  See below for some examples.
 *
 * Required: 
 *     label : string.  Displayed in the drop down menu control.
 *     match : function.  Applied to each marker (from markers.js).  It is returns true if the marker
 *                        Should be part of the group.
 *
 * Optional:
 *     checked : boolean.  Set to true to have the group visible by default
 *     icon : string. Used to specify an icon url.
 */
var mainGroups = [
//    {label: "'To'", checked: false, match: function(s) {return s.msg.match(/to/)}},
//    {label: "Storage", match: function(s) {return s.msg.match(/storage/i) || s.msg.match(/dirt/i) || s.msg.match(/sand/)}},
//    {label: "Below Sealevel", match: function(s) { return s.y<64;}},   
//    {label: "Info", match: function(s) { return s.msg.match("\\[info\\]");}, icon:"http://google-maps-icons.googlecode.com/files/info.png"},   
    {label: "Bases", match: function(s) {return s.msg.match(/^==Base==/m) }, icon: "http://google-maps-icons.googlecode.com/files/bigcity.png", checked: true},
    {label: "Rail Hubs", match: function(s) {return s.msg.match(/^==Hub==/m) }, icon: "http://google-maps-icons.googlecode.com/files/steamtrain.png", checked: true},
    {label: "Rail Stations", match: function(s) {return s.msg.match(/^==Station==/m) }, icon: "http://google-maps-icons.googlecode.com/files/subway.png", checked: true},
    {label: "Rail Line", match: function(s) {return s.msg.match(/^==Rail Line==/m) }, icon: "http://google-maps-icons.googlecode.com/files/levelcrossing.png"},
    {label: "Canal", match: function(s) {return s.msg.match(/^==Canal==/m) }, icon: "http://google-maps-icons.googlecode.com/files/cave.png"},
    {label: "Caverns", match: function(s) {return s.msg.match(/^==Cavern==/m) }, icon: "http://google-maps-icons.googlecode.com/files/cave.png"},
    {label: "Commons", match: function(s) {return s.msg.match(/^==Commons==/m) }, icon: "http://google-maps-icons.googlecode.com/files/dancinghall.png"},
    {label: "Farms", match: function(s) {return s.msg.match(/^==Farm==/m) }, icon: "http://google-maps-icons.googlecode.com/files/farm.png"},
    {label: "Fortresses", match: function(s) {return s.msg.match(/^==Fortress==/m) }, icon: "http://google-maps-icons.googlecode.com/files/fortress.png"},
    {label: "Islands", match: function(s) {return s.msg.match(/^==Island==/m) }, icon: "http://google-maps-icons.googlecode.com/files/fortress.png"},
    {label: "Lakes", match: function(s) {return s.msg.match(/^==Lake==/m) }, icon: "http://google-maps-icons.googlecode.com/files/lake.png"},
    {label: "Monuments", match: function(s) {return s.msg.match(/^==Monument==/m) }, icon: "http://google-maps-icons.googlecode.com/files/modernmonument.png"},
    {label: "Mountain", match: function(s) {return s.msg.match(/^==Mountain==/m) }, icon: "http://google-maps-icons.googlecode.com/files/canyon.png"},
    {label: "Outposts", match: function(s) {return s.msg.match(/^==Outpost==/m) }, icon: "http://google-maps-icons.googlecode.com/files/tent.png"},
    {label: "Parks", match: function(s) {return s.msg.match(/^==Park==/m) }, icon: "http://google-maps-icons.googlecode.com/files/park-urban.png"},
    {label: "Seas", match: function(s) {return s.msg.match(/^==Sea==/m) }, icon: "http://google-maps-icons.googlecode.com/files/water.png"},
    {label: "Towers", match: function(s) {return s.msg.match(/^==Tower==/m) }, icon: "http://google-maps-icons.googlecode.com/files/tower.png"},
];

var signGroups = mainGroups.concat([
    {label: "All", match: function(s) {return true}, icon: "signpost_icon.png"},
    {label: "Other", match: function(s) {
	var matched = false;
	mainGroups.forEach(function(mgi) {
	    if(mgi.match(s)) {
		matched = true;
	    }
	});
	return !matched;
    }, icon: "signpost_icon.png"}
]);

/* mapTypeData -- a list of alternate map renderings available. At least one rendering must be
 * listed.  When more than one are provided, controls to switch between them are provided, with
 * the first one being the default.
 *
 * Required:
 *     label : string. Displayed on the control.
 *     path  : string. Location of the rendered tiles.
 * Optional:
 *     base  : string. Base of the url path for tile locations, useful for serving tiles from a different server than the js/html server.
 */
var mapTypeData=[
  {'label': 'Unlit', 'path': 'tiles'},
//  {'label': 'Day',   'path': 'lighting/tiles'},
//  {'label': 'Night', 'path': 'night/tiles'},
//  {'label': 'Spawn', 'path': 'spawn/tiles', 'base': 'http://example.cdn.amazon.com/'}
];

// Please leave the following variables here:
var markerCollection = {}; // holds groups of markers

var map;

var markersInit = false;
var regionsInit = false;
