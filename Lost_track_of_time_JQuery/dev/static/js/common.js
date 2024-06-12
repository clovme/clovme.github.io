// 显示模态框
function showModal(id) {
    $('#' + id).modal('show');
}

$(function () {
    var timer = undefined;
    var _id = undefined;
    var _pid = undefined;

    $('.nav-menu').hover(function () {
        var me = this;
        _id = $(me).attr('id');
        timer = setTimeout(function () {
            if ($(me).parent('span').length > 0) {
                $(me).addClass('nav-zibg').siblings('a').removeClass('nav-zibg').parent('span').siblings('a').removeClass('nav-zibg');
            } else {
                $(me).addClass('nav-zibg').siblings('a').removeClass('nav-zibg').siblings('span').children('a').siblings('a').removeClass('nav-zibg');
            }
            $('#menu-content').css('display', 'block');
            $('#n' + _id).css('display', 'block').siblings('div').css('display', 'none');
            if (!_id) {
                $('#' + _pid).removeClass('nav-zibg');
                $('#n' + _pid).css('display', 'none');
            }
            _pid = _id;
        }, 50);
    }, function () {
        if (!_id) {
            $('#menu-content #n' + _id).css('display', 'none');
            $(this).removeClass('nav-zibg')
        }
        clearTimeout(timer)
    });

    $('#menu-content').mouseleave(function () {
        $(this).css('display', 'none');
        $('#' + _id).removeClass('nav-zibg');
        $('#menu-content #n' + _id).css('display', 'none');
    });

    $('#menu-wrap').mouseleave(function () {
        $('#menu-content').css('display', 'none');
        $('#' + _id).removeClass('nav-zibg');
        $('#menu-content #n' + _id).css('display', 'none');
    });

    $('.right-align').on('shown.bs.modal', function () {
        $(this).removeAttr('style')
    });

    $('[data-toggle="tooltip"]').tooltip();
});