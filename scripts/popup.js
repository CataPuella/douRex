$(document).ready(function() {
    $('.channel-box > div').eq(0).show();
var intro_channels = JSON.parse(localStorage.intro_channels);
var fast_channels = JSON.parse(localStorage.fast_channels);
for (c in intro_channels) {
    cid = intro_channels[c].cid;
    name = intro_channels[c].name;
    intro = intro_channels[c].intro;
    $('<li data-cid=' + cid + '><a title=' + intro +'>' + name + '</a></li>').appendTo('div#ss_intros');
}
for (c in fast_channels) {
    //console.log(channels[c].cid, channels[c].name);
    cid = fast_channels[c].cid;
    name = fast_channels[c].name;
    intro = fast_channels[c].intro;
    $('<li data-cid=' + cid + '><a title=' + intro +'>' + name + '</a></li>').appendTo('div#fast_songs_sec');
}
});

$('.channel-tab > li').click(function() {
    $(this).addClass('on').siblings().removeClass('on');
    $('.channel-box > div').hide().eq($(this).index()).show();
});

//    console.log(channels[i].cid, channels[i].name);
//console.log(channels[0].cid, channels[0].name);


