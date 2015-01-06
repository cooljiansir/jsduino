
var HIGH="HIGH";
var LOW="LOW";

//at present pin can only be 13
//value "HIGH" or "LOW"
function digitalWrite(pin,value){    
    var result=-1;
    $.ajax({ 
      type : "get", 
      url : "/cgi-bin/testbash.sh?param="+value+"&function=digitalWrite", 
      async : false, 
      success : function(data){ 
          data = eval("(" + data + ")"); 
          if(data.result=="OK"){
              result = 1;
          }
        } 
      });
    return result;
}
