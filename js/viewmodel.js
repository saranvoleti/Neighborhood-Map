function inintMap()
{

var map;
var bounds = new google.maps.LatLngBounds();
var mapOptions = {
    mapTypeId : 'roadmap'
};

map = new google.maps.Map(document.getElementById('map'),mapOptions);
map.setTilt(45);

var locations = [
        ['London Eye', 51.503454,-0.119562],
        [' Westminster', 51.499633,-0.124755]
    ];



for (i=0; i < locations.length; i++)
{ var position = new google.maps.LatLng(locations [i][1],locations [i][2] );
bounds.extend (position);
marker = new google.maps.Marker({
    position : position,
    map : map,
    title : locations [i][0]
});


        map.fitBounds(bounds);


}



var vm =  {
     locations: ko.observableArray(locations)
 };


 vm.query = ko.observable('')
 vm.search = function(value){
    var tempLocations = [];
    for(var x in vm.locations()) {
      if(vm.locations()[x].indexOf(value.toLowerCase()) >= 0) {
        tempLocations.push(vm.locations()[x]);
      }
    }
    vm.locations(tempLocations);
}


vm.query.subscribe(vm.search);
ko.applyBindings(vm);
}

