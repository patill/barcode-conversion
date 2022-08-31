$(function () {
  $("#card-stack").hide(); //hide initially frame
  $("#print-labels").hide();

  //Globals
  var filteredArray = []; //empty array
  var outputArray = [];

  function cleanUpText() {
    $("#card-stack").empty(); //remove old entries and get div empty for new list
  }

  function cleanUpBarcodes() {
    $("#wrapper").empty();
  }

  function showTableOptions() {
    $("#print-labels").show();
  }

  function convertInputData() {
    var postText = document.getElementById("post-text").value;
    var pisteet =
      /\B(AU|AH|FP|GP|HU|JP|KA|KJ|KE|KS|KY|KÄ|LS|PA|PS|PL|PM|PN|PK|PI|PO|PP|PV|RA|RV|RE|RU|SA|SM|TO|UA|UN|UP|UU|VA|VN|VK|VP|WP|VR)/g;
    var nega =
      /609(AU|AH|FP|GP|HU|JP|KA|KJ|KE|KS|KY|KÄ|LS|PA|PS|PL|PM|PN|PK|PI|PO|PP|PV|RA|RV|RE|RU|SA|SM|TO|UA|UN|UP|UU|VA|VN|VK|VP|WP|VR)/g;

    var newPostText = postText.replaceAll("\n", "\n\n"); // insert empty line breaks so the regex works correctly
    var postArray = newPostText.split("\n");
    var i = 0;
    var l = postArray.length;

    for (i = 0; i < l; i++) {
      if (!nega.test(postArray[i])) {
        //takes only those not having 609+letter
        filteredArray[filteredArray.length] = postArray[i].replace(
          pisteet,
          "609$&"
        ); //adding to the arry
      } else {
        filteredArray[filteredArray.length] = postArray[i]; //adds the "wrong" ones anyway
      }
    }
  }

  // https://stackoverflow.com/a/44069560
  function groupArr(data, n) {
    var group = [];
    for (var i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0) j++;
      group[j] = group[j] || [];
      group[j].push(data[i]);
    }
    return group;
  }

  function printConvertedBarcodeTexts() {
    var post = document.createElement("textarea");
    post.textContent = filteredArray.toString();
    post.innerHTML = post.innerHTML
      .replace(/,/g, "\n")
      .replace(/^ /g, "")
      .replace(/^[\s\t]*(\r\n|\n|\r)/gm, "") // https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
      .trim(); // <-- THIS FIXES THE LINE BREAKS
    post.setAttribute("class", "output");
    post.setAttribute("rows", (filteredArray.length - 1) / 2); // rows are half of the list because we added emtpy rows in line 14
    var card = document.getElementById("card-stack");
    card.appendChild(post);
    $("#card-stack").show();
  }

  function groupBarcodes(arr, n = 2) {
    var grouped = groupArr(arr, n);
    var trGrouped = [];
    for (i in grouped) {
      var tr = document.createElement("tr");
      grouped[i].forEach((element) => {
        tr.appendChild(element);
      });

      trGrouped.push(tr);
    }
    return trGrouped;
  }

  function BarcodesToTable(arr) {
    var div_element = document.getElementById("wrapper");
    for (i in arr) {
      div_element.appendChild(arr[i]);
    }
  }

  function produceBarcodeSVG() {
    var i = 0;
    var l = filteredArray.length;

    for (i = 0; i < l; i++) {
      if (filteredArray[i].length > 3) {
        // get rid of empty "barcodes" containing only Enter
        var output = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        output.className.baseVal = "barcode";
        output.setAttribute("jsbarcode-value", filteredArray[i].trim());
        output.setAttribute("jsbarcode-format", "code39");
        output.setAttribute("jsbarcode-fontsize", 35);

        var th = document.createElement("th");
        th.appendChild(output);

        outputArray.push(th);
      }
    }
  }

  function setBarcodeDimensions(width = "300px", length = "80px") {
    var barcodeSVG = document.querySelectorAll(".barcode");
    for (var a = 0; a < barcodeSVG.length; a++) {
      barcodeSVG[a].setAttribute("width", width);
      barcodeSVG[a].setAttribute("height", length);
    }
  }

  //Click button to convert input
  document.getElementById("post-button").addEventListener("click", function () {
    cleanUpText();
    cleanUpBarcodes();
    showTableOptions();
    convertInputData();
    printConvertedBarcodeTexts();
    produceBarcodeSVG();
    BarcodesToTable(groupBarcodes(outputArray));
    JsBarcode(".barcode").init(); //Print barcodes
    setBarcodeDimensions();
  });

  //click radio button to change from two to three columns
  document
    .getElementById("print-form")
    .addEventListener("click", function (val) {
      var tableColumns = val.target.value * 1;
      var width, length;
      if (tableColumns === 2) {
        width = "300px";
        length = "80px";
      }
      if (tableColumns === 3) {
        width = "180px";
        length = "80px";
      }
      cleanUpBarcodes();
      BarcodesToTable(groupBarcodes(outputArray, tableColumns));
      JsBarcode(".barcode").init(); //Print barcodes
      setBarcodeDimensions(width, length); //TODO: find right dimensions
    });
});
