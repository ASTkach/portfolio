import navigationManipulation from "./modules/navigation-manipulation.js";
import movingLetters from "./modules/moving-letters.js";
import ticTacToe from "./modules/game.js";
import sendForm from "./modules/send_form.js";

navigationManipulation();
movingLetters();
ticTacToe();
sendForm();

const title = document.querySelector(".section__container");
const letter = document.querySelector(".letters1");

console.log(title.clientWidth);
console.log(title.clientHeight);
console.log(title.offsetLeft);
console.log(letter.offsetLeft);
console.log(letter.offsetParent);
