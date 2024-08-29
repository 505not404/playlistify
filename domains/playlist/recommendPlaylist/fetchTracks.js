async function getReccomendation(url, token)
{
  let bufferJSON = await fetch(url, {
    method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
  console.log(bufferJSON); 

  return bufferJSON; 
}

async function fetchRecommendedTracks(token, existingID) {

    let setArray = Array.from(existingID); 
    let result = []; 
    for(let i = 0; i < 10; i += 5)
    {
      console.log("run"); 
      let url = "https://api.spotify.com/v1/recommendations?seed_tracks=";
      for(let j = i; j < i + 5 && j < setArray.length; j++)
      {
        if(j == setArray.length - 1 || j == i + 4)
        {
          url += "2C" + setArray[j];
        }
        else if(j == i)
        {
          url += setArray[j] + "%"; 
        }
        else
        {
          url += "2C" + setArray[j] + "%";
        }
      }

    //   console.log(url); 
      let bufferJSON = await getReccomendation(url, token); 
      // console.log(bufferJSON); 
      while(bufferJSON.status == "429")
      {
       await setTimeout(5000);
       bufferJSON = (await getReccomendation(url, token)); 
      }
      let addJSON = await bufferJSON.json(); 
      console.log(addJSON); 
      let count = 0; 
      let JSONArray = Array.from(addJSON.tracks);

      for(let tracks = 0; tracks < JSONArray.length; tracks++)
      {
        if(!existingID.has(JSONArray[tracks].id))
        {
          existingID.add(JSONArray[tracks].id);
          result.push(JSONArray[tracks]); 
          count++; 
        }
        if(count >= 5)break;
      } 
    }
    console.log(result.length);
    return await result;
  }
  
  module.exports.fetchRecommendedTracks = fetchRecommendedTracks;  