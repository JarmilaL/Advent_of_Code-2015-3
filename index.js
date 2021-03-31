

const initialize = event => {
    const textarea = document.querySelector('textarea');
    const inputText = textarea.value;
    textarea.value = '';

    if (event.target.id === "Santa") {
        trackSantaAlone(inputText);
    } else {
        trackRoboSantaAndSanta(inputText);
    }
};

const trackSantaAlone= inputText => {
    let instructionsForSanta = checkInput(inputText);
    let visitedHouses = coordinateMoves(instructionsForSanta);

    renderResult(visitedHouses.length);
};

const trackRoboSantaAndSanta = inputText => {
    let instructions = checkInput(inputText);
    let santasInstructions = '';
    let robosInstructions = '';


    for (let i = 0; i < instructions.length; i++) {
        if (i % 2 === 0) {
            santasInstructions += instructions[i];
        } else {
            robosInstructions += instructions[i];
        }
    }

    let visitedHousesSanta = coordinateMoves(santasInstructions);
    let visitedHousesRobo = coordinateMoves(robosInstructions);
    let allVisitedHouses = visitedHousesSanta;

    for (const address of visitedHousesRobo) {
        allVisitedHouses = updateAddressList(allVisitedHouses, address);
    }

    renderResult(allVisitedHouses.length);
};

const checkInput = inputText => {
    let validInstructions = '';
    for (const i of inputText) {
        if (i === '<' || i === '>' || i === '^' || i === 'v') {
            validInstructions += i;
        }
    }
    return validInstructions;
};

const coordinateMoves = textInstructions => {
    let listOfAddresses = [{x: 0, y: 0}];
    let lastAddress = {x: 0, y: 0};

    for (const direction of textInstructions) {
        let newAddress;
        switch (direction) {
            case '>': newAddress = moveRight(lastAddress);
                break;
            case '<': newAddress = moveLeft(lastAddress);
                break;
            case '^': newAddress = moveUp(lastAddress);
                break;
            case 'v': newAddress = moveDown(lastAddress);
                break;
        }

        lastAddress = newAddress;
        listOfAddresses = updateAddressList(listOfAddresses, newAddress);
    }
    return listOfAddresses;

};

const moveUp = (lastAddress) => {
    return {x: lastAddress.x, y: lastAddress.y + 1};
};

const moveDown = (lastAddress) => {
    return {x: lastAddress.x, y: lastAddress.y - 1};
};

const moveRight = (lastAddress) => {
    return {x: lastAddress.x + 1, y: lastAddress.y};
};


const moveLeft = (lastAddress) => {
    return {x: lastAddress.x - 1, y: lastAddress.y};
};


const updateAddressList = (listOfAddresses, newAddress) => {

    for (let address of listOfAddresses) {
        if (address.x === newAddress.x && address.y === newAddress.y) {
            return listOfAddresses;
        }
    }

    listOfAddresses.push(newAddress);
    return listOfAddresses;
};

const renderResult = result => {
    let output = document.querySelector('.result span');
    output.innerText = result;
    let outputDiv = document.querySelector('.result');
    outputDiv.style.visibility = 'visible';
};


document.querySelector('#Santa').addEventListener('click', initialize);
document.querySelector('#Robo-Santa').addEventListener('click', initialize);