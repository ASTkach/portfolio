import navigationManipulation from './modules/navigation-manipulation.js';
import movingLetters from './modules/moving-letters.js';
import ticTacToe from './modules/game.js';
import langSelection from './modules/lang-selection.js';

navigationManipulation();
movingLetters();
ticTacToe();
langSelection();

window.addEventListener('load', () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('_visibl');
});
