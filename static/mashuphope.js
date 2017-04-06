
function RandomWord() {
    let requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: "RandomWordComplete"
    });
}

function RandomWordComplete(data) {
    //alert(data.Word);
    //alert(typeof data.Word); It's a string (yay!)
    let thatword = document.getElementById("element").innerHTML = data.Word;
    console.log(data)
    DefineMe();
}

function DefineMe(){
  let newword = document.getElementById("element").innerHTML;
  //console.log(newword);

  let requestStr = "http://api.pearson.com/v2/dictionaries/entries?headword=" + newword;

  $.ajax({
      url: requestStr,
      success: function(data){
          console.log(data);
          if(data.count == 0){
              RandomWord();
          }
          else{
              // some of the results came in as translations for words it didn't
              // have the definitions of
              // We can't use that! D':
              // SO, if the definition doesn't have a value, the search continues
              if (data.results[0].senses[0].definition == undefined){
                  RandomWord();
              }
              else{
                  document.getElementById("definitions").innerHTML = data.results[0].senses[0].definition;
                  gotWord();
              }
          }
      }
  });
}


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map;
function initMap() {
  var myLatLng; //= {lat: 44.977, lng: -93.265};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.3, lng: -91.7}, //Decorah, I think
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }


  function GeoCode() {

    var city = document.getElementById("friendcity").value;
    let therequestStr = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyD9uFBbA6BKRjP6Mnc8DF5j5S0uEmmKkoI";
    $.ajax({
        url: therequestStr,
        success: function(data){
            var mylat = data.results[0].geometry.location['lat'];
            var mylng = data.results[0].geometry.location['lng'];
            var newpos = {lat:mylat, lng:mylng};
            console.log(newpos);

            var marker= new google.maps.Marker({
              position: newpos,
              map: map
            });
        }
    });
  }
  initMap.GeoCode = GeoCode;

}

  function gotWord(){
    let response1 = "Great! Now that you have the word, why not show your friends? They'll call it bragging, but we can call it <i>enlightening</i>!";
    let response2 = "Just throw in the as much of the address of where your friends (or enemies) live and you'll be set with a map showing you all the places you can go to brag - I mean, enlighten - with your new word! Amazing!"
    document.getElementById("gotword1").innerHTML = response1;
    document.getElementById("gotword2").innerHTML = response2;
  }
