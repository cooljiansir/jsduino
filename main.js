    $(function(){
        var dragwho = null;
        var whoisclosest = null;
        var direction;
        $("body *").mouseenter(function(){
            $(".active-border").removeClass("active-border");
            $(this).addClass("active-border");
        });
        $("body *").mouseleave(function(){
            $(this).css("border","");
            $(this).css("box-sizing:","");
            if($(this).prop("tagName")=="HTML")
                return;
            if($(this).parent().is(":hover")){
                $(".active-border").removeClass("active-border");
                $(this).parent().addClass("active-border");
            }
        });

        function dragstart(event){
            dragwho = event.target;
        }
        function dragenter(event){
            $(".active-drop").removeClass("active-drop");
            $(event.target).addClass("active-drop");
            $("#active-border").show();
            return false;
        }
        function dragover(event){
            event.preventDefault();
            var offset={left:event.clientX,top:event.clientY};
            offset.top += $("body").scrollTop();
            offset.left +=  $("body").scrollLeft();
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
            return false;
        }
        function drop(event){
            event.preventDefault();
            $("#active-border").hide();
            if(dragwho!=null){
                if(whoisclosest!=null){
                    if(direction==1)
                        $(whoisclosest).before($(dragwho));
                    if(direction==2)
                        $(whoisclosest).after($(dragwho));
                    if(direction==3)
                        $(whoisclosest).before($(dragwho));
                    if(direction==4)
                        $(whoisclosest).after($(dragwho));
                }
            }
            return false;
        }
        $("body *").each(function(){
            $(this).attr("draggable","true");
            this.addEventListener('dragstart',dragstart,false); 
            this.addEventListener('dragenter',dragenter,false); 
            this.addEventListener('dragover',dragover,false); 
            this.addEventListener('drop',drop,false);
        });
        
    });
    
