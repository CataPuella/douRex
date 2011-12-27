// ==UserScript==
// @include http://music.douban.com/*
// ==/UserScript==
var subject = /subject\//;
var people = /people/;
var mine = /mine/;
var musician = /musician/;
var search = /search/;
var url = document.URL;
if ( subject.test(url) || musician.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio = document.getElementsByClassName("start_radio")[0];
		if ( !start_radio )
			return;		
		var douRex = document.createElement("a");
		douRex.title = "用douRex收听";
		douRex.text = "douRex";
		douRex.href = "javascript:;"
			
		douRex.addEventListener('click', function() {
			if ( musician.test(url)) {
				opera.extension.postMessage({
				action: 'play_musician',
				musician_id: document.URL.substr(33,6)
				});
			}
			else{
				opera.extension.postMessage({
					action: 'play_album',
					subject_id: document.URL.substr(32,7)
				});
			}
		},false);
		var p = document.createElement("p");
		p.appendChild(douRex);
		var text = document.createTextNode("\u00a0"+"\u00a0"+"也在播放^_^");
		p.appendChild(text);
		start_radio.appendChild(p);
	}, false);
}

if ( people.test(url) || mine.test(url) || search.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio_all = document.getElementsByClassName("start_radio");
		if ( !start_radio_all )
			return;		
		for (i=0; i<start_radio_all.length; i++){
			var douRex = document.createElement("a");
			douRex.title = "用douRex收听";
			douRex.text = "\\[douRex]/";
			douRex.href = "javascript:;"
			douRex.addEventListener('click', function() {
				opera.extension.postMessage({
					action: 'play_album',
					subject_id: this.parentNode.getElementsByTagName("a")[0].href.substr(32,7)
				});
			},false);

			var start_radio = start_radio_all[i];
			start_radio.parentNode.appendChild(douRex);
		}	
	}, false);
}

if ( search.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio_musician = document.getElementsByClassName("start_radio_musician ll");
		if ( !start_radio_musician )
			return;		
		for (i=0; i<start_radio_musician.length; i++){
			var douRex = document.createElement("a");
			douRex.title = "用douRex收听";
			douRex.text = "\\[douRex]/";
			douRex.href = "javascript:;"
			douRex.style = "font-size:14px;"
			douRex.addEventListener('click', function() {
				opera.extension.postMessage({
					action: 'play_musician',
					musician_id: this.parentNode.getElementsByTagName("a")[0].href.substr(33,6)
				});
			},false);

			var start_radio = start_radio_musician[i];
			start_radio.parentNode.appendChild(douRex);
		}	
	},false);
}
