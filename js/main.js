document.addEventListener("DOMContentLoaded", () => {
    
    var modal = document.getElementById("statModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    let boardState = {
        '0': 1,
        '1': 1,
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1,
        '7': 1,
        '8': 1,
        '9': 1,
        '10': 1,
        '11': 1,
        '12': 1,
        '13': 1,
        '14': 1,
        '15': 1,
        '16': 1,
        '17': 1,
        '18': 1,
        '19': 1,
        '20': 1,
        '21': 1,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        '28': 1,
        '29': 1,
        '30': 1,
        '31': 1,
        '32': 1,
        '33': 1,
        '34': 1,
        '35': 1,
        '36': 1,
        '37': 1,
        '38': 1,
        '39': 1,
        '40': 1,
        '41': 1,
        '42': 1,
        '43': 1,
        '44': 1,
        '45': 1,
        '46': 1,
        '47': 1,
        '48': 1,
        '49': 1,
        '50': 1,
        '51': 1,
        '52': 1,
        '53': 1,
        '54': 1,
        '55': 1,
        '56': 1,
        '57': 1,
        '58': 1,
        '59': 1,
        '60': 1,
        '61': 1,
        '62': 1,
        '63': 1,
        '64': 1
    }

    let flippedCount = 0 
    let foundWords = 0
    let attemptedWords = 0
    let currentLetter = 1;
    let guessArr = [];

    createSquares();

    let wordList =     {'aqua': [4, 13, 22, 31],
     'octopus': [57, 50, 43, 36, 29, 22, 15],
     'oasis': [36, 37, 38, 39, 40],
     'rudder': [2, 10, 18, 26, 34, 42],
     'uprising': [8, 16, 24, 32, 40, 48, 56, 64]}
    let mainBoard = ['i', 'r', 'h', 'a', 'x', 'f', 'l', 'u', 't', 'u', 'o', 'i', 'q', 'z', 's', 'p', 's', 'd', 'f', 'y', 'a', 'u', 'r', 'r', 'y', 'd', 'w', 'u', 'p', 'z', 'a', 'i', 'k', 'e', 'a', 'o', 'a', 's', 'i', 's', 'c', 'r', 't', 'a', 'k', 'q', 'z', 'i', 'm', 'c', 'w', 'k', 'a', 'l', 'o', 'n', 'o', 'r', 'v', 'j', 'r', 'h', 'z', 'g']
    let backBoard = ['l', 'y', 'h', 'i', 'v', 'i', 'o', 'n', 'x', 'q', 'u', 'w', 'n', 'n', 'y', 'r', 'd', 'z', 'e', 'l', 'a', 'a', 'x', 'q', 'f', 'j', 'a', 'w', 'o', 'o', 'b', 'g', 'g', 'm', 'p', 'w', 'r', 'j', 't', 'l', 't', 'n', 'f', 'd', 'h', 'z', 'x', 't', 't', 'j', 'r', 't', 's', 'q', 'm', 's', 's', 'n', 'l', 'h', 'o', 'x', 'f', 'h']
    let flippedTiles = [29, 25, 14, 56, 52, 33, 16, 24, 12, 8, 37, 18]
    
    boardGen(mainBoard);
    initialFlips(flippedTiles);

    let dailyWords = Object.keys(wordList)

    fillWordList(dailyWords)

    const keys = document.querySelectorAll('.keyboard-row button')

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target} ) => {
            const letter = target.getAttribute("data-key")
            
            letterEntry(letter);
        };
    }

    function letterEntry(letter) {
        if (letter === "del") {
            if (currentLetter === 1) return
            currentSpace = document.getElementById("text" + String(currentLetter - 1))
            guessArr.pop()
            currentLetter -= 1
            currentSpace.textContent = ""
            return
        }

        if (letter === "enter") {
            attemptedWords += 1
            document.getElementById('wordsTried').textContent = 'Words Tried: ' + String(attemptedWords);
            wordFound = checkEntry(guessArr);
            if (wordFound == true) {
                // add to visible wordlist?
                // highlight & lock cells?
                wordCoord = wordList[guessArr.join('')]
                for (i = 1; i <= wordCoord.length; i++) {
                    square = document.getElementById(String(wordCoord[i-1]))
                    square.style.backgroundColor='rgb(83, 141, 78)';
                }
                for (t = 1; t <= 8; t++) {
                    document.getElementById('text' + t).textContent = ''
                }
                for (j = 1; j <= 5; j++) {
                    if (document.getElementById("word" + j).textContent === guessArr.join('')) {
                        document.getElementById("word" + j).style.textDecoration = "line-through";
                    }
                }
                currentLetter = 1
                guessArr = []
                foundWords += 1
                document.getElementById('wordsFound').textContent = 'Words Found: ' + String(foundWords);
                if (foundWords == 5) {
                    document.getElementById("modalHeader").textContent = "You Won!";
                    modal.style.display="block";
                }
            } else {
                for (t = 1; t <= 8; t++) {
                    document.getElementById('text' + t).textContent = ''
                }
                currentLetter = 1
                guessArr = []
            }
            return
        };

        if (guessArr.length < 8) {
            currentSpace = document.getElementById("text" + String(currentLetter))
            guessArr.push(letter)
            currentLetter +=1
            currentSpace.textContent = letter;
        }
    }

    function fillWordList(words) {
        for (i = 0; i < 5; i++) {
            document.getElementById("word" + String(i + 1)).textContent = words[i]
        }
    }

    function getCurrentBoard() {
        let currentBoard = []
        for (let i = 1; i <= 64; i++) {
            currentBox = document.getElementById(String(i))
            currentBoard.push(currentBox.textContent)
        }
        return currentBoard;
    }

    function checkEntry(word) {
        currentBoard = getCurrentBoard()
        let newArr = []
        try {
            wordCoord = wordList[word.join('')]
            for (i = 0; i < wordCoord.length; i++) {
                newArr.push(currentBoard[wordCoord[i] - 1])
            }
            return newArr.join('') === word.join('')
        } catch (error) {
            return 'err69'
        }
    } 

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 64; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index+1);
            gameBoard.appendChild(square);
        }
    }

    function boardGen(board) {
        for (i = 1; i <= 64; i++) {
            document.getElementById(String(i)).textContent = board[i-1]; 
        }
    }

    function initialFlips(flippedTiles) {
        for (i = 0; i <= flippedTiles.length-1; i++) {
            document.getElementById(String(flippedTiles[i])).textContent = backBoard[flippedTiles[i] -1];
            boardState[flippedTiles[i] -1] *= -1
        }
    }

    $(document).ready(function() {
        $('.square').click(function flipTile() {  
            let squareId = this.id
            let boardId = parseInt(squareId) - 1
            boardState[boardId] *= -1
            selSquare = document.getElementById(squareId);
            if (selSquare.style.backgroundColor==='rgb(83, 141, 78)') {
                return
            }
            if (boardState[boardId] < 0) selSquare.textContent = backBoard[boardId];
            if (boardState[boardId] > 0) selSquare.textContent = mainBoard[boardId];
            
            flippedCount += 1;
            document.getElementById('countFlips').textContent = 'Tiles Flipped: ' + String(flippedCount);

            selSquare.classList.add('animate__animated', 'animate__flipInY');

            selSquare.addEventListener('animationend', () => {
                selSquare.classList.remove("animate__flipInY");
            });    

        });
    });

});