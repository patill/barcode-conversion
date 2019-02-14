$(function(){
$("#card-stack").hide(); //hide initially frame

document.getElementById('post-button').addEventListener('click', function () {

$("#card-stack").empty();//remove old entries and get div empty for new list
var post = document.createElement('p');
var postText = document.getElementById('post-text').value;
var pisteet = /(AU|PA|PS|RA|PL|KÄ|PN|RE|PK)/g;
var nega = /609[AUPSLKR]/g
var onKunta = postText;
//post.textContent = postText;


var postArray = postText.split('\n');
var i = 0;
var  l = postArray.length;
var filtered = []; //empty array
for (i = 0; i < l; i++) {
  if (!nega.test(postArray[i])) { //takes only those not having 609+letter
    filtered[filtered.length] = postArray[i].replace(pisteet, '609$&');//adding to the arry
  //  filtered = filtered.push(postArray[i]);
  }
  else {
    filtered[filtered.length] = postArray[i]; //adds the "wrong" ones anyway
  }
}

post.textContent = filtered.toString();
post.innerHTML = post.innerHTML.replace(/,/g, '<br>\n').replace(/^ /g, "");  // <-- THIS FIXES THE LINE BREAKS
var card = document.createElement('div');
card.appendChild(post);
var cardStack = document.getElementById('card-stack');
cardStack.insertBefore(card, cardStack.firstChild);
$("#card-stack").show();
});
});
