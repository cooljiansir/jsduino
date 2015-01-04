$(function(){    
    var dragwho = null;
    var dragmove = -1;  //-1 invalid ;1 move;2 add
    var whoisclosest = null;
    var direction;
    var whoisclosest_ = null;
    var direction_;
    
    
    $("#viewer iframe").load(function(){
        $iframe = $("#viewer iframe").contents();
        
        
        $("#over").width($iframe.width());
        $("#over").height($iframe.height());
        $(window).resize(function(event){
            $("#over").width($iframe.width());
            $("#over").height($iframe.height());
            console.log("resize");
        });
        
        ///////////////////////////////////////////
        function activeonly(element){
                //$("#over").width($($iframe).width());
                //$("#over").width($($iframe).height());
                //$("#over").offset({top:$("#over").parent().offset().top-$iframe.scrollTop(),
                //                   left:$("#over").parent().offset().left+$iframe.scrollLeft()});
                $("#active-border").offset({top:$(element).offset().top+$("#over").offset().top,
                                           left:$(element).offset().left+$("#over").offset().left});
                $("#active-border").css("width",$(element).outerWidth()+"px");
                $("#active-border").css("height",$(element).outerHeight()+"px");
        }
        function hover(element){
            $(element).mouseenter(function(){
                $("#active-border").show();
                $iframe.find(".active-border").removeClass("active-border");
                $iframe.find(this).addClass("active-border");
                
                activeonly(element);
                
            });
            $(element).mouseleave(function(){
                $(this).css("border","");
                $(this).css("box-sizing:","");
                if($(this).prop("tagName")=="HTML"){
                    return;
                }
                if($(this).parent().is(":hover")){
                    $iframe.find(".active-border").removeClass("active-border");
                    $(this).parent().addClass("active-border");
                    
                    activeonly($(this).parent());
                }
            });
        }
        
        /////////////////////////////////////////////
        
        function dragstart(event){
            dragwho = event.target;
            activeonly(dragwho);
            dragmove = 1;
            
        }
        function dragend(event){
            dragwho = null;
            dragmove = -1;
        }
        function dragaddstart(event){
            dragwho = event.target;
            dragmove = 2;
        }
        function dragaddend(event){
            dragwho = null;
            dragmove = -1;
        }
        function dragenter(event){
            $iframe.find(".active-drop").removeClass("active-drop");
            $(event.target).addClass("active-drop");
            $("#drag-helper").show();
            return false;
        }
        function dragover(event){
            event.preventDefault();
            //return false;
            if(!$(this).hasClass("active-drop"))
                return false;
            //console.log("pageX "+ event.originalEvent.pageX+" pageY "+event.originalEvent.pageY);
            
            var offset={left:event.originalEvent.pageX,top:event.originalEvent.pageY};
            
            var mmin = 1<<28;
            whoisclosest = null;
            var fatheroffset = $("#over").offset();
            
//            $(this).not("div[class^='col-md-']").each(function(){
//                console.log("drag over");
//            });
            //$iframe.find(".active-drop").not("div[class^='col-md-']").each(function(){
              $(this).not("div[class^='col-md-']").each(function(){
                whoisclosest = $(this);
                
                if(offset.top<$(this).offset().top+$(this).outerHeight()/2){
                    if(whoisclosest!=whoisclosest_||direction!=direction_)
                        $("#drag-helper").offset({left:$(this).offset().left+fatheroffset.left,
                                             top:$(this).offset().top+fatheroffset.top});
                    direction = 1;
                }else{
                    var offset2 = $(this).offset();
                    offset2.top += $(this).outerHeight();
                    
                    if(whoisclosest!=whoisclosest_||direction!=direction_)
                        $("#drag-helper").offset({left:offset2.left+fatheroffset.left,
                                             top:offset2.top+fatheroffset.top});
                    direction = 2;
                }
                if(whoisclosest!=whoisclosest_||direction!=direction_){
                    $("#drag-helper").css("height","0");
                    $("#drag-helper").css("width",$(this).outerWidth()+"px");
                }
                whoisclosest_ = whoisclosest;
                direction_ = direction;
            });
            
            //$iframe.find(".active-drop").filter("div[class^='col-md-']").each(function(){
            $(this).filter("div[class^='col-md-']").each(function(){
                whoisclosest = $(this);
                if(offset.left<$(this).offset().left+$(this).outerWidth()/2){
                    if(whoisclosest!=whoisclosest_||direction!=direction_){
                        $("#drag-helper").offset({left:$(this).offset().left+$("#over").offset().left,
                                             top:$(this).offset().top+$("#over").offset().top});
                    }
                    direction = 3;
                }else{
                    var offset2 = $(this).offset();
                    offset2.left += $(this).outerWidth();
                    if(whoisclosest!=whoisclosest_||direction!=direction_){
                        $("#drag-helper").offset({left:offset2.left+fatheroffset.left,
                         top:offset2.top+fatheroffset.top});
                    }
                    direction = 4;
                }
                if(whoisclosest!=whoisclosest_||direction!=direction_){
                    $("#drag-helper").css("width","0");
                    $("#drag-helper").css("height",$(this).outerHeight()+"px");
                }
                whoisclosest_ = whoisclosest;
                direction_ = direction;
            });
            return false;
        }
        function drop(event){
            event.preventDefault();
            
            console.log("drop "+dragmove);
            console.log("this "+$(this).attr("class"));
            $("#drag-helper").hide();
            if(!$(this).hasClass("active-drop"))
                return false;
            if(dragmove==1){
                console.log("drop 11");
                if(whoisclosest!=null){
                    console.log("drop 1");
                    if(direction==1||direction==3)
                        $(whoisclosest).before($(dragwho));
                    if(direction==2||direction==4)
                        $(whoisclosest).after($(dragwho));
                }
            }
            else if(dragmove==2){
                console.log("drop 22");
                var ape = $(dragwho).next(".clonepattern").children().clone(true,true);
                //alert();
                if(whoisclosest!=null){
                    console.log("drop 2");
                    if(direction==1||direction==3){
                        $(whoisclosest).before(ape);
                        $(ape).show();
                    }
                    if(direction==2||direction==4){
                        $(whoisclosest).after(ape);
                        $(ape).show();
                    }
                    
                }
            }
            return false;
        }
        function dragmousedown(){
            $(this).attr("draggable","true");
        }
        function dragmouseup(){
            $(this).removeAttr("draggable");
        }
        function initelement(element){
            $(element).on("mousedown",dragmousedown);
            $(element).on("mouseup",dragmouseup);
            $(element).on("dragstart",dragstart);
            $(element).on("dragenter",dragenter);
            $(element).on("dragover",dragover);
            $(element).on("drop",drop);
            $(element).on("dragend",dragend);
            
            hover(element);
        }
        
        $iframe.find("body *").each(function(){
            initelement(this);
        });
        $("#widgetList ul li").attr("draggable","true");
        $("#widgetList ul li *").attr("draggable","false");
        $("#widgetList ul li").each(function(){
            //this.addEventListener("dragstart",dragaddstart,false);
            $(this).on("dragstart",dragaddstart);
            $(this).on("dragend",dragaddend);
            //this.addEventListener("dragend",dragaddend,false);
        });
        $("#widgetList ul li.clonepattern > *").each(function(){
            initelement(this);
        });
        
        ////////////////////////////////////////
        $($iframe).scroll(function(event){
                $("#over").offset({top:$("#over").parent().offset().top-$iframe.scrollTop(),
                                   left:$("#over").parent().offset().left+$iframe.scrollLeft()});
        });
        
        
        ////////////////////////////////////////
        //$("#code-textarea").text($iframe.html());
        //console.log("content "+$("#viewer iframe")[0].html());
        var frameObj = document.getElementById("frame");
        //var frameContent = frameObj.contentWindow.document.body.outerHTML;
        var frameContent = $("#frame").contents().find("html")[0].outerHTML;
        
        //$("#frame").contents()
        //$("#code-textarea").text(frameContent);
        myCodeMirror2.getDoc().setValue($("#frame").contents().find("html")[0].outerHTML);
        

    });
});