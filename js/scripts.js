$('document').ready(function() {

  $('#delivery').click(function(event) {
    event.preventDefault();
    $('#carryoutSelection').hide();
    $('#pizzaSelection').hide();
    $('#shoppingCart').hide();
    $('#thankYou').hide();
    $('#deliverySelection').fadeIn();
    resetForms();
  })

  $('#carryout').click(function(event) {
    event.preventDefault();
    $('#deliverySelection').hide();
    $('#pizzaSelection').hide();
    $('#shoppingCart').hide();
    $('#thankYou').hide();
    $('#carryoutSelection').fadeIn();
    resetForms();
  })

  $('#carryoutForm').submit(function(event) {
    event.preventDefault();
    var location = $('#locationSelect').val();
    $('#pizzaSelection').fadeIn();
    $('#address1').text("This order is for carryout.");
    $('#address2').text("You can pick up your pizza from the following location:");
    if (location === location1.locationName) {
      $('#address3').text(location1.locationName);
      $('#address4').text("Address: " + location1.address);
      $('#address5').text("City: " + location1.city);
      console.log("location1");
    } else if (location === location2.locationName) {
      $('#address3').text(location2.locationName);
      $('#address4').text("Address: " + location2.address);
      $('#address5').text("City: " + location2.city);
      console.log("location2");
    } else if (location === location3.locationName) {
      $('#address3').text(location3.locationName);
      $('#address4').text("Address: " + location3.address);
      $('#address5').text("City: " + location3.city);
      console.log("location1");
    }
    $('#carryoutSelection').hide();
  });

  $('#deliveryForm').submit(function(event) {
    event.preventDefault();
    $('#deliverySelection').hide();
    $('#pizzaSelection').fadeIn();
    var userAddress = new Address(
      $('#formname').val(),
      $('#formaddress1').val(),
      $('#formaddress2').val(),
      $('#formcity').val(),
      $('#formstate').val(),
      $('#formzip').val()
    );
    $('#address1').text("Name: " + userAddress.userName);
    $('#address2').text("Address: " +userAddress.address1);
    $('#address3').text("         " +userAddress.address2);
    $('#address4').text("City: " + userAddress.city);
    $('#address5').text("State: " + userAddress.state);
    $('#address6').text("Zip: " + userAddress.zip);
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
    $('#shoppingCart').fadeIn();
  });

  $('#orderEdit').click(function(event) {
    event.preventDefault();

    $('#pizzaSelection').fadeIn();
    $('#shoppingCart').hide();
  });

  $('#finalizeOrder').submit(function(event) {
    event.preventDefault();
    $('#thankYou').fadeIn();
    $('#shoppingCart').hide();
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

function Location (locationName, address, town) {
  this.locationName = locationName;
  this.address = address;
  this.town = town;
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

function resetForms() {
  for (i = 0; i < document.forms.length; i++) {
    document.forms[i].reset();
  }
}

var location1 = new Location("Spaceport VII", "Phi Sector", "Gamma Cluster");
var location2 = new Location("Spaceport IV", "Galactic Way", "Lambda Cluster");
var location3 = new Location("Satellite Theta MkII", "Tau Ypsilon", "Milky Way");
