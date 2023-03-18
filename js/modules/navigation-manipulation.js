const navigationManipulation = () => {
    const navigation = document.querySelector(".nav__body");
    const navList = document.querySelector(".nav__list");
    const navButton = document.querySelector(".nav__button");
    const navButtons = Array.from(document.querySelectorAll(".nav__button"));
    const iconMenu = document.querySelector(".header__icon");
    const logo = document.querySelector(".logo");
    const contactButton = document.querySelector(".btn--main");
    const sectionContents = Array.from(document.querySelectorAll(".section__content"));
    const progressBars = Array.from(document.querySelectorAll(".progress-bar"));
    const formRequired = Array.from(document.querySelectorAll("._req"));

    const sectionMainContent = document.getElementById("mainContent");
    const sectionAboutContent = document.getElementById("aboutContent");
    const sectionProjectsContent = document.getElementById("projectsContent");
    const sectionContactsContent = document.getElementById("contactsContent");

    let loadCurrentContent;
    let hideCurrentBar;
    let hideMainNavBar;
    let hideContactsNavBar;

    const deactivatePreviousButton = () => navButtons.forEach((button) => button.classList.remove("_pressed-btn"));
    const hidePreviousContent = () => sectionContents.forEach((content) => content.classList.remove("_visible"));
    const hidePreviousBar = () => progressBars.forEach((bar) => bar.classList.remove("_loading"));
    const removeErrorClass = () => formRequired.forEach((req) => req.classList.remove("_error"));
    const closeBurgerMenu = () => {
        navigation.classList.remove("_active");
        iconMenu.classList.remove("_active");
        document.body.classList.remove("_lock");
    };
    const showCurrentContent = () => {
        deactivatePreviousButton();
        hidePreviousContent();
        hidePreviousBar();
        loadCurrentContent = clearTimeout(loadCurrentContent);
        hideCurrentBar = clearTimeout(hideCurrentBar);
        document.querySelector(".form").reset();
        removeErrorClass();
    };

    (function initialContent() {
        sectionMainContent.classList.add("_visible");
        navButton.classList.add("_pressed-btn");
    })();

    navList.addEventListener("click", ({ target }) => {
        const buttonId = target.id;
        const currentBar = target.nextElementSibling;

        const showHideProgressBar = () => {
            currentBar.classList.add("_loading");
            hideCurrentBar = setTimeout(() => {
                closeBurgerMenu();
                currentBar.classList.remove("_loading");
            }, 800);
        };

        if (target.classList.contains("nav__button") && !target.classList.contains("_pressed-btn")) {
            showCurrentContent();
            hideMainNavBar = clearTimeout(hideMainNavBar);
            hideContactsNavBar = clearTimeout(hideContactsNavBar);
            showHideProgressBar();
            target.classList.add("_pressed-btn");

            switch (buttonId) {
                case "main":
                    loadCurrentContent = setTimeout(() => sectionMainContent.classList.add("_visible"), 900);
                    return;
                case "about":
                    loadCurrentContent = setTimeout(() => sectionAboutContent.classList.add("_visible"), 900);
                    return;
                case "projects":
                    loadCurrentContent = setTimeout(() => {
                        sectionProjectsContent.classList.add("_visible");
                    }, 900);
                    return;
                case "contacts":
                    loadCurrentContent = setTimeout(() => {
                        sectionContactsContent.classList.add("_visible");
                    }, 900);
                    return;
            }
        } else {
            return;
        }
    });

    const mainNavButton = document.getElementById("main");
    const mainNavBar = mainNavButton.nextElementSibling;
    const contactsNavButton = document.getElementById("contacts");
    const contactsNavBar = contactsNavButton.nextElementSibling;
    const openBurgerMenu = () => {
        if (window.innerWidth <= 860) {
            document.body.classList.add("_lock");
            iconMenu.classList.add("_active");
            navigation.classList.add("_active");
        } else {
            return;
        }
    };

    logo.addEventListener("click", () => {
        const showHideProgressBar = () => {
            openBurgerMenu();
            mainNavBar.classList.add("_loading");
            hideMainNavBar = setTimeout(() => {
                closeBurgerMenu();
                mainNavBar.classList.remove("_loading");
            }, 800);
        };

        if (!mainNavButton.classList.contains("_pressed-btn")) {
            showCurrentContent();
            hideMainNavBar = clearTimeout(hideMainNavBar);
            mainNavButton.classList.add("_pressed-btn");
            showHideProgressBar();
            loadCurrentContent = setTimeout(() => sectionMainContent.classList.add("_visible"), 900);
        } else {
            return;
        }
    });

    contactButton.addEventListener("click", () => {
        const showHideProgressBar = () => {
            openBurgerMenu();
            contactsNavBar.classList.add("_loading");
            hideContactsNavBar = setTimeout(() => {
                closeBurgerMenu();
                contactsNavBar.classList.remove("_loading");
            }, 800);
        };

        if (!contactsNavButton.classList.contains("_pressed-btn")) {
            showCurrentContent();
            hideContactsNavBar = clearTimeout(hideContactsNavBar);
            contactsNavButton.classList.add("_pressed-btn");
            showHideProgressBar();
            loadCurrentContent = setTimeout(() => sectionContactsContent.classList.add("_visible"), 900);
        } else {
            return;
        }
    });

    const mainContentWrap = document.querySelector(".section__text-wrap--main");
    const buttonWrap = document.querySelector(".section__button");
    const playButton = document.querySelector(".section__button-main");
    const game = document.querySelector(".game");

    iconMenu.addEventListener("click", () => {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        navigation.classList.toggle("_active");
        mainContentWrap.classList.remove("_lock-for-play");
        buttonWrap.classList.remove("_play");
        game.classList.remove("_play");
    });

    playButton.addEventListener("click", () => {
        mainContentWrap.classList.toggle("_lock-for-play");
        buttonWrap.classList.toggle("_play");
        game.classList.toggle("_play");
    });
};

export default navigationManipulation;
