const movingLetters = () => {
    const title = Array.from(document.querySelectorAll(".letters"));
    const titleContent = title.map((word) => {
        const splitText = word.textContent.split("");
        return splitText.map((letter, index) => {
            return `<span style="--order:${index + 1}">${letter}</span>`;
        });
    });

    titleContent.map((array, index) => {
        document.querySelector(`.letters${index}`).innerHTML = array.map((el) => el).join("");
    });
};

export default movingLetters;
