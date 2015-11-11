<?php
  $apiKey         = '70252ccc4a81fbbe2e9dac4f90e831d3-us11'; // Edit me
  $listId         = '5ee0455e48'; // Edit me
  $double_optin   = true;
  $send_welcome   = true;
  $email_type     = 'html';
  $email          = $_POST['email'];


  // Replace us8 with your datacentre, usually found at end of api key
  $submit_url     = "http://us11.api.mailchimp.com/1.3/?method=listSubscribe";

  $data = array(
      'email_address'=>$email,
      'apikey'=>$apiKey,
      'id' => $listId,
      'double_optin' => $double_optin,
      'send_welcome' => $send_welcome,
      'email_type' => $email_type
  );
  $payload = json_encode($data);
   
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $submit_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, urlencode($payload));
   
  $result = curl_exec($ch);
  curl_close ($ch);
  $data = json_decode($result);

  if ($data->error){
    echo '<p class="alert"><i class="fa fa-exclamation-triangle"></i>'.$data->error.'</p>';
  } else {
    echo "<p class='success'><i class='fa fa-envelope'></i>Awesome! We sent you a confirmation email.</p>";
  }
?>