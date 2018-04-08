var LastFM = {};
const API_KEY = 'f3a80867893d2cff6111230a942aa131';

$(document).ready(function() {
  $("#search-button").click(function() {
    LastFM.searchLastByTitle($("#search-input").val());
  });
});


LastFM.renderTracks = function(tracks) {
  var $trackList = $('#songs-list');

  $trackList.empty();

  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]['#text'];
    var htmlTrackRow =
    '<div id="track" class="list">' +
    ' <p class="song">' + track.name + '</p>' +
    ' <p class="artist">' + track.artist + '</p>' +
    ' <p class="album"><img class="pulsate-fwd" src="' + mediumAlbumArt + '"></p>' +
    ' <p class="popularity">' + track.listeners + '</p>' +
    ' <a class= "play" href="' + track.url + '" trarget= "_blank"><i class= "fas fa-play-circle vibrate-1"></i></a>'
    '</div>';

    $trackList.append(htmlTrackRow);
  }
};

LastFM.searchLastByTitle = function(title) {
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      LastFM.renderTracks(response.results.trackmatches.track);
    }
  });
};

