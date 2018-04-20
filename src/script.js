var isOpen = false;
var tagTypes = {
    'single': 1,
    'double': 2,
    'variable': 3
};

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
    var markedSelection = '';

    switch (Number(e.target.dataset.tagType)) {
        case tagTypes.single:
            markedSelection = `${e.target.dataset.tag}${selection}`;
            break;
        case tagTypes.double:
            markedSelection = `${e.target.dataset.tagLeft}${selection}${e.target.dataset.tagRight}`;
            break;
        case tagTypes.variable:
            markedSelection = `[${selection}${splitter}${e.target.dataset.tag}]`;
            break;
        default:
            break;
    }
    let result = template.value.slice(0, template.selectionStart) +
        markedSelection +
        template.value.slice(template.selectionEnd, template.value.length);

    template.value = result;
}

function createTagButton(tagType, description, left, right) {
    let item = document.createElement("a");
    if (right) {
        item.title = `${left}${right} — ${description}`;
        item.dataset.tagLeft = left;
        item.dataset.tagRight = right;
        item.textContent = `[${left}${right}]`;
    } else {
        item.title = `"${left}" — ${description}`;
        item.dataset.tag = left;
        item.textContent = tagType === tagTypes.variable ? `[${createShortName(left)}]` : `[${left}]`;
    }
    item.dataset.tagType = tagType;
    item.className = 'quickButton';
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
            entitiesList[i].insertAdjacentElement('beforebegin', createHR());
            helperWindow.appendChild(createEntityLink(i, entitiesList[i].textContent));
        }
    }
    helperWindow.style.display = 'block';
}

helperPanel.appendChild(createTagButton(tagTypes.double, 'кавычки', '«', '»'));
helperPanel.appendChild(createTagButton(tagTypes.single, 'тире', '—'));

for (var i = 0, l = variables.length; i < l; i++) {
    let a = createTagButton(tagTypes.variable, variables[i].children[1].textContent, variables[i].children[0].textContent);
    helperPanel.appendChild(a);
}

templateAccordion.addEventListener('click', handleClick);

template.insertAdjacentElement('beforebegin', helperPanel);
mainContainer.appendChild(helperWindow);
