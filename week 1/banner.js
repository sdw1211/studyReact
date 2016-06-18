	$(function() {
		$.ajax({
			url:"http://openapi.estgames.co.kr/banner/view.json",
			dataType:"jsonp",
			jsonp:"callback",
			data:{appKey:'2013111211', key:'8f17633e-4', channel:'est'},
			type:"get",
			success:function(data) {
				var main = $("#content"), i=data.banners.length;
				main.html('<div id="banner" class="banner m_banner" style="height: 1452px">' + makeNav(i) + makeBanners(data.banners) + "</div>");
			}
		});
		
		function makeNav(count) {
			var nav=[], isFirst=true, i=0, liTemplate = '<li class="{class}"><a href="#n" title="" data-index="{index}"></a></li>';
			
			nav.push("<ul class='nav'>");
			for(; i < count; i++) {
				nav.push(liTemplate
						.replace("{class}", isFirst ? "on" : "")
						.replace("{index}", i));
				isFirst =false;
			}
			nav.push("</ul>");
			
			return nav.join("");
		}
		
		
		function makeImageBanner(type, data) {
			
			var templi_main = '<li class="{class}" style="background:url(\'{imageUrl}\') no-repeat"><a href="{targetUrl}" target="{target}"></a></li>'
			, templi_game = '<li class="{class}"><a href="{targetUrl}" target="{target}"><img src="{imageUrl}" alt=""></a></li>', liTag = "";
			
			if (type === "main") {
				liTag = templi_main; 
			} else if (type === "game") {
				liTag = templi_game;
			} 
			
			return liTag
					.replace("{class}", data.isFirst ? "on" : "")
					.replace("{imageUrl}", data.imageUrl)
					.replace("{targetUrl}", data.targetUrl)
					.replace("{target}", data.target);
		}
		
		function makeBanners(banners, type) {
			var result=[], isFirst=true, i = 0, type =  type || "main";
			result.push('<ul class="b_img">');
			
			for(;i < banners.length; i++) {
				banners[i].isFirst = isFirst;
				result.push(makeImageBanner(type, banners[i]));
				isFirst = false;
			}
			result.push("</ul>");
			
			return result.join("");
		}
	});
