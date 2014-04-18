 var map, lat, lng, _ini=undefined, _last=undefined;

    $(function(){

      $("#compact_button").on('click', function(){

         if(_last){
            map.removeMarkers();
            map.removePolylines();
            compactarRuta(_ini, _last);
          }

    });

      function compactarRuta(inicio, final_point){

        map.addMarker({ lat: inicio.lat, lng: inicio.lng});

         map.drawRoute({
          origin: [inicio.lat, inicio.lng],  // origen en coordenadas anteriores
          // destino en coordenadas del click o toque actual
          destination: [final_point.lat,final_point.lng],
          travelMode: 'driving',
          strokeColor: '#000000',
          strokeOpacity: 0.6,
          strokeWeight: 5
        });

        map.addMarker({ lat: final_point.lat, lng: final_point.lng});
      }

      function enlazarMarcador(e){

       // muestra ruta entre marcas anteriores y actuales
        map.drawRoute({
          origin: [lat, lng],  // origen en coordenadas anteriores
          // destino en coordenadas del click o toque actual
          destination: [e.latLng.lat(), e.latLng.lng()],
          travelMode: 'driving',
          strokeColor: '#000000',
          strokeOpacity: 0.6,
          strokeWeight: 5
        });

        lat = e.latLng.lat();   // guarda coords para marca siguiente
        lng = e.latLng.lng();

        _last= {lat: lat, lng: lng}; // guarda el ultimo marcador establecido

        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
      };

      function geolocalizar(){
        GMaps.geolocate({
          success: function(position){
            lat = position.coords.latitude;  // guarda coords en lat y lng
            lng = position.coords.longitude;

            map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
              el: '#map',
              lat: lat,
              lng: lng,
              click: enlazarMarcador,
              tap: enlazarMarcador
            });
            // guarda el marcador inicial en una variable para su posterior recuperacion
            if(!_ini){
              
              _ini = { lat: lat, lng: lng};
            }
            map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]
          },
          error: function(error) { alert('Geolocalización falla: '+error.message); },
          not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
        });
      };

      geolocalizar();
    });