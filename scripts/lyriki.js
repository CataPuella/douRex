// retreive lyrics from g.cn

var radio=opera.extension.bgProcess.radio;
$("#search_lrc").bind("click",function(){
	opera.postError("lyriki");
	var artistName = radio.c_song.artist;
	var songName = radio.c_song.title;
	var url = "http://www.google.cn/music/search?q=" + encodeURIComponent(artistName) + "+" + encodeURIComponent(songName);
	get_lrc(url);	
})

function get_lrc(url)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send(null);
	var div = document.createElement('div');
	div.innerHTML = xhr.responseText;
	div.style.visibility = "hidden";
	div.height = "0";
	document.body.appendChild(div);
	var node = document.evaluate("//a[@title='歌词']", 
			document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (node.snapshotLength == 0){
		opera.extension.postMessage({
			action: 'nolrc',
			song_info: ''
		});
		document.body.removeChild(div);
		return;
	}
	var onclick = node.snapshotItem(0).getAttribute('onclick');
	var lrc_url = decodeURIComponent(onclick.substr(29,67));
	opera.postError(lrc_url);
	window.open(lrc_url);
	document.body.removeChild(div);
}
