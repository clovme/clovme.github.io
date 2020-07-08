$(function () {
    editormd.markdownToHTML("editormd-view", {
        htmlDecode: "style,script,iframe",  // you can filter tags decode
        emoji: true,
        taskList: true,
        tex: true,  // 默认不解析
        flowChart: true,  // 默认不解析
        sequenceDiagram: true,  // 默认不解析
    });
});

function copy(str, status) {
    function _replace(str) {
        var _temp = str.replace(/\+/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,"").replace(/[\r\n]/g,"");
        if (status){
            return _temp.split('　').join('\n')
        }
        return _temp.split('　').join('');
    }

    var clipboard = new Clipboard('.clip', {
        text: function (e) {
            if (status){
                return _replace($(e).parent('div').siblings('.extracted-code').text())
            }

            if (str) {
                return str
            }
            return _replace($(e).parent('li').text())
        }
    });

    clipboard.on('success', function (e) {
        $(e.trigger).attr('data-original-title', '复制成功').removeClass('btn-outline-secondary').removeClass('btn-outline-danger').addClass('btn-outline-success');
    });

    clipboard.on('error', function (e) {
        $(e.trigger).attr('data-original-title', '复制失败').removeClass('btn-outline-secondary').removeClass('btn-outline-success').addClass('btn-outline-danger');
    });
}