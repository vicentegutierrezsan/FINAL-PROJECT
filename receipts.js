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
          }
          else{
            $("#LoginUsername").append("Welcome to Mazapa Cacao");
            $("#logout").hide();
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


 $.ajax({  //----------------------LOAD RECEIPTS---------------
      url: "php/ApplicationLayer.php",
      type: "POST",
      data: { 
              "action"  : "LOADBILL"
      },
      success: function (jsonResponse){
          var post= "";
          if (jsonResponse.length > 0){
              $.each(jsonResponse,function(index){
                 post += "<tr><td>"+ jsonResponse[index].folio + "</td><td>" 
                              +  jsonResponse[index].bill + "</td><td>"  
                              +  jsonResponse[index].amount+ "</td><td>"+ 
                              jsonResponse[index].fecha+ "</td></tr>"; 
              });

          } 
          $("#receiptTable").append(post);
      },
      error:function(errorMessage){
       // alert(errorMessage.responseText);
       alert("no");
      }
    });//----------------------------END LOAD COMMENTS------------

 /*  //--------------------------------Get the modal-----------
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("submitBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];*/
//---------------Login Service-------------------------------
  $("#submitBtn").click(function () { 
    var jsonData = {
                "folio": $("#folio").val(), 
                "amount": $("#amount").val(),
                "fecha" : $("#date").val(),
                "billing":$("textarea#billing").val(),
                "action" : "SAVERECEIPT"};
                console.log(jsonData);
        $.ajax({
            url: "php/ApplicationLayer.php",
            type: "POST" ,
            data: jsonData ,
            success: function (jsonResponse) {
                window.location.href = 'receipts.html';
                },
            error: function (errorMessage) {
                alert("no entro");
                alert(errorMessage.responseText);
            }
        });          
  });

  $("#filterBtn").click(function () { 
    var jsonData = {
                "filter": $("#filter").val(), 
                "action" : "FILTER"};
                console.log(jsonData);
        $.ajax({
            url: "php/ApplicationLayer.php",
            type: "POST" ,
            data: jsonData ,
            success: function (jsonResponse) {
               $("#receiptTable").hide();
                var post= "<table><tr><th>Folio Number</th><th>Billing Information</th><th>Amount</th><th>Date</th></tr>";
          if (jsonResponse.length > 0){
              $.each(jsonResponse,function(index){
                 post += "<tr><td>"+ jsonResponse[index].folio + "</td><td>" 
                              +  jsonResponse[index].bill + "</td><td>"  
                              +  jsonResponse[index].amount+ "</td><td>"+ 
                              jsonResponse[index].fecha+ "</td></tr>"; 
              });

          } 

          post+="</table>"
          $("#tableDiv").html(post); 
        },
            error: function (errorMessage) {
                alert("no entro");
                alert(errorMessage.responseText);
            }
        });          
  });


});

/*
 var ErrorFlag;
  var Comentario="";
  $listComment = $(".Log");

  $("#submitBtn").click(function(){
    console.log("Se presiono el .btn")
    data={};
    data.name = $(".Name").val();
    data.email = $(".Email").val();
    data.comment = $(".Comment").val();

    if (data.name === "" ||data.email === "" ||data.comment === "" )
      ErrorFlag = true;

    if (ErrorFlag){
      alert("Fill the corresponding fields")
      ErrorFlag= false;
    }
    else {
      $.ajax({//-----------------------------------------------------Submit button
        url: 'php/ApplicationLayer.php',
        type: 'POST' ,
        data: { "action": "VERIFY"},
        dataType: 'json',
        success: function(jsonResponse){
          var stats = jsonResponse.name;
          if( (jsonResponse.status == "false")){           //si no hay sesion iniciada, abrir modal
            // When the user clicks the button, open the modal
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
              modal.style.display = "none";
              }
            }
          }
          else{
          jsonDataLog= {
           "namesub"  : stats ,
           "emailsub"  : $("#comEmail").val(),
           "commentsub": $("#comComment").val(),
           "action" : "INSERTNEWCOMMENT"
          };

          $.ajax({
            url:"php/ApplicationLayer.php",
            type:"POST",
            data:jsonDataLog,
            dataType:"json",
            success: function (jsonResponse) {                                   
                                      var newComment = "";
                                          newComment += jsonDataLog.namesub + "(" 
                                                     +  jsonResponse.email + ") commented: <br>"
                                                     +  jsonResponse.comment + "<br><br>";
                                      $("#LOG").append(newComment);
                                      
                                      $("#LoginName").val("");
                                      $("#comEmail").val("");
                                      $("#comComment").val("");
                                      $("#comName").val("");
                                      $("#LoginPassword").val("");
                                      modal.style.display = "none";
                              },
            error: function (errorMessage){
                  alert(errorMessage.responseText);
                  }
            });
          }
        },
        error: function(errorMessage){
          alert(errorMessage.responseText);
        }
      });
    }
  });*/