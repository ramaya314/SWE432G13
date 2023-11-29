
function formIsValid() {

    let errors = [
        validateRequiredInput("nameInput", "name"),
        validateRequiredInput("dateInput", "date"),
        validateRequiredInput("fromInput", "from time"),
        validateRequiredInput("toInput", "to time"),
        validateRequiredInput("djSelect", "DJ")
    ];

    let errorMessage = '';
    for(const error of errors) {
        if(!error || error.length <= 0) continue;
        errorMessage += `${error}\n`;
    }
    if(!errorMessage || errorMessage.length <= 0)
        return null;

    return `Please fix the following errors on the form:\n${errorMessage}`;
}

function validateRequiredInput(inputId, inputLabel) {
    let input = document.getElementById(inputId);
    if(!input.value) {
        input.classList.add('error');
        input.addEventListener('change', e => {
            let currentInput = e.currentTarget;
            currentInput.classList.remove('error');
        }, {once: true});
        return `the ${inputLabel} is required`;
    }
    return '';
}

async function onSaveClick() {
    var formErrors = formIsValid();
    if(formErrors) {
        alert(`Please fix the following errors on the form: ${formErrors}`);
        return;
    }

    let saveButton = document.getElementById("saveButton");
    let showId = saveButton.dataset.id;

    let show = showId ? ((await getShow(showId)) || {}) : {};
    show.name = document.getElementById("nameInput").value;
    show.date = document.getElementById("dateInput").value;
    show.from = document.getElementById("fromInput").value;
    show.to = document.getElementById("toInput").value;
    show.dj = document.getElementById("djSelect").value;
    show.songs = show.songs || {}; //initialize songs if not existing;
    if(await postShow(show)) {
        alert('The show has been saved succesfully!');
        location.href=`/pages/producer`;
    } else {
        alert('The show could not be saved');
    }
}
