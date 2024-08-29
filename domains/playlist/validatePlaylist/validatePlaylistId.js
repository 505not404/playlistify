let fetch = require("./fetchProfile"); 

async function fetchProfile(token, playlistID) {
  let result = await fetch(("https://api.spotify.com/v1/playlists/") + playlistID, {
    method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
  return await result.json();
}

async function validatePlaylistId (token, playlistID)
{
  const profile = await fetch.fetchProfile(token, playlistID); 
  let validation = {}; 
  let status = profile.error; 
  if(typeof status === "undefined")
  {
    validation.status = "ok"; 
    validation.message = profile; 
  }
  else
  {
    validation.status = "error"; 
    let statusMessage = status.status; 
    if(statusMessage == 401)
    {
      validation.message = "401"; 
    }
    else if(statusMessage == 404)
    {
      validation.message = "404, playlist id invalid"; 
    }
  }
  return validation; 
}

module.exports.validatePlaylistId = validatePlaylistId; 