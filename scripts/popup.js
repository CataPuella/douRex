$(document).ready(function() {
    $('.channel-box > div').eq(0).show();
    $('.chls-tab > li').eq(0).css('background-color', '#ffffff');
    console.log(radio.search_keywords);
    $('#channel_search input').val(radio.search_keywords);
    var hot_channels = radio.hot_channels,
        up_trending_channels = radio.up_trending_channels,
        intro_channels = radio.promotion_channels,
        recent_channels = radio.recent_channels;
        search_channels = radio.search_channels;

    for (c in hot_channels) {
        li = li_helper('channel-hot', hot_channels[c]);
        $(li).appendTo('div#ss_intros');
        //$('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#ss_intros');
    }

    for (c in up_trending_channels) {
        li = li_helper('channel-trending', up_trending_channels[c]);
        $(li).appendTo('div#fast_songs_sec');
        //$('<li data-cid=' + cid + ' class="channel"><a title=' + intro +'>' + name + '</a></li>').appendTo('div#fast_songs_sec');
    }
    //$('<img src="../img/gray-heart.gif" class="rate-channel" title="rate"/>').appendTo('li.channel');

    for (c in recent_channels) {
        li = li_helper('channel-recent', recent_channels[c]);
        $(li).appendTo('div#channel_recent');
    }

    for (c in search_channels) {
        li = li_helper('channel-search', search_channels[c]);
        $(li).appendTo('div#channel_search_result');
    }

    if (localStorage.fav_channels !== undefined) {
        var fav_channels = JSON.parse(localStorage.fav_channels);
        for (c in fav_channels) {
            li = li_helper_old('channel-fav', fav_channels[c]);
            $(li).appendTo('div#channel_fav');
        }
    }

});

var li_helper = function (cls, channel) {
    cid = channel.id;
    name = channel.name;
    intro = channel.intro;
    cover = channel.cover;
    return '<li data-cid=' + cid + ' class="' + cls + 
           '"><img class="banner-channel" src="' + cover + '"/>' + 
           '<div class="title"><h4>' + name +
           '<img src="../img/gray-heart.gif" class="rate-channel" title="rate"/></h4>' + 
           '<div class="intro">' + intro + 
           '</div></div></li>';
};

var li_helper_old = function (cls, channel) {
    cid = channel.id;
    name = channel.name;
    intro = channel.intro;
    cover = channel.cover;
    return '<li data-cid=' + cid + ' class="' + cls + 
           '"><img class="banner-channel" src="' + cover + '"/>' + 
           '<div class="title"><h4>' + name +
           '<img src="../img/red-heart.gif" class="unrate-channel" title="unrate"/></h4>' + 
           '<div class="intro">' + intro + 
           '</div></div></li>';
};

$('.chls-tab > li').click(function() {
    //$(this).addClass('on').siblings().removeClass('on');
    $(this).css('backgroundColor', '#ffffff');
    $(this).siblings().css('background-color', '#d5f4ec');
    $(this).siblings().removeClass('on');
    $('.channel-box > div').hide().eq($(this).index()).show();
});

$('.rate-channel').live("click", function (e) {
    $channel = $(this).parent();
    var c = {};
    //c.cid = $channel.data("cid");
    c.cid = $channel.parent().parent().data("cid");
    c.name = $channel.text();
    //c.intro = $channel.find("a").attr("title");
    c.intro = $channel.parent().find('div.intro').text();
    //var item1 = $('img.banner-channel')[0];
    //c.cover = $channel.parent().find(item1).attr("src");
    c.cover = $channel.parent().parent().find("img")[0].src;
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
    //c.cid = $channel.data("cid");
    c.cid = $channel.parent().parent().data("cid");
    c.name = $channel.text();
    //c.intro = $channel.find("a").attr("title");
    c.intro = $channel.parent().find('div.intro').text();
    //c.cover = $channel.find("img.banner-channel").attr("src");
    c.cover = $channel.parent().parent().find("img")[0].src;
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
                li = li_helper('channel-search', channels[c]);
                $(li).appendTo('div#channel_search_result');
            }
            radio.search_keywords = keywords;
            radio.search_channels = channels;
        });
    }
});
//    console.log(channels[i].cid, channels[i].name);
//console.log(channels[0].cid, channels[0].name);


