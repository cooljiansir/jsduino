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
$("#leftmenu-design").click(function(){
    $(".leftselected").hide();
    $(".leftselected").removeClass("leftselected");
    
    $(".leftmenuselected").removeClass("leftmenuselected");
    $(this).addClass("leftmenuselected");
    
    $("#ui-editor").addClass("leftselected");    
    $(".leftselected").show();
});
$("#leftmenu-download").click(function(){
    $("#dialogback").show();
    
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

 /*
 var exec = require('child_process').execFile;

    var fun =function(){
       console.log("fun() start");
          exec('E:\\pscp.exe',
               ['-scp','-l','root','-pw','doghunter','192.168.240.1:/www/index.html','E:/'], 
               {    encoding: 'utf8',
                    timeout: 0,
                    maxBuffer: 200*1024,
                    killSignal: 'SIGTERM',
                    cwd: './',
                    env: null },
               function(err,stdout,stderr) {
            console.log("Error "+err)
            console.log("stdout "+stdout);
            console.log("stderr "+stderr);
        });  
    }
    fun();
 */

var myCodeMirror2 = CodeMirror.fromTextArea(document.getElementById("code-textarea"),{
    mode: 'htmlmixed',  
    indentWithTabs: true,  
    smartIndent: true,  
    lineNumbers: true,  
    matchBrackets : true,  
    autofocus: true  
});


myCodeMirror2.setSize($("#viewercontainer").width(),$("#centerdiv").height()-$("#viewercontainer").height());
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
        myCodeMirror2.setSize($("#viewercontainer").width(),$("#centerdiv").height()-$("#viewercontainer").height());
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
        myCodeMirror2.setSize($("#codeedit").width(),$("#centerdiv").height()-$("#viewercontainer").height());
        $("#active-border").hide();
    }
});                   