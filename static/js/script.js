//make images double
function doubleImagesArr(arr)
{ 
    for(var i= arr.length-1;i>=0;i--)
    {
        arr.push(arr[i]);
    }
    return arr;
}


function displayCards(arr)
{
    var container =  document.getElementById("container");
    for (var i=0;i<arr.length;i++)
    {
        var newImgElement = document.createElement("img");
        newImgElement.src = "static/images/" +arr[i];
        newImgElement.id = i;
        newImgElement.className = "card";
        container.appendChild(newImgElement);
    }
}

function suffleCards(arr)
{
    for(var i = 0; i < arr.length; i++)
    {
        //random choose two images
        var idx1 = Math.floor(Math.random() * arr.length);
        var idx2 = Math.floor(Math.random() * arr.length);

        //swap them
        var tmp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = tmp;

    }
}


function hideACard(idx) {
    // get the image with the specified idx/id
    var specificCard = document.getElementById(idx);
    // set the image's source to the question mark
    specificCard.src = "static/images/questionmark.png";
}




function setAttemps(idx, attemps) {
    var newElement = document.getElementById(idx);
    newElement.innerHTML = "Attemps:" + attemps;
}
function setFound(idx, found) {
    var newElement = document.getElementById(idx);
    newElement.innerHTML = "Founds:" + found;
}
function revealCard(event) {
    var clickedImageId = event.target.id;

    var clickedImage = document.getElementById(clickedImageId);
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];

    // add the clicked image to our array
    cardsPicked.push(clickedImageId);

    // if 2 cards have been picked
    if (cardsPicked.length == 2) {
        // if the 2 selected images are the same
        numOfAttemps += 1;
        setAttemps("attemps", numOfAttemps);
        if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
            // resets the cards picked
            numOfFound++;
            setFound("found", numOfFound);
            cardsPicked = [];
            alert("You got it. Good job!");
            //document.write("You get it. Good job!");
            if (numOfFound === arrOfImages.length/2) {
                congrationMsg();
            }
        } else {
            // make a function that will flip the cards back over

            var hidePickedCards = function () {
                hideACard(cardsPicked[0]);    // remember this function from earlier?
                hideACard(cardsPicked[1]);
                cardsPicked = [];
            }
            window.setTimeout(hidePickedCards, 1000);
        }
    }
}

function congrationMsg()
{
    console.log("LOL");
    var congration = document.getElementById("congration");
    var newImgElement = document.createElement("img");
    newImgElement.src = "static/images/congrations.jpg";
    newImgElement.id = "congrationImg";
    newImgElement.alt = "Congration! You won!!!";
    congration.appendChild(newImgElement);
}



//sourse images array
var arrOfImages = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.png", "p8.jpg", "p9.png"];
doubleImagesArr(arrOfImages);
suffleCards(arrOfImages);
displayCards(arrOfImages);
//delay 3s,then hide all cards
setTimeout(() => {
    for (var i = 0; i < arrOfImages.length; i++) {
        // let's call on the hideACard function we just made
        hideACard(i);
    }
}, 3000);

numOfAttemps = 0; //global variable. keep track of the numbers of attemps
numOfFound = 0;  //same as above
setAttemps("attemps", numOfAttemps); //initialize the attemps
setFound("found", numOfFound); //initialize the founds

var cardsPicked = [];    // outside the function, we'll keep track of which cards have been picked

var cards = document.getElementsByClassName("card");    // grab all the cards
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}

