<?php
 	header("Access-Control-Allow-Origin: *");

	$c = curl_init(); 
	
	curl_setopt($c, CURLOPT_URL, $_POST["url"]);
	curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($c, CURLOPT_HEADER, true); 


	// $headers = array(
	// 	'Accept: application/json',
	// 	'Content-Type: application/json',
	// 	'Content-Length: '. strlen($data_string),
	// 	'Accept-Language: en'
	// );

	$headers = json_decode($_POST['headers']);

	curl_setopt($c, CURLOPT_HTTPHEADER, $headers);
							
	curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($c, CURLOPT_CUSTOMREQUEST, $_POST["method"]);     

	if(isset($_POST['body'])){
		$data_string = $_POST["body"];                                           
		curl_setopt($c, CURLOPT_POSTFIELDS, $data_string);    
	}
	
	$result = curl_exec($c);

	$header_size = curl_getinfo($c, CURLINFO_HEADER_SIZE);
	$header = substr($result, 0, $header_size);
	$body = substr($result, $header_size);
	
	curl_close($c);
	
	echo $body;

?>