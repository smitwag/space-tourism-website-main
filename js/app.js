// mobile nav toggle

const navToggle = document.querySelector('.mobile-nav-toggle');
const navToggleTarget = document.querySelector(navToggle.dataset.toggleTarget);

navToggle.addEventListener('click', () => {
    navToggleTarget.classList.toggle('hide');
    navToggle.classList.toggle('toggle-close');
});


// tabs

const tablists = document.querySelectorAll('.tab-list');
for (const tablist of tablists) {
    loadTabContent(tablist, tablist.dataset.contentType);
}

function getTabData(tablist, contentType, index) {
    fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => loadTabContent(tablist, contentType, data[contentType][index]));
}

tablists.forEach(tablist => {
    tablist.addEventListener('click', (e) => {
        const targetTab = e.target;
        
        if(targetTab.tagName == 'LI') {
            toggleActiveTab(tablist, targetTab);

            const contentType = tablist.dataset.contentType;
            const tabIdx = Array.from(tablist.children).indexOf(targetTab);
            getTabData(tablist, contentType, tabIdx);
        }
    });
});


function toggleActiveTab(tablist, targetTab) {
    for (const tab of tablist.children) {
        tab.classList.remove('active');
    }
    targetTab.classList.add('active');
};

function loadTabContent(tablist, contentType, data) {

    const contentTarget = tablist.dataset.contentTarget;

    function loadDestinationTabContent() {
        const tabContent = document.querySelector(contentTarget);
        tabContent.querySelector('.content__heading').innerText = data.name;
        tabContent.querySelector('.content__text').innerText = data.description;

        const tabContentInfo = tabContent.querySelector('.content__info');
        tabContentInfo.querySelector('.content__info-distance').innerText = data.distance;
        tabContentInfo.querySelector('.content__info-travel').innerText = data.travel;

        const tabImage = document.querySelector(tabContent.dataset.image);
        tabImage.src = data.images.png;
        tabImage.alt = data.name;
    }
    
    function loadCrewTabContent() {
        const tabContent = document.querySelector(contentTarget);
        tabContent.querySelector('.content__heading').innerText = data.name;
        tabContent.querySelector('.content__subheading').innerText = data.role;
        tabContent.querySelector('.content__text').innerText = data.bio;

        const tabImage = document.querySelector(tabContent.dataset.image);
        tabImage.src = data.images.png;
        tabImage.alt = data.name;
    }

    function loadTechnologyTabContent() {
        const tabContent = document.querySelector(contentTarget);
        tabContent.querySelector('.content__heading').innerText = data.name;
        tabContent.querySelector('.content__text').innerText = data.description;

        const tabPicture = document.querySelector(tabContent.dataset.image);
        const tabImageDefault = tabPicture.querySelector('img');
        
        tabImageDefault.src = data.images.landscape;
        tabImageDefault.alt = data.name;

        tabPicture.querySelector('source[media="(min-width: 1180px)"]').srcset = data.images.portrait;
    }

    if(data) {
        switch(contentType) {
            case 'destinations':
                loadDestinationTabContent();
                break;
            case 'crew':
                loadCrewTabContent();
                break;
            case 'technology':
                loadTechnologyTabContent();
                break;
        }
    } 
    else {
        const tabs = tablist.children;
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('active')) {
                getTabData(tablist, contentType, i);
            }
        }
    }
    
};
