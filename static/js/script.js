//sourse images array
var arrOfImages = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.png", "p8.jpg", "p9.png"];
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
doubleImagesArr(arrOfImages);
suffleCards(arrOfImages);
displayCards(arrOfImages);

function hideACard(idx) {
    // get the image with the specified idx/id
    var specificCard = document.getElementById(idx);
    // set the image's source to the question mark
    specificCard.src = "static/images/questionmark.png";
}

// call on the hideACard function for each card in our array of images
for (var i = 0; i < arrOfImages.length; i++) {
    // let's call on the hideACard function we just made
    hideACard(i);
}

function revealCard(event) {    // this time, the click event is going to be the input
    // the event actually contains the element (and all its attributes)
    // we'll use it to get the id of the element that was clicked
    var clickedImageId = event.target.id;

    // grab the element that was clicked on
    var clickedImage = document.getElementById(clickedImageId);
    // update the image's source to show a different picture
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];
}
var cards = document.getElementsByClassName("card");    // grab all the cards
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}

var cardsPicked = [];    // outside the function, we'll keep track of which cards have been picked
function revealCard(event) {
    var clickedImageId = event.target.id;

    var clickedImage = document.getElementById(clickedImageId);
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];

    // add the clicked image to our array
    cardsPicked.push(clickedImageId);

    // if 2 cards have been picked
    if (cardsPicked.length == 2) {
        // if the 2 selected images are the same
        if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
            // resets the cards picked
            cardsPicked = [];
            alert("You got it. Good job!");
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