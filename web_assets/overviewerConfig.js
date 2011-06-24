var ourGroups = [
    {label: "Bases", match: function(s) {return s.msg.match(/^==Base==/m) }, icon: "http://google-maps-icons.googlecode.com/files/bigcity.png", checked: true},
    {label: "Rail Hubs", match: function(s) {return s.msg.match(/^==Hub==/m) }, icon: "http://google-maps-icons.googlecode.com/files/steamtrain.png", checked: true},
    {label: "Rail Stations", match: function(s) {return s.msg.match(/^==Station==/m) }, icon: "http://google-maps-icons.googlecode.com/files/subway.png", checked: true},
    {label: "Rail Line", match: function(s) {return s.msg.match(/^==Rail Line==/m) }, icon: "http://google-maps-icons.googlecode.com/files/levelcrossing.png", checked: true},
    {label: "Canal", match: function(s) {return s.msg.match(/^==Canal==/m) }, icon: "http://google-maps-icons.googlecode.com/files/cave.png", checked: true},
    {label: "Caverns", match: function(s) {return s.msg.match(/^==Cavern==/m) }, icon: "http://google-maps-icons.googlecode.com/files/cave.png", checked: true},
    {label: "Commons", match: function(s) {return s.msg.match(/^==Commons==/m) }, icon: "http://google-maps-icons.googlecode.com/files/dancinghall.png", checked: true},
    {label: "Farms", match: function(s) {return s.msg.match(/^==Farm==/m) }, icon: "http://google-maps-icons.googlecode.com/files/farm.png", checked: true},
    {label: "Forests", match: function(s) {return s.msg.match(/^==Forest==/m) }, icon: "http://google-maps-icons.googlecode.com/files/forest.png", checked: true},
    {label: "Fortresses", match: function(s) {return s.msg.match(/^==Fortress==/m) }, icon: "http://google-maps-icons.googlecode.com/files/fortress.png", checked: true},
    {label: "Islands", match: function(s) {return s.msg.match(/^==Island==/m) }, icon: "http://google-maps-icons.googlecode.com/files/fortress.png", checked: true},
    {label: "Lakes", match: function(s) {return s.msg.match(/^==Lake==/m) }, icon: "http://google-maps-icons.googlecode.com/files/lake.png", checked: true},
    {label: "Mines", match: function(s) {return s.msg.match(/^==Mine==/m) }, icon: "http://google-maps-icons.googlecode.com/files/mine.png", checked: true},
    {label: "Monuments", match: function(s) {return s.msg.match(/^==Monument==/m) }, icon: "http://google-maps-icons.googlecode.com/files/modernmonument.png", checked: true},
    {label: "Mountain", match: function(s) {return s.msg.match(/^==Mountain==/m) }, icon: "http://google-maps-icons.googlecode.com/files/canyon.png", checked: true},
    {label: "Outposts", match: function(s) {return s.msg.match(/^==Outpost==/m) }, icon: "http://google-maps-icons.googlecode.com/files/tent.png", checked: true},
    {label: "Parks", match: function(s) {return s.msg.match(/^==Park==/m) }, icon: "http://google-maps-icons.googlecode.com/files/park-urban.png", checked: true},
    {label: "Seas", match: function(s) {return s.msg.match(/^==Sea==/m) }, icon: "http://google-maps-icons.googlecode.com/files/water.png", checked: true},
    {label: "Towers", match: function(s) {return s.msg.match(/^==Tower==/m) }, icon: "http://google-maps-icons.googlecode.com/files/tower.png", checked: true},
];


