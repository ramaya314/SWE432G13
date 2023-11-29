
var selectedShowId = null;

async function renderShows(date) {
    let uri = '/api/shows';
    if(date) uri += `?date=${date.getTime()}`;
    const showsResponse = await fetch(uri);
    const shows = await showsResponse.json();
    let showListElement = document.getElementById("showListView");
    showListElement.innerHTML = "";
    for(const show of shows) {
        let showElement = getShowListItemElement(show);
        showListElement.appendChild(showElement);
    }
}


async function onShowItemClicked(show) {
    console.log('onShowItemClicked');
    if(!show) return;
    let selectedShowNameLabel = document.getElementById("selectedShowNameLabel");
    selectedShowNameLabel.innerText = show.name;
    await renderSongs(show);
    let addSongButton = document.getElementById("addSongButton");
    addSongButton.dataset.showId = show._id;
    selectedShowId = show._id;
}

async function renderSongs(show) {

    let showSongs = await getShowSongs(show._id);

    let songListView = document.getElementById("songListView");
    songListView.innerHTML = "";
    if(showSongs) {
        for(const song of showSongs) {
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
    controlsContainer.appendChild(getActionButtonElement(song._id, 'delete', onDeleteSongClicked))

    //itemContainer.appendChild(djImage);
    itemContainer.dataset.id = song._id;
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
    controlsContainer.appendChild(getActionButtonElement(show._id, 'edit',onEditShowClicked))
    controlsContainer.appendChild(getActionButtonElement(show._id, 'delete', onDeleteShowClicked))

    itemContainer.appendChild(djImage);
    itemContainer.appendChild(textContentContainer);
    itemContainer.appendChild(controlsContainer);

    itemContainer.dataset.id = show._id;
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

async function onDeleteShowClicked(e) {
    if(!e) return;
    e.stopPropagation();
    if(confirm("Are you sure you want to delete this show?")) {
        let showId = e.currentTarget.dataset.id;
        if(!(await deleteShow(showId)))
            return;
        let selector = `div.showListItem[data-id='${showId}']`;
        let listElement = document.querySelector(selector);
        listElement.remove();
        
        let songListContainer = document.getElementById("songListContainer");
        songListContainer.classList.add('hidden');
    }
}

function onAddShowClicked(e) {
    e.stopPropagation();
    location.href='/pages/show/edit';
}

function onEditShowClicked(e) {
    e.stopPropagation();
    let showId = e.currentTarget.dataset.id;
    location.href=`/pages/show/edit/${showId}`;
}

async function onDeleteSongClicked(e) {
    e.stopPropagation();
    let songId = e.currentTarget.dataset.id;

    if(!(await deleteShowSong(selectedShowId, songId)))
        return;
    
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

async function onAddSongClicked(e) {
    e.stopPropagation();
    let songInput = document.getElementById("songInput");
    let selectedSongId = songInput.dataset.songId;
    if(!selectedSongId)
        return;
    let selectedShowId = e.currentTarget.dataset.showId;

    if(!await addShowSong(selectedShowId, selectedSongId)) {
        alert('The song could not be added');
        return;
    }
    
    //add to list
    let song = await getSong(selectedSongId);
    let show = await getShow(selectedShowId); 
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

async function buildSongSuggestionBox() {
    let songData = await getSongs();
    autocomplete(document.getElementById("songInput"), songData);
}


function onDOMContentLoaded() {
    //default the date selector to today
    let sessionDate = document.getElementById('hdnSessionDate').value;
    let dateInput = document.getElementById('dateInput');
    if(sessionDate && sessionDate.length > 0) {
        sessionDate = new Date(parseInt(sessionDate));
        dateInput.valueAsDate = sessionDate;
        dateInput.disabled = false;
        document.getElementById('filterRadioDate').checked = true;
        renderShows(sessionDate);
    } else {
        let initialDate = new Date();
        dateInput.valueAsDate = initialDate;
        dateInput.disabled = true;
        document.getElementById('filterRadioAll').checked = true;
        renderShows();
    }

    addPageEventListeners();
    
    buildSongSuggestionBox(); //no need to await
}



window.addEventListener("DOMContentLoaded", () => onDOMContentLoaded(), false);
