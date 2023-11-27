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