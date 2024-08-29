async function fetchProfile(token, playlistID) {
  let result = await fetch(("https://api.spotify.com/v1/playlists/") + playlistID, {
    method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
  return await result.json();
}

module.exports.fetchProfile = fetchProfile; 