    function activeonly($obj){
        $(".active-border").removeClass("active-border");
        $obj.addClass("active-border");
    }
    var $dragwho=null;
    var $isdragging=false;
    var whoisclosest=null;
    var direction=1;
    $(function(){
        $('body *').draggable({
            containment: 'document',
            helper: 'clone',
            zIndex:1,
            stop: function(event, ui) {
                //$(ui.helper).clone(true).removeClass('box ui-draggable ui-draggable-dragging').addClass('box-clone').appendTo('body');
                $isdragging = false;
                $("#active-border").hide();
                if(whoisclosest!=null){
                    if(direction==1)
                        $(whoisclosest).before($($dragwho));
                    if(direction==2)
                        $(whoisclosest).after($($dragwho));
                    if(direction==3)
                        $(whoisclosest).before($($dragwho));
                    if(direction==4)
                        $(whoisclosest).after($($dragwho));
                }
            },
            start: function(event, ui) {
                $isdragging = true;
                $dragwho = $(this);
                $("#active-border").show();
                $(ui.helper).width($(this).width());
                $(ui.helper).height($(this).height());
                //$(ui.helper).droppable("disable");
                $(ui.helper).removeClass("ui-droppable");
                //$(this).droppable("disable");
                activeonly($(this));
                $(ui.helper).addClass("active-border");
            },
            drag:function(event,ui){
                var offset = ui.offset;
                var mmin = 1<<28;
                whoisclosest = null;
                $(".active-drop").not("div[class^='col-md-']").each(function(){
                    whoisclosest = $(this);
                    if(offset.top<$(this).offset().top+$(this).outerHeight()/2){
                        $("#active-border").offset($(this).offset());
                        direction = 1;
                    }else{
                        var offset2 = $(this).offset();
                        offset2.top += $(this).outerHeight();
                        $("#active-border").offset(offset2);
                        direction = 2;
                    }
                    $("#active-border").css("height","0");
                    $("#active-border").css("width",$(this).outerWidth()+"px");
                    $("#active-border").css("border","4px blue solid");
                });
                $(".active-drop").filter("div[class^='col-md-']").each(function(){
                    whoisclosest = $(this);
                    if(offset.left<$(this).offset().left+$(this).outerWidth()/2){
                        $("#active-border").offset($(this).offset());
                        direction = 3;
                    }else{
                        var offset2 = $(this).offset();
                        offset2.left += $(this).outerWidth();
                        $("#active-border").offset(offset2);
                        direction = 4;
                    }
                    $("#active-border").css("width","0");
                    $("#active-border").css("height",$(this).outerHeight()+"px");
                    $("#active-border").css("border","4px blue solid");
                });
            },
            cursorAt: { left: 0,top:0 }
        });
        
        $("body *").mouseenter(function(){
            if($isdragging){
                
            }
            else{
                activeonly($(this));
                $dragwho  = $(this);
            }
        });
        $("body *").mouseleave(function(){
            if($isdragging)
                return;
            $(this).css("border","");
            $(this).css("box-sizing:","");
            if($(this).prop("tagName")=="HTML")
                return;
            if($(this).parent().is(":hover")){
                activeonly($(this).parent());
                $dragwho  = $(this).parent();
            }
        });
        $("body *").droppable({
            over:function(event,ui){
                $(this).addClass("over-drop");
                $(".active-drop").removeClass("active-drop");
                $(this).addClass("active-drop");
            },
            out:function(event,ui){
                $(this).removeClass("over-drop");
                $(this).removeClass("active-drop");
                $(this).parent(".over-drop").addClass("active-drop");
            },
            tolerance: "pointer"
        });
    });
    
