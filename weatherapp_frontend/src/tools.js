var tools = {};

tools.getLocation = () => {
  let navigator = window.navigator;
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(success, error, options);

      function success(pos) {        
        var lng = pos.coords.longitude;
        var lat = pos.coords.latitude;
        resolve({ lat, lng });
      }

      function error(err) {
        resolve(err);
      }
    }
  });
};

tools.getBackgrounds = () => {
  return {
    '00:30': 'linear-gradient(135deg, #000033, #000000)'
  }
};

tools.isMobile = () => {
  if(window.innerHeight > window.innerWidth){
    return true;
  }
  return false;
}

export default tools;