var overviewerConfig = {
    /**
     * These are things that will probably not need to be changed by the user,
     * but are there because otherwise changing them is a giant PITA.
     */
    'CONST': {
        /**
         * Height and width of the tiles in pixels (I think).
         */
        'tileSize':             384,
        /**
         * Various images used for markers and stuff.
         */
        'image': {
            'defaultMarker':    'signpost.png',
            'signMarker':       'signpost_icon.png',
            'compass':          'compass.png',
            'spawnMarker':      'http://google-maps-icons.googlecode.com/files/home.png',
            'queryMarker':      'http://google-maps-icons.googlecode.com/files/regroup.png'
        },
        'mapDivId':             'mcmap',
        'regionStrokeWeight':   2
    },
    /**
     * General map settings.
     */
    'map': {
        /**
         * Control the visibility of various controls.
         */
        'controls': {
            /**
             * Pan control is the hand with the arrows around it in the upper left.
             */
            'pan':      true,
            /**
             * Zoom control is the zoom slider bar in the upper left.
             */
            'zoom':     true,
            /**
             * Spawn control is the "Spawn" button that centers the map on spawn.
             */
            'spawn':    true,
            /**
             * The compass in the upper right.
             */
            'compass':  true,
            /**
             * The mapType control is the slider for selecting different map types.
             */
            'mapType':  true,
            /**
             * The small box at the bottom that displays the link to the current map view.
             */
            'link':     true
        },
        /**
         * The zoom level when the page is loaded without a specific zoom setting
         */
        'defaultZoom':  4,
        /**
         * This controls how far you can zoom out.
         */
        'minZoom':      {minzoom},
        /**
         * This controls how close you can zoom in.
         */
        'maxZoom':      {maxzoom},
        /**
         * Center on this point, in world coordinates. Should be an array, ex:
         * [0,0,0]
         */
        'center':       {spawn_coords},
        /**
         * Set this to tell browsers how long they should cache tiles in minutes.
         */
        'cacheMinutes': 0,
        /**
         * Set to true to turn on debug mode, which adds a grid to the map along
         * with co-ordinates and a bunch of console output.
         */
        'debug':        false
    },
    /**
     * Group definitions for objects that are partially selectable (signs and
     * regions).
     */
    'objectGroups': {
        /* signs -- A list of signpost groups.  A signpost can fall into zero,
         * one, or more than one group.  See below for some examples.
         *
         * Required: 
         *     label : string.  Displayed in the drop down menu control.
         *     match : function.  Applied to each marker (from markers.js). It
         *                        is returns true if the marker should be part
         *                        of the group.
         *
         * Optional:
         *     checked : boolean.  Set to true to have the group visible by default
         *     icon : string. Used to specify an icon url.
         */
	// I do a little extra magic here.  I want an exlusionary "Other" group. --orospakr
	'signs': ourGroups.concat([
	    {label: "Other", match: function(s) {
		var matched = false;
		ourGroups.forEach(function(mgi) {
		    if(mgi.match(s)) {
			matched = true;
		    }
		});
		return !matched;
	    }, icon: "signpost_icon.png"}
	]),
        /* regions -- A list of region groups.  A region can fall into zero,
         * one, or more than one group.  See below for some examples.
         * Regions have been designed to work with the WorldGuard Overviewer
         * Region importer at @link http://goo.gl/dc0tV but your
         * host must support php in order to run WG2OvR. You can also continue
         * to use any other region format.
         *
         * Required: 
         *     label : string.  Displayed in the drop down menu control.
         *     clickable : boolean. Will determine if we should generate an
         *                          experimental info window that shows details
         *                          about the clicked region. 
         *                          NOTE: if a region (as defined in region.js)
         *                          does not have a label, this will default to
         *                          false.
         *     match : function.  Applied to each region (from region.js). It
         *                        returns true if the region should be part of
         *                        the group.
         *
         * Optional:
         *     checked : boolean.  Set to true to have the group visible by default
         */
        'regions': [
            //{'label':'All','clickable':true,'match':function(region){return true;}}
        ]
    },
    /* mapTypes -- a list of alternate map renderings available. At least one
     * rendering must be listed.  When more than one are provided, controls to
     * switch between them are provided, with the first one being the default.
     *
     * Required:
     *     label    : string. Displayed on the control.
     *     path     : string. Location of the rendered tiles.
     * Optional:
     *     base     : string. Base of the url path for tile locations, useful
     *                        for serving tiles from a different server than
     *                        the js/html server.
     *    imgformat : string. File extension used for these tiles. Defaults to png.
     *    overlay   : bool. If true, this tile set will be treated like an overlay
     * Example:
     *  'mapTypes': [
     *      {'label': 'Day',   'path': 'lighting/tiles'},
     *      {'label': 'Night', 'path': 'night/tiles', 'imgformat': 'jpg'},
     *      {'label': 'Spawn', 'path': 'spawn/tiles', 'base': 'http://example.cdn.amazon.com/'},
     *      {'label': 'Overlay', 'path': 'overlay/tiles', 'overlay': true}
     *  ]
     */
    'mapTypes':         {maptypedata}
};
