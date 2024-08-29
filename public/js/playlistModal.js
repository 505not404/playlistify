let createPlaylistChoice = document.getElementById("createPlaylistChoice"); 
let addToPlaylist = document.getElementById("add-to-playlist"); 
let toggleCreatePlaylistBody = document.getElementById("toggle-create-playlist");
let toggleAddToPlaylistBody = document.getElementById("toggle-add-to-playlist");  
let modalBody = document.getElementById("modal-body"); 
let modalContent = document.getElementById("modal-content"); 

function toggleCreatePlaylist()
{
    addToPlaylist.style.color = "white"; 
    createPlaylistChoice.style.color = "#1ed760"; 
    toggleCreatePlaylistBody.style.display = "block"; 
    toggleAddToPlaylistBody.style.display = "none"; 
    modalBody.style.overflowY = "hidden"; 
}

function toggleAddToPlaylist()
{
    addToPlaylist.style.color = "#1ed760"; 
    createPlaylistChoice.style.color = "white"; 
    toggleCreatePlaylistBody.style.display = "none"; 
    toggleAddToPlaylistBody.style.display = "block"; 
    modalBody.style.overflowY = "scroll"; 
}

createPlaylistChoice.addEventListener("click", toggleCreatePlaylist);  
addToPlaylist.addEventListener("click", toggleAddToPlaylist); 