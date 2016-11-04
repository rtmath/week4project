$('document').ready(function() {
  $('#delivery').click(function(event) {
    event.preventDefault();
    $('#carryoutSelection').hide();
    $('#deliverySelection').toggle();
  })
  $('#carryout').click(function(event) {
    event.preventDefault();
    $('#deliverySelection').hide();
    $('#carryoutSelection').toggle();
  })
  $('#deliveryForm').submit(function(event) {
    event.preventDefault();
    // var userAddress = new Address(
    //   $('#formname').val(),
    //   $('#formaddress1').val(),
    //   $('#formaddress2').val(),
    //   $('#formcity').val(),
    //   $('#formstate').val(),
    //   $('#formzip').val()
    // );
    // $('#output1').text(userAddress.userName);
    // $('#output2').text(userAddress.address1);
    // $('#output3').text(userAddress.address2);
    // $('#output4').text(userAddress.city);
    // $('#output5').text(userAddress.state);
    // $('#output6').text(userAddress.zip);
  });
});

function Address (userName, address1, address2, city, state, zip) {
  this.userName = userName;
  this.address1 = address1;
  this.address2 = address2;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

function Pizza (dough, pizzaSize, sauce, cheese, meats, veggies) {
  this.dough = dough;
  this.pizzaSize = size;
  this.sauce = sauce;
  this.cheese = cheese;
  this.meats = meats;
  this.veggies = veggies;
}
