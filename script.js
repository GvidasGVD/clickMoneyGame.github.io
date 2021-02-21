var difficultyLevel = 94,
    timer,
    playingGame = false,
    frequencyOfTaxes = 0,
    taxComponent = 1500,
    positionHL;

const UI = {
    cashButton: document.querySelector('.cashButton'),
    kioskButton: document.querySelector('.kiosk img'),
    kioskCountElement: document.querySelector('.kiosksOwned'),
    shopButton: document.querySelector('.shop img'),
    shopCountElement: document.querySelector('.shopsOwned'),
    bankButton: document.querySelector('.bank img'),
    bankCountElement: document.querySelector('.banksOwned'),
    profitEverySecondCountElement: document.querySelector('.everySecondProfit'),
    profitFromBeginningCountElement: document.querySelector('.fromBeginningProfit'),
};

const gameData = {
    cash: 0,
    kiosks: 0,
    shops: 0,
    banks: 0,
    profitEverySecond: 0,
    profitFromBeginning: 0,
    drawData: function () {
        UI.cashButton.innerHTML = '$' + this.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        UI.kioskCountElement.innerHTML = this.kiosks;
        UI.shopCountElement.innerHTML = this.shops;
        UI.bankCountElement.innerHTML = this.banks;
        UI.profitEverySecondCountElement.innerHTML = '$' + this.profitEverySecond.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        UI.profitFromBeginningCountElement.innerHTML = '$' + this.profitFromBeginning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

UI.cashButton.addEventListener('click', () => {
    gameData.cash += 10;
    gameData.drawData();
    gameData.profitFromBeginning += 10;
    colorPurchaseThatCanBuy();
});

UI.kioskButton.addEventListener('click', () => {
    if (gameData.cash >= 100) {
        gameData.kiosks++;
        gameData.cash -= 100;
        gameData.profitEverySecond += 11;
        gameData.drawData();
    }
});

UI.shopButton.addEventListener('click', () => {
    if (gameData.cash >= 200) {
        gameData.shops++;
        gameData.cash -= 200;
        gameData.profitEverySecond += 22;
        gameData.drawData();
    }
});

UI.bankButton.addEventListener('click', () => {
    if (gameData.cash >= 5000) {
        gameData.banks++;
        gameData.cash -= 5000;
        gameData.profitEverySecond += 550;
        gameData.drawData();
    }
});

function startTheGame() {
    document.getElementById('gameStartContainer').style.display = 'none';
    document.getElementById('gamesField').style.display = 'block';
    var radioValue = $("input[name='level']:checked").val();
    playingGame = true;
    if (radioValue) {
        difficultyLevel = 100 - radioValue * 6;
        mainTimeFunction();
    }
}

function checkCash() {
    if (gameData.cash >= 350000000000) {
        alert('CONGRATULATIONS YOU WON THE GAME!!!!!!!!');
        endTheGame();
    } else if (gameData.cash >= 10000) {
        UI.cashButton.style.width = '46%';
    } else if (gameData.cash >= 1000) {
        UI.cashButton.style.width = '45%';
    }
    else {
        UI.cashButton.style.width = '40%';
    }
}

function mainTimeFunction() {
    checkIfGameLost();
    
    if (playingGame) {
        timer = setInterval(function () {
            checkCash();
            gameData.cash += gameData.kiosks * 11 + gameData.shops * 22 + gameData.banks * 550;
            gameData.profitFromBeginning += gameData.kiosks * 11 + gameData.shops * 22 + gameData.banks * 550;
            gameData.drawData();
            taxes();
            horizontalWealthLine();
            colorPurchaseThatCanBuy();
        }, 1000);
    }
}

function taxes() {
    frequencyOfTaxes += 1;
    var randomNumber = (Math.random() * 100).toFixed(0);//Between 0 to 100;
    if (randomNumber >= difficultyLevel && frequencyOfTaxes % 3 == 0) {
        clearInterval(timer);
        taxComponent += 30 * frequencyOfTaxes
        gameData.cash -= taxComponent;
        document.getElementById('taxComponent').innerHTML = '$-' + taxComponent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.querySelector('.dialogBg').style.display = 'flex';
    }
    gameData.drawData();
}

function endTheGame() {
    clearInterval(timer);
    document.querySelector('.endGameCover').style.display = 'flex';
    document.getElementById('kiosksOwnedFinal').innerHTML = gameData.kiosks;
    document.getElementById('shopsOwnedFinal').innerHTML = gameData.shops;
    document.getElementById('banksOwnedFinal').innerHTML = gameData.banks;
}

function procedeTheGame() {
    document.querySelector('.dialogBg').style.display = 'none';
    mainTimeFunction();
    playingGame = true;
}

function checkIfGameLost() {
    if (gameData.cash <= -5000) {
        clearInterval(timer);
        document.querySelector('.lostGameCover').style.display = 'flex';
        document.getElementById('kiosksOwnedFinal').innerHTML = gameData.kiosks;
        document.getElementById('shopsOwnedFinal').innerHTML = gameData.shops;
        document.getElementById('banksOwnedFinal').innerHTML = gameData.banks;
        playingGame = false;
    }
}

function horizontalWealthLine() {
    if (gameData.cash >= 10 ** 10) {
        positionHL = gameData.cash * (-75 / 10 ** 12) + 25;
    } else if (gameData.cash >= 10 ** 8) {
        positionHL = gameData.cash * (-75 / 10 ** 11) + 43;
    } else if (gameData.cash >= 10 ** 6) {
        positionHL = gameData.cash * (-75 / 10 ** 9) + 54;
    } else if (gameData.cash <= 0) {
        positionHL = gameData.cash * (-31 / 5000) + 71;
    } else {
        positionHL = gameData.cash * (-75 / 10 ** 7) + 71;
    }
    var linesPosition = positionHL + '%';
    document.getElementById('horizontalLine').style.top = linesPosition;
}

function colorPurchaseThatCanBuy(){
    chechIfCanBuyKiosk();
    chechIfCanBuyShop();
    chechIfCanBuyBank();
}

function chechIfCanBuyKiosk(){
    if (gameData.cash >= 100) {
        document.querySelector('.kiosk > .purchase').style.color = '#62ff60'
        document.querySelector('.kiosk > .price').style.color = 'white'
    } else {
        document.querySelector('.kiosk > .purchase').style.color = 'grey'
        document.querySelector('.kiosk > .price').style.color = 'grey'
    }
}

function chechIfCanBuyShop(){
    if (gameData.cash >= 200) {
        document.querySelector('.shop > .purchase').style.color = '#62ff60'
        document.querySelector('.shop > .price').style.color = 'white'
    } else {
        document.querySelector('.shop > .purchase').style.color = 'grey'
        document.querySelector('.shop > .price').style.color = 'grey'
    }
}

function chechIfCanBuyBank(){
    if (gameData.cash >= 5000) {
        document.querySelector('.bank > .purchase').style.color = '#62ff60'
        document.querySelector('.bank > .price').style.color = 'white'

    } else {
        document.querySelector('.bank > .purchase').style.color = 'grey'
        document.querySelector('.bank > .price').style.color = 'grey'
    }
}