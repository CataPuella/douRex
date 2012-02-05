var radio = {};
var jp_div = document.createElement('div');
	
$(document).ready(function() {
	jp_div.id = "jquery_jplayer";
	jp_div.className = "jp-jplayer";
    document.body.appendChild(jp_div);

	opera.postError("document ready");
    $("#jquery_jplayer").jPlayer({
		ready: function(event) {
			opera.postError("jplayer ready");
			radio=Radio.init($("#jquery_jplayer"))
		},
		swfPath: "lib/Jplayer.swf",
		solution: "flash",
		supplied: "mp3",
		wmode: "window"
	});
});             

window.addEventListener("load", function(){
	var theButton;
	var ToolbarUIItemProperties = {
	  	title: "douRex",
  	icon: "img/icon.png",
  	popup: {
		href: "popup.html",
		width: 300,
		height: 140
	},
	}
	theButton = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
	opera.contexts.toolbar.addItem(theButton);
}, false);

opera.extension.onmessage = function(e) {
	switch (e.data.action) {
		case 'play_album':
			subject_id = e.data.subject_id;
			if ( e.data.subject_id[7] == "\/" ){
				subject_id = e.data.subject_id.substr(0,7);
			}
			localStorage["channel"] = 0;
			radio.channel = 0;
			radio.context = "channel:0|subject_id:"+subject_id;
			opera.postError(radio.context);
			radio.powerOn();
			break;
		case 'play_musician':
			musician_id = e.data.musician_id;
			localStorage["channel"] = 0;
			radio.channel = 0;
			radio.context = "channel:0|musician_id:"+musician_id;
			opera.postError(radio.context);
			radio.powerOn();
			break;
		case 'nolrc':
			opera.extension.broadcastMessage({
				action: 'show',
				song_info: 'Sorry, lyrics not found!'
			});
			break;
	}
}

