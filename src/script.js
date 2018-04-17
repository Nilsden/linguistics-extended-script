var isOpen = false;

var mainContainer = document.getElementById('main-container');
var templateAccordion = document.getElementsByClassName('accordion-toggle')[0];
var template = document.getElementById('id_template');
var variables = document.getElementsByTagName('tr');

var helperWindow = document.createElement("div");
var helperPanel = document.createElement("div");

helperWindow.className = 'entitiesWindow';
helperPanel.className = 'helperPanel';

function handleFakeClick() {
    templateAccordion.click();
}

function markTheWord(e) {
    var selection = (template.value).substring(template.selectionStart, template.selectionEnd);
    let splitter = selection.length > 0 ? '|' : '';
    let markedSelection = `[${selection}${splitter}${e.target.dataset.tag}]`;

    let result = template.value.slice(0, template.selectionStart) +
        markedSelection +
        template.value.slice(template.selectionEnd, template.value.length);

    template.value = result;
}

function createVariableButton(variable, description) {
    let item = document.createElement("a");
    item.title = `${variable} — ${description}`;
    item.dataset.tag = variable;
    item.className = 'quickButton';
    item.textContent = `[${createShortName(variable)}]`;
    item.addEventListener('click', markTheWord);
    return item;
}

function createShortName(variable) {
    let newVariable = variable;
    let words = variable.match(/[a-zA-Z]+/ig);
    words.forEach(item => newVariable = newVariable.replace(item, item.substring(0, 4)));
    return newVariable;
}

function createCloseButton() {
    let closeButton = document.createElement("button");
    closeButton.addEventListener('click', handleFakeClick);
    closeButton.textContent = 'Закрыть';
    closeButton.className = 'btn btn-success entitiesCloseButton';
    return closeButton;
}

function createHR() {
    let hr = document.createElement("hr");
    hr.className = 'entitiesHR';
    return hr;
}

function createEntityLink(i, textContent) {
    let item = document.createElement("a");
    item.href = `#ent${i}`;
    item.className = 'entityItem';
    item.textContent = textContent;
    return item;
}

function handleClick() {
    isOpen = !isOpen;

    if (!isOpen) {
        helperWindow.style.display = 'none';
        return;
    }

    if (helperWindow.children.length === 0) {
        helperWindow.appendChild(createCloseButton());
        helperWindow.appendChild(createHR());

        let entitiesList = document.getElementsByTagName('h5');

        for (var i = 0, l = entitiesList.length; i < l; i++) {
            entitiesList[i].id = `ent${i}`;
            helperWindow.appendChild(createEntityLink(i, entitiesList[i].textContent));
        }
    }
    helperWindow.style.display = 'block';
}

for (var i = 0, l = variables.length; i < l; i++) {
    let a = createVariableButton(variables[i].children[0].textContent, variables[i].children[1].textContent);
    helperPanel.appendChild(a);
}

templateAccordion.addEventListener('click', handleClick);

template.insertAdjacentElement('beforebegin', helperPanel);
mainContainer.appendChild(helperWindow);
