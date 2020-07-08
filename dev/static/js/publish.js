$(function () {
    editormd("editormd", {
        codeFold: true,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        taskList: true,
        tocm: true,                  // Using [TOCM]
        tex: true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart: true,             // 开启流程图支持，默认关闭
        sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
        dialogShowMask: true,        // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        dialogDraggable: false,      // 设置弹出层对话框不可拖动，全局通用，默认为true
        imageUpload: true,
        imageUploadURL: 'localhost',
        path: 'plugins/editor.md/lib/',
        onload: function () {
            this.fullscreen();
            this.resize("100%", $(document).height() - 15);
        },
        toolbarHandlers: {
            redirect: function (cm, icon, cursor, selection) {
                $('#GoToModal').modal('show')
            },

            saving: function (cm, icon, cursor, selection) {
                $('#SaveDataModal').modal('show');
                $('#content').text(this.getValue());
            },
        },
    });
});
