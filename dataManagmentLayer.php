<?php

	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "chocolate";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
	}
	function loadBill($username){
		$conn = connectionToDataBase();
		if($conn != null){
			
			$sql = "SELECT * FROM receipts WHERE username = '$username'";
	        $result = $conn -> query($sql); //resultado del query
	        
	        if ($result->num_rows > 0){    
	        	$response = array();	 
	            
	            while($row = $result -> fetch_assoc()) 
	            {     
	                array_push($response,array( "folio" => $row["folio"],
	                							"bill" => $row["billing"], 
	                						    "amount" => $row["amount"], 
	                						    "fecha" => $row["fecha"],
	                						    "username" => $row["username"] ));
	                }
	            return ($response) ;
	        }  
	        else{
	            header('Couldnt load');
				die("Load failed");  
	        }
	    }
		else{
			$conn -> close();
    	    header('HTTP/1.1 500 Bad connection to Database');
		}
	}

	function loginDataFunction($uName, $pWord){
		$conn = connectionToDataBase();

		if($conn != null){

			$sql = "SELECT completeName , userName FROM Users WHERE userName = '$uName' AND password ='$pWord'";

			$result = $conn->query($sql);
			
			if($result->num_rows > 0)
			{
				
				while ($row = $result->fetch_assoc()) 
				{
					    $response = array("Name" =>$row["completeName"],
									  "user"  =>$row["userName"]);
					


						//crear sesion (guarda Username)

					    session_start();
						session_destroy();
						session_start();
						$_SESSION['user'] = $uName;
						$_SESSION['password'] = $pWord;

				    array_push($response, array("status" =>"1"));
					}
				return $response;
			}
			else{
			
				header(' User not found');
				die("Wrong credentials provided");

				$response["status"] = 0;
				return $response;
			}
		}
		else{
			header('HHTP/1.1 500 Bad connection to Database');
			die("The server is down, couldn't establish database connection");
			$response["status"] = -1; 
			return $response;
		}
$conn -> close();

	}
	function savereceiptDB($folio,$amount,$fecha,$username,$billing){
		$conn = connectionToDataBase();

		if ($conn != null){
    	    //$loadBill=.$row["billing"];
	        $sql = "INSERT INTO Receipts(folio, billing, amount, fecha, username)
	                VALUES ('$folio','$billing','$amount','$fecha','$username')";
		    $result = $conn->query($sql);
		        
		    if ($result != null) {
           		return array("status" => "SUCCESS");   
        	} 
		    else{
		        return array("Error inserting receipt");
		    }  
		}
		else {
		    $conn -> close();
		    header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
		}
	}
	function registertoDB($completeName,$user,$password,$email,$RFC,$address,$zipcode,$city,$state){
		$conn = connectionToDataBase();

		if ($conn != null){
			$sql = "INSERT INTO Users(completeName, userName, password, email, RFC, address, zipcode, city, state) 
                    VALUES ('$completeName','$user','$password','$email','$RFC','$address','$zipcode','$city','$state')";
			$result = $conn->query($sql);
        
	        if ($result == TRUE) {
	            $conn -> close();
	            return array("status" => "SUCCESS");   
	        } 
	        else{
	            $conn -> close();
	            return array ("status" => "Error registering");
	        }
		}

	}


function filterDB($username, $filter){
		$conn = connectionToDataBase();
		if($conn != null){
			
			$sql = "SELECT * FROM receipts WHERE username = '$username' AND fecha = '$filter'";
	        $result = $conn -> query($sql); //resultado del query
	        
	        if ($result->num_rows > 0){    
	        	$response = array();	 
	            
	            while($row = $result -> fetch_assoc()) 
	            {     
	                array_push($response,array( "folio" => $row["folio"],
	                							"bill" => $row["billing"], 
	                						    "amount" => $row["amount"], 
	                						    "fecha" => $row["fecha"],
	                						    "username" => $row["username"] ));
	                }
	            return ($response) ;
	        }  
	        else{
	            header('Couldnt load');
				die("Load failed");  
	        }
	    }
		else{
			$conn -> close();
    	    header('HTTP/1.1 500 Bad connection to Database');
		}
	}


	function registerBUY($address,$name,$email,$description){
		$conn = connectionToDataBase();

		if ($conn != null){
			$sql = "INSERT INTO Buy(billing, amount, name, description) 
                    VALUES ('$address', '$name', '$email', '$description')";
			$result = $conn->query($sql);
        
	        if ($result == TRUE) {
	            $conn -> close();
	            return array("status" => "SUCCESS");   
	        } 
	        else{
	            $conn -> close();
	            return array ("status" => "Error registering Buy");
	        }
		}

	}
?>