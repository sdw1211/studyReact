$(function() {
	
	var banner1 = new banRolling(".m_banner",3500,500);
	banner1.autoRolling();
	$(".m_banner").on("click", ".nav li a", function(e){
		e.preventDefault();
        clickIdx = $(this).parent().index();
		banner1.nav();
        $(this).parent("li").siblings().removeClass("on");
        $(this).parent().addClass("on");        
    }).on("mouseenter", "ul.b_img li", function(e) {
    	banner1.rollingStop();
    }).on("mouseleave", "ul.b_img li", function(e) {
    	banner1.autoRolling();
    });
	//메인배너롤링	
	function banRolling(banNum,dTime,mSpeed){
	    var b_a_r;
		var speed = mSpeed;
		var ease = "easeInOutQuart";
	    this.delay = dTime;
	    this.rolling = function(){
	        var bIdx = $(banNum).find(".nav li.on").index();
	        var bLen = $(banNum).find(".nav li").length;
	        bIdx ++;	
	        $(banNum).find(".b_img li:eq("+(bIdx-1)+")").stop().animate({left:-100+"%"},speed,ease,function(){
	            $(this).hide();
	         });
	        if(bIdx != bLen){
	            $(banNum).find(".b_img li:eq("+bIdx+")").show().css("left","100%").stop().animate({left:0},speed,ease);
	        } else{
	            $(banNum).find(".b_img li:first").show().css("left","100%").stop().animate({left:0},speed,ease);
	            bIdx = 0;
	        }
	        $(banNum).find(".nav li").removeClass("on");
	        $(banNum).find(".nav li:eq("+bIdx+")").addClass("on");
	    }
	    this.autoRolling = function(){
	        b_a_r = setInterval(this.rolling, this.delay);
	    }
	    this.rollingStop = function(){
	        clearInterval(b_a_r); 	
	    }
	    this.nav = function(){
	        this.rollingStop();
			var onIdx = $(banNum).find(".nav li.on").index();
			if(clickIdx > onIdx){
				$(banNum).find(".b_img li:eq("+onIdx+")").stop().animate({left:-100+"%"}, "jswing", function(){$(this).hide();});
				$(banNum).find(".b_img li:eq("+clickIdx+")").stop().show().css("left","100%").animate({left:0},ease);
			}else if(clickIdx < onIdx){
				$(banNum).find(".b_img li:eq("+onIdx+")").stop().animate({left:100+"%"}, "jswing", function(){$(this).hide();});
				$(banNum).find(".b_img li:eq("+clickIdx+")").stop().show().css("left","-100%").animate({left:0},ease);
			} 
			bIdx = clickIdx;
	        this.autoRolling();
	    }
	}
})