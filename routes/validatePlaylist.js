const root = require("../app"); 
const validatePlaylist = require("../domains/playlist/validatePlaylist/validatePlaylistId"); 
const recommendPlaylist = require("../domains/playlist/recommendPlaylist/recommendPlaylist"); 
const getExistingPlaylist = require("../domains/playlist/getExistingPlaylist/getExistingPlaylist"); 

let express = require('express');
let router = express.Router(); 
let bodyParser = require("body-parser");
let rateLimit = require("express-rate-limit");
let path = require("path"); 

const limit = rateLimit({
  windoMs: 20 * 60 * 1000,
  max: 100
})

router.use(bodyParser.urlencoded({extended: false}));
router.use(express.static(path.join(__dirname,'./public')));
router.use(limit); 

router.post('/content/playlist', async function(req,res){
  // console.log("heree"); 
  res.redirect("/content/playlist/" + req.body.playlistID); 
});

router.get('/content/playlist/:id', async function(req, res)
{
  // console.log("here"); 
  // console.log(root.access_token); 
  // console.log(req.params.id); 
  let validation = await validatePlaylist.validatePlaylistId(root.access_token, req.params.id);
  // console.log(validation); 
  if(validation.status == "ok")
  {
    // console.log("length" + validation.message.tracks.total);
    if(validation.message.tracks.total > 100)
    {
      await res.render("contentFailure", {alert: "playlist size is more than 100"}); 
      console.log(validation.message.tracks.total);
      console.log("bruhh");
    }
    else
    {
      // let existingPlaylistList = 5;
      let existingPlaylistList = await getExistingPlaylist.getExisting(root.access_token); 
      // console.log(existingPlaylistList); 
      let recommendedPlaylist = await recommendPlaylist.recommendPlaylist(validation.message.tracks.items, root.access_token); 
      console.log(recommendedPlaylist); 
      await res.render("contentSuccess", {recommendedPlaylist, existingPlaylistList}); 
    }
  }
  else
  {
    if(validation.message === "401")
    {
      res.render("reauthorize"); 
    }
    else
    {
      res.render("contentFailure", {alert: validation.message}); 
    }
  }
}); 

module.exports = router; 
