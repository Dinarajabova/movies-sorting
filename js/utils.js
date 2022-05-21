let createElement = function(elName, className, text) {
    let createdElement = document.createElement(elName);
    createdElement.className = className;

    if (text) {
        createdElement.textContent = text
    };

    return createdElement
}

