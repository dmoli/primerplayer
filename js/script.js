var $burgerButton = document.getElementById('burger-button');
var $menu = document.getElementById('menu');
//consulta para saber el ancho de la pantalla
var consulta = window.matchMedia('(max-width: 704px)');
//escucha cuando la pantalla cambia
consulta.addListener(mediaQuery);
//cuando carga la pagina carga el metodo
mediaQuery();

/**
*funcion para escuchar al evento
*/
function mediaQuery(){
  if (consulta.matches) {
    console.log('si');
    $burgerButton.addEventListener('touchstart', toggleMenu);
  }else{
    console.log('no');
    $burgerButton.removeEventListener('touchstart', toggleMenu);
  }
} 

/**
*function mostrar/ocultar menu
*/
function toggleMenu(){
  var $active = $menu.classList.toggle('active');
  if (!$active){
    $burgerButton.classList.add('icon-menu');
    $burgerButton.classList.remove('icon-close');
  }else{
    $burgerButton.classList.add('icon-close');
    $burgerButton.classList.remove('icon-menu');
  }
}

/**
*function mostrar menu
*/
function showMenu(){
  var $active = $menu.classList.add('active');
  $burgerButton.classList.remove('icon-menu');
  $burgerButton.classList.add('icon-close');
}

/**
*function ocultar menu
*/
function hideMenu(){
  var $active = $menu.classList.remove('active');
  $burgerButton.classList.add('icon-menu');
  $burgerButton.classList.remove('icon-close');
}

/**
* lazy loading
*/
var bLazy = new Blazy({
    selector: 'img'
});

/**
* Gestos touch
*/
var $body = document.body;

var gestos = new Hammer($body);
gestos.on('swipeleft', function(ev){ console.log(ev); hideMenu()});
gestos.on('swiperight', function(ev){ console.log(ev); showMenu()});

/**
* Google Maps
* multiples markers: http://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
*/

var locations = [
  ['Metro Escuela Militar (Línea 1)', -33.413752, -70.58325000000002, 'Las Cóndes'],
  ['Metro Tobalaba (Línea 1)', -33.418145, -70.60135300000002, 'Providencia'],
  ['Metro U. Católica (Línea 1)', -33.4405184, -70.6406591, 'Santiago Centro'],
  ['Metro La Cisterna (Línea 2)', -33.537443, -70.66425099999998, 'La Cisterna'],
  ['Metro Trinidad (Línea 4)', -33.54702, -70.58765399999999, 'La Florida']
  ];
var lastOpenedInfoWindow = null;

function initMap() {
  var myOptions = {
    center: new google.maps.LatLng(-33.4488897, -70.6692655),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById("map"),
      myOptions);

  setMarkers(map,locations)
}

function setMarkers(map,locations){
  var marker, i
  for (i = 0; i < locations.length; i++){  
    var nombre = locations[i][0]
    var lat = locations[i][1]
    var long = locations[i][2]
    var comuna =  locations[i][3]

    latlngset = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({  
      map: map, title: nombre , position: latlngset  
    });
    //map.setCenter(marker.getPosition())

    var content = '<h3 class="infowindow-estacion">'+nombre+'</h3>'+'<p class="infowindow-comuna">'+comuna+'</p>';    

    var infowindow = new google.maps.InfoWindow()
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
      return function() {
        closeLastOpenedInfoWindow();
        infowindow.setContent(content);
        infowindow.open(map,marker);
        lastOpenedInfoWindow = infowindow;
      };
    })(marker,content,infowindow)); 
  }
}

function closeLastOpenedInfoWindow() {
  if (lastOpenedInfoWindow) {
      lastOpenedInfoWindow.close();
  }
}

/**
* filtro
*/
function filtrar(input){
  var q = (input.value).toLowerCase().trim();
  var juegos = document.querySelectorAll("#juegos-container .juegos-item");
  for (var i=0; i<juegos.length; i++){
    var juego = juegos[i];
    var nombre = (juego.querySelectorAll('.juego-nombre')[0].innerText).toLowerCase().trim();
    juego.className = (nombre.indexOf(q) >= 0)?'juegos-item':'juegos-item hide';
  }
}
