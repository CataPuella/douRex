// ==UserScript==
// @include http://music.douban.com/*
// ==/UserScript==
var subject = /subject/g;
var people = /people/g;
if ( subject.test(document.URL) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio = document.getElementsByClassName("start_radio")[0];
		var douRex = document.createElement("a");
		douRex.title = "在douRex中播放";
		douRex.text = "\u00a0"+"douRex";
		douRex.href = "javascript:;"
		douRex.addEventListener('click', function() {
			opera.postError('clicked');
			opera.extension.postMessage(document.URL.substr(32,7));
		},false);
		var p = document.createElement("p");
		p.appendChild(douRex);
		var text = document.createTextNode("\u00a0"+"\u00a0"+"\u00a0"+"也在播放^_^");
		p.appendChild(text);
		start_radio.appendChild(p);
	}, false);
}

if ( people.test(document.URL) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio_all = document.getElementsByClassName("start_radio");
		for (i=0; i<start_radio_all.length; i++){
			var douRex = document.createElement("a");
			douRex.title = "在douRex中播放";
			douRex.text = "\\[douRex]/";
			douRex.href = "javascript:;"
			douRex.addEventListener('click', function() {
				opera.postError('clicked');
				opera.extension.postMessage(this.parentNode.getElementsByTagName("a")[0].href.substr(32,7));
			},false);
			//douRex.style="background-origin: padding-box; background-clip: border-box; background-color: transparent;"


			var start_radio = start_radio_all[i];
			start_radio.parentNode.appendChild(douRex);
		}	
	}, false);
	
}
