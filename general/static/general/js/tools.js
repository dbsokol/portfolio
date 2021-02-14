/* global $, csrf_token */

var last_response;

function GET(props) {
  
  // default success function:
  props.success = props.success || function(response) {
    props.table.ajax.reload(null, false);
  };
  
  // default error function:
  props.error = props.error || function(response) {
    console.log(response);
    alert('something went wrong');
  };
    
  // verbose level:
  if(props.verbose_level === undefined) props.verbose_level = 2;
    
  // send ajax request:
  $.ajax({
    url : props.url,
    type : 'GET',
    beforeSend:function(xhr){
      if (props.verbose_level>1) console_log_request(props.url, props.data, 'GET');
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
    },
    data : props.data,
    success : props.success,
    error : props.error,
    complete:function(response) {
      if (props.verbose_level>1) console_log_response(props.url, response);
      last_response = response;
    }
  });
  
}

// prints front end request:
function console_log_request(url, data, method) {
  
  var datetime = Date().split(' GMT')[0];
  var date_message = datetime;
  var date_style = 'background-color:white; color:DarkSlateGrey';
  var type_message = ' REQUEST ';
  var type_style = 'background-color:blue; color:white';
  var content_message = 'URL [' + url + '] Method [' + method + '] Data [' + JSON.stringify(data) + ']';
  var content_style = 'background-color:white; color:black';
  var message = '%c' + date_message + '%c  %c' + type_message + '%c ' + content_message;

  console.log(message, date_style, content_style, type_style, content_style);
}


// prints backend response:
function console_log_response(url, response) {
  var datetime = Date().split(' GMT')[0];

  var date_message = datetime;
  var date_style = 'background-color:white; color:DarkSlateGrey';
  var type_message = ' RESPONSE ';
  var type_style = 'background-color:red; color:white';
  var content_message = 'URL [' + url + '] Status [' + response.status + '] Message [' + response.statusText + ']';
  var content_style = 'background-color:white; color:black';
  var message = '%c' + date_message + ' %c' + type_message + '%c ' + content_message;

  console.log(message, date_style, type_style, content_style);
  
}



