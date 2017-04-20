$(document).ready(function(){

$.ajax({
        url: 'php/ApplicationLayer.php',
        type: 'POST' ,
        data: { "action": "VERIFY"},
        dataType: 'json',
        success: function(jsonResponse){
          if(jsonResponse.status === "true"){
            $("#LoginUsername").append("Welcome, " + jsonResponse.name);
            $("#login").hide();
          }
          else{
            $("#LoginUsername").append("Welcome to Mazapa Cacao");
            $("#logout").hide();
            $("#receipts").hide();
          }

        },
        error: function(errorMessage){
          $("#LoginUsername").append("Welcome to Mazapa");
          alert(errorMessage.responseText);
          $("#logout").hide();
        }
  });

$("#logout").click(function () {
      $.ajax({
          url:"php/ApplicationLayer.php",
          type:"POST",
          data:{"action": "LOGOUT"},
          dataType:"json",
          success: function(jsonResponse){
            window.location.href = 'login.html';
          },
          error:function(errorMessage){
            alert(errorMessage.responseText);
          }
      });
    });

$("#buy").click(function () {

  window.location.href='buy.html';
});

});