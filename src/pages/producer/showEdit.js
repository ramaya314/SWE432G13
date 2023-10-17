
const showRepository = new ShowRepository(shows);  

function loadShow(showId) {
    let show = showRepository.get(showId);
    if(!show) {
        alert('the target show was not found');
        return;
    }

    let nameInput = document.getElementById("nameInput");
    nameInput.value = show.name;
    
    let dateInput = document.getElementById("dateInput");
    dateInput.value = show.date;
    
    let fromInput = document.getElementById("fromInput");
    fromInput.value = show.from;
    
    let toInput = document.getElementById("toInput");
    toInput.value = show.to;

    let djSelect = document.getElementById("djSelect");
    djSelect.value = show.dj;
    
    let saveButton = document.getElementById("saveButton");
    saveButton.dataset.id = show.id;
}

function onDOMContentLoaded() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('showId');

    const pageTitleLabelElement = document.getElementById("pageTitleLabel");
    if(showId) {
        loadShow(showId);
        pageTitleLabelElement.textContent = "Edit Show";
    }
    else {
        pageTitleLabelElement.textContent = "Add Show";
    }
}

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
            currentInput.classList.remove('error')
            e.currentTarget.remo
        }, {once: true});
        return `the ${inputLabel} is required`;
    }
    return '';
}

function onSaveClick() {
    var formErrors = formIsValid();
    if(formErrors) {
        alert(`Please fix the following errors on the form: ${formErrors}`);
        return;
    }

    let saveButton = document.getElementById("saveButton");
    let showId = saveButton.dataset.id;
    let show = showRepository.get(showId) || {};

    show.name = document.getElementById("nameInput").value;
    show.date = document.getElementById("dateInput").value;
    show.from = document.getElementById("fromInput").value;
    show.to = document.getElementById("toInput").value;
    show.dj = document.getElementById("djSelect").value;
    show.songs = show.songs || {}; //initialize songs if not existing;
    showRepository.addUpdate(show);

    alert('The show has been saved succesfully!');
    
    location.href=`./producePage.html`;

}


window.addEventListener("DOMContentLoaded", () => onDOMContentLoaded(), false);
