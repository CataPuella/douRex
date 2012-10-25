$(document).ready(function() {
    $('.channel-box > div').eq(0).show();
    console.log(radio.search_keywords);
    $('#channel_search input').val(radio.search_keywords);
    var hot_channels = radio.hot_channels,
        up_trending_channels = radio.up_trending_channels,
        intro_channels = radio.promotion_channels,
        recent_channels = radio.recent_channels;
        search_channels = radio.search_channels;

    for (c in hot_channels) {
        cid = hot_channels[c].cid;
        name = hot_channels[c].name;
        intro = hot_channels[c].intro;
        $('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#ss_intros');
    }

//console.log(recent_channels.length);
    for (c in up_trending_channels) {
        //console.log(channels[c].cid, channels[c].name);
        cid = up_trending_channels[c].id;
        name = up_trending_channels[c].name;
        intro = up_trending_channels[c].intro;
        $('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#fast_songs_sec');
    }
    $('<button class="rate-channel" title="rate"/>').appendTo('li.channel');

    for (c in recent_channels) {
        cid = recent_channels[c].cid;
        name = recent_channels[c].name;
        intro = recent_channels[c].intro;
        $('<li data-cid=' + cid + ' class="channel-recent"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#channel_recent');
    }
    $('<button class="rate-channel" title="unrate"/>').appendTo('li.channel-recent');

    for (c in search_channels) {
        cid = search_channels[c].cid;
        name = search_channels[c].name;
        intro = search_channels[c].intro;
        $('<li data-cid=' + cid + ' class="channel-search"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#channel_search_result');
    }
    $('<button class="del-recent-channel" title="unrate"/>').appendTo('li.channel-search');

    if (localStorage.fav_channels !== undefined) {
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
if (localStorage.fav_channels !== undefined) {
    fav_channels = JSON.parse(localStorage.fav_channels);
}
//console.log(fav_channels.indexOf(c));
//if ( fav_channels.indexOf(c) === -1 ) {
    var flag = 0;
    var i=fav_channels.length
    while (i--) {
        if (Object.identical(fav_channels[i], c)) {
            flag += 1;
        }
    }
    if (flag === 0 ) {
        fav_channels.push(c)
    }
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
    // if (fav_channels.indexOf(c) !== -1) { doesn't work
    var i=fav_channels.length;
    while (i--) {
        if (Object.identical(fav_channels[i], c)) {
            fav_channels.splice(i, 1);
        }
    }

    //fav_channels.pop(c)
    localStorage.fav_channels = JSON.stringify(fav_channels);
    e.stopPropagation();
});

// current unfunctioning
$('.del-recent-channel').live("click", function (e) {
    $channel = $(this).parent();
    var c = {};
    c.cid = $channel.data("cid");
    c.name = $channel.text();
    c.intro = $channel.find("a").attr("title");
    recent_channels = JSON.parse(localStorage.recent_channels);
    // if (recent_channels.indexOf(c) !== -1) { doesn't work
    var i=recent_channels.length;
    while (i--) {
        if (Object.identical(recent_channels[i], c)) {
            recent_channels.splice(i, 1);
        }
    }

    e.stopPropagation();
});

$('#channel_search input').keypress(function(event) {
    var keywords = this.value
    if (event.keyCode == 13) {
        $.getJSON("http://douban.fm/j/explore/search", {
            query: keywords
        }, function (data) {
            channels = data.data.channels;
            console.log(channels);
            $('div#channel_search_result').html('')
            for (c in channels) {
                cid = channels[c].id;
                name = channels[c].name;
                intro = channels[c].intro;
                $('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#channel_search_result');
            }
            radio.search_keywords = keywords;
            radio.search_channels = channels;
        });
    }
});
//    console.log(channels[i].cid, channels[i].name);
//console.log(channels[0].cid, channels[0].name);


