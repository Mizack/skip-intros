var observer = new MutationObserver(function (mutations, observer) {
    let selectorSkipButton = observer.selectorSkipButton;
    let plataform = observer.plataform;
    
    mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
            let selectorFound = findSelector(selectorSkipButton, plataform);
            if (selectorFound === false) {
                return;
            }

            let skipButton = document.querySelector(selectorFound);
            if (skipButton) {
                skipButton.click();
                observer.disconnect();
            }
        }
    });

});

function skipOpening(plataform) {
    let idsForSkipButton = {
        "NETFLIX": ".watch-video--skip-content-button",
        "MAX": "#layer-root-player-screen",
    }
    let config = {
        childList: true,
        subtree: true
    };

    if (!plataform in idsForSkipButton) {
        throw new Error('Plataform not found!');
    }

    observer.selectorSkipButton = idsForSkipButton[plataform];
    observer.plataform = plataform;

    observer.observe(document.body, config);
}

function findSelector(initialSelector, plataform) {
    let finalSelector = initialSelector;
    
    if (plataform == "MAX") {
        finalSelector = findSelectorByMax();
    }
    
    return finalSelector;
}

function findSelectorByMax() {
    let elementButtonByXPath = document.evaluate(
        `//*[@id="overlay-root"]/div[3]/div/button`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    );
    let elementButton = elementButtonByXPath.singleNodeValue;
    if (!elementButton) {
        return "nao-encontrado";
    }

    let elementoParentVisibility = window.getComputedStyle(elementButton.parentNode.parentNode).getPropertyValue('visibility');
    if (elementoParentVisibility === "hidden") {
        return false;
    }
    
    return `.${elementButton.classList[0]}`;
}
