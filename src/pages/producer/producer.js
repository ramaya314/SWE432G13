
const showRepository = new ShowRepository(shows);  
const songRepository = new SongRepository(songs);  

var selectedShowId = null;

function renderShows(date) {
    let shows = date ? showRepository.getShowsByDate(date) : showRepository.getAll();  
    let showListElement = document.getElementById("showListView");
    showListElement.innerHTML = "";
    for(const show of shows) {
        let showElement = getShowListItemElement(show);
        showListElement.appendChild(showElement);
    }
}


function onShowItemClicked(show) {
    console.log('onShowItemClicked');
    if(!show) return;
    let selectedShowNameLabel = document.getElementById("selectedShowNameLabel");
    selectedShowNameLabel.innerText = show.name;
    renderSongs(show);
    let addSongButton = document.getElementById("addSongButton");
    addSongButton.dataset.showId = show.id;
    selectedShowId = show.id;
}

function renderSongs(show) {
    let songListView = document.getElementById("songListView");
    songListView.innerHTML = "";
    if(show.songs) {
        for(const song of Object.entries(show.songs).map(e => e[1])) {
            let songListElement = getSongListItemElement(song, show);
            songListView.appendChild(songListElement);
        }
    }
    let songListContainer = document.getElementById("songListContainer");
    songListContainer.classList.remove('hidden');
}

function getSongListItemElement(song, show) {
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('controlListView_option');
    itemContainer.classList.add('songListItem');

    // let djImage = document.createElement('img');
    // djImage.classList.add('controlListView_option_profileImage');
    // djImage.setAttribute('src', '../../images/profile.jpg');

    let textContentContainer = document.createElement('div');
    textContentContainer.classList.add('controlListView_option_textContent');
    let songNameLabel = document.createElement('div');
    songNameLabel.innerText = song.song_name;
    let artistNameLabel = document.createElement('div');
    artistNameLabel.innerText = song.artist;
    textContentContainer.appendChild(songNameLabel);
    textContentContainer.appendChild(artistNameLabel);
    
    let controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controlListView_option_actions');
    controlsContainer.appendChild(getActionButtonElement(song.id, 'delete', onDeleteSongClicked))

    //itemContainer.appendChild(djImage);
    itemContainer.dataset.id = song.id;
    itemContainer.appendChild(textContentContainer);
    itemContainer.appendChild(controlsContainer);

    return itemContainer;
}

function getShowListItemElement(show) {
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('controlListView_option');
    itemContainer.classList.add('showListItem');

    let djImage = document.createElement('img');
    djImage.classList.add('controlListView_option_profileImage');
    djImage.setAttribute('src', '../../images/profile.jpg');

    let textContentContainer = document.createElement('div');
    textContentContainer.classList.add('controlListView_option_textContent');
    let timeLabel = document.createElement('div');
    timeLabel.innerText = `${show.date}\t${show.from} - ${show.to}`;
    timeLabel.classList.add('dateTimeLabel');
    let showNameLabel = document.createElement('div');
    showNameLabel.classList.add('showName');
    showNameLabel.innerText = show.name;


    let djNameLabel = document.createElement('div');
    djNameLabel.innerText = "DJ name";

    textContentContainer.appendChild(timeLabel);
    textContentContainer.appendChild(showNameLabel);
    textContentContainer.appendChild(djNameLabel);
    
    let controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controlListView_option_actions');
    controlsContainer.appendChild(getActionButtonElement(show.id, 'edit',onEditShowClicked))
    controlsContainer.appendChild(getActionButtonElement(show.id, 'delete', onDeleteShowClicked))

    itemContainer.appendChild(djImage);
    itemContainer.appendChild(textContentContainer);
    itemContainer.appendChild(controlsContainer);

    itemContainer.dataset.id = show.id;
    itemContainer.addEventListener("click", e => {
        e.stopPropagation();
        onShowItemClicked(show);
    });

    return itemContainer;
}

function getActionButtonElement(refId, icon, onClick) {
    let container = document.createElement('div');
    container.classList.add('iconButton');
    let iconElement = document.createElement('span');
    iconElement.classList.add('material-symbols-outlined');
    iconElement.innerText = icon;

    onClick && container.addEventListener("click", onClick);

    container.dataset.id = refId;
    container.appendChild(iconElement);
    return container;
}

function onDeleteShowClicked(e) {
    if(!e) return;
    e.stopPropagation();
    if(confirm("Are you sure you want to delete this show?")) {
        let showId = e.currentTarget.dataset.id;
        showRepository.delete(showId);
        let selector = `div.showListItem[data-id='${showId}']`;
        let listElement = document.querySelector(selector);
        listElement.remove();
        
        let songListContainer = document.getElementById("songListContainer");
        songListContainer.classList.add('hidden');
    }
}

function onAddShowClicked(e) {
    e.stopPropagation();
    location.href='./showEditPage.html';
}

function onEditShowClicked(e) {
    e.stopPropagation();
    let showId = e.currentTarget.dataset.id;
    location.href=`./showEditPage.html?showId=${showId}`;
}

function onDeleteSongClicked(e) {
    e.stopPropagation();
    let songId = e.currentTarget.dataset.id;
    showRepository.removeSong(songId, selectedShowId);
    
    let selector = `div.songListItem[data-id='${songId}']`;
    let listElement = document.querySelector(selector);
    listElement.remove();
}

function onFilterRadioChanged(e) {
    let radio = e.currentTarget;
    if(radio.checked) {
        let dateInput = document.getElementById('dateInput');
        switch(radio.value) {
            case "all":
                renderShows();
                dateInput.disabled = true;
                break;
            case "date":
                renderShows(new Date(dateInput.value));
                dateInput.disabled = false;
                break;
        }
    }
}

function onAddSongClicked(e) {
    e.stopPropagation();
    let songInput = document.getElementById("songInput");
    let selectedSongId = songInput.dataset.songId;
    if(!selectedSongId)
        return;
    let song = songRepository.get(selectedSongId);

    let selectedShowId = e.currentTarget.dataset.showId;
    show = showRepository.get(selectedShowId); 
    show.songs = show.songs || {}; //sanity check, make sure we have a proper songs object;
    show.songs[song.id] = song;
    showRepository.addUpdate(show);
    
    //add to list
    let songListView = document.getElementById("songListView");
    let songListElement = getSongListItemElement(song, show);
    songListView.appendChild(songListElement);
}

function onDateInputChanged(e) {
    e.stopPropagation();
    let selectedDate = new Date(e.currentTarget.value);
    renderShows(selectedDate);
}

function addPageEventListeners() {
    let addShowButton = document.getElementById("addShowButton");
    addShowButton && addShowButton.addEventListener("click", onAddShowClicked);
    
    let addSongButton = document.getElementById("addSongButton");
    addSongButton && addSongButton.addEventListener("click", onAddSongClicked);

    var filterRadios = document.querySelectorAll('.filterRadio');
    for (const filterRadio in filterRadios) {
        filterRadios[filterRadio].onchange = onFilterRadioChanged;
    }

    let dateInput = document.getElementById("dateInput");
    dateInput.addEventListener("change", onDateInputChanged);
}

function buildSongSuggestionBox() {
    let songData = songRepository.getAll();
    console.log('songData', songData);
    autocomplete(document.getElementById("songInput"), songData);
}

function onDOMContentLoaded() {
    buildSongSuggestionBox();

    //default the date selector to today
    let initialDate = new Date();
    document.getElementById('dateInput').valueAsDate = initialDate;

    addPageEventListeners();
    renderShows();
}



window.addEventListener("DOMContentLoaded", () => onDOMContentLoaded(), false);
