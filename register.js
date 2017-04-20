$(document).ready(function(){

//---------------Retrieve Username---------------------------
$.ajax({
        url: 'php/ApplicationLayer.php',
        type: 'POST' ,
        data: { "action": "VERIFY"},
        dataType: 'json',
        success: function(jsonResponse){
          if(jsonResponse.status === "true"){
            $("#LoginUsername").append("Welcome, " + jsonResponse.name);
            $("#login").hide();
            $("#login2").hide();
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
//-----------------------------------------------------------
//---------------LOGOUT--------------------------------------

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
//-----------------------------------------------------------

 $("#registerBtn").click(function(){        
        var jsonData = {
            "completeName":$("#completeName").val(),
            "user":$("#Username").val(),
            "password": $("#Password").val(), 
            "email": $("#Email").val(),
            "RFC": $("#rfc").val(),
            "address": $("#address").val(),
            "zipcode": $("#zipcode").val(),
            "city": $("#city").val(),
            "state": $("#state").val(),
            "action" : "REGISTER"
        };
        console.log(jsonData);
        $.ajax({
            url: "php/ApplicationLayer.php",
            type: "POST" ,
            data: jsonData ,
            success: function (jsonResponse) {
                alert(jsonResponse.message + "!")
                window.location.href = 'home.html';
                },
            error: function (errorMessage) {
                alert("no entro");
                alert(errorMessage.responseText);
            }
        });
        
    });
});