/**
 * 封装radio操作
 * */
var Radio = function () {
	this.c_song = {};
	this.song_list = [];
	this.channel = 0;
	this.power = false;
	this.audio = null;
	this.jaudio = null;
	this.uid = '';
	this.heared = '';
	this.context = '';
};

/**
 *初始化播放器
 * */
Radio.init = function (audio) {
	var radio = new Radio();
    //TODO: when commented out, the song-title won't show on start-up, don't know the reason yet!
    $.ajaxSetup({async:false});
	//radio.audio = audio;  // maybe html5 in opera will support mp3 later
	radio.jaudio = audio;
    radio.jaudio.volume = localStorage.volume ? localStorage.volume : 0.8;
	radio.channel = localStorage.channel ? localStorage.channel : 0;
	//douban.fm的cookie是session级别，从豆瓣主站获取dbcl2的cookie到
	/*chrome.cookies.get({
		url:"http://douban.com",
		name:"dbcl2"	
	},function (b) {
		if(b) {
			chrome.cookies.set({
				url:"http://douban.fm",
				name:"dbcl2",
				value:b.value
			})
		}/
	})*/
    // fetch DJ channels
    var url = "http://douban.fm/",
        data,
        success,
        dataType;
    /*
    var jqxhr = $.ajax({
        url: url,
        data: data,
        success: success,
        dataType: dataType
    })*/
    var jqxhr = $.get("http://douban.fm/", data)
        .complete(function (data) {
        //.success(function (data) {
            //data = this.responseText;
            //$('body').append(data);
            //console.log("comp");
            //console.log(data);
        })
        .success(function (data) {
            //data = this.responseText;
            $('body').append(data);
        })
    /* 
    $.get('http://douban.fm/', function(data) {
        $.ajaxSetup({async:false});
	    var div = document.createElement('div');
        div.innerHTML = data;
        document.body.appendChild(div);
        $('#fm-player').remove();
        sec = $("#fast_songs_sec");
        items = $("#fast_songs_sec li");
        len = $("#fast_songs_sec li").length;
        console.log(items.length);
        console.log(len);
        console.log(sec.attr("id"));
    });*/
    /*
    (function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://douban.fm/", false);
        xhr.send(null);

        
    }()); 
    */
	console.log("init radio...");
	return radio;
};

/**
 *获取播放列表
 * */
Radio.prototype.getPlayList = function (t, skip) {
	var self  = this;
	if (skip) {
		//this.audio.pause()
	}
	$.getJSON("http://douban.fm/j/mine/playlist", {
        type: t,
        channel: this.channel,
        context: this.context,
        h: this.heared,
        sid: this.c_song ? this.c_song.sid : '',
        r: Math.random(),
        uid: this.uid,
        from: "mainsite"
    }, function (data) {
        var songs = data.song,
            s;
        for (s in songs) {
            self.song_list[s] = songs[s];
        }
        if (skip) {
            self.changeSong(t);
        }
    });

};

Radio.prototype.onGetPlayList = function (data) {
	console.log(this);
};

Radio.prototype.reportEnd = function () {
	var temp = this.heared.split("|");
	temp.push(this.c_song.sid + ":" + "p");
	this.heared = temp.slice(-20).join("|");
	$.get("http://douban.fm/j/mine/playlist", {
        type: 'e',
        sid: this.c_song.sid,
        channel: this.channel,
        from: "mainsite"
    });
};

Radio.prototype.changeSong = function (t) {
    var h_songs;
	this.c_song = this.song_list.shift();
	if (t !== 'n') {
		h_songs = this.heared.split("|");
		h_songs.push(this.c_song.sid + ":" + t);
		this.heared = h_songs.slice(-20).join("|");
	}
	console.log("get next song: " + this.c_song.sid);
	//this.audio.src = this.c_song.url
	//this.audio.play()
	opera.postError(this.c_song.url);
    this.jaudio.jPlayer("setMedia", {mp3: this.c_song.url});
	//this.jaudio.jPlayer("load")
    this.jaudio.jPlayer("play");

    opera.extension.broadcastMessage({
        action: 'show',
        song_info: this.c_song.artist + ' - ' + this.c_song.title
    });

	if (this.song_list.length <= 0) {
		console.log("get new song list");
		this.getPlayList("p", false);
	}
};

Radio.prototype.skip = function () {
	this.getPlayList("s", true);
};

Radio.prototype.like = function () {
	this.getPlayList("r", false);
};

Radio.prototype.unlike = function () {
	this.getPlayList("u", false);
};

Radio.prototype.del = function () {
	this.getPlayList("b", true);
};

Radio.prototype.powerOn = function () {
	this.power = true;
	this.getPlayList("n", true);
    sec = $("#fast_songs_sec");
    items = $("#fast_songs_sec li");
    len = $("#fast_songs_sec li").length;
    console.log(items.length);
    console.log(len);
};

Radio.prototype.powerOff = function () {
	this.power = false;
	//this.audio.pause()
	//this.jaudio.jPlayer("pause")
    this.jaudio.jPlayer("clearMedia");
    this.jaudio.jPlayer("stop");
    location.reload();
};

