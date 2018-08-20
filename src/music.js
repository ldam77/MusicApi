export function getAlbums(artistName) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistName}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

export function getTracks(albumId) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `http://theaudiodb.com/api/v1/json/1/track.php?m=${albumId}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

export function getLyric(artistName, title) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.lyrics.ovh/v1/${artistName}/${title}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}
