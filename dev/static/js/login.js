$(function () {
    var SlideVerifyPlug = window.slideVerifyPlug;
    var slideVerify = new SlideVerifyPlug('#verify-wrap', {
        initText: '请向右滑动滑块验证登录',  //设置  初始的 显示文字
        sucessText: '验证通过',//设置 验证通过 显示的文字
        getSuccessState: function (res) {
            //当验证完成的时候 会 返回 res 值 true，只留了这个应该够用了
            if (res) {
                if (slideVerify.slideFinishState) {
                    $('.value').html(slideVerify.slideFinishState);
                    $('#resetBtn').removeClass('prohibit')
                }
            } else {
                $('.value').html('false');
                $('#resetBtn').addClass('prohibit');
                slideVerify.resetVerify();//可以重置 插件 回到初始状态
            }
        }
    });
    // $('#resetBtn').addClass('prohibit')

    $('#send_code').on('click', function () {
        var code_time = 5;
        var me = this;
        var email = $('input[name="email"]');
        email.focus();
        $(me).focus();
        if (email.attr('check') === 'false') return;
        var timer = setInterval(function () {
            if (code_time >= 0) {
                $(me).attr('disabled', true);
                $(me).text("已发送(重发" + code_time + "s)");
                email.attr('readonly', true);
                code_time--;
            } else {
                $(me).text("重新发送");
                $(me).attr('disabled', false);
                email.attr('readonly', false);
                clearInterval(timer)
            }
        }, 1000)
    });

});