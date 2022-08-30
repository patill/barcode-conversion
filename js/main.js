$(function () {
  $("#card-stack").hide(); //hide initially frame

  document.getElementById("post-button").addEventListener("click", function () {
    $("#card-stack").empty(); //remove old entries and get div empty for new list
    $("#wrapper").empty();
    var post = document.createElement("textarea");
    var postText = document.getElementById("post-text").value;
    var pisteet =
      /\B(AU|AH|FP|GP|HU|JP|KA|KJ|KE|KS|KY|KÄ|LS|PA|PS|PL|PM|PN|PK|PI|PO|PP|PV|RA|RV|RE|RU|SA|SM|TO|UA|UN|UP|UU|VA|VN|VK|VP|WP|VR)/g;
    var nega =
      /609(AU|AH|FP|GP|HU|JP|KA|KJ|KE|KS|KY|KÄ|LS|PA|PS|PL|PM|PN|PK|PI|PO|PP|PV|RA|RV|RE|RU|SA|SM|TO|UA|UN|UP|UU|VA|VN|VK|VP|WP|VR)/g;

    var newPostText = postText.replaceAll("\n", "\n\n"); // insert empty line breaks so the regex works correctly
    var postArray = newPostText.split("\n");
    var i = 0;
    var l = postArray.length;
    var filtered = []; //empty array
    for (i = 0; i < l; i++) {
      if (!nega.test(postArray[i])) {
        //takes only those not having 609+letter
        filtered[filtered.length] = postArray[i].replace(pisteet, "609$&"); //adding to the arry
      } else {
        filtered[filtered.length] = postArray[i]; //adds the "wrong" ones anyway
      }
    }

    post.textContent = filtered.toString();
    post.innerHTML = post.innerHTML
      .replace(/,/g, "\n")
      .replace(/^ /g, "")
      .replace(/^[\s\t]*(\r\n|\n|\r)/gm, "") // https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
      .trim(); // <-- THIS FIXES THE LINE BREAKS
    post.setAttribute("class", "output");
    post.setAttribute("rows", (filtered.length - 1) / 2); // rows are half of the list because we added emtpy rows in line 14
    var card = document.getElementById("card-stack");
    card.appendChild(post);
    $("#card-stack").show();

    for (i = 0; i < l; i++) {
      if (postArray[i].length > 3) {
        // get rid of empty "barcodes" containing only Enter
        var output = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        output.className.baseVal = "barcode";
        output.setAttribute("jsbarcode-value", filtered[i].trim());
        output.setAttribute("jsbarcode-format", "code39");
      }

      var div_element = document.getElementById("wrapper");
      div_element.appendChild(output);
      var newline = document.createElement("br");
      div_element.appendChild(newline);
      if (output.getAttribute("jsbarcode-value") > "") {
        JsBarcode(".barcode").init();
      }
    }
  });
});
