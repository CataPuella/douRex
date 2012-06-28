/**
 * 封装radio操作
 * */
var Radio=function(){
	this.c_song={};
	this.song_list=[];
	this.channel=0;
	this.power=false;
	this.audio=null;
	this.jaudio=null;
	this.power=false;
	this.uid='';
	this.heared='';
	this.context='';
}

/**
 *初始化播放器
 * */
Radio.init=function(audio){
	$.ajaxSetup({async:false})
	console.log("init radio...")
	var radio=new Radio()
	//radio.audio=audio
	radio.jaudio=audio
	radio.channel=localStorage['channel']?localStorage['channel']:0	
		
	//douban.fm的cookie是session级别，从豆瓣主站获取dbcl2的cookie到
	/*chrome.cookies.get({
		url:"http://douban.com",
		name:"dbcl2"	
	},function(b){
		if(b){
			chrome.cookies.set({
				url:"http://douban.fm",
				name:"dbcl2",
				value:b.value
			})
		}/
	})*/
	return radio	
}

/**
 *获取播放列表
 * */
Radio.prototype.getPlayList=function(t,skip){
	var self =this
	if(skip){
		//this.audio.pause()
	}
	var self=this
	/*$.getJSON("http://douban.fm/j/mine/playlist",{
			type:t,
			channel:this.channel,
			context:this.context,
			h:this.heared,
            cid: 1000891,
			sid:this.c_song? this.c_song.sid:'',
			r:Math.random(),
			uid:this.uid,
			from:"mainsite"
		},function(data){
			var songs=data.song
			for(s in songs){
				self.song_list[s]=songs[s]
				//opera.postError(songs[s].title)
			}
			if(skip){
				self.changeSong(t)
			}
		})*/
	$.getJSON("http://douban.fm/j/mine/playlist",{
			type:t,
			channel:this.channel,
			context:this.context,
			h:this.heared,
			sid:this.c_song? this.c_song.sid:'',
			r:Math.random(),
			uid:this.uid,
			from:"mainsite"
		},function(data){
			var songs=data.song
			for(s in songs){
				self.song_list[s]=songs[s]
				//opera.postError(songs[s].title)
			}
			if(skip){
				self.changeSong(t)
			}
		})

}

Radio.prototype.onGetPlayList=function(data){
	console.log(this)
}


Radio.prototype.reportEnd=function(){
	temp=this.heared.split("|")
	temp.push(this.c_song.sid+":"+"p")
	this.heared=temp.slice(-20).join("|")
	$.get("http://douban.fm/j/mine/playlist",{
			type:'e',
			sid:this.c_song.sid,
			channel:this.channel,
			from:"mainsite"	
		})		
}

Radio.prototype.changeSong=function(t){
	this.c_song=this.song_list.shift();
	if(t!='n'){
		h_songs=this.heared.split("|");
		h_songs.push(this.c_song.sid+":"+t);
		this.heared=h_songs.slice(-20).join("|")
	}
	console.log("get next song: "+this.c_song.sid)
	//this.audio.src=this.c_song.url
	//this.audio.play()
	opera.postError(this.c_song.url)
    this.jaudio.jPlayer("setMedia", {mp3: this.c_song.url})
	//this.jaudio.jPlayer("load")
    this.jaudio.jPlayer("play")

    opera.extension.broadcastMessage({
        action: 'show',
        song_info: this.c_song.artist + ' - ' + this.c_song.title
    });

	if(this.song_list.length<=0){
		console.log("get new song list")
		this.getPlayList("p",false)
	}
}

Radio.prototype.skip=function(){
	this.getPlayList("s",true)	
}

Radio.prototype.like=function(){
	this.getPlayList("r",false)
}

Radio.prototype.unlike=function(){
	this.getPlayList("u",false)
}

Radio.prototype.del=function(){
	this.getPlayList("b",true)
}

Radio.prototype.powerOn=function(){
	this.power=true
	this.getPlayList("n",true)
}

Radio.prototype.powerOff=function(){
	this.power=false
	//this.audio.pause()
	//this.jaudio.jPlayer("pause")
    this.jaudio.jPlayer("clearMedia")
    this.jaudio.jPlayer("stop")
    location.reload()
}

