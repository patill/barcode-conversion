


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
// to print barcodes
//var pics = document.createElement('svg');
//for (i = 0; i < l; i++) {
//document.append('<svg id="barcodes' + i + '">' + '</svg>' + '<br>' );
//}

var counter = [];
for  (i = 0; i < l; i++) {
  counter[counter.length] = "barcodes" + i ;
};
//console.log(counter[0]);

for (i = 0; i < l -1; i++) {
  var output = document.createElement("svg");
  output.setAttribute('id', 'barcode');
  output.setAttribute('jsbarcode-value',  filtered[i].trim());
  output.setAttribute('jsbarcode-format', 'code39');

  var div_element = document.getElementById("wrapper");
  div_element.appendChild(output);
  // document.body.appendChild(output);
};



//console.log(filtered);

JsBarcode("#kuva", '12345', {
      format: "code39"
    });

JsBarcode('#barcodes', filtered[0])
});
});


$(document).ready(function () {
  $('#barcode').JsBarcode();
});
