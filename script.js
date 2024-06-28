let map;
    let marker;
    function initMap() {
        const coordinates = { lat: 35.2268056, lng: 33.3202778 };
        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 15
        });

        const customIcon = {
            url: '/images/bus.png',
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50)
        };

        marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: 'Initial Location',
            icon: customIcon
        });

        // Start the tracking
        //startTracking();
    }
    /*
    function updateMap(lat, lng) {
      const newCoordinates = { lat, lng };
      map.setCenter(newCoordinates);
      marker.setPosition(newCoordinates);
    }

    async function fetchCoordinates() {
      try {
        const response = await fetch('/track');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    function startTracking() {
      setInterval(async () => {
        const coordinates = await fetchCoordinates();
        if (coordinates) {
          updateMap(coordinates.lat, coordinates.lng);
        }
      }, 1000); // Fetch new coordinates every seconds
    } */

    window.initMap = initMap;