$(function(){    
    var dragwho = null;
    var dragmove = -1;  //-1 invalid ;1 move;2 add
    var whoisclosest = null;
    var direction;
    
    //id => element
    var addtable={
        'widget_row':"<div class=\"row\">Empty row</div>",
        'widget_button':'<a class="btn btn-primary">Click me</a>'
    };
    
    $("#viewer iframe").load(function(){
        $iframe = $("#viewer iframe").contents();
        ///////////////////////////////////////////
        function hover(element){
            $(element).mouseenter(function(){
                $iframe.find(".active-border").removeClass("active-border");
                $iframe.find(this).addClass("active-border");
            });
            $(element).mouseleave(function(){
                $(this).css("border","");
                $(this).css("box-sizing:","");
                if($(this).prop("tagName")=="HTML")
                    return;
                if($(this).parent().is(":hover")){
                    $iframe.find(".active-border").removeClass("active-border");
                    $(this).parent().addClass("active-border");
                }
            });
        }
        
        /////////////////////////////////////////////
        
        function dragstart(event){
            dragwho = event.target;
            $iframe.find(".active-border").removeClass("active-border");
            $(dragwho).addClass("active-border");
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
            $iframe.find("#active-border").show();
            return false;
        }
        function dragover(event){
            event.preventDefault();
            var offset={left:event.clientX,top:event.clientY};
            offset.top += $iframe.find("body").scrollTop();
            offset.left +=  $iframe.find("body").scrollLeft();
            var mmin = 1<<28;
            whoisclosest = null;
            
            $iframe.find(".active-drop").not("div[class^='col-md-']").each(function(){
                whoisclosest = $(this);
                if(offset.top<$(this).offset().top+$(this).outerHeight()/2){
                    $iframe.find("#active-border").offset($(this).offset());
                    direction = 1;
                }else{
                    var offset2 = $(this).offset();
                    offset2.top += $(this).outerHeight();
                    $iframe.find("#active-border").offset(offset2);
                    direction = 2;
                }
                $iframe.find("#active-border").css("height","0");
                $iframe.find("#active-border").css("width",$(this).outerWidth()+"px");
            });
            $iframe.find(".active-drop").filter("div[class^='col-md-']").each(function(){
                whoisclosest = $(this);
                if(offset.left<$(this).offset().left+$(this).outerWidth()/2){
                    $iframe.find("#active-border").offset($(this).offset());
                    direction = 3;
                }else{
                    var offset2 = $(this).offset();
                    offset2.left += $(this).outerWidth();
                    $iframe.find("#active-border").offset(offset2);
                    direction = 4;
                }
                $iframe.find("#active-border").css("width","0");
                $iframe.find("#active-border").css("height",$(this).outerHeight()+"px");
            });
            return false;
        }
        function drop(event){
            event.preventDefault();
            $iframe.find("#active-border").hide();
            if(!$(this).hasClass("active-drop"))
                return false;
            if(dragmove==1){
                if(whoisclosest!=null){
                    if(direction==1||direction==3)
                        $(whoisclosest).before($(dragwho));
                    if(direction==2||direction==4)
                        $(whoisclosest).after($(dragwho));
                }
            }
            else if(dragmove==2){
                var id = $(dragwho).attr('id');
                var append = addtable[id];
                //alert();
                if(whoisclosest!=null){
                    if(direction==1||direction==3){
                        $(whoisclosest).before(append);
                        //initelement($(whoisclosest).prev());
                        //$iframe.location.reload();
                    }
                    if(direction==2||direction==4){
                        $(whoisclosest).after(append);
                        //initelement($(whoisclosest).next());
                        //$iframe.location.reload();
                    }
                    
                }
            }
            return false;
        }
        function initelement(element){
            $(element).mousedown(function(){
                $(element).attr("draggable","true");
            });
            $(element).mouseup(function(){
                $(element).removeAttr("draggable");
            });
            element.addEventListener('dragstart',dragstart,false); 
            element.addEventListener('dragenter',dragenter,false); 
            element.addEventListener('dragover',dragover,false); 
            element.addEventListener('drop',drop,false);
            element.addEventListener('dragend',dragend,false);
            
            hover(element);
        }
        $iframe.find("body *").each(function(){
            initelement(this);
        });
        $("#widgetList ul li").attr("draggable","true");
        $("#widgetList ul li *").attr("draggable","false");
        $("#widgetList ul li").each(function(){
            this.addEventListener("dragstart",dragaddstart,false);
            this.addEventListener("dragend",dragaddend,false);
        });
    });
});