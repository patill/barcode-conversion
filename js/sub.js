$(function(){
  $("#output").hide();
  $('#input:not(.focus)').keyup(function(e){

 if(e.keyCode == 13) {
    // $('.'+contentAttr+'').text(value.replace(/\r?\n/g,'<br/>')); //convert newlines into <br> tags
    $("#output").empty();//remove old entries and get div empty for new list
    $("#wrapper").empty();
    var post = document.createElement('p');
    var postText = document.getElementById('input').value;
    var pisteet = /(AU|AH|HU|JP|KE|KÄ|LS|PA|PS|PL|PM|PN|PK|PI|RA|RV|RE|RU|SA|SM|TO|UA|UN|UP|UU|VA|VN|VK|VP|WP|VR)/g;
    var nega = /609[AUPSLKHR]/g

    var postArray = postText.split('\n');
    var i = 0;
    var  l = postArray.length;
    var filtered = []; //empty array
    for (i = 0; i < l; i++) {
      if (!nega.test(postArray[i])) { //takes only those not having 609+letter
        filtered[filtered.length] = postArray[i].replace(pisteet, '609$&');//adding to the arry
      }
      else  {
        filtered[filtered.length] = postArray[i]; //adds the "wrong" ones anyway
      }
      //console.log(postArray[i].length);
    };
    post.textContent = filtered.toString();
    post.innerHTML = post.innerHTML.replace(/,/g, '<br>\n').replace(/^ /g, "");  // <-- THIS FIXES THE LINE BREAKS
    var card = document.createElement('div');
    card.appendChild(post);
    var cardStack = document.getElementById('output');
    cardStack.insertBefore(card, cardStack.firstChild);
    $("#output").show();

    //convert bar barcodes
    for (i = 0; i < l; i++) {
      if (postArray[i].length > 3) { // get rid of empty "barcodes" containing only Enter
      var output = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      output.className.baseVal = "barcode";
      output.setAttribute('jsbarcode-value',  filtered[i].trim());
      output.setAttribute('jsbarcode-format', 'code39');
    };

      var div_element = document.getElementById("wrapper");
      div_element.appendChild(output);
      var newline = document.createElement("br");
      div_element.appendChild(newline);
      if (output.getAttribute('jsbarcode-value') > "") {
        JsBarcode(".barcode").init();
        };
      };




   };
 });
});
