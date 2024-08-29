let openCreatePlaylistModal = document.getElementById("openCreatePlaylistModal");
let createPlaylistButton = document.getElementById("createPlaylist"); 
let modal = document.getElementById("createPlaylistModal");
let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

createPlaylistButton.onclick = async function()
{
    let elements = document.getElementsByClassName("songCheckBox");
    let playlistName = document.getElementById("playlistName").value;
    let playlistDescription = document.getElementById("playlistDescription").value;  
    let toAdd = []; 
    for(let i = 0; i < elements.length; i++)
    {
        if(elements[i].type == "checkbox")
        {
            if(elements[i].checked == true)
            {
                toAdd.push(elements[i].value);
            }
        }
    }
    const data = {playlistName:playlistName, playlistDescription: playlistDescription, toAdd:toAdd}; 
    let rawResponse = await fetch("/content/playlist/:id", 
    {
        method: 'POST', 
        headers: {'Content-Type': 'application/json','Accept': 'application/json'},   
        body: JSON.stringify(data),
    }).then(response => response.json()); 
    const fetchStatus = rawResponse;
    console.log(fetchStatus); 

    modal.style.display = "none";
    return fetchStatus;  
}

//get hash params
function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}
let params = getHashParams(); 

let access_token = params.access_token; 

openCreatePlaylistModal.onclick = function()
{
    modal.style.display = "block";
}

function checkAllStatus(now)
{
    let checkAll = document.getElementById("checkAll");
    if(now.checked == false)checkAll.checked = false;
}

function checkAllFunc(check)
{
    let elements = document.getElementsByClassName("songCheckBox");
    for(let i = 0; i < elements.length; i++)
    {
        if(elements[i].type == "checkbox")
        {
            elements[i].checked = (check.checked);
        }
    }
}


