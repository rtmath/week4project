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

  $('#carryoutForm').submit(function(event) {
    event.preventDefault();
    var location = $('#locationSelect').val();
    $('#pizzaSelection').show();
    $('#address1').text("This order is for carryout.");
    $('#address2').text("You can pick up your pizza from the following location:");
    $('#address3').text(location);
  });

  $('#deliveryForm').submit(function(event) {
    event.preventDefault();
    $('#orderSelection').hide();
    $('#deliverySelection').hide();
    $('#pizzaSelection').show();
    var userAddress = new Address(
      $('#formname').val(),
      $('#formaddress1').val(),
      $('#formaddress2').val(),
      $('#formcity').val(),
      $('#formstate').val(),
      $('#formzip').val()
    );
    $('#address1').text(userAddress.userName);
    $('#address2').text(userAddress.address1);
    $('#address3').text(userAddress.address2);
    $('#address4').text(userAddress.city);
    $('#address5').text(userAddress.state);
    $('#address6').text(userAddress.zip);
  });

  $('#pizzaSelection').submit(function(event) {
    event.preventDefault();
    $('#pizzaSelection').hide();
    var meats = [];
   $('input:checkbox[name=meat]:checked').each(function() {
     meats.push($(this).val());
   })
    var veggies = [];
    $('input:checkbox[name=veggie]:checked').each(function() {
      veggies.push($(this).val());
    })
    var userPizza = new Pizza(
      $('#doughSelect').val(),
      $('#sizeSelect').val(),
      $('#sauceSelect').val(),
      $('#cheeseSelect').val(),
      meats,
      veggies
    )
    $('#pizza1').text(userPizza.dough);
    $('#pizza2').text(userPizza.pizzaSize);
    $('#pizza3').text(userPizza.sauce);
    $('#pizza4').text(userPizza.cheese);
    $('#pizza5').text(userPizza.meats);
    $('#pizza6').text(userPizza.veggies);
    $('#finalCost').text(userPizza.cost());
    $('#shoppingCart').show();
  });

  $('#orderEdit').click(function(event) {
    event.preventDefault();

    $('#pizzaSelection').show();
    $('#shoppingCart').hide();
    console.log("Done!");
  });

  $('#finalizeOrder').submit(function(event) {
    event.preventDefault();
    $('#thankYou').show();
  })
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
  this.pizzaSize = pizzaSize;
  this.sauce = sauce;
  this.cheese = cheese;
  this.meats = meats;
  this.veggies = veggies;
  var toppings = this.meats.length;
}

function chainLocation (address, city, state, zip) {
  this.address = address;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

Pizza.prototype.cost = function() {
  var baseCost = 5;
  for (i = 0; i < this.meats.length; i++) {
    baseCost *= 1.1;
  }
  for (i = 0; i < this.veggies.length; i++) {
    baseCost *= 1.1;
  }
  return Math.round(baseCost);
}
