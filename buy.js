$(document).ready(function(){
    $(":input").click(function () {
    var sum=0;
    var x1 = 0;
    var x2 = 0;
    var x3 = 0;
    var x4 = 0;
    var x5 = 0;
    var x6 = 0;
   		$( "input[name^='hundred']" ).each(function() {
        x1 += Number($(this).val()) *60;
    	});
    	$( "input[name^='kg']" ).each(function() {
        x2 += Number($(this).val()) *250;
    	});
    	$( "input[name^='confiture']" ).each(function() {
        x3 += Number($(this).val()) *30;
    	});
    	$( "input[name^='pcb']" ).each(function() {
        x4 += Number($(this).val()) *100;
    	});
    	$( "input[name^='fp']" ).each(function() {
        x5 += Number($(this).val()) *150;
    	});
    	$( "input[name^='hc']" ).each(function() {
        x6 += Number($(this).val()) *60;
    	});


    	sum=x1+x2+x3+x4+x5+x6;
   		$text=sum+".00";
    	$("#total").html($text);

    });

    $("#reset").click(function (){
        $( "input[type=number]" ).each(function() {
            $(this).val(0);
        });
         $("#total").html("0.00");
         $("#email").val("");
         $( "input[type=text]" ).each(function() {
            $(this).val("");
        });
    });

    $("#buyBtn").click(function () {
        var description="";
        $( "input[name^='hundred']" ).each(function() {
            if($(this).val()!=0){
                description+=$(this).val()+"x60"+" "+$(this).attr('id')+" \n "
            }
        });
        $( "input[name^='kg']" ).each(function() {
            if($(this).val()!=0){
                    description+=$(this).val()+"x250"+" "+$(this).attr('id')+" \n "
                }
        });
        $( "input[name^='confiture']" ).each(function() {
            if($(this).val()!=0){
                    description+=$(this).val()+"x30"+" "+$(this).attr('id')+" \n "
                }
        });
        $( "input[name^='pcb']" ).each(function() {
            if($(this).val()!=0){
                        description+=$(this).val()+"x100"+" "+$(this).attr('id')+" \n "
                    }
        });
        $( "input[name^='fp']" ).each(function() {
            if($(this).val()!=0){
                    description+=$(this).val()+"x150"+" "+$(this).attr('id')+" \n "
                }
        });
        $( "input[name^='hc']" ).each(function() {
            if($(this).val()!=0){
                    description+=$(this).val()+"x60"+" "+$(this).attr('id')+" \n "
                }
        });

        description+="Total: "+$("#total").html();
        alert(description);


        if($("#address").val()==""|$("#name").val()==""|$("#email").val()==""){
            alert("Please fill all fields");
            console.log("not filled");
        }else{
            var jsonData = {
                "address": $("#address").val(),
                "name":$("#name").val(),
                "email":$("#email").val(),
                "description":description,
                "action" : "BUY"
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
                alert("NOT WORKING");
                alert(errorMessage.responseText);
            }
        });

        }   
    });

});