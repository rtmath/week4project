
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

$('document').ready(function() {

  function hideScreens() {
    $('#pizzaSelection').hide();
    $('#shoppingCart').hide();
    $('#thankYou').hide();
  }

  function clearTitleForms() {
    $('#addressTitle1').text("");
    $('#addressTitle2').text("Location: ");
    $('#addressTitle3').text("Address: ");
    $('#addressTitle4').text("City: ");
    $('#addressTitle5').text("");
    $('#addressTitle6').text("");
  }

  function clearValueForms() {
    $('#address1').text("");
    $('#address2').text("");
    $('#address3').text("");
    $('#address4').text("");
    $('#address5').text("");
    $('#address6').text("");
  }

  function initializeAddressTitles() {
    $('#addressTitle1').text("Name: ");
    $('#addressTitle2').text("Address: ");
    $('#addressTitle3').text(" ");
    $('#addressTitle4').text("City: ");
    $('#addressTitle5').text("State: ");
    $('#addressTitle6').text("Zip: ");
  }

  function populateCarryout(name, address, town) {
    $('#address2').text(name);
    $('#address3').text(address);
    $('#address4').text(town);
  }

  function populateVerFields(selector, object) {
    var i = 1;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        $('#' + selector + i).text(object[key]);
        i++;
      }
    }
  }

  $('#delivery').click(function(event) {
    event.preventDefault();
    hideScreens();
    $('#carryoutSelection').hide();
    $('#deliverySelection').fadeIn();
    resetForms();
  })

  $('#carryout').click(function(event) {
    event.preventDefault();
    hideScreens();
    $('#deliverySelection').hide();
    $('#carryoutSelection').fadeIn();
    resetForms();
  })

  $('#carryoutForm').submit(function(event) {
    event.preventDefault();
    var location = $('#locationSelect').val();
    $('#pizzaSelection').fadeIn();
    $('#addressHeader').text("Carry Out:");
    $('#carryout1').text("This order is for carryout.");
    $('#carryout2').text("You can pick up your pizza from the following location:");
    clearTitleForms();
    clearValueForms();
    if (location === location1.locationName) {
      populateCarryout(location1.locationName, location1.address, location1.town);

    } else if (location === location2.locationName) {
      populateCarryout(location2.locationName, location2.address, location2.town);

    } else if (location === location3.locationName) {
      populateCarryout(location3.locationName, location3.address, location3.town);
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
    $('#carryout1').text("");
    $('#carryout2').text("");
    $('#addressHeader').text("Address");
    populateVerFields("address", userAddress);
    initializeAddressTitles();
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
    );
    populateVerFields("pizza", userPizza);
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
