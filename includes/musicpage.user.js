// ==UserScript==
// @include http://music.douban.com/*
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function() {
	target = document.getElementsByClassName("start_radio")[0];
	opera.postError(target.className);
	douRex = document.createElement("a");
	douRex.title = "在douRex中播放";
	douRex.text = "在douRex中播放";
	douRex.href = "javascript:;"
	douRex.addEventListener('click', function() {
	   	opera.postError('clicked');
		opera.extension.postMessage(document.URL.substr(32,7));
	},false);
	p = document.createElement("p");
	p.appendChild(douRex);
	target.appendChild(p);
}, false);
