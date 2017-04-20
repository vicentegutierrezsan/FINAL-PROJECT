$(document).ready(function(){
  $remember_true=0;
//---------------Checa si hay cookie-------------------------------

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
            $("#receipts").hide();
          }

        },
        error: function(errorMessage){
          $("#LoginUsername").append("Welcome to Mazapa");
          alert("ha");
          $("#logout").hide();
        }
  });


  $.ajax({
          url : "php/ApplicationLayer.php",
          type : "POST",
          data: { "action": "SETCOOKIE"},
          dataType : "json",
          success : function(jsonResponse){
                   $("#LoginUsername").val(jsonResponse.Uname);
          },
          error : function(errorMessage){
                  alert("Set Cookie didnt work");
                }
  });       
//---------------Login Service-------------------------------

//---------------Retrieve Username---------------------------S
//-----------------------------------------------------------

  $("#loginBtn").click(function () {
    if ($("#username").val() == "" || $("#password").val() == ""  ) {
      alert("Fill all fields");
      $remember_true=0;
    }
    else {
      if($("#remember").is(':checked')) {
        $remember_true=1;
      }
      else{
        $remember_true=0;
      }
      var jsonData = {
            "username": $("#username").val(), 
            "password": $("#password").val(),
            "remember": $remember_true,
            "action" : "LOGIN"
      };
      $.ajax({
        url: "php/ApplicationLayer.php",
        type: "POST",
        data: jsonData,
        dataType: "json",
        success:function (jsonResponse) {
                if(jsonResponse){
                    $cookie_name = "cookieRemember";
                    $cookie_value = $("#username").val();
                    alert("Welcome back " + jsonResponse.Name);
                    $("#username").val(""); 
                    $("#password").val("");
                    $("#remember").prop("checked",false);
                    if($remember_true){
                                                   //--------------CREA COOKIE----------------------
                      var cookieData={
                            "cookieName" : $cookie_name,
                            "cookieVal"  : $cookie_value,
                            "cookieSave" : $remember_true,
                            "action"     : "COOKIE"
                          };
                      $.ajax({
                          url: 'php/ApplicationLayer.php',
                          type: "POST",
                          dataType: "json",
                          data:cookieData,  
                          success: function(jsonResponse){  
                            
                          },
                          error: function(errorMessage){
                          }
                      });//----------------TERMINA CREACION DE COOKIE
                      window.location.href = 'home.html';
                    }   
                }
                else{
                    alert("User not found");
                }
        },
        error: function (errorMessage) {
              alert("not working");
        }
      });
    }       
  }); 

//---------------End Login Service----------------------------

});