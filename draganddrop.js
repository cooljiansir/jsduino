/*$(function(){
    $("iframe").load(function(){
        var iframe = $(this).contents();
        
        var whoisclosest=null;
        var direction=1;
        //$('#widgetList ul li').attr("draggable","true");
        $('#widgetList ul li').draggable(
            helper: 'clone',
            iframeFix: true,
            zIndex: 100,
            cursorAt: { left: 0,top:0 }
        );
        $('#widgetList ul li').draggable({
            helper: 'clone',
            iframeFix: true,
            zIndex: 100,
            cursorAt: { left: 0,top:0 },
            drag:function(event,ui){
                var offset = ui.offset;
                var scrolltop = iframe.find("body").scrollTop();
                offset.top += scrolltop;
                var mmin = 1<<28;
                whoisclosest = null;
                iframe.find(".active-drop").not("div[class^='col-md-']").each(function(){
                    whoisclosest = $(this);
                    if(offset.top<$(this).offset().top+$(this).outerHeight()/2){
                        iframe.find("#active-border").offset($(this).offset());
                        direction = 1;
                    }else{
                        var offset2 = $(this).offset();
                        offset2.top += $(this).outerHeight();
                        iframe.find("#active-border").offset(offset2);
                        direction = 2;
                    }
                    iframe.find("#active-border").css("height","0");
                    iframe.find("#active-border").css("width",$(this).outerWidth()+"px");
                    iframe.find("#active-border").css("border","4px blue solid");
                });
                iframe.find(".active-drop").filter("div[class^='col-md-']").each(function(){
                    whoisclosest = $(this);
                    if(offset.left<$(this).offset().left+$(this).outerWidth()/2){
                        iframe.find("#active-border").offset($(this).offset());
                        direction = 3;
                    }else{
                        var offset2 = $(this).offset();
                        offset2.left += $(this).outerWidth();
                        iframe.find("#active-border").offset(offset2);
                        direction = 4;
                    }
                    iframe.find("#active-border").css("width","0");
                    iframe.find("#active-border").css("height",$(this).outerHeight()+"px");
                    iframe.find("#active-border").css("border","4px blue solid");
                });
            }
        });
        
        iframe.find("body *").droppable({
            iframeFix: true,
            over:function(event,ui){
                $(this).addClass("over-drop");
                iframe.find(".active-drop").removeClass("active-drop");
                $(this).addClass("active-drop");
            },
            out:function(event,ui){
                $(this).removeClass("over-drop");
                $(this).removeClass("active-drop");
                $(this).parent(".over-drop").addClass("active-drop");
            },
            tolerance: "pointer"
        });
        
        
        iframe.find("body *").on("dragenter",function(event){
            event.preventDefault();
            event.stopPropagation();
            $(this).addClass("over-drop");
            iframe.find(".active-drop").removeClass("active-drop");
            $(this).addClass("active-drop");
        });
        
    });    
});*/