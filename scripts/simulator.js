class Simulator {
    strategy = {}; // Object of Objects with Plays. strategy[myHand][dealersHand] -> Play

    rows = ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
            "A-2", "A-3", "A-4", "A-5", "A-6", "A-7", "A-8", "A-9",
            "2-2", "3-3", "4-4", "5-5", "6-6", "7-7", "8-8", "9-9", "10-10", "A-A"];
    
    cols = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

    playsText = {}; // Text to display for each Play
    playsClass = {}; // CSS class to assign each Play

    game = null; // Game object

    constructor(strategyDiv, gui) {
        this.generateStrategyTable(strategyDiv);
        this.initStrategy();
        this.colorStrategyTable(strategyDiv);
        this.gui = gui;
        this.game = new Game();
        console.log(this.strategy);
    }

    start(numOfDecks, gui) {
        gui.inBet.value = 1;
        this.game.run(numOfDecks, gui, true);
        this.game.newRound();

        setInterval(this.makeMove.bind(this), 1);
        /*for (let i = 0; i < 1000000; i++) {
            this.makeMove();
        }*/
    }

    makeMove() {
        
        

        if (this.game.bettingEnabled) {
            //console.log("OVER! New round!");
            this.game.newRound();
            return;
        } else if (this.game.getPlayerHand() == null || this.game.getPlayerHand().possiblePlays.length == 0) {
            return;
        }

        //console.log( this.game.getPlayerHand().possiblePlays);
        
        let state = this.game.strategyValue;
        //console.log(state);
        let chosenPlay = this.strategy[state[0]][state[1]].value;
        //console.log("State is: ", state, "Chosen play based on strategy: ", chosenPlay);
        this.game.makePlay(chosenPlay, this.game.getPlayerHand());
    }

    generateStrategyTable(strategyDiv) {
        this.playsText[Play.HIT] = "H";
        this.playsText[Play.STAND] = "S";
        //this.playsText[Play.DOUBLE_DOWN] = "D";
        this.playsText[Play.SPLIT] = "P";
        this.playsText[Play.DOUBLE_DOWN_OR_HIT] = "Dh";
        this.playsText[Play.DOUBLE_DOWN_OR_STAND] = "Ds";

        this.playsClass[Play.HIT] = "bg-success";
        this.playsClass[Play.STAND] = "bg-danger";
        this.playsClass[Play.DOUBLE_DOWN] = "bg-warning";
        this.playsClass[Play.SPLIT] = "bg-info";
        this.playsClass[Play.DOUBLE_DOWN_OR_HIT] = "bg-warning";
        this.playsClass[Play.DOUBLE_DOWN_OR_STAND] = "bg-secondary";

        let tableDiv = strategyDiv
        let tableString = "";
        tableString += "<table id=\"strategyTable\"><thead><tr><th>YOU\\DEALER</th>";
        this.cols.forEach(function(colEl) {
            tableString += "<th>" + colEl + "</th>";
        });
        tableString += "<thead>";
        this.rows.forEach(function(rowEl) {
            tableString += "<tr><th>" + rowEl + "</th>";
            this.cols.forEach(function(colEl) {
                tableString += "<td><select id=\"" + rowEl + "_" + colEl + "\">";
                for (let key in Play) {
                    if (key == Play.DOUBLE_DOWN) continue;
                    tableString += "<option class=\"" + this.playsClass[key] + "\" value=\"" + key + "\">" + this.playsText[key] + "</option>";
                }
                tableString += "</select></td>";
            }.bind(this));
        }.bind(this));
        tableString += "</table>";
        tableDiv.innerHTML = tableString;
    }

    colorStrategyTable() {

        this.rows.forEach(function(rowEl) {
            this.cols.forEach(function(colEl) {
                let currentElement = "#" + rowEl + "_" + colEl;
                let selectedItem = $(currentElement + " :selected");
                console.log(currentElement);
                $(currentElement).css('backgroundColor', selectedItem.css('backgroundColor'));
                $(currentElement).change(function() {
                    let selectedItem = $(this).find("option:selected");
                    $(this).css('backgroundColor', selectedItem.css('backgroundColor'));
                });
            }.bind(this));
        }.bind(this));


        
    }

    initStrategy() {
        // Init strategy object
        this.rows.forEach(function(rowEl) {
            this.strategy[rowEl] = {};
            this.cols.forEach(function(colEl) {
                this.strategy[rowEl][colEl] = document.getElementById(rowEl + "_" + colEl);
            }.bind(this));
        }.bind(this));

        // Set baseline strategy - 17 stand, 2 decks, double after split allowed
        // Hard hands
        for (let i = 0; i < 5; i++) {
            this.strategy["9"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 0; i < 8; i++) {
            this.strategy["10"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 0; i < this.cols.length; i++) {
            this.strategy["11"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 2; i < 5; i++) {
            this.strategy["12"][this.cols[i]].value = Play.STAND;
        }
        for (let i = 0; i < 5; i++) {
            this.strategy["13"][this.cols[i]].value = Play.STAND;
            this.strategy["14"][this.cols[i]].value = Play.STAND;
            this.strategy["15"][this.cols[i]].value = Play.STAND;
            this.strategy["16"][this.cols[i]].value = Play.STAND;
        }
        for (let i = 0; i < this.cols.length; i++) {
            this.strategy["17"][this.cols[i]].value = Play.STAND;
            this.strategy["18"][this.cols[i]].value = Play.STAND;
            this.strategy["19"][this.cols[i]].value = Play.STAND;
            this.strategy["20"][this.cols[i]].value = Play.STAND;
        }
        // Soft hands
        for (let i = 3; i < 5; i++) {
            this.strategy["A-2"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
            this.strategy["A-3"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 2; i < 5; i++) {
            this.strategy["A-4"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
            this.strategy["A-5"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 1; i < 5; i++) {
            this.strategy["A-6"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 1; i < 5; i++) {
            this.strategy["A-7"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_STAND;
        }
        this.strategy["A-7"]["2"].value = Play.STAND;
        this.strategy["A-7"]["7"].value = Play.STAND;
        this.strategy["A-7"]["8"].value = Play.STAND;
        for (let i = 0; i < this.cols.length; i++) {
            this.strategy["A-8"][this.cols[i]].value = Play.STAND;
            this.strategy["A-9"][this.cols[i]].value = Play.STAND;
        }
        // Pairs
        for (let i = 0; i < 6; i++) {
            this.strategy["2-2"][this.cols[i]].value = Play.SPLIT;
            this.strategy["3-3"][this.cols[i]].value = Play.SPLIT;
        }
        for (let i = 3; i < 5; i++) {
            this.strategy["4-4"][this.cols[i]].value = Play.SPLIT;
        }
        for (let i = 0; i < 8; i++) {
            this.strategy["5-5"][this.cols[i]].value = Play.DOUBLE_DOWN_OR_HIT;
        }
        for (let i = 0; i < 6; i++) {
            this.strategy["6-6"][this.cols[i]].value = Play.SPLIT;
        }
        for (let i = 0; i < 7; i++) {
            this.strategy["7-7"][this.cols[i]].value = Play.SPLIT;
        }
        for (let i = 0; i < this.cols.length; i++) {
            this.strategy["8-8"][this.cols[i]].value = Play.SPLIT;
            this.strategy["9-9"][this.cols[i]].value = Play.SPLIT;
        }
        this.strategy["9-9"]["7"].value = Play.STAND;
        this.strategy["9-9"]["10"].value = Play.STAND;
        this.strategy["9-9"]["A"].value = Play.STAND;
        for (let i = 0; i < this.cols.length; i++) {
            //console.log(i);
            this.strategy["10-10"][this.cols[i]].value = Play.STAND;
            this.strategy["A-A"][this.cols[i]].value = Play.SPLIT;
        }

    }

    get strategy() {
        return this.strategy;
    }
}