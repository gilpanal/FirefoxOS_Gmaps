 var map, lat, lng, _ini=undefined, _last=undefined;

    $(function(){

      $("#compact_button").on('click', function(){

         if(_last){
            map.removeMarkers();
            map.removePolylines();
            compactRuta(_ini, _last);
          }

    });

      function compactRuta(inicio, final_point){

        map.addMarker({ lat: inicio.lat, lng: inicio.lng});

         map.drawRoute({
          origin: [inicio.lat, inicio.lng],         
          destination: [final_point.lat,final_point.lng],
          travelMode: 'driving',
          strokeColor: '#000000',
          strokeOpacity: 0.6,
          strokeWeight: 5
        });

        map.addMarker({ lat: final_point.lat, lng: final_point.lng});
      }

      function connectMarker(e){
        map.drawRoute({
          origin: [lat, lng],           
          destination: [e.latLng.lat(), e.latLng.lng()],
          travelMode: 'driving',
          strokeColor: '#000000',
          strokeOpacity: 0.6,
          strokeWeight: 5
        });

        lat = e.latLng.lat();   
        lng = e.latLng.lng();

        _last= {lat: lat, lng: lng}; 

        map.addMarker({ lat: lat, lng: lng});  
      };

      function geolocateWrapper(){
        GMaps.geolocate({
          success: function(position){
            lat = position.coords.latitude;  
            lng = position.coords.longitude;

            map = new GMaps({  
              el: '#map',
              lat: lat,
              lng: lng,
              click: connectMarker,
              tap: connectMarker
            });
           
            if(!_ini){
              
              _ini = { lat: lat, lng: lng};
            }
            map.addMarker({ lat: lat, lng: lng}); 
          },
          error: function(error) { alert('Geolocation failed: '+error.message); },
          not_supported: function(){ alert("Sorry, your browser does not support Location API"); },
        });
      };

      geolocateWrapper();
    });