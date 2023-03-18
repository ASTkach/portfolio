const ticTacToe = () => {
    const gameField = document.querySelector(".game__list");
    const gameSquares = Array.from(document.querySelectorAll(".game__item"));
    const gameSwitcher = document.querySelector(".game__switcher");

    let selectedSquares = new Array(9).fill(null);
    let currentPlayer;
    let firstComputerStep;
    let selectedSquare;
    let fieldBlock;
    let gameOver;
    let endGameTimeout;
    let humanFirst;
    let freeSquares = [];

    const removeClasses = () =>
        gameSquares.forEach((square) => {
            square.classList.remove("_cross");
            square.classList.remove("_zero");
            square.classList.remove("_red-color");
            square.classList.remove("_green-color");
        });

    const selectFreeSquares = () => {
        selectedSquares.map((square, index) => {
            if (square === null) {
                freeSquares.push(index);
            } else {
                return;
            }
        });
    };

    if (gameSwitcher.classList.contains("_computer")) {
        initialStep();
        gameField.addEventListener("click", humanStep);
    }

    gameSwitcher.addEventListener("click", () => {
        gameSwitcher.classList.toggle("_computer");
        gameSwitcher.classList.toggle("_player");

        gameOver = false;
        removeClasses();
        selectedSquares = new Array(9).fill(null);
        fieldBlock = false;

        endGameTimeout = clearTimeout(endGameTimeout);

        if (gameSwitcher.classList.contains("_computer")) {
            initialStep();
        } else {
            gameField.addEventListener("click", humanStep);
            humanFirst = true;
        }
    });

    function initialStep() {
        humanFirst = false;
        currentPlayer = "computer";
        firstComputerStep = Math.floor(Math.random() * selectedSquares.length);
        selectedSquare = document.getElementById(`${firstComputerStep}`);
        selectedSquares[firstComputerStep] = currentPlayer;
        selectedSquare.classList.add("_cross");
    }

    function humanStep({ target }) {
        const gameSquare = target.closest(".game__item");
        currentPlayer = "human";

        if (!gameOver && !fieldBlock && gameSquare && !target.classList.contains("_cross" || "_zero")) {
            gameSquare.classList.add("_zero");
            selectedSquares[gameSquare.id] = currentPlayer;
            fieldBlock = true;
            checkGameEnd();

            if (!gameOver) {
                computerStep();
            } else {
                return;
            }
        } else {
            return;
        }
    }

    function computerStep() {
        let nextSquarePosition;
        currentPlayer = "computer";

        if (humanFirst) {
            selectFreeSquares();
            nextSquarePosition = freeSquares[Math.floor(Math.random() * freeSquares.length)];
            nextStep();
            freeSquares = [];
            humanFirst = false;
            return;
        } else {
            nextSquarePosition = 0;
        }

        function nextStep() {
            selectedSquare = document.getElementById(`${nextSquarePosition}`);
            selectedSquares[nextSquarePosition] = currentPlayer;

            setTimeout(() => {
                fieldBlock = false;
                selectedSquare.classList.add("_cross");
            }, 600);

            checkGameEnd();
        }

        function twoSquaresCombination() {
            if (selectedSquares[0] !== null) {
                if (selectedSquares[0] === selectedSquares[1] && selectedSquares[2] === null) {
                    nextSquarePosition = 2;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === selectedSquares[2] && selectedSquares[1] === null) {
                    nextSquarePosition = 1;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === selectedSquares[3] && selectedSquares[6] === null) {
                    nextSquarePosition = 6;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === selectedSquares[4] && selectedSquares[8] === null) {
                    nextSquarePosition = 8;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === selectedSquares[6] && selectedSquares[3] === null) {
                    nextSquarePosition = 3;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[1] !== null) {
                if (selectedSquares[1] === selectedSquares[2] && selectedSquares[0] === null) {
                    nextStep();
                    return;
                } else if (selectedSquares[1] === selectedSquares[4] && selectedSquares[7] === null) {
                    nextSquarePosition = 7;
                    nextStep();
                    return;
                } else if (selectedSquares[1] === selectedSquares[7] && selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[2] !== null) {
                if (selectedSquares[2] === selectedSquares[4] && selectedSquares[6] === null) {
                    nextSquarePosition = 6;
                    nextStep();
                    return;
                } else if (selectedSquares[2] === selectedSquares[5] && selectedSquares[8] === null) {
                    nextSquarePosition = 8;
                    nextStep();
                    return;
                } else if (selectedSquares[2] === selectedSquares[8] && selectedSquares[5] === null) {
                    nextSquarePosition = 5;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[3] !== null) {
                if (selectedSquares[3] === selectedSquares[4] && selectedSquares[5] === null) {
                    nextSquarePosition = 5;
                    nextStep();
                    return;
                } else if (selectedSquares[3] === selectedSquares[5] && selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[3] === selectedSquares[6] && selectedSquares[0] === null) {
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[5] !== null) {
                if (selectedSquares[5] === selectedSquares[4] && selectedSquares[3] === null) {
                    nextSquarePosition = 3;
                    nextStep();
                    return;
                } else if (selectedSquares[5] === selectedSquares[8] && selectedSquares[2] === null) {
                    nextSquarePosition = 2;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[6] !== null) {
                if (selectedSquares[6] === selectedSquares[4] && selectedSquares[2] === null) {
                    nextSquarePosition = 2;
                    nextStep();
                    return;
                } else if (selectedSquares[6] === selectedSquares[7] && selectedSquares[8] === null) {
                    nextSquarePosition = 8;
                    nextStep();
                    return;
                } else if (selectedSquares[6] === selectedSquares[8] && selectedSquares[7] === null) {
                    nextSquarePosition = 7;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[7] !== null) {
                if (selectedSquares[7] === selectedSquares[4] && selectedSquares[1] === null) {
                    nextSquarePosition = 1;
                    nextStep();
                    return;
                } else if (selectedSquares[7] === selectedSquares[8] && selectedSquares[6] === null) {
                    nextSquarePosition = 6;
                    nextStep();
                    return;
                }
            }

            if (selectedSquares[8] !== null) {
                if (selectedSquares[8] === selectedSquares[4] && selectedSquares[0] === null) {
                    nextStep();
                    return;
                }
            }

            oneSquarCombination();
        }

        function oneSquarCombination() {
            if (firstComputerStep === 0 || selectedSquares[0] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[1] === null) {
                    nextSquarePosition = 1;
                    nextStep();
                    return;
                } else if (selectedSquares[3] === null) {
                    nextSquarePosition = 3;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 1 || selectedSquares[1] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === null) {
                    nextStep();
                    return;
                } else if (selectedSquares[2] === null) {
                    nextSquarePosition = 2;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 2 || selectedSquares[2] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[1] === null) {
                    nextSquarePosition = 1;
                    nextStep();
                    return;
                } else if (selectedSquares[5] === null) {
                    nextSquarePosition = 5;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 3 || selectedSquares[3] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[0] === null) {
                    nextStep();
                    return;
                } else if (selectedSquares[6] === null) {
                    nextSquarePosition = 6;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 4 || selectedSquares[4] === currentPlayer) {
                selectFreeSquares();
                nextSquarePosition = freeSquares[Math.floor(Math.random() * freeSquares.length)];
                nextStep();
                freeSquares = [];
                return;
            }

            if (firstComputerStep === 5 || selectedSquares[5] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[2] === null) {
                    nextSquarePosition = 2;
                    nextStep();
                    return;
                } else if (selectedSquares[8] === null) {
                    nextSquarePosition = 8;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 6 || selectedSquares[6] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[7] === null) {
                    nextSquarePosition = 7;
                    nextStep();
                    return;
                } else if (selectedSquares[3] === null) {
                    nextSquarePosition = 3;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 7 || selectedSquares[7] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[6] === null) {
                    nextSquarePosition = 6;
                    nextStep();
                    return;
                } else if (selectedSquares[8] === null) {
                    nextSquarePosition = 8;
                    nextStep();
                    return;
                }
            }

            if (firstComputerStep === 8 || selectedSquares[8] === currentPlayer) {
                if (selectedSquares[4] === null) {
                    nextSquarePosition = 4;
                    nextStep();
                    return;
                } else if (selectedSquares[7] === null) {
                    nextSquarePosition = 7;
                    nextStep();
                    return;
                } else if (selectedSquares[5] === null) {
                    nextSquarePosition = 5;
                    nextStep();
                    return;
                }
            }
        }

        twoSquaresCombination();
    }

    function checkGameEnd() {
        let winColor;

        const currentColor = () => {
            if (currentPlayer === "computer") {
                return (winColor = "_red-color");
            } else {
                return (winColor = "_green-color");
            }
        };

        const clearField = () => {
            gameOver = true;
            endGameTimeout = setTimeout(() => {
                gameOver = false;
                removeClasses();
                selectedSquares = new Array(9).fill(null);
                fieldBlock = false;
                if (gameSwitcher.classList.contains("_computer")) {
                    initialStep();
                } else {
                    humanFirst = true;
                    return;
                }
            }, 3500);
        };

        if (selectedSquares[0] === currentPlayer) {
            if (selectedSquares[1] === currentPlayer && selectedSquares[2] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("0").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("1").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("2").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[0] === currentPlayer) {
            if (selectedSquares[3] === currentPlayer && selectedSquares[6] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("0").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("3").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("6").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[0] === currentPlayer) {
            if (selectedSquares[4] === currentPlayer && selectedSquares[8] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("0").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("4").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("8").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[1] === currentPlayer) {
            if (selectedSquares[4] === currentPlayer && selectedSquares[7] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("1").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("4").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("7").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[2] === currentPlayer) {
            if (selectedSquares[4] === currentPlayer && selectedSquares[6] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("2").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("4").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("6").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[2] === currentPlayer) {
            if (selectedSquares[5] === currentPlayer && selectedSquares[8] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("2").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("5").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("8").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[3] === currentPlayer) {
            if (selectedSquares[4] === currentPlayer && selectedSquares[5] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("3").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("4").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("5").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares[6] === currentPlayer) {
            if (selectedSquares[7] === currentPlayer && selectedSquares[8] === currentPlayer) {
                currentColor();
                setTimeout(() => document.getElementById("6").classList.add(`${winColor}`), 700);
                setTimeout(() => document.getElementById("7").classList.add(`${winColor}`), 800);
                setTimeout(() => document.getElementById("8").classList.add(`${winColor}`), 900);
                clearField();
                return;
            }
        }

        if (selectedSquares.every((square) => square !== null)) {
            clearField();
            return;
        }
    }
};

export default ticTacToe;
