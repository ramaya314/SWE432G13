let following = false;

const followButton = document.getElementById("fav-btn")

followButton.addEventListener("click", function() {

    if (following === true) {
        followButton.innerHTML = "favorite"
        following = false;
    } else {
        followButton.innerHTML = "heart_broken"
        following = true;
    }
})