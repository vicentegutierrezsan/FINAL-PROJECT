<?php
	header('Content-type: application/json');
	require_once __DIR__ . '/dataManagmentLayer.php';

	$action = $_POST["action"];

	switch($action){

		case "VERIFY" : verifySession();
						break;
	    case "LOGOUT" : logoutFunction();
						break; 
	    case "LOADBILL": loadBillFunction();
	    				break;
	    case "LOGIN"  : loginFunction();
	    				break;
	    case "SAVERECEIPT" : savereceipt();
	    						  break;
	   case "SETCOOKIE" : setcookiefunction();
	    				   break;
	    case "COOKIE"    : cookiefunction();
	    				   break;
	    case "REGISTER"  : registerfunction();
	    				   break;
	    case "FILTER"  : filterDate();
	    				   break;
	    case "BUY"  : buy();
	    				   break;
 	}
	function verifySession(){
		session_start();
	    //verify if username is set in session
	    if(empty($_SESSION['user'])) {
	       $response = array( "name"    =>null, 
	                          "password"=>null,
	                          "status"  =>"false");
	        echo json_encode($response);
	    }
	    else {
	    	$response = array("name"    =>$_SESSION['user'], 
	                          "password"=>$_SESSION['password'],
	                          "status"  =>"true");
	    	echo json_encode($response);
	    }
	}
	function logoutFunction(){
		session_start();
		if (isset($_SESSION['user']) && isset($_SESSION['password']))
		{
			unset($_SESSION['user']);
			unset($_SESSION['password']);
			session_destroy();
			echo json_encode(array('success' => 'Session deleted'));   	    
		}
		else
		{
			header(' Session has expired');
			die("Session has expired!");
		}
	}
	function loadBillFunction(){ 
		session_start();
		$username=$_SESSION['user'];
		$result =  loadBill($username);
		echo json_encode($result);
	}
	function loginFunction(){
		$user = $_POST["username"];
		$pass = $_POST["password"];
		$result = loginDataFunction($user, $pass);
		echo json_encode($result);
	}

	function filterDate(){
		session_start();
		$username=$_SESSION['user'];
		$filter = $_POST["filter"];
		$result = filterDB($username, $filter);
		echo json_encode($result);
	}
	function savereceipt(){
		$folio = $_POST["folio"];
		$amount = $_POST["amount"];
		$fecha = $_POST["fecha"];
		$billing=$_POST["billing"];
		session_start();
		$username=$_SESSION['user'];
		$result = savereceiptDB($folio,$amount,$fecha,$username,$billing);
		if ($result["status"] == "SUCCESS"){
		echo json_encode(array("folio"=> $folio , "amount" =>$amount , "fecha" => $fecha ));
    	}
   		else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
   		}	
	}
	function setcookiefunction(){
		if (isset($_COOKIE['cookieRemember']))
		{
			$response = array("Uname" =>$_COOKIE["cookieRemember"]);
			echo json_encode($response);   	    
		}else{
			echo json_encode(""); 
		}	
	}


	function cookiefunction(){

		$Name = $_POST["cookieName"];
	    $Val = $_POST["cookieVal"];
	    $saveData = $_POST["cookieSave"];
	    if ($saveData) {
			setcookie($Name, $Val, time() + (86400 * 20), "/"); //86400 -> 1 day
		}
		if (isset($_COOKIE[$cookieName])) {
    		echo json_encode("Cookie $cookieName created");
    	} 
   		else {
   			echo json_encode("Can't create cookie");
  		}
	}
	function registerfunction(){
		$completeName = $_POST["completeName"];
        $user= $_POST["user"];
        $password = $_POST["password"];
        $email= $_POST["email"];
        $RFC= $_POST["RFC"];
        $address= $_POST["address"];
        $zipcode= $_POST["zipcode"];
        $city= $_POST["city"];
        $state= $_POST["state"];

        $result = registertoDB($completeName,$user,$password,$email,$RFC,$address,$zipcode,$city,$state);

        if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "Welcome to Mazapa Cacao");
         echo json_encode($response); //sent it to presentation layer
      
        }	
        else{
            header('HTTP/a 500' . $result["status"]);
            die($result["status"]); //returns error from DataLayer
        }	
	}

	function buy(){
		$address= $_POST["completeName"];
        $name= $_POST["user"];
        $email= $_POST["email"];
        $description = $_POST["description"];

        $result = registerBUY($address,$name,$email,$description);

        if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "Buy Registered and E-mail has been sent!");
         echo json_encode($response); //sent it to presentation layer
        }	
        else{
            header('HTTP/a 500' . $result["status"]);
            die($result["status"]); //returns error from DataLayer
        }	
	}

?>
