    function activeonly($obj){
        $(".active-border").removeClass("active-border");
        $obj.addClass("active-border");
    }
    var $dragwho;
    var $isdragging=false;
    $(function(){
        $('body *').draggable({
            containment: 'document',
            helper: 'clone',
            zIndex:1,
            stop: function(event, ui) {
                //$(ui.helper).clone(true).removeClass('box ui-draggable ui-draggable-dragging').addClass('box-clone').appendTo('body');
                $isdragging = false;
            },
            start: function(event, ui) {
                $isdragging = true;
                $(ui.helper).width($(this).width());
                $(ui.helper).height($(this).height());
                //$(ui.helper).droppable("disable");
                $(ui.helper).removeClass("ui-droppable");
                //$(this).droppable("disable");
                activeonly($(this));
                $(ui.helper).addClass("active-border");
            }
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

        $("body").attr("onselectstart","return false;");
        $("body *").after("<div class=\"bar__after__\"></div>");
        $("body *:not(.bar__after__)").before("<div class=\"bar__before__\"></div>");
        $(".navbar *").remove(".bar__after__");
        $(".navbar *").remove(".bar__before__");
        $("[class^='col-md-']").prev().remove(".bar__before__");
        
        $(".bar__after__").each(function(){
            //$(this).append("<div style=\"height:"++"px;width:"+$(this).prev().outerWidth()+"px"+"\"></div>");
        });
        $(".bar__before__").each(function(){
            $(this).append("<div style=\"width:"+$(this).next().outerWidth()+"px"+"\"></div>");
            
        });
        //$(".bar__after__ div").hide();
        var $times = 0;
        $(".bar__before__ div").droppable({
            over:function(){
                //$(".active-drop").removeClass("active-drop");
                $(this).addClass("active-drop");
                $(this).addClass("over-drop");
            },
            out:function(){
                $(this).removeClass("active-drop");
                $(this).addClass("over-drop");
                $(this).parent().parent().prev().find(".over-drop").addClass("active-drop");
                //$(this).parent().parent().prev().find(".over-drop").hide();
                //var $aaa = $(this).parent().parent().prev();//.find(".over-drop").html());
                //alert($aaa.html());
                //alert($aaa.find(".over-drop").html());
            }
        });
    });
    
