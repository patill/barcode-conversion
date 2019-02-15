$(function(){
$("#card-stack").hide(); //hide initially frame

document.getElementById('post-button').addEventListener('click', function () {

$("#card-stack").empty();//remove old entries and get div empty for new list
var post = document.createElement('p');
var postText = document.getElementById('post-text').value;
var pisteet = /(AU|PA|PS|RA|PL|KÄ|PN|RE|PK|HU)/g;
var nega = /609[AUPSLKHR]/g

var postArray = postText.split('\n');
var i = 0;
var  l = postArray.length;
var filtered = []; //empty array
for (i = 0; i < l; i++) {
  if (!nega.test(postArray[i])) { //takes only those not having 609+letter
    filtered[filtered.length] = postArray[i].replace(pisteet, '609$&');//adding to the arry
  }
  else {
    filtered[filtered.length] = postArray[i]; //adds the "wrong" ones anyway
  }
};

post.textContent = filtered.toString();
post.innerHTML = post.innerHTML.replace(/,/g, '<br>\n').replace(/^ /g, "");  // <-- THIS FIXES THE LINE BREAKS
var card = document.createElement('div');
card.appendChild(post);
var cardStack = document.getElementById('card-stack');
cardStack.insertBefore(card, cardStack.firstChild);
$("#card-stack").show();

for (i = 0; i < l; i++) {
  var output = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  output.className.baseVal = "barcode";
  output.setAttribute('jsbarcode-value',  filtered[i].trim());
  output.setAttribute('jsbarcode-format', 'code39');

  var div_element = document.getElementById("wrapper");
  div_element.appendChild(output);
  var newline = document.createElement("br");
  div_element.appendChild(newline);
  JsBarcode(".barcode").init();
};

});
});
