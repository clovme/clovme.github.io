# forms.validate 使用方法

#### 说明：
1. `Enter` or `Ctrl+Enter` 提交表单
2. Modern Forms (精美的纯css3 html5表单框架) 验证器
3. 标签属性
    1.  `data-required`: 普通文本必填项 `eg:data-required="提示信息"`
    2.  `data-length`: 长度区间 `eg:data-length="4-6"`
    3.  `data-length`: ~到无穷大 `eg:data-length="100-*"`
    4.  `data-min`: 最小值 `eg:data-min="5"`
    5.  `data-max`: 最大值 `eg:data-min="10"`
    6.  `data-rules`: 自定义正则 `eg:data-rules="/^(0\d{2,3}\d{7,8}|0\d{2,3}-)\d{7,8}$/" data-rule-message="错误信息"`
    7.  `data-equal`: 对比 `eg:data-equal="#id"`
    8.  `data-idcard`: 身份证验证 `eg:data-idcard="身份证号码不正确"`
    9.  `data-url`: URL验证 `eg: data-url="URL验证失败"`
    10. `data-email`: 邮箱验证 `eg: data-email="请输入正确的电子邮箱"`
    11. `data-phone`: 手机号验证 `eg: data-phone="请输入正确的手机号码"`
    11. `data-password`: 密码验证 `eg: data-password="6-16位字母数字和下划线点"`
4. 参数解释
    1. `url`: 默认`form.action`
    2. `method`: 默认`POST`
    3. `submitBtn`: 提交表单触发事件元素 or (`Enter` or `Ctrl+Enter` 提交表单)
    4. `async`: 默认为`true`(同步)
    5. `data`: 额外提交的数据,数据格式:`{k:'v','k1':'v1'}`
    6. `success`: 表单提交成功方法 `function(){}`
    7. `error`: 表单提交失败方法 `function(){}`
    8. `sends` 是否向后台提交数据,默认为 `true`
    
#### 示例 `from` HTML配置
```html
<form class="modern-forms" id="form">
    <div class="form-row">
        <div class="field-group prepend-icon">
            <input type="text" class="mdn-input" data-required="资源标题不能为空" name="title" placeholder="资源标题">
            <label class="mdn-label">资源标题</label>
            <span class="mdn-icon"><i class="fa fa-skyatlas"></i></span>
            <span class="mdn-bar"></span>
        </div>
    </div>
    <div class="form-row">
        <div class="col col-8">
            <div class="field-group prepend-icon">
                <input type="text" class="mdn-input" data-url="请填写正确的URL！" name="href" placeholder="资源链接">
                <label class="mdn-label">资源链接</label>
                <span class="mdn-icon"><i class="fa fa-skyatlas"></i></span>
                <span class="mdn-bar"></span>
            </div>
        </div>
        <div class="col col-4">
            <div class="field-group prepend-icon">
                <input type="text" class="mdn-input" data-length="4-6" name="password" placeholder="资源密码">
                <label class="mdn-label">资源密码</label>
                <span class="mdn-icon"><i class="fa fa-skyatlas"></i></span>
                <span class="mdn-bar"></span>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-primary" id="submitBtn">提交</button>
</form>
```
    
####示例 `from` JQuery配置

```javascript
$('#form').form({
    url: '/url',
    method: 'POST',
    submitBtn: '#submitBtn',
    async: true,
    sends: true,
    data: {
        data1: 'value1',
        data2: 'value2',
        data3: 'value3'
    },
    success: function (data) {
        console.log(data)
    },
    error: function (data) {
        console.log(data)
    }
});
```