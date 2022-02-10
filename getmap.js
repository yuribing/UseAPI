
  function initMap(paraLat, paraLng) {
      alert("initMap called");
    const myLatlng = {
      lat: paraLat,
      lng: paraLng
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });

    infoWindow.open(map);
    const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });
    map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 3000);
  });

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {

      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      
      });

      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);

      const data = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
      const obj = JSON.parse(data);
      console.log(obj);

      // display in textbox
      document.getElementById("latitude").value = obj['lat'];
      document.getElementById("longitude").value = obj['lng'];
      
    });
  }
