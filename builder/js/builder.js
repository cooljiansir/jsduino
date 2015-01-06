$("body").attr("onselectstart", "return false;");
$("#widgetList").attr("onselectstart", "return false;");
$("#leftmenu").attr("onselectstart", "return false;");
$("#topmenu").attr("onselectstart", "return false;");
$("#rightcenterdiv").attr("onselectstart", "return false;");
$("#viewer").attr("onselectstart", "return false;");
$("#viewer iframe body").contents().find("*").attr("onselectstart", "return false;");
$("#widgetList .bar").click(function() {
    if ($(this).next("ul").is(":visible")) {
        $(this).next("ul").hide();
    } else {
        $(this).next("ul").show();
    }
});
$('#widgetListcontainer').resizable({
    handles: 'e',
    start: function(event, ui) {
        $("#wrapper").css("pointer-events", "auto");
    },
    stop: function(event, ui) {
        $("#wrapper").css("pointer-events", "none");
    }
});

$("#doctreediv").resizable({
    handles: 's'
});
$("#leftmenu-demo").click(function(){
    $(".leftselected").hide();
    $(".leftselected").removeClass("leftselected");
    
    $(".leftmenuselected").removeClass("leftmenuselected");
    $(this).addClass("leftmenuselected");
    
    $("#demos").addClass("leftselected");    
    $(".leftselected").show();
});


$("#leftmenu-demo").addClass("leftmenuselected");
$("#demos").addClass("leftselected");
$("#demos").show();


$("#leftmenu-edit").click(function(){
    $(".leftselected").hide();
    $(".leftselected").removeClass("leftselected");
    
    $(".leftmenuselected").removeClass("leftmenuselected");
    $(this).addClass("leftmenuselected");
    
    $("#code-editor").addClass("leftselected");    
    $(".leftselected").show();
    
    var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("jscode-textarea"),{
        mode: 'javascript',  
        indentWithTabs: true,  
        smartIndent: true,  
        lineNumbers: true,  
        matchBrackets : true,  
        autofocus: true  
    });
});
var myCodeMirror2="";
$("#leftmenu-design").click(function(){
    $(".leftselected").hide();
    $(".leftselected").removeClass("leftselected");
    
    $(".leftmenuselected").removeClass("leftmenuselected");
    $(this).addClass("leftmenuselected");
    
    $("#ui-editor").addClass("leftselected");    
    $(".leftselected").show();
    
    myCodeMirror2 = CodeMirror.fromTextArea(document.getElementById("code-textarea"),{
        mode: 'htmlmixed',  
        indentWithTabs: true,  
        smartIndent: true,  
        lineNumbers: true,  
        matchBrackets : true,  
        autofocus: true  
    });

    myCodeMirror2.setSize($("#viewercontainer").width(),$("#centerdiv").height()-$("#viewercontainer").height());
});
$("#leftmenu-download").click(function(){
    $("#downloaddialog").dialog({modal:true,draggable: true,width:700,title:'Download to your linino'});
    $("#dlstatus").html("");
});


     //get node webkit GUI
var gui = require('nw.gui');

     // get the window object
var win = gui.Window.get();
var menubar = new gui.Menu({type: 'menubar'}); 
var file = new gui.Menu(); 
file.append(new gui.MenuItem({label: 'Action 1',click: function() {alert('Action 1 Clicked');}})); 
file.append(new gui.MenuItem({label: 'Action 2',click: function() {alert('Action 2 Clicked');}}));
var edit = new gui.Menu(); 
edit.append(new gui.MenuItem({label: 'Action 1',click: function() {alert('Action 1 Clicked');}})); 
edit.append(new gui.MenuItem({label: 'Action 2',click: function() {alert('Action 2 Clicked');}}));             

menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit}));
menubar.append(new gui.MenuItem({ label: 'Tools', submenu: file}));
menubar.append(new gui.MenuItem({ label: 'Help', submenu: edit}));             

win.menu = menubar;

$("#downloadbut").click(function(){
    $ip="192.168.240.1";
    $username="root";
    $password="doghunter";
    $("#dlstatus").html("Connecting...");
    
    
    var firstline = true;
    
    function scpdata(data){
        if(firstline){
            firstline = false;
            $("#dlstatus").html("<h5></h5>");
        }
        $("#dlstatus").append("<h5>"+data+"</h5>");
        $("#dlstatus").scrollTop($("#dlstatus").height()+$("#dlstatuswrapper").height());
    }
    function errdata(data){
        if(String(data).indexOf("The server's host key is not cached in the registry.")>=0){
            webscp.stdin.write("n\n");
        }else{
            if(firstline){
                firstline = false;
                $("#dlstatus").html("");
            }
            $("#dlstatus").append("<span>"+data+"</span>");
        }
    }
    var spawn = require('child_process').spawn;
    //scp the web files
    var webscp = spawn('bin/pscp.exe',['-scp','-l',$username,'-pw',$password,'-r','examples/helloworld',$ip+':/www/'],{cwd: './'});
    webscp.stdout.on('data',scpdata);
    webscp.stderr.on('data',errdata);
    //scp the .sh files
    var bashscp = spawn('bin/pscp.exe',['-scp','-l',$username,'-pw',$password,'server/testbash.sh',$ip+':/www/cgi-bin/'],{cwd: './'});
    bashscp.stdout.on('data',scpdata);
    bashscp.stderr.on('data',errdata);

    bashscp.on('exit',function(code){
    //chmod a+x testbash.sh 
        /*
        var Connection = require('ssh2');

        var conn = new Connection();
        conn.on('ready', function() {
          console.log('Connection :: ready');
          conn.shell(function(err, stream) {
            if (err) throw err;
            stream.on('close', function() {
              console.log('Stream :: close');
              conn.end();
            }).on('data', function(data) {
              console.log('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
              console.log('STDERR: ' + data);
            });
            stream.end('chmod a+x /www/cgi-bin/testbash.sh \n');
          });
        }).connect({
          host: $ip,
          port: 22,
          username: $username,
          password: $password
        });    
        */
        var Connection = require('ssh2');

var conn = new Connection();
conn.on('ready', function() {
  console.log('Connection :: ready');
  conn.exec('chmod a+x /www/cgi-bin/testbash.sh', function(err, stream) {
    if (err) throw err;
    stream.on('exit', function(code, signal) {
      console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
    }).on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
          host: $ip,
          port: 22,
          username: $username,
          password: $password
        }); 
        
    });
    

});




//myCodeMirror2.setSize($("#codeedit").width(),$("#codeedit").height());
$('#viewercontainer').resizable({
    handles: 's',
    start: function(event, ui) {
        $("#wrapper").css("pointer-events", "auto");
    },
    stop: function(event, ui) {
        $("#wrapper").css("pointer-events", "none");
    },
    resize:function(event,ui){
        if(myCodeMirror2!="")myCodeMirror2.setSize($("#viewercontainer").width(),$("#centerdiv").height()-$("#viewercontainer").height());
    }
});
$('#centerdiv').resizable({
    handles: 'e',
    start: function(event, ui) {
        $("#wrapper").css("pointer-events", "auto");
    },
    stop: function(event, ui) {
        $("#wrapper").css("pointer-events", "none");
    },
    resize:function(event,ui){
        if(myCodeMirror2!="")myCodeMirror2.setSize($("#codeedit").width(),$("#centerdiv").height()-$("#viewercontainer").height());
        $("#active-border").hide();
    }
});

