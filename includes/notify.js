if (window.top == window.self) {

var notifier = null;
var timer;
var fadeTimer;
var duration = 7000;
var maxWidth = '280px';

opera.extension.onmessage = function(e) {
	switch (e.data.action) {
		case 'show':
			show(e.data.song_info);
			opera.postError(e.data.song_info);
			break;
	}
}

function show(info){
	if (notifier)
		clean();
	var el = document.createElement('div');
	el.style.position = 'fixed !important';
	el.style.textAlign = 'left !important';
	el.style.fontFamily = 'sans-serif !important';
	el.style.margin = '0 !important';
	el.style.padding = '14px !important';
	el.style.borderRadius = '2.5px !important';
	el.style.backgroundColor = '#faefe3' //colors.backgroundColor + ' !important';
	el.style.color = '#3b5343';
	el.style.fontSize = '14px';
	el.style.opacity = '0 !important';
	el.style.zIndex = '9999999 !important';
	el.style.OTransition = 'opacity 0.5s !important';

	el.innerHTML = '\\[ '+info+' ]/';
	//	el.style.top = '10px !important';
		el.style.right = '10px !important';
		el.style.bottom = '10px !important';
	//	el.style.left = '10px !important';

	document.body.appendChild(el);

	el.addEventListener('click', hide, false);
	notifier = {
		el: el
	}	
	setTimer();
}

function hide() {
	if (!notifier)
		return;
	
	if (fadeTimer)
		clearTimeout(fadeTimer);
	
	fadeTimer = setTimeout(clean, 500);
	
	notifier.el.style.opacity = '0 !important';
}

function clean() {
	notifier.el.parentNode.removeChild(notifier.el);
	notifier = null;
}

function setTimer() {
	if (timer) {
		clearTimeout(timer);
	}
	
	if (fadeTimer) {
		clearTimeout(fadeTimer);
		fadeTimer = null;
	}
	
	timer = setTimeout(hide, duration);
	notifier.el.style.opacity = '1 !important';
}

	
}
