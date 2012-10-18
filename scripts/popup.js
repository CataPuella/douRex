$(document).ready(function() {
    $('.channel-box > div').eq(0).show();
var intro_channels = JSON.parse(localStorage.intro_channels);
var fast_channels = JSON.parse(localStorage.fast_channels);
for (c in intro_channels) {
    cid = intro_channels[c].cid;
    name = intro_channels[c].name;
    intro = intro_channels[c].intro;
    $('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#ss_intros');
}
for (c in fast_channels) {
    //console.log(channels[c].cid, channels[c].name);
    cid = fast_channels[c].cid;
    name = fast_channels[c].name;
    intro = fast_channels[c].intro;
    $('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#fast_songs_sec');
}
$('<button class="rate-channel" title="rate"/>').appendTo('li.channel');

if ( typeof localStorage.fav_channels !== 'undefined') {
var fav_channels = JSON.parse(localStorage.fav_channels);
for (c in fav_channels) {
    cid = fav_channels[c].cid;
    name = fav_channels[c].name;
    intro = fav_channels[c].intro;
    $('<li data-cid=' + cid + ' class="channel-fav"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#channel_fav');
}
$('<button class="unrate-channel" title="unrate"/>').appendTo('li.channel-fav');
    }
});

$('.channel-tab > li').click(function() {
    $(this).addClass('on').siblings().removeClass('on');
    $('.channel-box > div').hide().eq($(this).index()).show();
});

$('.rate-channel').live("click", function (e) {
    $channel = $(this).parent();
    var c = {};
    c.cid = $channel.data("cid");
    c.name = $channel.text();
    c.intro = $channel.find("a").attr("title");
    //console.log(channel.data("cid"), channel.text(), channel.find("a").attr("title"));
    var fav_channels = [];
if ( typeof localStorage.fav_channels !== 'undefined') {
    fav_channels = JSON.parse(localStorage.fav_channels);
}
    fav_channels.push(c)
    localStorage.fav_channels = JSON.stringify(fav_channels);
    e.stopPropagation();
});

$('.unrate-channel').live("click", function (e) {
    $channel = $(this).parent();
    var c = {};
    c.cid = $channel.data("cid");
    c.name = $channel.text();
    c.intro = $channel.find("a").attr("title");
    fav_channels = JSON.parse(localStorage.fav_channels);
    while (fav_channels.indexOf(c) !== -1) {
        fav_channels.splice(fav_channels.indexOf(c), 1);
    }

    fav_channels.pop(c)
    localStorage.fav_channels = JSON.stringify(fav_channels);
    e.stopPropagation();
});
//    console.log(channels[i].cid, channels[i].name);
//console.log(channels[0].cid, channels[0].name);


