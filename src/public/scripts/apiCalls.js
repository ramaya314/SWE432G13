
async function getShow(showId) {
    try{
        const showResponse = await fetch(`/api/shows/${showId}`);
        if(!showResponse.ok) {
            throw new Error(showResponse.statusText)
        }
        const show = await showResponse.json();
        return show;
    } catch(e) {
        console.error("error fetching show: ");
        console.error(e);
        return null;
    }
}


async function getShowSongs(showId) {
    try{
        const showResponse = await fetch(`/api/shows/${showId}/songs`);
        if(!showResponse.ok) {
            throw new Error(showResponse.statusText)
        }
        const songs = await showResponse.json();
        return songs ? Object.entries(songs).map(entry => entry[1]) : [];
    } catch(e) {
        console.error("error fetching show songs: ");
        console.error(e);
        return null;
    }
}

async function deleteShowSong(showId, songId) {
    try{
        const deleteResponse = await fetch(`/api/shows/${showId}/songs/${songId}`, { method: 'DELETE'});
        if(!deleteResponse.ok) {
            throw new Error(deleteResponse.statusText)
        }
        return true;
    } catch(e) {
        alert("error deleting show song: " + e);
    }
    return false;
}

async function addShowSong(showId, songId) {
    try{
        const putResponse = await fetch(`/api/shows/${showId}/songs/${songId}`, { method: 'PUT'});
        if(!putResponse.ok) {
            throw new Error(putResponse.statusText)
        }
        return true;
    } catch(e) {
        alert("error adding show song: " + e);
    }
    return false;
}

async function postShow(show) {
    try{
        const updateResponse = await fetch('/api/shows', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(show)
        });
        if(!updateResponse.ok) {
            throw new Error(updateResponse.statusText)
        }
        return true;
    } catch(e) {
        console.error("error updating show: ")
        console.error(e)
    }
    return false;
}

async function deleteShow(showId) {
    try{
        const deleteResponse = await fetch(`/api/shows/${showId}`, { method: 'DELETE'});
        if(!deleteResponse.ok) {
            throw new Error(deleteResponse.statusText)
        }
        return true;
    } catch(e) {
        alert("error fetching show: " + e);
    }
    return false;
}

async function getSongs() {
    try{
        const resp = await fetch(`/api/songs`);
        if(!resp.ok) {
            throw new Error(resp.statusText)
        }
        return await resp.json();
    } catch(e) {
        console.error("error fetching songs: ");
        console.error(e);
        return {};
    }
}

async function getSong(id) {
    try{
        const resp = await fetch(`/api/songs/${id}`);
        if(!resp.ok) {
            throw new Error(resp.statusText)
        }
        return await resp.json();
    } catch(e) {
        console.error("error fetching songs: ");
        console.error(e);
        return null;
    }
}