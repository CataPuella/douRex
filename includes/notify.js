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
	el.style.fontFamily = 'sans-serif !important';
	el.style.margin = '0 !important';
	el.style.padding = '5px 10px';
	el.style.borderColor = '#006600'; // '#3b5343';
	//el.style.borderStyle = 'ridge';
	el.style.borderWidth = '1px';
	el.style.borderRadius = '50%' //'7.5px !important';
	el.style.backgroundColor = '#e00000'; //'#faefe3' //colors.backgroundColor + ' !important';
	el.style.color = '#ffffff'; //'#3b5343';
	el.style.fontSize = '16px';
	el.style.font = 'bold';
	el.style.opacity = '0 !important';
	el.style.zIndex = '9999999 !important';
	el.style.OTransition = 'opacity 0.5s !important';

	el.innerHTML = ' \\[ '+info+' ]/ ';
	el.style.right = '0px !important';
	el.style.bottom = '0px !important';

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
