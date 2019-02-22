var shopCart = [];

  $(document).ready(function () {
    if (sessionStorage["shopping-cart-items"] != null) {
      shopCart = JSON.parse(sessionStorage["shopping-cart-items"].toString());
    }
    displayShoppingCart();
  });

  $(".add-to-cart").click(function (){
    var button = $(this);
    var id = button.attr("id");
    var name = button.attr("data-name");
    var price = button.attr("data-price");
    var quantity = 1;

    var item = {
      id: id,
      name: name,
      price: price,
      quantity: quantity
    };
  
  var exists = false;
  if (shopCart.length > 0) {
    $.each(shopCart, function (index, value) {
      if (value.id == item.id) {
        value.quantity++;
        exists = true;
        return false;
      }
    });
  }
  if (!exists) {
    shopCart.push(item);
  }
  sessionStorage["shopping-cart-items"] = JSON.stringify(shopCart);
  displayShoppingCart();
  });

  //xóa
  $("#button-clear").click(function (){
    shopCart = [];
    sessionStorage["shopping-cart-items"] = JSON.stringify(shopCart);
    $("#table-products > tbody").html("");
  });


  //hiển thị
  function displayShoppingCart() {
    if (sessionStorage["shopping-cart-items"] != null) {
      shopCart = JSON.parse(sessionStorage["shopping-cart-items"].toString());

      $("#table-products > tbody").html("");
      $.each(shopCart, function (index, item){
        var htmlString = "";
        htmlString += "<tr>";
        htmlString += "<td>" + item.id + "</td>";
        htmlString += "<td>" + item.name + "</td>";
        htmlString += "<td style='text-align: right'>" + item.price + "</td>";
        htmlString += "<td style='text-align: right'>" + item.quantity + "</td>";
        htmlString += "<td style='text-align: right'>" + item.price * item.quantity + "</td>";
        htmlString += "</tr>";

        $("#table-products > tbody:last").append(htmlString);
      });
    }
  }