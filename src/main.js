
$(document).ready(function() {
  $("form#artistSearch-form").submit(function(event) {
    event.preventDefault();
    $("#player").hide();
    $(".tracklist").show();
    $("#scroll-area").hide();
    $('.showErrors').text("");
    $(".lyrics").text("");
    $("#title").text("");
    let artistName = $("#artistName").val();
    let albumId, trackName;
    let trackLists = [];
    $(".tracklist").text("");




    $.get(`http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistName}`).then(function(response) {
      response.album.forEach(function(album) {
        albumId = album.idAlbum;
        $.get(`http://theaudiodb.com/api/v1/json/1/track.php?m=${albumId}`).then(function(response) {
          $("#scroll-area").show();
          response.track.forEach(function(track) {
            let title = track.strTrack;
            trackLists.push(track.strTrack);
            $(".tracklist").append(`<p class="findLyric">${title}</p>`);
            $(".findLyric").last().click(function() {
              $(".tracklist").hide();
              $.get(`https://api.lyrics.ovh/v1/${artistName}/${title}`).then(function(response){
                $("#title").text(title);
                let lyricArrays = response.lyrics.replace( /\n/g, "." ).split(".");
                lyricArrays.forEach(function(line){
                  $(".lyrics").append(line + "<br>");
                });
              }).fail(function(error) {
                $('.showErrors').text(`Lyrics not found. Please try again.`);
              });
            })
          });
        }).fail(function(error) {
          $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
        });
      });
    }).fail(function(error) {
      $('.showErrors').text(`Artist not found. Please try again.`);
    });
  });

});
