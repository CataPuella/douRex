// https://github.com/prettycode/Object.identical.js
Object.identical = function (a, b, sortArrays) {
    function sort(object) {
        
        if (sortArrays === true && Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        }
        
        var result = [];
        
        Object.keys(object).sort().forEach(function(key) {
            result.push({
                key: key,
                value: sort(object[key])
            });
        });
        
        return result;
    }
    
    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

var radio = opera.extension.bgProcess.radio;
console.log(radio.channel);
//console.log(radio.recent_channels.length);

function showSong () {
    var data, 
        site, 
        page;
	data = radio.c_song;
    site = /site/;
	page = "http://music.douban.com" + data.album;
	if (data&&data.like == 1) {
		$("#like").attr("src", "img/rated.png");
	} else {
		$("#like").attr("src", "img/unrated.png");
	}
	if (radio.power == true) {
		$("#power").attr("src", "img/off.png");
		$("#pause").show();
		$("#search_lrc").show();
	} else {
		$("#power").attr("src", "img/on.png");
		$("#pause").hide();
		$("search_lrc").hide();
	}
    console.log(data.title);
	if (data.title) {
        if (site.test(data.album)) {
			$("#song_title").html("<a href='"+data.album+"'>"+data.title+"</a>");
        } else {
			$("#song_title").html("<a href='"+page+"'>"+data.title+"</a>");
        }
		$("#song_title").attr("title", data.title);
		$("#song_artist").html(data.artist);
		$("#song_artist").attr("title", data.artist);
	}
};

$("#skip").bind("click", function () {
	if (!radio.power) {
		return false;
	}
	radio.skip();
	showSong();
	return false;
});

$("#power").bind("click", function () {
	if (radio.power === false) {
		radio.powerOn();
		$(this).attr("src", "img/off.png");
		$("#pause").show();
		$("#search_lrc").show();
		showSong();
    console.log(radio.c_song.title)
	} else {
		radio.powerOff();
		$(this).attr("src", "img/on.png");
		$("#pause").hide();
		$("#search_lrc").hide();
		$("#song_title").html("--");
		$("#song_title").attr("title", "");
		$("#song_artist").html("豆瓣电台");
		$("#song_artist").attr("title", "豆瓣电台");
		$("#played").css("width", "0px");
		$("#timer").text("0:00/0:00");
	}
	return false;
});

$("#like").bind("click", function () {
	if (!radio.power) {
		return false;
	}
	if (radio.c_song.like == 0) {
		radio.like();
		$("#like").attr("src", "img/rated.png");
		radio.c_song.like=1;
	} else {
		radio.unlike();
		$("#like").attr("src", "img/unrated.png");
		radio.c_song.like=0;
	}
	return false;
});

$("#delete").bind("click", function () {
	if (!radio.power) {
		return false;
	}
	radio.del();
	showSong();
	return false;
});

// largely from <http://img3.douban.com/js/radio/packed_fm_share8987254155.js>
var share_sites = {
    douban: {
        label: "豆瓣",
        method: function (content, page) {
	var d=document, 
        e=encodeURIComponent, 
        s1=window.getSelection, 
        s2=d.getSelection, 
        s3=d.selection, 
        s=s1?s1():s2?s2():s3?s3.createRange().text:'', 
        r='http://www.douban.com/recommend/?url='+e(page)+'&title='+e(content)+'&sel='+e("#豆瓣电台#")+'&v=1', 
        x=function () {
            if (!window.open(r, 'douban', 'toolbar=0, resizable=1, scrollbars=yes, status=1, width=450, height=330'))
                location.href=r+'&r=1'};
    if (/Firefox/.test(navigator.userAgent)) {setTimeout(x, 0)}
    else{x()}
        }
    },
    fanfou: {
        label: "饭否",
        method: function (content, page) {
	var d=document,
        w=window,  
        f='http://fanfou.com/share',
        l=d.location,
        e=encodeURIComponent,
        p='?u='+e(page)+'&t='+e(content)+'&d='+e("#豆瓣电台#")+'&s=bm';
	    a=function () {
            if (!w.open(f+'r'+p, 'sharer', 'toolbar=0, status=0, resizable=0, width=600, height=400'))
                l.href=f+'.new'+p
        };
	if (/Firefox/.test(navigator.userAgent))setTimeout(a, 0);
    else{a()}void(0)
        }
    },
    sina: {
        label: "新浪微博",
        method: function (content, page) {
    void((function (s, d, e, r, l, p, t, z, c) {
        var f='http://v.t.sina.com.cn/share/share.php?appkey=3672978985', u=z||d.location, p=['&url=', e(u), '&title=', e(t||d.title), '&source=', e(r), '&sourceUrl=', e(l), '&content=', c||'gb2312', '&pic=', e(p||'')].join('');
        function a() {
            if (!window.open([f, p].join(''), 'mb', ['toolbar=0, status=0, resizable=1, width=440, height=430, left=', (s.width-440)/2, ', top=', (s.height-430)/2].join('')))
                u.href=[f, p].join('');
        };
        if (/Firefox/.test(navigator.userAgent))setTimeout(a, 0);else a();
    })(screen, document, encodeURIComponent, '', '', radio.c_song.picture, content, page, 'utf-8'));
        }
    }
};

$("#share_wrap img").bind("click", function (e) {
    var content,
        page;
	if (!radio.power)
		return false;
	content=$("#song_artist").attr("title")+"--"+$("#song_title").attr("title");
	if (radio.channel == 26) {
		page=radio.c_song.album;
    } else {
		page="http://music.douban.com"+radio.c_song.album;
    }
    var t = $(e.currentTarget).attr("class").replace("s-", ""),
        s = share_sites[t];
    s.method(content, page);
});

$("#range")[0].addEventListener("input", function () {
	var d = $(this).val();
	var len = $(this).val()/100*50;
	$("#volume_bar").css("width", len+"px");
	//var a=radio.audio.volume=$(this).val()/100
	radio.jaudio.jPlayer("volume", $(this).val()/100);
	localStorage["volume"] = $(this).val()/100;
})

$("#volume img").toggle(function () {
	$("#range").show();
	$("#volume_bar").show();
}, function () {
	$("#range").hide();
	$("#volume_bar").hide();
})

$("#switcher").bind("click", function () {
	$("#channel_popup").fadeIn("normal");
	var sc=localStorage.channel ? localStorage.channel : "0";
	var c=$("#"+sc);
	$("#"+sc).addClass("channel_selected")
		.siblings().removeClass("channel_selected");
})

$(".channel-box li").live("click", function () {
	//var sc=$(this).attr("id");
	var sc=$(this).data("cid");
	localStorage["channel"]=sc;
	radio.channel=sc;
	$(this).addClass("channel_selected")
		.siblings().removeClass("channel_selected");
	$("#channel_popup").fadeOut("normal")
	if (radio.power == true) {
		radio.powerOn();
		showSong();
	}
    var c = {};
    c.cid = $(this).data("cid");
    c.name = $(this).text();
    c.intro = $(this).find("a").attr("title");
    $.getJSON("http://douban.fm/j/explore/recent_chls", 
      function (data) {
        radio.recent_channels = data.data.chls;
    });
    console.log(c.name);
})

$("#close_c").bind("click", function () {
	$("#channel_popup").fadeOut("slow");
})


$("#pause").bind("click", function () {
	//radio.audio.pause()
	radio.jaudio.jPlayer("pause");
	if (!radio.power) {
		return false;
	}
	$("#mask").show();
});

$("#mask").bind("click", function () {
	//radio.audio.play()
	radio.jaudio.jPlayer("play");
	$("#mask").hide();
});

radio.jaudio.unbind(".douRex");
radio.jaudio.bind($.jPlayer.event.timeupdate+'.douRex', function (event) {
	//var t=(this.currentTime/this.duration)*230
	var current = radio.jaudio.data("jPlayer").status.currentTime;
	var total = radio.jaudio.data("jPlayer").status.duration;
	var t = (current/total) * 240;
	$("#played").css("width", t+"px");
	var min = 0;
	var second = 0;
	//var current=this.currentTime
	min = parseInt(current/60);
	second = parseInt(current%60);
	if (second < 10) {
		second = "0" + second;
	}
	var c = min + ":" + second;
	min = 0;
	second = 0;
	//total=this.duration
	min = parseInt(total/60);
	second = parseInt(total%60);
	if (second < 10) {
		second = "0" + second;
	}
	var t = min + ":" + second;
	$("#timer").text(c + "/" + t);
})

radio.jaudio.bind($.jPlayer.event.ended+'.douRex', function (event) {
	opera.postError("ended");
	radio.reportEnd();
	radio.changeSong("p");
	opera.postError(radio.c_song.title);
	showSong();
})

if (radio.power) {
	showSong();
	if (radio.jaudio.data("jPlayer").status.paused) {
		$("#mask").show()
	}
}
var vol=localStorage["volume"]
if (!vol) {
	vol=0.8;
}
$("#range").val(vol*100);
$("#volume_bar").css("width", vol*50+"px");
radio.jaudio.jPlayer("volume", vol);
//audio.volume=vol

