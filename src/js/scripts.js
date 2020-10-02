// Random number in range
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var randomNum = getRandomIntInclusive(1,16);
var hero = document.getElementsByClassName('hero');

hero[0].style.backgroundImage = "url(images/heroes/" + randomNum + ".jpg)";

// // Functions
// function isInArray(value, array) {
//     return array.indexOf(value) > -1;
//   }

//   // Variables
//   var accessToken  = '1483492967.85e14be.b0dc9e8b600549d1a8075ecf784a2f59';
//   var defaultImage = 'images/hero-fallback.jpg';
//   var imageTag     = 'skip';

//   // Instagram API Call
//   $.ajax({
//     url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken + '',

//     // If API call fails
//     error: function() {
//       $('.hero').css('background-image', 'url(' + defaultImage + ')');
//     },

//     // If API call succeeds
//     success: function(data) {

//       // If API call response is valid
//       if (data.meta.code === 200) {

//         // Variables
//         var unfilteredData = data.data;
//         var filteredData   = unfilteredData.filter(function(unfilteredData){
//           return !isInArray(imageTag, unfilteredData.tags);
//         });
//         var randomNumber   = 0 + Math.floor(Math.random() * filteredData.length);

//         var image          = filteredData[randomNumber];
//         var imageLocation  = image.location;
//         var imageUrl       = image.images.standard_resolution.url;
//         // var imageUrlFull   = imageUrl.replace(/(s640x640\/)(.*)\//, '');

//         // Output
//         $('.hero').css('background-image', 'url(' + imageUrl + ')');

//         if (imageLocation && imageLocation.name) {
//             $('.location').html('<a href="https://www.google.com/maps/?q=' + imageLocation.latitude + ',' + imageLocation.longitude + '" target="_blank">' + imageLocation.name + '</a>');
//         }

//       // If API call response is not valid
//       } else {
//         $('.hero').css('background-image', 'url(' + defaultImage + ')');
//       }
//     },
//     type: 'GET',
//     dataType: "jsonp"
//   });
