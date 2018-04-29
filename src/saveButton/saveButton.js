var errorMessages = document.getElementsByClassName('alert alert-danger pgf-verificator-error-message');

function handleClick() {
    for (let i = 0, l = errorMessages.length; i < l; i++) {
        let parts = errorMessages[i].innerHTML.split('<br>');
        if (parts[1]) {
            localStorage.setItem("check" + i, JSON.stringify(parts[1]))
        }
    }
}

function createSaveButton() {
    let saveButton = document.createElement("button");
    saveButton.addEventListener('click', handleClick);
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'btn btn-success entitiessaveButton';
    return saveButton;
}

if ((/\/linguistics\/templates\/\d+/i.test(location.pathname)) && errorMessages.length > 0) {
    var mainContainer = document.getElementById('main-container');
    var saveWindow = document.createElement("div");
    saveWindow.className = 'saveWindow';

    saveWindow.appendChild(createSaveButton());
    mainContainer.appendChild(saveWindow);
}