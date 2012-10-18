$(document).ready(function() {
    $('.channel-box > div').eq(0).show();
});

$('.channel-tab > li').click(function() {
    $(this).addClass('on').siblings().removeClass('on');
    $('.channel-box > div').hide().eq($(this).index()).show();
});

