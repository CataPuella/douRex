// ==UserScript==
// @include http://music.douban.com/*
// @include http://douban.fm/*
// ==/UserScript==

var subject = /subject\//;  //exclude subject_search page
//var people = /people\//;
var wish = /wish/;
var dofm = /\/do/;
var collect = /collect/;
var mine = /mine/;
var musician = /musician\//;
var search = /search/;
var tag = /tag/;
var doulist = /doulist/;
var musicians = /musicians/;
var explore = /explore/;
var url = document.URL;
if ( subject.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio = document.getElementsByClassName("bs")[0];
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
				if ( document.URL.substr(39,1) == "\/" ) {
					album = document.URL.substr(32,7)
				}
				else{
					album = document.URL.substr(32,8)
				}
				opera.extension.postMessage({
					action: 'play_album',
					subject_id: album
					//subject_id: document.URL.substr(32,7)
				});
			}
		},false);
		var p = document.createElement("p");
		p.appendChild(douRex);
		var text = document.createTextNode("\u00a0"+"\u00a0"+"为您提供专辑播放^_^");
		p.appendChild(text);
		start_radio.appendChild(p);
	}, false);
}
if ( musician.test(url) ){
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
				if ( document.URL.substr(39,1) == "\/" ) {
					album = document.URL.substr(32,7)
				}
				else{
					album = document.URL.substr(32,8)
				}
				opera.extension.postMessage({
					action: 'play_album',
					subject_id: album
					//subject_id: document.URL.substr(32,7)
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

if ( wish.test(url) || dofm.test(url) || collect.test(url) || mine.test(url) || search.test(url) || tag.test(url) || doulist.test(url) ){
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
					subject_id: this.parentNode.getElementsByTagName("a")[0].href.substr(32,8)
				});
			},false);

			var start_radio = start_radio_all[i];
			start_radio.parentNode.appendChild(douRex);
		}	
	}, false);
}

if ( search.test(url) || musicians.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
		var start_radio_musician = null;
		if ( search.test(url) ) {
			start_radio_musician = document.getElementsByClassName("start_radio_musician ll");
		}
		else {
			start_radio_musician = document.getElementsByClassName("start_radio");
		}
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

if ( explore.test(url) ){
	document.addEventListener('DOMContentLoaded', function() {
        opera.postError("hello")
		var start_radio_musician = null;
        var cid = null;
        
        // side channel list
        start_radio_musician = document.getElementsByClassName("ch-name");
		
		if ( !start_radio_musician )
			return;		
		for (i=0; i<start_radio_musician.length; i++){
			var douRex = document.createElement("a");
			douRex.title = "用douRex收听";
			douRex.text = "\\[douRex]/";
			douRex.href = "javascript:;"
			douRex.style = "font-size:12px;"
			douRex.addEventListener('click', function() {
                //cid = this.parentNode.getElementsByTagName("a")[0].href.substr(22,7)
                cid = this.parentNode.parentNode.href.substr(22,7)
                opera.postError(cid)
                opera.postError("hello")

				opera.extension.postMessage({
					action: 'play_channel',
					channel_id: cid
				});

			},false);

			var start_radio = start_radio_musician[i];
            start_radio.parentNode.style.height = '60px';
			//start_radio.parentNode.appendChild(douRex);
			start_radio.appendChild(douRex);
		}
        // recommend channels
        
        var start_radio_ch = null;
		start_radio_ch = document.getElementsByClassName("item-link");
		
		if ( !start_radio_ch )
			return;		
		for (i=0; i<start_radio_ch.length; i++){
			var douRex = document.createElement("a");
			douRex.title = "用douRex收听";
			douRex.text = "\\[douRex]/";
			douRex.href = "javascript:;"
			douRex.style = "font-size:14px;"
			douRex.addEventListener('click', function() {
				opera.extension.postMessage({
					action: 'play_channel',
					channel_id: this.parentNode.getElementsByTagName("a")[0].href.substr(22,7)
				});
			},false);

			var start_radio = start_radio_ch[i];
			start_radio.parentNode.appendChild(douRex);
		}
	},false);
}

