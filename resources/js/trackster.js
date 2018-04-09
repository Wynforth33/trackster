/* Event Handler listing for click Search button;
   will add listener for Enter Key*/
$('#search-button').click(function(){
  Trackster.searchTracksByTitle($('#search-input').val());
});

/* ['Trackster'Object] contains both functions for App.*/
const Trackster={
  /*
    Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks.
  */
  renderTracks(tracks){
    const $trackList = $('#track-list').empty();
    for (let i = 0; i < tracks.length; i++){
      const track = tracks[i];
      const trackArt = track.image[1]["#text"];
      const trackRow =
      `<div class="row track">
        <div class="col-xs-1 col-xs-offset-1 play-button">
          <a href="${track.url}" target="_blank">
            <i class="fa fa-play-circle-o fa-2x"></i>
          </a>
        </div>
        <div class="col-xs-4">${track.name}</div>
        <div class="col-xs-2">${track.artist}</div>
        <div class="col-xs-2"><img src="${trackArt}"/></div>
        <div class="col-xs-2">${track.listeners}</div>
      </div>`;
      $trackList.append(trackRow);
    }
  },
  /*
    Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response.
  */
  searchTracksByTitle(title){
    const apiKey = '50f4e39d37afe22e4c153b312105d415';
    const url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=';
    $.ajax({
      url: `${url}${title}&api_key=${apiKey}&format=json`,
      success: function(response) {
        Trackster.renderTracks(response.results.trackmatches.track);
      }
    })
  }
}
