window.onload = function() {
    simulator = new Simulator(document.getElementById("strategyMaker"), initGui());
}

var game = null;
var simulator = null;

function initGui() {
    var gui = {}
    gui.bHit = document.getElementById("bHit");
    gui.bStand = document.getElementById("bStand");
    gui.bDoubleDown = document.getElementById("bDoubleDown");
    gui.bSplit = document.getElementById("bSplit");
    gui.tbPlayerStatus = document.getElementById("tbPlayerStatus");
    gui.tbDealerStatus = document.getElementById("tbDealerStatus");
    gui.imgDealerFaceDownCard = document.getElementById("imgDealerFaceDownCard")
    gui.divDealerHand = document.getElementById("divDealerHand");
    gui.divPlayerHands = document.getElementById("divPlayerHands");
    gui.divPlayerHandArray = [null, null, null, null, null, null, null, null]
    gui.divPlayerHandArray[0] = document.getElementById("divPlayerHand0");
    gui.statWins = document.getElementById("statWins");
    gui.statLosses = document.getElementById("statLosses");
    gui.statPushes = document.getElementById("statPushes");
    gui.statDoubleDowns = document.getElementById("statDoubleDowns");
    gui.statSplits = document.getElementById("statSplits");
    gui.statGamesPlayed = document.getElementById("statGamesPlayed");
    gui.statChips = document.getElementById("statChips");
    gui.inBet = document.getElementById("inBet");
    gui.bBet = document.getElementById("bBet");
    gui.btnToggleRuleset = document.getElementById("btnToggleRuleset");
    return gui;
}


function start() {

    var gui = initGui();

    if (game != null) {
        game.clear();
    }   
    
    var numOfDecks = document.getElementById("inNumberOfDecks").value;
    console.log(numOfDecks);

    if (numOfDecks >= 1 && numOfDecks <= 8) {
        gui.btnToggleRuleset.click();
        game = new Game();
        game.run(numOfDecks, gui);
    } else {
        alert("Number of decks must be between 1 and 8.");
    }

}

function startSimulator() {
 
    
    var numOfDecks = document.getElementById("inNumberOfDecks").value;
    console.log(numOfDecks);

    if (numOfDecks >= 1 && numOfDecks <= 8) {
        var gui = initGui();
        gui.btnToggleRuleset.click();
        simulator.start(numOfDecks, gui);
    } else {
        alert("Number of decks must be between 1 and 8.");
    }
}

function newRound() {
    if (game != null) {
        game.newRound();
    }
}


function hit() {
    game.makePlay(Play.HIT, game.getPlayerHand());
    //checkTable();
}
function stand() {
    game.makePlay(Play.STAND, game.getPlayerHand());
    //checkTable();
}
function doubleDown() {
    game.makePlay(Play.DOUBLE_DOWN, game.getPlayerHand());
    //checkTable();
}
function split() {
    game.makePlay(Play.SPLIT, game.getPlayerHand());
    //checkTable();
}

