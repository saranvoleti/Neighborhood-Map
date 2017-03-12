function inintMap() {

    var locations = [
      {title: 'Park Ave Penthouse', position: {lat: 40.7713024,  lng: -73.9632393}, content: "Hello"},
      {title: 'Chelsea Loft', position: {lat: 40.7444883,  lng: -73.9949465}, content: "Hello1"},
      {title: 'Union Square Open Floor Plan', position: {lat: 40.7347062,  lng:  -73.9895759}, content: "Hello2"}
  ];




  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'

  };


  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.setTilt(45);
  var infowindow = new google.maps.InfoWindow({
        content: "Hello",
        maxWidth: 200
        });

  for (i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var title = locations[i].title;
    var content = locations[i].content;
    bounds.extend(position);
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      content: content,
      draggable: true,
     animation: google.maps.Animation.DROP,
     });



    locations[i].marker = marker;

  google.maps.event.addListener(marker, "click", (function(marker) {
 return function(evt) {

 foursquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=32TBNUA4CCALYDULE0TLYPZPLLPJ2M3FQUOAK3Q05GXXWCNX&client_secret=C5D4DGFJMWJKDLZNCR1Q1T5OMKU41ZE23DRRQSNQ3KRP5JV4&v=20170309';
 $.getJSON(foursquareUrl)
  .done(function(data){

     var placeName = data.response.name;

   windowContent = '<div id="iw_container"><p><strong>Name: </strong>' + placeName+ '</p>'


  }).fail(function(error){
    infoWindow.setContent('Fail to connect to Foursquare: ' + error);
  }
  );
   }
  }
) (marker));





   new google.maps.event.addListener(marker, 'click', (function(marker) {
    return function (evt) {


      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 650);
      }}
    }) (marker));


    map.fitBounds(bounds);

  }




vm.locations = ko.observable('');
vm.search1 = function(value) {
  for (i = 0; i < locations.length; i++) {
     var title = locations[i].title;
 vm.locations()[i].showLocation = ko.observable(true);}
     vm.locations.push(title)




  vm.query = ko.observable('');

  vm.search = function(value) {
    var value = value.toLowerCase();
    var tempLocations = [];
    for (var x in vm.locations()) {
      var title = vm.locations()[x].title.toLowerCase();
      var match = title.indexOf(value) >= 0; // true or false

      console.log(title, value, match);

       vm.locations()[x].marker.setVisible(match);
    }
  }




  vm.query.subscribe(vm.search);
  ko.applyBindings(vm);


}}

