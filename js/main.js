
var input = document.getElementById("Viivakoodi").value;
var input2 = document.getElementById("Viivakoodi2").value;


$('.content:not(.focus)').keyup(function(){					


     var value = $(this).val();
     var contentAttr = $(this).attr('name');

     $('.'+contentAttr+'').html(value.replace(/\r?\n/g,'<br/>')); //convert newlines into <br> tags

 });


if(input === 0) {
  $('.phone-numbers').css('display', 'none');
}
else {
  for (var i = 0; i < input.length; i++) {
    $("#phoneNumbers").append('<tr>' +
      '<td' + input[i] ¨+ '</td>' +
    '</tr>');
  }
}



$('#btn2').click(function() {
    $("#barcodes").append( "test"   );
});

$('#btn3').click(function() {
  $("#barcodes").append( input2 );
});

//creates a listener for when you press a key
window.onkeyup = keyup;

//creates a global Javascript variable
var inputTextValue;

function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  inputTextValue = e.target.value;

  //listens for you to press the ENTER key, at which point your web address will change to the one you have input in the search box
  if (e.keyCode == 13) {
    print =  inputTextValue;
  }
}
