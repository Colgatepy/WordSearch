document.addEventListener("DOMContentLoaded", () => {
    
    $(".modal-legend").draggable({
        containment: "#container"
    });

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

    stateDate = new Date().toLocaleString().split(',')[0]

    function setStats(flipped, targetflips, attempts, words, games) {
            localStorage.setItem("flipped", flipped);
            localStorage.setItem("targetflips", targetflips);
            localStorage.setItem("attempts", attempts);
            localStorage.setItem("words", words);
            localStorage.setItem("games", games);
    }

    var flippedCount = 0 
    var foundWords = 0
    var attemptedWords = 0
    let currentLetter = 1;
    let guessArr = [];

    createSquares();

    dateRotate = new Date().toLocaleString().split(',')[0];
    dateRotate = Math.floor((Date.parse(dateRotate) - 1663372800000) / 86400000);

    var fullList = [[{'dabbing': [50, 42, 34, 26, 18, 10, 2], 'kept': [39, 38, 37, 36], 'brides': [11, 12, 13, 14, 15, 16], 'mismatch': [1, 9, 17, 25, 33, 41, 49, 57], 'extort': [19, 27, 35, 43, 51, 59]}, ['m', 'g', 'q', 'j', 'n', 'c', 'j', 'd', 'i', 'n', 'b', 'r', 'i', 'd', 'e', 's', 's', 'i', 'e', 'o', 'g', 'i', 'a', 'x', 'm', 'b', 'x', 'r', 't', 'a', 'a', 'i', 'a', 'b', 't', 't', 'p', 'e', 'k', 'p', 't', 'a', 'o', 'r', 'a', 'i', 'i', 'e', 'c', 'd', 'r', 'd', 't', 'f', 'e', 'e', 'h', 'u', 't', 'a', 'e', 'c', 'b', 'j'], ['a', 'o', 'o', 'p', 'w', 'l', 'e', 'u', 'p', 'd', 'e', 'o', 'e', 't', 'g', 't', 'a', 't', 'r', 'u', 'n', 'b', 'b', 'e', 'e', 'l', 'o', 'a', 'z', 'h', 'e', 'p', 't', 'j', 'f', 'z', 'u', 'c', 'a', 'e', 's', 'q', 'i', 'h', 'b', 's', 'g', 'u', 's', 'i', 'm', 'g', 'h', 'q', 'x', 'd', 'p', 'q', 'w', 'b', 'w', 'o', 'k', 'o'], [50, 42, 34, 26, 18, 10, 2, 39, 38, 37, 36, 11, 12, 13, 14, 15, 16, 1, 9, 17, 25, 33, 41, 49, 57, 19, 27, 35, 43, 51, 59]], [{'hatchets': [40, 39, 38, 37, 36, 35, 34, 33], 'coincide': [8, 7, 6, 5, 4, 3, 2, 1], 'career': [59, 51, 43, 35, 27, 19], 'boar': [64, 63, 62, 61], 'peels': [12, 13, 14, 15, 16]}, ['e', 'd', 'i', 'c', 'n', 'i', 'o', 'c', 'i', 'w', 'x', 'p', 'e', 'e', 'l', 's', 'r', 'v', 'r', 'd', 'w', 'i', 'c', 'o', 'h', 'i', 'e', 'q', 'k', 'o', 'a', 'z', 's', 't', 'e', 'h', 'c', 't', 'a', 'h', 'e', 'i', 'r', 'i', 'u', 'u', 'z', 'u', 'y', 'l', 'a', 'z', 'j', 'u', 'e', 'o', 'k', 'f', 'c', 't', 'r', 'a', 'o', 'b'], ['k', 'l', 'j', 'k', 'g', 'o', 'y', 'h', 't', 'p', 'c', 'o', 'u', 'a', 'c', 'l', 'o', 'x', 'k', 'u', 'f', 'p', 'i', 'b', 'e', 'u', 'j', 's', 'e', 'a', 'e', 'u', 'l', 'c', 'd', 'j', 'u', 'u', 'o', 'n', 'x', 'd', 'a', 'r', 'o', 'n', 'u', 'n', 'i', 'p', 'o', 'k', 'o', 'k', 'x', 'j', 'd', 'm', 'i', 'i', 'a', 'x', 'g', 'j'], [40, 39, 38, 37, 36, 35, 34, 33, 8, 7, 6, 5, 4, 3, 2, 1, 59, 51, 43]], [{'severs': [23, 22, 21, 20, 19, 18], 'wasted': [59, 52, 45, 38, 31, 24], 'oxidized': [25, 26, 27, 28, 29, 30, 31, 32], 'frolic': [1, 2, 3, 4, 5, 6], 'leader': [54, 53, 52, 51, 50, 49]}, ['f', 'r', 'o', 'l', 'i', 'c', 'u', 'f', 'u', 'a', 'n', 'k', 'f', 'w', 'o', 'm', 'o', 's', 'r', 'e', 'v', 'e', 's', 'd', 'o', 'x', 'i', 'd', 'i', 'z', 'e', 'd', 'h', 'y', 'y', 's', 'e', 't', 'e', 'd', 'n', 'x', 'v', 'e', 's', 'y', 'i', 'd', 'r', 'e', 'd', 'a', 'e', 'l', 'l', 'p', 's', 'i', 'w', 'k', 'h', 'j', 'y', 'i'], ['l', 'h', 't', 'c', 'd', 'y', 'c', 'a', 'v', 'c', 'e', 'u', 'a', 'd', 's', 'r', 'z', 'i', 'l', 'i', 'r', 'i', 'z', 'u', 'c', 'e', 'g', 'f', 'o', 'u', 'u', 'j', 'o', 'z', 'r', 'e', 'g', 'h', 'x', 'j', 'u', 'h', 'a', 'a', 'x', 't', 'z', 't', 'o', 'h', 'y', 'w', 'i', 'x', 'h', 'h', 'q', 'r', 'r', 'u', 'v', 'f', 'f', 'g'], [23, 22, 21, 20, 19, 18, 59, 52, 45, 38, 31, 24, 25, 26, 27, 28, 29, 30, 32, 1, 2, 3, 4, 5, 6, 54, 53, 51, 50]], [{'striving': [9, 10, 11, 12, 13, 14, 15, 16], 'bathmat': [24, 23, 22, 21, 20, 19, 18], 'hush': [60, 61, 62, 63], 'flexibly': [1, 2, 3, 4, 5, 6, 7, 8], 'upshot': [27, 28, 29, 30, 31, 32]}, ['f', 'l', 'e', 'x', 'i', 'b', 'l', 'y', 's', 't', 'r', 'i', 'v', 'i', 'n', 'g', 's', 't', 'a', 'm', 'h', 't', 'a', 'b', 'f', 'a', 'u', 'p', 's', 'h', 'o', 't', 'f', 'a', 'p', 'g', 'e', 'l', 'c', 'r', 'o', 'e', 'y', 'd', 'u', 'u', 'u', 'l', 'u', 'e', 'i', 'a', 'a', 'd', 'p', 'i', 'x', 'i', 'p', 'h', 'u', 's', 'h', 'o'], ['d', 'f', 'k', 'r', 'u', 'i', 'm', 'u', 'y', 'c', 'u', 'n', 'o', 'r', 'i', 'a', 'u', 'f', 'e', 's', 'r', 'k', 'f', 'y', 'a', 'i', 'a', 'j', 'a', 'd', 'x', 'd', 'e', 'b', 'u', 'q', 'o', 'i', 'h', 'a', 'e', 'a', 'u', 'o', 'q', 'v', 'o', 'z', 'o', 'z', 'e', 'i', 's', 'f', 'e', 'k', 'f', 's', 'a', 's', 'b', 'o', 'r', 'r'], [9, 10, 11, 12, 13, 14, 15, 16, 24, 23, 22, 21, 20, 19, 18, 60, 61, 62, 63, 1, 2, 3]], [{'howl': [20, 27, 34, 41], 'monopoly': [7, 15, 23, 31, 39, 47, 55, 63], 'bathrobe': [64, 56, 48, 40, 32, 24, 16, 8], 'slather': [49, 41, 33, 25, 17, 9, 1], 'cask': [61, 60, 59, 58]}, ['r', 'g', 'u', 'u', 'h', 'c', 'm', 'e', 'e', 'e', 'e', 'n', 'y', 'u', 'o', 'b', 'h', 'q', 'e', 'h', 'a', 'j', 'n', 'o', 't', 'g', 'o', 'q', 'x', 'o', 'o', 'r', 'a', 'w', 'u', 'o', 'a', 'b', 'p', 'h', 'l', 'i', 'o', 'l', 'b', 'j', 'o', 't', 's', 'c', 'r', 'w', 'q', 'a', 'l', 'a', 'f', 'k', 's', 'a', 'c', 'a', 'y', 'b'], ['l', 'y', 'r', 'a', 'i', 'u', 'c', 'd', 'd', 'o', 't', 'o', 'q', 'h', 'v', 'r', 'e', 'h', 'a', 'x', 'e', 'c', 'l', 'i', 'q', 'o', 'b', 'p', 'd', 'z', 'm', 'g', 'e', 'v', 'j', 'q', 'e', 'c', 'u', 't', 'u', 'p', 't', 'o', 'o', 'e', 'e', 'm', 'a', 'o', 'e', 'e', 'r', 'i', 'a', 'e', 'y', 'v', 'j', 'o', 'm', 'c', 'r', 'a'], [20, 27, 34, 41, 7, 15, 23, 31, 39, 47, 55, 63, 64, 56, 48, 40, 32, 24, 16, 8, 49, 33, 25, 17, 9, 1, 61, 60, 59]], [{'spunk': [3, 11, 19, 27, 35], 'nest': [52, 44, 36, 28], 'gnomes': [51, 52, 53, 54, 55, 56], 'report': [7, 15, 23, 31, 39, 47], 'logged': [64, 63, 62, 61, 60, 59]}, ['y', 'o', 's', 'u', 'p', 'e', 'r', 'j', 'x', 'f', 'p', 'a', 'w', 'r', 'e', 'u', 'q', 'o', 'u', 'x', 'o', 'o', 'p', 'j', 'e', 'r', 'n', 't', 'a', 'i', 'o', 'm', 'u', 'x', 'k', 's', 'g', 'i', 'r', 'g', 'o', 'u', 's', 'e', 'j', 'r', 't', 'q', 'u', 'd', 'g', 'n', 'o', 'm', 'e', 's', 'i', 'y', 'd', 'e', 'g', 'g', 'o', 'l'], ['g', 'w', 'f', 'g', 'i', 'o', 'k', 'i', 'u', 'z', 'g', 'd', 't', 'e', 'w', 'y', 'k', 'f', 'l', 'u', 'u', 'a', 'm', 'd', 'd', 'i', 'u', 'r', 'w', 'r', 'z', 'a', 'j', 'z', 'a', 'p', 'v', 't', 'w', 'o', 'f', 'i', 'u', 'x', 'c', 'm', 'n', 'b', 'g', 'g', 'q', 'x', 'a', 'o', 'u', 'g', 'e', 'e', 'u', 'u', 'n', 'a', 'p', 's'], [3, 11, 19, 27, 35, 52, 44, 36, 28, 51, 53, 54, 55, 56, 7, 15, 23, 31, 39, 47, 64, 63, 62, 61, 60]], [{'seventh': [56, 55, 54, 53, 52, 51, 50], 'creaky': [48, 39, 30, 21, 12, 3], 'clasp': [8, 16, 24, 32, 40], 'universe': [1, 9, 17, 25, 33, 41, 49, 57], 'soda': [29, 20, 11, 2]}, ['u', 'a', 'y', 'o', 'q', 'f', 'd', 'c', 'n', 'v', 'd', 'k', 'p', 'f', 'e', 'l', 'i', 'n', 'i', 'o', 'a', 'i', 'u', 'a', 'v', 'a', 'd', 'i', 's', 'e', 'e', 's', 'e', 'm', 'n', 'c', 'b', 'a', 'r', 'p', 'r', 'o', 'e', 'i', 'a', 'i', 'o', 'c', 's', 'h', 't', 'n', 'e', 'v', 'e', 's', 'e', 'e', 'o', 't', 'c', 'w', 'e', 'e'], ['c', 'o', 'z', 's', 'g', 'u', 'z', 'a', 'l', 'i', 'l', 'j', 'e', 'u', 'a', 'h', 'e', 't', 'u', 'y', 'g', 's', 'z', 'z', 'f', 'd', 'a', 'x', 'u', 'c', 'a', 'v', 'a', 't', 'i', 'e', 'a', 'c', 'q', 'd', 'e', 'y', 'l', 's', 's', 'u', 'g', 'j', 'x', 'e', 'j', 'r', 'o', 'o', 'd', 'u', 'a', 'l', 'n', 'p', 'e', 't', 'l', 'v'], [56, 55, 54, 53, 52, 51, 50, 48, 39, 30, 21, 12, 3, 8, 16, 24, 32, 40, 1, 9]], [{'decanted': [64, 56, 48, 40, 32, 24, 16, 8], 'blazers': [7, 6, 5, 4, 3, 2, 1], 'conflict': [17, 18, 19, 20, 21, 22, 23, 24], 'lamp': [26, 35, 44, 53], 'lavish': [63, 62, 61, 60, 59, 58]}, ['s', 'r', 'e', 'z', 'a', 'l', 'b', 'd', 'e', 'i', 's', 'y', 'x', 'i', 'i', 'e', 'c', 'o', 'n', 'f', 'l', 'i', 'c', 't', 'a', 'l', 't', 'o', 'n', 'x', 'y', 'n', 'c', 'r', 'a', 'k', 'a', 'z', 'i', 'a', 'l', 'd', 'u', 'm', 'o', 'b', 't', 'c', 'e', 'e', 'o', 'a', 'p', 'h', 'a', 'e', 'w', 'h', 's', 'i', 'v', 'a', 'l', 'd'], ['l', 'p', 'l', 'o', 'y', 'i', 't', 'o', 'o', 'u', 'o', 'c', 'b', 'f', 'd', 'r', 'b', 'l', 'h', 'g', 'a', 'v', 'x', 'u', 'b', 'i', 'c', 'a', 'q', 'g', 'e', 'b', 'g', 'i', 'o', 'e', 'j', 'u', 'q', 'e', 'n', 'a', 'o', 'u', 'j', 'k', 'b', 'y', 'a', 'c', 'b', 't', 'e', 'b', 'u', 'n', 's', 'f', 'i', 'z', 'e', 's', 'u', 'r'], [64, 56, 48, 40, 32, 24, 16, 8, 7, 6, 5, 4, 3, 2, 1, 17, 18, 19, 20, 21]], [{'leopard': [24, 23, 22, 21, 20, 19, 18], 'shooter': [63, 55, 47, 39, 31, 23, 15], 'navy': [60, 59, 58, 57], 'hymn': [6, 5, 4, 3], 'resists': [15, 14, 13, 12, 11, 10, 9]}, ['f', 'r', 'n', 'm', 'y', 'h', 'a', 'i', 's', 't', 's', 'i', 's', 'e', 'r', 'o', 'u', 'd', 'r', 'a', 'p', 'o', 'e', 'l', 'b', 'j', 'b', 'n', 'e', 'e', 't', 'o', 'j', 'd', 'a', 'v', 'r', 'a', 'o', 'x', 'n', 'o', 'a', 'g', 'w', 'a', 'o', 'u', 'y', 'o', 'i', 'a', 'i', 'e', 'h', 'i', 'y', 'v', 'a', 'n', 'g', 'w', 's', 'x'], ['r', 'z', 'i', 'e', 'a', 'o', 'h', 's', 'k', 'o', 'p', 'a', 'i', 'c', 'z', 'd', 'o', 'k', 'm', 'k', 'e', 'l', 'i', 'u', 'z', 'h', 'h', 'j', 'q', 'o', 'j', 'e', 'k', 't', 'i', 'i', 'n', 'i', 'u', 'c', 'o', 'c', 'i', 'h', 'o', 'v', 'c', 'a', 'j', 'l', 'l', 'h', 'k', 'o', 'p', 'r', 'a', 't', 'h', 'r', 'z', 'j', 'z', 'r'], [24, 23, 22, 21, 20, 19, 18, 63, 55, 47, 39, 31, 15, 60, 59, 58, 57, 6, 5, 4, 3, 14, 13, 12, 11, 10, 9]], [{'worker': [42, 34, 26, 18, 10, 2], 'locust': [50, 51, 52, 53, 54, 55], 'skirt': [47, 38, 29, 20, 11], 'cups': [1, 9, 17, 25], 'habitual': [64, 56, 48, 40, 32, 24, 16, 8]}, ['c', 'r', 'o', 'k', 'o', 'k', 'e', 'l', 'u', 'e', 't', 'a', 'v', 'm', 'o', 'a', 'p', 'k', 'o', 'r', 'i', 'z', 'm', 'u', 's', 'r', 'u', 'u', 'i', 'a', 'o', 't', 'c', 'o', 'j', 'r', 'c', 'k', 'e', 'i', 'q', 'w', 'm', 'u', 'k', 'x', 's', 'b', 'f', 'l', 'o', 'c', 'u', 's', 't', 'a', 'a', 'o', 'f', 'y', 'n', 'h', 'i', 'h'], ['z', 'n', 'd', 'd', 'u', 'e', 'f', 'c', 'h', 'o', 'u', 'c', 'o', 'd', 'u', 's', 'e', 'm', 'h', 'y', 'h', 's', 'k', 'f', 'e', 'a', 'i', 'j', 'm', 'm', 'i', 'u', 'u', 'x', 'e', 'c', 'i', 'u', 'c', 'u', 'e', 'p', 'o', 'g', 'n', 'n', 'g', 'n', 'g', 'y', 'h', 'i', 'x', 'o', 'h', 'o', 'e', 'k', 'e', 'v', 'r', 'i', 'h', 'x'], [42, 34, 26, 18, 10, 2, 50, 51, 52, 53, 54, 55, 47, 38, 29, 20, 11, 1, 9, 17, 25, 64, 56, 48, 40]], [{'fortify': [58, 59, 60, 61, 62, 63, 64], 'parent': [43, 36, 29, 22, 15, 8], 'bachelor': [56, 55, 54, 53, 52, 51, 50, 49], 'broil': [1, 10, 19, 28, 37], 'soup': [47, 39, 31, 23]}, ['b', 'i', 'o', 'u', 'a', 'g', 'a', 't', 'i', 'r', 'u', 'p', 'n', 'a', 'n', 's', 'a', 'v', 'o', 't', 'w', 'e', 'p', 'v', 'a', 'u', 'v', 'i', 'r', 'n', 'u', 'e', 'e', 'v', 'o', 'a', 'l', 'o', 'o', 'u', 'u', 'x', 'p', 's', 'e', 'b', 's', 'k', 'r', 'o', 'l', 'e', 'h', 'c', 'a', 'b', 'h', 'f', 'o', 'r', 't', 'i', 'f', 'y'], ['e', 'a', 'i', 'g', 'd', 'e', 'c', 'i', 'a', 'd', 'b', 's', 'b', 'm', 'o', 'q', 'z', 'w', 'j', 'o', 'x', 'u', 'd', 'x', 'e', 'c', 'z', 'g', 'u', 'u', 'b', 'r', 'a', 'o', 'x', 'u', 'd', 'h', 'z', 'd', 'i', 'a', 'l', 'u', 'b', 'n', 'r', 'a', 'u', 'z', 'b', 't', 'i', 'q', 'k', 'i', 'v', 't', 'y', 'i', 'd', 'k', 'n', 'm'], [58, 59, 60, 61, 62, 63, 64, 43, 36, 29, 22, 15, 8, 56, 55, 54, 53, 52, 51, 50, 49, 1, 10]], [{'peroxide': [1, 2, 3, 4, 5, 6, 7, 8], 'mossy': [47, 38, 29, 20, 11], 'infamy': [57, 49, 41, 33, 25, 17], 'mutters': [63, 54, 45, 36, 27, 18, 9], 'jogs': [14, 21, 28, 35]}, ['p', 'e', 'r', 'o', 'x', 'i', 'd', 'e', 's', 't', 'y', 'a', 'a', 'j', 'k', 'j', 'y', 'r', 'c', 's', 'o', 'n', 'a', 'm', 'm', 't', 'e', 'g', 's', 'o', 'a', 'e', 'a', 'f', 's', 't', 'i', 'o', 'i', 'a', 'f', 'j', 'z', 'b', 't', 'w', 'm', 'e', 'n', 'd', 'e', 'a', 'u', 'u', 'k', 'u', 'i', 'u', 'o', 'o', 'g', 'c', 'm', 's'], ['b', 'o', 'n', 'y', 'i', 'l', 'i', 'o', 't', 'o', 'u', 'm', 'i', 'i', 'h', 'l', 'n', 't', 'k', 'e', 'p', 'd', 'x', 'v', 'l', 'i', 'u', 'd', 'p', 'r', 'u', 'a', 'b', 'u', 'u', 'f', 'l', 'n', 'n', 'q', 'a', 'z', 'o', 'z', 'u', 't', 's', 'i', 'a', 'k', 'l', 'e', 'o', 'v', 'b', 'a', 'c', 'w', 'm', 'f', 'a', 'r', 'w', 'q'], [1, 2, 3, 4, 5, 6, 7, 8, 47, 38, 29, 20, 11, 57, 49, 41, 33, 25, 17, 63, 54, 45, 36, 27, 18, 9, 14, 21]], [{'webs': [32, 24, 16, 8], 'saint': [5, 13, 21, 29, 37], 'castaway': [1, 9, 17, 25, 33, 41, 49, 57], 'imprint': [64, 63, 62, 61, 60, 59, 58], 'scallop': [50, 51, 52, 53, 54, 55, 56]}, ['c', 'u', 'a', 'r', 's', 'm', 'd', 's', 'a', 'b', 'v', 'a', 'a', 'a', 'd', 'b', 's', 'x', 'i', 'q', 'i', 'f', 's', 'e', 't', 'u', 'q', 'm', 'n', 'i', 'o', 'w', 'a', 'c', 'o', 't', 't', 'x', 'e', 'j', 'w', 'k', 'j', 'h', 'v', 'k', 'q', 'l', 'a', 's', 'c', 'a', 'l', 'l', 'o', 'p', 'y', 't', 'n', 'i', 'r', 'p', 'm', 'i'], ['w', 'n', 'e', 'o', 'k', 'e', 'u', 'a', 'v', 's', 'n', 'u', 'e', 'h', 'a', 'i', 't', 'u', 'n', 'u', 'k', 'y', 'o', 'b', 'a', 'c', 'h', 'q', 'k', 'h', 'b', 's', 'z', 'v', 'i', 'z', 'i', 'a', 'f', 'm', 'h', 'i', 'r', 'u', 'a', 'e', 's', 'v', 'e', 'z', 'o', 'q', 'g', 'r', 'b', 'e', 'i', 'y', 'o', 'e', 'a', 'i', 'g', 'd'], [32, 24, 16, 8, 5, 13, 21, 29, 37, 1, 9, 17, 25, 33, 41, 49, 57, 64, 63, 62, 61, 60, 59, 58, 50, 51, 52, 53]], [{'coldly': [3, 12, 21, 30, 39, 48], 'baddest': [32, 31, 30, 29, 28, 27, 26], 'rockets': [47, 46, 45, 44, 43, 42, 41], 'lard': [38, 37, 36, 35], 'jumbo': [8, 16, 24, 32, 40]}, ['y', 'n', 'c', 'y', 'i', 's', 'w', 'j', 'n', 't', 'g', 'o', 'u', 'v', 'a', 'u', 'r', 'c', 'f', 'i', 'l', 'a', 'i', 'm', 'i', 't', 's', 'e', 'd', 'd', 'a', 'b', 't', 'e', 'd', 'r', 'a', 'l', 'l', 'o', 's', 't', 'e', 'k', 'c', 'o', 'r', 'y', 'h', 'e', 'x', 'i', 'i', 'h', 'y', 'j', 'y', 'h', 'm', 'n', 'b', 'e', 'i', 'h'], ['b', 'j', 'l', 'a', 'd', 'f', 't', 'w', 'u', 'n', 'o', 'i', 'o', 'a', 'q', 'l', 'o', 'r', 'l', 'j', 'u', 'z', 'a', 'u', 'q', 'o', 'o', 'y', 'a', 'p', 'v', 'd', 'k', 'i', 'b', 'd', 'l', 't', 'e', 'k', 'p', 'w', 'o', 'y', 'd', 'r', 'o', 'v', 'j', 'c', 'o', 'u', 'e', 'd', 'h', 't', 'j', 's', 'j', 'k', 's', 'a', 'b', 'k'], [3, 12, 21, 30, 39, 48, 32, 31, 29, 28, 27, 26, 47, 46, 45, 44, 43, 42, 41, 38]], [{'tame': [61, 60, 59, 58], 'prism': [51, 44, 37, 30, 23], 'drudgery': [8, 15, 22, 29, 36, 43, 50, 57], 'corners': [49, 41, 33, 25, 17, 9, 1], 'outlook': [64, 56, 48, 40, 32, 24, 16]}, ['s', 'i', 'j', 'a', 'e', 'm', 'm', 'd', 'r', 't', 'o', 'i', 'e', 'a', 'r', 'k', 'e', 'a', 'a', 'w', 'o', 'u', 'm', 'o', 'n', 'i', 'o', 'b', 'd', 's', 'i', 'o', 'r', 'd', 'c', 'g', 'i', 't', 's', 'l', 'o', 'e', 'e', 'r', 'v', 'a', 'n', 't', 'c', 'r', 'p', 'g', 'r', 'u', 'k', 'u', 'y', 'e', 'm', 'a', 't', 'j', 'a', 'o'], ['e', 't', 'a', 'f', 'a', 'n', 'a', 'g', 'f', 'r', 's', 'y', 'n', 'd', 'e', 'u', 'i', 'u', 'b', 'o', 'x', 'i', 'e', 'j', 'o', 'a', 'n', 'f', 'n', 'f', 'u', 's', 'l', 'z', 'o', 'q', 'q', 'w', 'u', 'i', 'y', 'g', 'l', 'o', 'm', 'j', 'e', 'u', 'y', 'u', 'g', 'n', 'u', 'q', 'u', 'j', 'q', 'o', 'e', 'x', 'i', 'v', 's', 'n'], [61, 60, 59, 58, 51, 44, 37, 30, 23, 8, 15, 22, 29, 36, 43, 50, 57, 49, 41, 33, 25, 17, 9, 1, 64, 56]], [{'encore': [3, 4, 5, 6, 7, 8], 'manliest': [57, 49, 41, 33, 25, 17, 9, 1], 'junction': [60, 52, 44, 36, 28, 20, 12, 4], 'rotten': [31, 30, 29, 28, 27, 26], 'salutes': [16, 24, 32, 40, 48, 56, 64]}, ['t', 'u', 'e', 'n', 'c', 'o', 'r', 'e', 's', 'c', 'c', 'o', 'i', 'f', 'f', 's', 'e', 'r', 'x', 'i', 'q', 'e', 'v', 'a', 'i', 'n', 'e', 't', 't', 'o', 'r', 'l', 'l', 'a', 'o', 'c', 's', 'q', 'k', 'u', 'n', 'o', 'a', 'n', 's', 'u', 'o', 't', 'a', 'p', 'o', 'u', 'a', 'y', 'e', 'e', 'm', 'a', 'r', 'j', 'b', 'e', 'e', 's'], ['b', 's', 't', 'u', 'e', 't', 'o', 'i', 'l', 'l', 'e', 'd', 'u', 'y', 'w', 'i', 'x', 'e', 'm', 'l', 'x', 'i', 's', 'g', 'c', 'v', 'u', 'm', 'w', 'j', 'v', 'o', 'j', 'i', 'k', 't', 'e', 'i', 'n', 'e', 'z', 'u', 'e', 'a', 'l', 'o', 'i', 'b', 'i', 'g', 'i', 'g', 'u', 'u', 'a', 'f', 'o', 'o', 'v', 'p', 'i', 'k', 'z', 'h'], [3, 4, 5, 6, 7, 8, 57, 49, 41, 33, 25, 17, 9, 1, 60, 52, 44, 36, 28, 20]], [{'invaded': [49, 50, 51, 52, 53, 54, 55], 'golfed': [64, 56, 48, 40, 32, 24], 'hulking': [57, 58, 59, 60, 61, 62, 63], 'tensor': [5, 13, 21, 29, 37, 45], 'clients': [17, 18, 19, 20, 21, 22, 23]}, ['u', 'm', 'k', 'u', 't', 'r', 'p', 'a', 'u', 'd', 'y', 'h', 'e', 'u', 'g', 't', 'c', 'l', 'i', 'e', 'n', 't', 's', 'd', 'u', 'a', 'f', 'e', 's', 'u', 'v', 'e', 'i', 'i', 'f', 'u', 'o', 'c', 'l', 'f', 'a', 'q', 'i', 'i', 'r', 'l', 'z', 'l', 'i', 'n', 'v', 'a', 'd', 'e', 'd', 'o', 'h', 'u', 'l', 'k', 'i', 'n', 'g', 'g'], ['m', 'k', 'z', 'a', 'a', 'e', 'k', 'x', 'o', 'u', 'm', 'p', 'o', 'l', 'i', 'h', 'd', 't', 'q', 'u', 'u', 'z', 'a', 'a', 'e', 'k', 'a', 'h', 'o', 'l', 'c', 'd', 'z', 'e', 'b', 'v', 'z', 'i', 'm', 'z', 'j', 'g', 'j', 'e', 'u', 'x', 'a', 'v', 'd', 'c', 'o', 'y', 'i', 'c', 'f', 's', 'c', 't', 'i', 'f', 'a', 'e', 'q', 'e'], [49, 50, 51, 52, 53, 54, 55, 64, 56, 48, 40, 32, 24, 57, 58, 59]], [{'platoons': [16, 15, 14, 13, 12, 11, 10, 9], 'whacked': [1, 2, 3, 4, 5, 6, 7], 'visor': [25, 33, 41, 49, 57], 'curves': [64, 63, 62, 61, 60, 59], 'golf': [21, 22, 23, 24]}, ['w', 'h', 'a', 'c', 'k', 'e', 'd', 'q', 's', 'n', 'o', 'o', 't', 'a', 'l', 'p', 'o', 'l', 'w', 'i', 'g', 'o', 'l', 'f', 'v', 'j', 'h', 'w', 'j', 'q', 'g', 'i', 'i', 'm', 'g', 'v', 'g', 'g', 'r', 'w', 's', 't', 'j', 'x', 'n', 'a', 'v', 'e', 'o', 'b', 'a', 'u', 'l', 'e', 'e', 'v', 'r', 'n', 's', 'e', 'v', 'r', 'u', 'c'], ['i', 'g', 'd', 'a', 'a', 'l', 'n', 'd', 'e', 'e', 'v', 'f', 's', 'i', 'e', 'k', 'h', 'w', 'b', 'r', 'm', 'w', 'w', 'd', 'y', 'n', 'o', 'x', 'o', 'v', 't', 'g', 'j', 's', 'h', 'o', 's', 'e', 't', 'n', 'i', 'e', 'u', 'a', 'u', 'f', 'f', 'l', 'y', 'g', 'v', 't', 'y', 'm', 'i', 't', 'g', 't', 'e', 'b', 'j', 't', 'e', 'h'], [16, 15, 14, 13, 12, 11, 10, 9, 1, 2, 3, 4, 5, 6, 7, 25, 33, 41, 49, 57, 64, 63, 62, 61]], [{'grandson': [57, 50, 43, 36, 29, 22, 15, 8], 'cruising': [58, 50, 42, 34, 26, 18, 10, 2], 'earwigs': [16, 24, 32, 40, 48, 56, 64], 'sparse': [49, 41, 33, 25, 17, 9], 'sold': [51, 52, 53, 54]}, ['f', 'g', 'e', 'e', 'z', 'p', 'i', 'n', 'e', 'n', 'b', 't', 'o', 'f', 'o', 'e', 's', 'i', 'a', 'c', 'i', 's', 't', 'a', 'r', 's', 'u', 'v', 'd', 'o', 'u', 'r', 'a', 'i', 'j', 'n', 't', 'w', 'u', 'w', 'p', 'u', 'a', 'i', 'u', 'w', 'u', 'i', 's', 'r', 's', 'o', 'l', 'd', 'r', 'g', 'g', 'c', 'i', 'i', 'e', 'i', 'p', 's'], ['o', 'e', 'k', 'c', 'o', 'x', 'a', 'e', 'a', 'e', 'y', 'p', 'e', 'a', 'k', 't', 't', 'h', 'd', 'o', 'q', 'i', 'd', 'p', 'e', 'i', 'm', 'u', 'j', 'l', 'd', 'y', 'i', 'f', 'k', 'w', 'g', 's', 'o', 'y', 'i', 'i', 'o', 'f', 'e', 'l', 'r', 'n', 'o', 'i', 'd', 'p', 'd', 'o', 'l', 'r', 'c', 'o', 'a', 't', 'j', 'q', 'u', 'i'], [57, 50, 43, 36, 29, 22, 15, 8, 58, 42, 34, 26, 18, 10, 2, 16, 24, 32, 40, 48, 56, 64, 49, 41, 33, 25]], [{'occasion': [8, 16, 24, 32, 40, 48, 56, 64], 'mutants': [1, 2, 3, 4, 5, 6, 7], 'lobby': [38, 37, 36, 35, 34], 'career': [23, 31, 39, 47, 55, 63], 'plot': [30, 21, 12, 3]}, ['m', 'u', 't', 'a', 'n', 't', 's', 'o', 'i', 'e', 'b', 'o', 'w', 'i', 'a', 'c', 'a', 'i', 'k', 'o', 'l', 't', 'c', 'c', 'o', 'a', 'd', 'i', 'r', 'p', 'a', 'a', 'b', 'y', 'b', 'b', 'o', 'l', 'r', 's', 'o', 't', 'x', 'q', 'j', 'i', 'e', 'i', 'z', 'r', 'v', 'p', 'g', 'h', 'e', 'o', 'z', 'a', 'd', 'g', 'r', 'l', 'r', 'n'], ['i', 'f', 'i', 'z', 's', 'a', 'n', 'v', 'a', 'o', 'r', 'z', 'f', 'o', 'v', 'b', 'z', 'b', 'l', 'i', 'q', 'i', 't', 'l', 'v', 't', 'a', 'q', 'y', 's', 'p', 'e', 'y', 'o', 'k', 'q', 'f', 'e', 'i', 'v', 'e', 'c', 'd', 'h', 'n', 'r', 'k', 'g', 'b', 'o', 'w', 'o', 'c', 'u', 'i', 't', 'e', 't', 'v', 'f', 'q', 'b', 'q', 'k'], [8, 16, 24, 32, 40, 48, 56, 64, 1, 2, 3, 4, 5, 6, 7, 38, 37, 36, 35, 34]], [{'doorknob': [41, 42, 43, 44, 45, 46, 47, 48], 'opaque': [26, 27, 28, 29, 30, 31], 'recluse': [63, 62, 61, 60, 59, 58, 57], 'metal': [4, 12, 20, 28, 36], 'scrap': [54, 53, 52, 51, 50]}, ['y', 'o', 'x', 'm', 'a', 'm', 'u', 'u', 'b', 'k', 'e', 'e', 'e', 'i', 's', 'o', 't', 'y', 'u', 't', 'p', 'u', 'h', 'z', 'u', 'o', 'p', 'a', 'q', 'u', 'e', 'e', 'a', 'u', 'y', 'l', 'p', 'z', 'i', 'y', 'd', 'o', 'o', 'r', 'k', 'n', 'o', 'b', 'o', 'p', 'a', 'r', 'c', 's', 'w', 'p', 'e', 's', 'u', 'l', 'c', 'e', 'r', 'd'], ['o', 'm', 'e', 'i', 't', 'j', 'k', 'g', 'o', 'x', 'l', 'l', 'z', 'j', 'a', 'i', 'c', 'h', 'f', 'n', 'k', 'y', 'g', 'a', 'd', 'e', 'u', 'h', 'v', 'i', 'x', 't', 'y', 'j', 'e', 'q', 'a', 'a', 'j', 'a', 'i', 'a', 'r', 'a', 'g', 'k', 'n', 'j', 'i', 'n', 'i', 'a', 'f', 'o', 'm', 'b', 'u', 'e', 't', 'v', 'u', 'u', 'd', 'm'], [41, 42, 43, 44, 45, 46, 47, 48, 26, 27, 28, 29, 30, 31, 63, 62, 61, 60, 59]]];
    let wordList = fullList[dateRotate][0]
    let mainBoard = fullList[dateRotate][1]
    let backBoard = fullList[dateRotate][2]
    let flippedTiles = fullList[dateRotate][3]
    
    var dailyStats = {
        "flips": 0,
        "attempts": 0,
        "found": 0,
        "green": [],
        "words": [],
    }

    let dailyWords = Object.keys(wordList) 
    fillWordList(dailyWords);

    if (localStorage.stateDate == stateDate) { // load board state if returning on the same day (not reset to new puzzle)
        boardState = JSON.parse(localStorage.boardState)
        dailyStats = JSON.parse(localStorage.dailyStats) // ***add dailyStats to stat variables & add green to found word squares
        for (i = 0; i< 64; i++) {
            selSquare = document.getElementById(String(i+1));
            if (boardState[i] < 0) selSquare.textContent = backBoard[i];
            if (boardState[i] > 0) selSquare.textContent = mainBoard[i];
        }
        if (dailyStats.words.length > 0) {
            dailyStats.words.forEach((element) => { // strikethrough on previously found words
                for (j = 1; j <= 5; j++) {
                    if (document.getElementById("word" + j).textContent === element) {
                        document.getElementById("word" + j).style.textDecoration = "line-through";
                    }
                }
            })
        }
        if (dailyStats.green.length > 0) {
            dailyStats.green.forEach((element) => { // color squares of found words green
                square = document.getElementById(element);
                square.style.backgroundColor='rgb(83, 141, 78)';
            })
        }
        flippedCount = dailyStats.flips 
        foundWords = dailyStats.found
        attemptedWords = dailyStats.attempts
        document.getElementById('countFlips').textContent = 'Tiles Flipped: ' + String(flippedCount);
        document.getElementById('wordsFound').textContent = 'Words Found: ' + String(foundWords);
        document.getElementById('wordsTried').textContent = 'Words Tried: ' + String(attemptedWords);
        if (foundWords == 5) {
            document.getElementById("modalHeader").textContent = "You Won!";
            modalStat.style.display="block";
        }
    } else { // new board state if first visit of the day (saved date is different than current)
        var boardState = {
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
        localStorage.setItem("boardState", JSON.stringify(boardState))
        localStorage.setItem("stateDate", stateDate)
        boardGen(mainBoard);
        initialFlips(flippedTiles);
    }
    totalStats();

    if (! localStorage.notFirstVisit) { // add local storage on first visit
        modalHelp.style.display = "block"; // show help modal on first visit
        localStorage.notFirstVisit = true;
        localStorage.setItem("flipped", 0);
        localStorage.setItem("targetflips", 0);
        localStorage.setItem("attempts", 0);
        localStorage.setItem("words", 0);
        localStorage.setItem("games", 0);
        localStorage.setItem("stateDate", stateDate)
        localStorage.setItem("boardState", JSON.stringify(boardState))
        localStorage.setItem("dailyStats", JSON.stringify(dailyStats))
    }

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
            dailyStats.attempts += 1
            document.getElementById('wordsTried').textContent = 'Words Tried: ' + String(attemptedWords);
            wordFound = checkEntry(guessArr);
            if (wordFound == true) {
                wordCoord = wordList[guessArr.join('')]
                dailyStats.words.push(guessArr.join(''))
                for (i = 1; i <= wordCoord.length; i++) {
                    square = document.getElementById(String(wordCoord[i-1]))
                    dailyStats.green.push(String(wordCoord[i-1]));
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
                dailyStats.found += 1
                document.getElementById('wordsFound').textContent = 'Words Found: ' + String(foundWords);
                if (foundWords == 5) {
                    document.getElementById("modalHeader").textContent = "You Won!";
                    
                    setStats(flippedCount + parseInt(localStorage.flipped), parseInt(flippedTiles.length) + parseInt(localStorage.targetflips), attemptedWords + parseInt(localStorage.attempts), parseInt(localStorage.words) + 5, parseInt(localStorage.games) + 1)
                    localStorage.setItem("boardState", JSON.stringify(boardState))
                    modalStat.style.display="block";
                }
            } else {
                for (t = 1; t <= 8; t++) {
                    document.getElementById('text' + t).textContent = ''
                }
                currentLetter = 1
                guessArr = []
            }
            pushDaily();
            totalStats();
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
            return newArr.join('').toLowerCase() === word.join('').toLowerCase()
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

    function pushDaily() {
        localStorage.setItem("dailyStats", JSON.stringify(dailyStats));
    }

    function totalStats() {
        document.getElementById('totalGames').textContent = 'Games played: ' + String(parseInt(localStorage.games) * 1);
        document.getElementById('totalFlips').textContent = 'Flips: ' + String(localStorage.flipped) + ' out of ' + String(localStorage.targetflips) + ' necessary flips';
        document.getElementById('totalAttempts').textContent = 'Word attempts: ' + String(localStorage.attempts);
        document.getElementById('totalFound').textContent = 'Words found: ' + String(parseInt(localStorage.words) * 1) + ' out of ' + String(parseInt(localStorage.games) * 5);
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

            if (foundWords < 5) {
                flippedCount += 1;
                dailyStats.flips += 1;
                document.getElementById('countFlips').textContent = 'Tiles Flipped: ' + String(flippedCount);
                localStorage.setItem("boardState", JSON.stringify(boardState))
            }

            pushDaily();
            totalStats();
            selSquare.classList.add('animate__animated', 'animate__flipInY');

            selSquare.addEventListener('animationend', () => {
                selSquare.classList.remove("animate__flipInY");
            });    

        });
    });

});
