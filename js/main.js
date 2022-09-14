document.addEventListener("DOMContentLoaded", () => {
    
    var modalStat = document.getElementById("statModal");
    var modalHelp = document.getElementById("helpModal");
    var modalLegend = document.getElementById("word-container");
    var btnStat = document.getElementById("btnStat");
    var btnHelp = document.getElementById("btnHelp");
    var btnLegend = document.getElementById("btnLegend");
    var span = document.getElementsByClassName("close")[0];
    var span2 = document.getElementsByClassName("close")[1];

    btnStat.onclick = function() {
        modalStat.style.display = "block";
    }
    span.onclick = function() {
        modalStat.style.display = "none";
    }
    span2.onclick = function() {
        modalHelp.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalStat) {
            modalStat.style.display = "none";
        } else if (event.target == modalHelp) {
            modalHelp.style.display = "none";
        }
    }
    btnHelp.onclick = function() {
        modalHelp.style.display = "block";
    }
    btnLegend.onclick = function() {
        if (modalLegend.style.display == "none") {
            modalLegend.style.display = "block"
        } else {
            modalLegend.style.display = "none";
        }
    }

    function setStats(flipped, targetflips, attempts, words, games) {
            localStorage.setItem("flipped", flipped);
            localStorage.setItem("targetflips", targetflips);
            localStorage.setItem("attempts", attempts);
            localStorage.setItem("words", words);
            localStorage.setItem("games", games);
    }

    if (! localStorage.notFirstVisit) {
        modalHelp.style.display = "block";
        localStorage.notFirstVisit = true;
        localStorage.setItem("flipped", 0);
        localStorage.setItem("targetflips", 0);
        localStorage.setItem("attempts", 0);
        localStorage.setItem("words", 0);
        localStorage.setItem("games", 0);
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

    dateRotate = new Date();
    dateRotate = dateRotate.getDay();

    var fullList = [[{'sedans': [50, 43, 36, 29, 22, 15], 'ensued': [42, 35, 28, 21, 14, 7], 'method': [24, 31, 38, 45, 52, 59], 'thumbing': [1, 9, 17, 25, 33, 41, 49, 57], 'toxin': [51, 44, 37, 30, 23]}, ['t', 'a', 'i', 'b', 'p', 'p', 'd', 'z', 'h', 't', 'e', 'v', 'v', 'e', 's', 'u', 'u', 'i', 'a', 'd', 'u', 'n', 'n', 'm', 'm', 'e', 'g', 's', 'a', 'i', 'e', 'e', 'b', 'h', 'n', 'd', 'x', 't', 'i', 'i', 'i', 'e', 'e', 'o', 'h', 'f', 'z', 'j', 'n', 's', 't', 'o', 'y', 'z', 'i', 'q', 'g', 'h', 'd', 'c', 'j', 'u', 'i', 'n'], ['e', 'u', 'j', 'y', 'n', 'o', 'g', 'i', 'i', 'o', 'o', 'n', 'g', 'x', 'i', 'o', 'c', 'e', 't', 'p', 'a', 'a', 'l', 'a', 'q', 'i', 'o', 'r', 'm', 'o', 'i', 'i', 'h', 'q', 't', 'r', 'e', 'l', 'a', 'q', 't', 'g', 'i', 'a', 'i', 'v', 'v', 'y', 'e', 'c', 'w', 'u', 'r', 'o', 'e', 'j', 'l', 'z', 'u', 'o', 'c', 'z', 'e', 'o'], [50, 43, 36, 29, 22, 15, 42, 35, 28, 21, 14, 7, 24, 31, 38, 45, 52, 59, 1, 9, 17, 25, 33, 41]],
    [{'visible': [7, 6, 5, 4, 3, 2, 1], 'curl': [58, 51, 44, 37], 'flasks': [27, 28, 29, 30, 31, 32], 'shrouded': [16, 15, 14, 13, 12, 11, 10, 9], 'brothers': [24, 23, 22, 21, 20, 19, 18, 17]}, ['e', 'l', 'b', 'i', 's', 'i', 'v', 'e', 'd', 'e', 'd', 'u', 'o', 'r', 'h', 's', 's', 'r', 'e', 'h', 't', 'o', 'r', 'b', 'j', 'h', 'f', 'l', 'a', 's', 'k', 's', 'y', 'e', 'n', 'y', 'l', 't', 'v', 'a', 'a', 'n', 'o', 'r', 'z', 'h', 'r', 'g', 'i', 'b', 'u', 'd', 'e', 'e', 'z', 'x', 'z', 'c', 'u', 'i', 'a', 'o', 'w', 'd'], ['v', 'n', 'i', 'c', 'e', 'p', 'd', 'l', 'a', 'u', 'i', 'm', 'y', 't', 'u', 't', 'v', 'e', 'q', 'm', 'h', 'e', 'c', 'w', 'i', 'k', 'r', 'b', 'z', 'a', 'j', 'c', 'o', 'i', 'i', 'h', 'i', 'a', 'u', 'u', 'g', 'b', 'h', 'o', 'w', 'e', 'u', 'i', 't', 'w', 'q', 'w', 'h', 'j', 'g', 'l', 'i', 'h', 'x', 'u', 'j', 'u', 'f', 'w'], [7, 6, 5, 4, 3, 2, 1, 58, 51, 44, 37, 27, 28, 29, 30, 31, 32, 16, 15, 14, 13]],
    [{'pasta': [17, 25, 33, 41, 49], 'nugget': [54, 46, 38, 30, 22, 14], 'oiled': [13, 21, 29, 37, 45], 'expert': [15, 23, 31, 39, 47, 55], 'craft': [62, 53, 44, 35, 26]}, ['v', 'a', 'o', 'b', 'u', 'u', 'x', 'b', 'n', 'f', 'f', 'o', 'o', 't', 'e', 'p', 'p', 'a', 's', 'f', 'i', 'e', 'x', 'u', 'a', 't', 'o', 'd', 'l', 'g', 'p', 's', 's', 'v', 'f', 'a', 'e', 'g', 'e', 'f', 't', 'b', 'z', 'a', 'd', 'u', 'r', 'z', 'a', 'e', 's', 'y', 'r', 'n', 't', 'u', 'n', 'v', 'h', 'a', 'a', 'C', 'e', 'l'], ['a', 'c', 'i', 'r', 'x', 'b', 'e', 'j', 'u', 'r', 'u', 'e', 'x', 'x', 'a', 'u', 'o', 'g', 'i', 'x', 'u', 'k', 'b', 'd', 'u', 'o', 'w', 'g', 'a', 'i', 'b', 'n', 'v', 'y', 'y', 'i', 'w', 'a', 'p', 'u', 'a', 'o', 'o', 'i', 'n', 'b', 'j', 'd', 'u', 'i', 'e', 's', 'w', 'w', 'z', 'r', 'u', 'b', 'r', 'p', 'o', 'i', 'i', 'a'], [17, 25, 33, 41, 49, 54, 46, 38, 30, 22, 14, 13, 21, 29, 37, 45, 15, 23, 31, 39, 47, 55, 62, 53, 44]],
    [{'avenue': [16, 15, 14, 13, 12, 11], 'tester': [17, 26, 35, 44, 53, 62], 'wrong': [57, 58, 59, 60, 61], 'reckless': [25, 26, 27, 28, 29, 30, 31, 32], 'apex': [37, 46, 55, 64]}, ['y', 'a', 'r', 'e', 'y', 'u', 'j', 'w', 'g', 'v', 'e', 'u', 'n', 'e', 'v', 'a', 't', 'b', 'u', 'w', 'j', 'w', 'e', 'v', 'r', 'e', 'c', 'k', 'l', 'e', 's', 's', 'i', 'd', 's', 'e', 'a', 'm', 'f', 'e', 'w', 'o', 'v', 't', 'o', 'p', 'g', 'x', 'e', 'o', 'h', 'e', 'e', 'o', 'e', 'g', 'w', 'r', 'o', 'n', 'g', 'r', 'i', 'x'], ['z', 'j', 'j', 'w', 's', 'z', 'q', 'y', 'r', 'e', 'u', 'e', 'c', 'q', 'c', 'm', 'n', 'u', 'k', 'i', 'o', 'e', 'z', 'a', 'u', 'v', 's', 'j', 'a', 'o', 'p', 'u', 'a', 'u', 'c', 'w', 'b', 'q', 'a', 'h', 'a', 'd', 'i', 'e', 'u', 'e', 'i', 'o', 'v', 'c', 'n', 'p', 'i', 'x', 'u', 'a', 'v', 'a', 'g', 'e', 'k', 'f', 'd', 'h'], [16, 15, 14, 13, 12, 11, 17, 26, 35, 44, 53, 62, 57, 58, 59, 60, 61, 25, 27, 28, 29, 30, 31, 32, 37]],
    [{'pilots': [54, 45, 36, 27, 18, 9], 'validity': [63, 55, 47, 39, 31, 23, 15, 7], 'interact': [2, 10, 18, 26, 34, 42, 50, 58], 'riot': [64, 56, 48, 40], 'linens': [46, 38, 30, 22, 14, 6]}, ['j', 'i', 'c', 'r', 'u', 's', 'y', 'b', 's', 'n', 'o', 'g', 'o', 'n', 't', 'z', 't', 't', 't', 'u', 'z', 'e', 'i', 'g', 'z', 'e', 'o', 'l', 'i', 'n', 'd', 'u', 'o', 'r', 'f', 'l', 'w', 'i', 'i', 't', 'k', 'a', 'o', 'j', 'i', 'l', 'l', 'o', 'u', 'c', 'o', 'i', 'g', 'p', 'a', 'i', 'u', 't', 'o', 'k', 'l', 'd', 'v', 'r'], ['c', 'u', 'i', 'k', 'c', 'z', 's', 'p', 'a', 'f', 's', 'j', 'f', 'i', 'q', 'i', 'q', 'p', 'o', 'e', 'p', 'i', 'o', 'q', 'a', 'l', 'x', 'e', 'b', 'x', 'g', 'y', 'k', 'i', 'r', 'h', 'o', 'a', 'r', 'p', 'm', 'w', 'l', 'z', 'a', 'z', 'u', 'u', 'p', 'e', 'l', 'q', 'o', 'e', 'o', 'e', 'i', 's', 'w', 'r', 'j', 'k', 's', 'i'], [54, 45, 36, 27, 18, 9, 63, 55, 47, 39, 31, 23, 15, 7, 2, 10, 26, 34]],
    [{'emote': [26, 34, 42, 50, 58], 'nanny': [24, 23, 22, 21, 20], 'muckier': [8, 7, 6, 5, 4, 3, 2], 'sidecars': [64, 55, 46, 37, 28, 19, 10, 1], 'gremlin': [63, 54, 45, 36, 27, 18, 9]}, ['s', 'r', 'e', 'i', 'k', 'c', 'u', 'm', 'n', 'r', 'c', 'd', 'q', 'g', 'a', 'p', 'w', 'i', 'a', 'y', 'n', 'n', 'a', 'n', 'p', 'e', 'l', 'c', 'r', 's', 's', 'c', 'z', 'm', 's', 'm', 'e', 'e', 'x', 'y', 'g', 'o', 'w', 'v', 'e', 'd', 'i', 'b', 'a', 't', 'x', 'q', 'x', 'r', 'i', 'u', 'a', 'e', 'u', 'd', 'i', 'd', 'g', 's'], ['g', 'x', 'c', 'e', 'q', 'a', 'o', 'j', 'e', 'c', 'e', 'a', 'u', 'm', 'b', 's', 'u', 'v', 'g', 'd', 'c', 'o', 'i', 'g', 'a', 'c', 'm', 'q', 's', 'a', 'q', 'z', 'e', 'o', 'e', 'v', 'a', 'a', 'a', 'e', 't', 'k', 'b', 'u', 'u', 's', 'c', 'r', 'd', 'e', 't', 'y', 'k', 'w', 'd', 'w', 'u', 'u', 'c', 'i', 'm', 'h', 'o', 'i'], [26, 34, 42, 50, 58, 24, 23, 22, 21, 20, 8, 7, 6, 5, 4, 3, 2, 64, 55, 46, 37, 28, 19, 10, 1]],
    [{'bookmark': [64, 63, 62, 61, 60, 59, 58, 57], 'bouncing': [41, 42, 43, 44, 45, 46, 47, 48], 'hack': [11, 19, 27, 35], 'glaring': [4, 12, 20, 28, 36, 44, 52], 'troll': [5, 13, 21, 29, 37]}, ['i', 'e', 'k', 'g', 't', 'f', 't', 'd', 'q', 'q', 'h', 'l', 'r', 'k', 'y', 'n', 'a', 'e', 'a', 'a', 'o', 'c', 'e', 'e', 'e', 'a', 'c', 'r', 'l', 'f', 'r', 'w', 'j', 'a', 'k', 'i', 'l', 'u', 'u', 'q', 'b', 'o', 'u', 'n', 'c', 'i', 'n', 'g', 'u', 'u', 'w', 'g', 'h', 'e', 'l', 'c', 'k', 'r', 'a', 'm', 'k', 'o', 'o', 'b'], ['r', 'p', 'a', 'o', 'e', 'c', 'n', 'u', 'c', 't', 'u', 'e', 'h', 'g', 'i', 'a', 'k', 'c', 'w', 'h', 'w', 'a', 'k', 'o', 'i', 'c', 'l', 'o', 'b', 'a', 's', 'u', 'a', 'k', 'i', 'p', 'o', 'x', 'g', 'p', 's', 'm', 'z', 'x', 'g', 'o', 'y', 'o', 'm', 'j', 'q', 'a', 'i', 'j', 'x', 'r', 'd', 'a', 'm', 'l', 'e', 'k', 'u', 'i'], [64, 63, 62, 61, 60, 59, 58, 57, 41, 42, 43, 44, 45, 46, 47, 48, 11, 19, 27]]]

    let wordList = fullList[dateRotate][0]
    let mainBoard = fullList[dateRotate][1]
    let backBoard = fullList[dateRotate][2]
    let flippedTiles = fullList[dateRotate][3]
    
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
                    
                    let accuracy = flippedCount / flippedTiles.length
                    // save board state / game completion
                    setStats(flippedCount + localStorage.getItem("flipped"), flippedTiles.length + localStorage.getItem("targetflips"), attemptedWords + localStorage.getItem("attempts"), localStorage.getItem("words") + 5, localStorage.getItem("games") + 1)
                    
                    modalStat.style.display="block";
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
