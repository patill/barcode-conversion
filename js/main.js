$(function(){
document.getElementById('post-button').addEventListener('click', function () {
var post = document.createElement('p');
var postText = document.getElementById('post-text').value;
var pisteet = /(AU|PA|PS|RA|PL|KÄ|PN|RE|PK)/g;
var nega = /((609)(AU|PA|PS|RA|PL|KÄ|PN|RE|PK))/g
var onKunta = postText;
//post.textContent = postText;


var postArray = postText.split('\n');
var i = 0;
var  l = postArray.length;
var filtered = []; //empty array
for (i = 0; i < l; i++) {
  //if (!postArray[i].search(nega) == undefined) { //does not return true/false
    filtered[filtered.length] = postArray[i].replace(pisteet, '609$&');//adding to the arry
  //  filtered = filtered.push(postArray[i]);
//  }
}

post.textContent = filtered.toString();
post.innerHTML = post.innerHTML.replace(/,/g, '<br>\n').replace(/^ /g, "");  // <-- THIS FIXES THE LINE BREAKS
var card = document.createElement('div');
card.appendChild(post);
var cardStack = document.getElementById('card-stack');
cardStack.insertBefore(card, cardStack.firstChild);

});
});
