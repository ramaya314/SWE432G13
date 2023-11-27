/**
 * This function will generate a DJ listing component
 * 
 * @param {*} name name of the dj
 * @param {*} desc description of the dj
 * @param {*} imgUrl the url location of the dj image.
 * @returns a dj element
 */
const djElement = (name, desc, imgUrl) => {
    const infoText = document.createElement('div');
    infoText.className = "dj-info-div";

    // Generate image url
    const image = document.createElement('img');
    image.src = imgUrl;
    image.alt = `${name}`

    infoText.append(image)

    // Generate the text wrapper
    const textWrapper = document.createElement('div')
    textWrapper.className = "dj-info-text"

    infoText.append(textWrapper);

    // Generate name and description
    const nameDiv = document.createElement('div')
    const descDiv = document.createElement('div')

    nameDiv.className = 'dj-info-ti';
    descDiv.className = 'dj-info-ti';

    nameDiv.innerHTML = name
    descDiv.innerHTML = desc

    textWrapper.append(nameDiv)
    textWrapper.append(descDiv)

    return infoText;
}

/**
 * Read our json file that is currently our "database"
 * 
 * @returns a JSON array of mock DJ names.
 */
async function database(dbName) {
    const res = await fetch(`/api/djs`);
    return await res.json();
}

const liveList = document.getElementById('live-dj-list');
const djList = document.getElementById('dj-list'); 

/**
 * Load all the DJ values that match the search result.
 * 
 * @param {*} htmlElement the document element we will append these values to.
 * @param {*} searchValue the search value we are matching.
 * @param {*} dbName the name of the database (json file) we are loading values from.
 */
function loadValues(htmlElement, searchValue, dbName) {

    const results = database(dbName);

    results.then((data) => {

        /**
         * Create/load custom object for each object in json array and append component.
         */
        data.forEach((element) => {
            const name = element.name.toLowerCase();
            const category = element.category.toLowerCase();

            element.name = element.name + "!"

            if (name.includes(searchValue.toLowerCase()) || category.includes(searchValue.toLowerCase())) {
                const newElement = djElement(element.name, element.description, element.imgUrl)
                htmlElement.appendChild(newElement)

                // To provide proof the JSON object had new property appended.
                console.log(redundantValue)
            }
        })
    })
}

/**
 * Create our event handler for form submission that will load the
 * corresponding values based on the text input from the search form.
 */
const searchForm = document.getElementById('search-form')
searchForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const searchElement = document.getElementById('search-value');
    const searchValue = searchElement.value;

    if (!searchValue || searchValue === '') {
        alert("Nothing was input to search.")
        return;
    }

    // Delete previous values
    liveList.innerHTML = ''
    djList.innerHTML = ''

    // Load new values
    loadValues(liveList, searchValue, 'database_live')
    loadValues(djList, searchValue, 'database_djs')
})

setTimeout(() => {
    console.log("Hello, this message will be displayed 2 seconds after loading.")
}, 2000)