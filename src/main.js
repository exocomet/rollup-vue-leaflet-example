var { LMap, LTileLayer, LMarker, LPolygon } = Vue2Leaflet;

// https://stackoverflow.com/a/36481059/417133
// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

new Vue({
    el: '#app',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data() {
        return {
            numRandomMarkers: 100,
            zoom: 13,
            center: L.latLng(47.413220, 16.219482),
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            markers: [],
        }
    },
    beforeCreate: function() {},
    methods: {
        onMapClick: function(event) {
            this.addMarker(event.latlng);
        },
        onMarkerClick: function(index) {
            this.removeMarker(index);
        },
        addMarker: function(obj) {
            let newMarker = {
                id: null,
                position: {lat: obj.lat, lng: obj.lng},
                draggable: false,
                visible: true,
            };
            this.markers.push(newMarker);
        },
        removeMarker: function(index) {
            this.markers.splice(index, 1);
        },
        deleteMarkers: function() {
            this.markers = [];
        },
        addRandomMarkers: function() {
            for (let i = 0; i < this.numRandomMarkers; i++) {
                let pos = {
                    lat: 47 + randn_bm(),
                    lng: 16 + randn_bm(),
                }
                this.addMarker(pos);
            }
        }
    }
});

