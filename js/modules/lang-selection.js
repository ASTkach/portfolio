import langArr from "./translate.js";

const langSelection = () => {
    const language = document.querySelector(".language");
    const title = document.querySelector("title");
    const getSavedLanguage = () => localStorage.getItem("selected-language");
    const saveLanguage = (language) => localStorage.setItem("selected-language", language);
    let savedLanguage = getSavedLanguage();
    let largeSize;
    let smallSize;

    const setupLanguage = () => {
        if (savedLanguage != null) {
            if (window.innerWidth >= 861) {
                language.innerText = savedLanguage.toUpperCase();
            }

            if (savedLanguage === "ua") {
                if (window.innerWidth >= 861) {
                    language.classList.add("_en-hidden");
                } else {
                    language.innerHTML = `<span class="language--first">UA</span><span>EN</span>`;
                }
            } else {
                if (window.innerWidth >= 861) {
                    language.classList.add("_ua-hidden");
                } else {
                    language.innerHTML = `<span class="language--first">EN</span><span>UA</span>`;
                }
            }
        } else {
            if (window.navigator.language === "uk") {
                savedLanguage = "ua";
                if (window.innerWidth >= 861) {
                    language.innerText = savedLanguage.toUpperCase();
                    language.classList.add("_en-hidden");
                } else {
                    language.innerHTML = `<span class="language--first">UA</span><span>EN</span>`;
                }
            } else {
                savedLanguage = "en";
                if (window.innerWidth >= 861) {
                    language.innerText = savedLanguage.toUpperCase();
                    language.classList.add("_ua-hidden");
                } else {
                    language.innerHTML = `<span class="language--first">EN</span><span>UA</span>`;
                }
            }
        }

        title.innerText = langArr["title"][savedLanguage];

        if (savedLanguage === "en") {
            for (let key in langArr) {
                let elements = document.querySelectorAll(".lng-" + key);

                if (elements) {
                    elements.forEach((el) => {
                        if (!el.placeholder) {
                            el.innerHTML = langArr[key][savedLanguage];
                        }
                        if (el.placeholder) {
                            el.placeholder = langArr[key][savedLanguage];
                        }
                    });
                }
            }
        }
    };

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 861 && !smallSize) {
            language.innerText = savedLanguage.toUpperCase();
            if (savedLanguage === "ua") {
                language.classList.add("_en-hidden");
            } else {
                language.classList.add("_ua-hidden");
            }
            smallSize = true;
            largeSize = false;
        } else if (window.innerWidth <= 860 && !largeSize) {
            if (savedLanguage === "ua") {
                language.innerHTML = `<span class="language--first">UA</span><span>EN</span>`;
            } else {
                language.innerHTML = `<span class="language--first">EN</span><span>UA</span>`;
            }
            smallSize = false;
            largeSize = true;
        }
    });

    language.addEventListener("click", () => {
        if (savedLanguage === "ua") {
            saveLanguage("en");
            location.reload();
        } else {
            saveLanguage("ua");
            location.reload();
        }
    });

    setupLanguage();
};

// const langSelection = () => {
//     const langSelect = document.querySelector(".language");
//     const allLang = ["ua", "en"];

//     function changeURLLang() {
//         let lang = langSelect.value;
//         location.href = window.location.pathname + "#" + lang;
//         location.reload();
//     }

//     function changeLanguage() {
//         let hash = window.location.hash;
//         hash = hash.substring(1);

//         if (!allLang.includes(hash)) {
//             location.href = window.location.pathname + "#ua";
//             location.reload();
//         }

//         if (location.hash) history.replaceState({}, document.title, location.href.split("#")[0]);

//         langSelect.value = hash;
//         document.querySelector("title").innerText = langArr["title"][hash];

//         for (let key in langArr) {
//             let item = document.querySelector(".lng-" + key);

//             if (item) {
//                 item.innerHTML = langArr[key][hash];
//             }
//         }
//     }

//     langSelect.addEventListener("change", changeURLLang);
//     changeLanguage();
// };

export default langSelection;
