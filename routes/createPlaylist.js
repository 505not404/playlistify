const root = require("../app");

let express = require('express');
let router = express.Router(); 
let bodyParser = require("body-parser");
let path = require("path"); 

let jsonParser = bodyParser.json(); 

router.use(bodyParser.urlencoded({extended: false}));
router.use(express.static(path.join(__dirname,'./public')));
router.use(express.static(path.join(__dirname,'./public/js')));

async function getUserID() {
    let userID = await fetch(("https://api.spotify.com/v1/me"), {
    method: "GET", headers: { Authorization: `Bearer ${root.access_token}` } }); 
    let temp = await userID.json(); 
    return await temp.id; 
}

async function createPlaylist(userID, playlistName, playlistDescription)
{
    let body = {
        "name": playlistName,
        "description": playlistDescription,
        "public": false
    }
    let json = JSON.stringify(body); 
    let response = await fetch((`https://api.spotify.com/v1/users/${userID}/playlists`), {
        method: "POST", headers: { 'Authorization': `Bearer ${root.access_token}` , 'Content-Type': 'application/json'}, body:json }); 
    let temp = await response.json();
    // console.log(temp.id);  
    return temp.id; 
}

async function addSongs(toAdd, playlistID)
{
    let uris = []; 
    console.log(toAdd); 
    for(let i = 0; i < toAdd.length; i++)
    {
        uris.push("spotify:track:"+toAdd[i]); 
    }
    let body = {"uris":uris, "position":0}; 
    let json = JSON.stringify(body);
    console.log(playlistID);
    console.log(json); 
    let response = await fetch((`https://api.spotify.com/v1/playlists/${playlistID}/tracks`), {
        method: "POST", headers: { 'Authorization': `Bearer ${root.access_token}` , 'Content-Type': 'application/json'}, body:json }); 
    let temp = await response; 
    console.log(temp); 
}


router.post("/content/playlist/:id", jsonParser, async function(req, res)
{
    let userID = await getUserID(); 
    // console.log("coba"); 
    let playlistName = req.body.playlistName; 
    let playlistDescription = req.body.playlistDescription; 
    let toAdd = req.body.toAdd;
    let data = req; 
    // res.send(data)
    // console.log(req.body.datas[2]);
    let playlistID = await createPlaylist(userID, playlistName, playlistDescription); 
    console.log(playlistID); 
    addSongs(toAdd, playlistID); 
    res.status(204).send(); 
})

module.exports = router; 


