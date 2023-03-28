const movingLetters = () => {
    const titles = Array.from(document.querySelectorAll(".letters"));

    setTimeout(() => {
        titles.forEach((title) => {
            title.classList.add("_visibl");
        });

        const titleContent = titles.map((word) => {
            const splitText = word.textContent.split("");
            return splitText.map((letter, index) => {
                return `<span style="--order:${index + 1}">${letter}</span>`;
            });
        });

        titleContent.map((array, index) => {
            document.querySelector(`.letters${index}`).innerHTML = array.map((el) => el).join("");
        });
    }, 100);
};

export default movingLetters;
