let fetchRecommendedTracks = require("./fetchTracks"); 

async function recommendPlaylist(tracks, access_token)
{
  let existingID = new Set(); 
  let recommendation = []; 
  tracks.forEach((value) =>
  {
    existingID.add(value.track.id);
  }); 

  console.log(existingID); 
  let tes = await fetchRecommendedTracks.fetchRecommendedTracks(access_token, existingID);
  return tes; 
}

module.exports.recommendPlaylist = recommendPlaylist; 