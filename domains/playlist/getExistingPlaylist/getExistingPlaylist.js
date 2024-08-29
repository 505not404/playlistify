async function getExisting(token)
{
    let existingPlaylist = [];  
    // let getUserID = await fetch(("https://api.spotify.com/v1/me"), {
    //     method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
    //     let temp = await getUserID.json(); 
    // let userID = await temp.id; 
    // console.log("bruh");
    let index = 0; 
    // let url = `https://api.spotify.com/v1/me/playlists?limit=50&offset=${index}`; 
    let url = "https://api.spotify.com/v1/me/playlists"; 
    let bufferJSON = await fetch(url, {
        method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
    let addJSON = await bufferJSON.json(); 
    // console.log(addJSON); 
    let JSONArray = Array.from(addJSON.items);
    for(let items = 0; items < JSONArray.length; items++)
    {
        let temp = {"playlistID":JSONArray[items].id, "playlistName":JSONArray[items].name}; 
        existingPlaylist.push(temp); 
        // if(JSONArray[items].owner.id == userID)
        // {
        //     let temp = {"playlistID":JSONArray[items].id, "playlistName":JSONArray[items].name}; 
        //     existingPlaylist.push(temp); 
        // }
    } 
    index += 50;

    // while(JSONArray.length > 0)
    // {
    //     url = `https://api.spotify.com/v1/me/playlists?limit=50&offset=${index}`;
    //     bufferJSON = await fetch(url, {
    //         method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
    //     addJSON = await bufferJSON.json(); 
    //     JSONArray = Array.from(addJSON.items);
    //     for(let items = 0; items < JSONArray.length; items++)
    //     {
    //         temp = {"playlistID":JSONArray[items].id, "playlistName":JSONArray[items].name}; 
    //         existingPlaylist.push(temp); 
    //     } 
    //     index += 50;
    // }
    return await existingPlaylist; 
}

module.exports.getExisting = getExisting; 