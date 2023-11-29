let playing = false;

const playButton = document.getElementById("play-btn");

/**
 * This event listener will manipulate the play button.
 */
playButton.addEventListener("click", () => {

    if (playing === false) {
        playButton.innerHTML = "pause_circle"
        playing = true;
    } else {
        playButton.innerHTML = "play_circle"
        playing = false;
    }
})

const showComponent = (name, time, imgUrl) => {
    const showElement = document.createElement('button')
    showElement.className='event-listing'

    const image = document.createElement('img')
    image.src = imgUrl
    image.alt = name

    showElement.append(image)

    const infoWrapper = document.createElement('div')
    infoWrapper.className = 'listing-info'

    const djName = document.createElement('div')
    const showTime = document.createElement('div')

    djName.className = 'listing-info-text'
    showTime.className = 'listing-info-text'

    djName.innerHTML = name
    showTime.innerHTML = time

    infoWrapper.append(djName)
    infoWrapper.append(showTime)

    showElement.append(infoWrapper)
    return showElement
}

async function renderShows() {
    const uri = '/api/shows'
    
    const res = await fetch(uri)
    const shows = await res.json()

    let showListElement = document.getElementById('upcoming-events')
    for (const show of shows) {
        let showElement = showComponent(show.name, show.from, '../../images/icons/dj-icon.png')
        showListElement.appendChild(showElement)
    }
}

renderShows()