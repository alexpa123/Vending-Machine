

$(document).ready(function () {
  loadItems();
  makeAPurchase();
})

var changeMessage = "";
var number = 0;

//var number = 0;
function addMoney(amount){
  var z = $('#moneyIn').val((number+=amount).toFixed(2));
}

function returnChange(){
  $('#moneyIn').val(0);
  number = 0;
  $('#changeDisplay').text(changeMessage);
  changeMessage = "";
}

function setItemId(number){
  $('#itemInput').val(number);
}

function makeAPurchase(){
  $('#makePurchase').click(function () {
      var response = $('#messageResponse');
      $.ajax({
        type: 'GET',
        url: `http://localhost:8080/money/${$('#moneyIn').val()}/item/${$('#itemInput').val()}`,
        data: JSON.stringify({
          id: $('#itemInput').val(),
          amount: $('#moneyIn').val(),
        }),
        success: function (data, status) {
          response.empty();
          var html = `<p>Thank you!!!</p>`;
          response.append(html);
          $('#changeDisplay').html("<p></p>");
          $.each(data, function(key, value){
            if(value != 0){
              changeMessage += `${key} ${value} `
            }
            
          });
          
        },
        error: function (data, status) {
          response.empty();
          $('#changeDisplay').html("<p></p>");
          var html = `<p>${data.responseJSON.message}</p>`;
          response.append(html);
        }
      })
      clearItems();
      loadItems();
    })
}

function clearItems(){
  $('#itemRows').empty();
}

function loadItems(){
  var itemRows = $('#itemRows');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/items',
    success: function (data, status) {
      $.each(data, function (index, item) {
        var id = item.id;
        var name = item.name;
        var price = item.price;
        var quantity = item.quantity;

        var newCard = `<div class='col-sm-4 itemDiv' id="${id}" onclick="setItemId(${id})"><div class='card'><div class='card-body''>`;
        newCard += `<p>${id}</p>`;
        newCard += `<p class="itemInfo">${name}</p>`;
        newCard += `<p class="itemInfo">$${price}</p>`;
        newCard += `<p class="itemInfo">Quantity Left: ${quantity}</p>`;
        newCard += "</div></div></div>"

        itemRows.append(newCard);
      });
    },
    error: function () {
      $("#errorMessage").text("error");
    }
  })
}