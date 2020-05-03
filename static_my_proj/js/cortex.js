$(document).ready(function () {
  var contactForm = $(".contact-form");
  var contactFormMethod = contactForm.attr("method");
  var contactFormEndpoint = contactForm.attr("action");

  function displaySubmitting(submitBtn, defaultText, doSubmit) {
    if (doSubmit) {
      submitBtn.addClass("disabled");
      submitBtn.html("<i class='fa fa-spin fa-spinner'></i> Sending...");
    } else {
      submitBtn.removeClass("disabled");
      submitBtn.html(defaultText);
    }
  }
  contactForm.submit(function (event) {
    event.preventDefault();
    var contactFormSubmitBtn = contactForm.find("[type='submit']");
    var contactFormSubmitBtnTxt = contactFormSubmitBtn.text();
    var contactFormData = contactForm.serialize();
    var thisForm = $(this);
    displaySubmitting(contactFormSubmitBtn, "", true);
    $.ajax({
      method: contactFormMethod,
      url: contactFormEndpoint,
      data: contactFormData,
      success: function (data) {
        contactForm[0].reset();
        $.alert({
          title: "Success",
          content: data.message,
          theme: "modern",
        });
        setTimeout(function () {
          displaySubmitting(
            contactFormSubmitBtn,
            contactFormSubmitBtnTxt,
            false
          );
        }, 500);
      },
      error: function (error) {
        var jsonData = error.responseJSON;
        var msg = "";
        $.each(jsonData, function (key, value) {
          msg += key + ": " + value[0].message + "<br/>";
        });
        $.alert({
          title: "Opps",
          content: msg,
          theme: "modern",
        });
        setTimeout(function () {
          displaySubmitting(
            contactFormSubmitBtn,
            contactFormSubmitBtnTxt,
            false
          );
        }, 500);
      },
    });
  });

  var searchForm = $(".search-form");
  var searchInput = searchForm.find("[name='q']");
  var typingTimer;
  var typingInterval = 1500;
  var searchBtn = searchForm.find("[type='submit']");
  searchInput.keyup(function (event) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(performSearch, typingInterval);
  });
  searchInput.keydown(function (event) {
    clearTimeout(typingTimer);
  });
  function displaySearching() {
    searchBtn.addClass("disabled");
    searchBtn.html("<i class='fa fa-spin fa-spinner'></i> Searching...");
  }
  function performSearch() {
    displaySearching();
    var query = searchInput.val();
    setTimeout(function () {
      window.location.href = "/search/?q=" + query;
    }, 1000);
  }
  // Cart + Add Products
  var productForm = $(".form-product-ajax");
  productForm.submit(function (event) {
    event.preventDefault();
    var thisForm = $(this);
    var actionEndpoint = thisForm.attr("data-endpoint");
    var httpMethod = thisForm.attr("method");
    var formData = thisForm.serialize();
    console.log(actionEndpoint);
    console.log("Form data:", formData);
    $.ajax({
      url: actionEndpoint,
      method: httpMethod,
      data: formData,
      success: function (data) {
        var submitSpan = thisForm.find(".submit-span");
        console.log("Added: ", data.added);
        console.log("Removed: ", data.removed);
        if (data.added) {
          submitSpan.html(
            "In cart <button type='btn-group' class='btn btn-link'>Remove? </button>"
          );
        } else {
          submitSpan.html(
            "<button type='submit' class='btn btn-success'> Add to cart </button>"
          );
        }
        var navbarCount = $(".navbar-cart-count");
        navbarCount.text(data.cartItemCount);
        var currentPath = window.location.href;

        if (currentPath.indexOf("cart") != -1) {
          refreshCart();
        }
      },
      error: function (errorData) {
        $.alert({
          title: "Opps",
          content: "An error occured",
          theme: "modern",
        });
      },
    });
    function refreshCart() {
      console.log("in current cart");
      var cartTable = $(".cart-table");
      var cartBody = cartTable.find(".cart-body");
      var productRows = cartBody.find(".cart-product");
      var currentUrl = window.location.href;
      var refreshCartUrl = "/api/cart/";
      var refreshCartMethod = "GET";
      var data = {};
      $.ajax({
        url: refreshCartUrl,
        method: refreshCartMethod,
        data: data,
        success: function (data) {
          console.log(data);
          var hiddenCartItemRemoveForm = $(".cart-item-remove-form");
          if (data.products.length > 0) {
            console.log("CURRENT: ", currentUrl);
            productRows.html(" ");
            var viewedIndex = data.products.length;
            $.each(data.products, function (index, value) {
              var newCartItemRemove = hiddenCartItemRemoveForm.clone();
              newCartItemRemove.css("display", "block");
              newCartItemRemove.find(".cart-item-product-id").val(value.id);
              console.log(newCartItemRemove.text());
              cartBody.prepend(
                "<tr><th scope='row'>" +
                  viewedIndex +
                  "</th><td><a href='" +
                  value.url +
                  "'>" +
                  value.name +
                  "</a>" +
                  newCartItemRemove.html() +
                  "</td><td>" +
                  value.price +
                  "</td></tr>"
              );
              viewedIndex--;
            });
            cartBody.find(".cart-subtotal").text(data.subtotal);
            cartBody.find(".cart-total").text(data.total);
            console.log("HREF: ", window.location.href);
          } else {
            window.location.href = currentUrl;
          }
        },
        error: function (errorData) {
          $.alert({
            title: "Opps",
            content: "An error occured",
            theme: "modern",
          });
        },
      });
    }
  });
});
