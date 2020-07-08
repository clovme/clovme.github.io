;(function ($, window, document, undefined) {
    var _form = function (ele, opt) {
        this.form = ele;
        this.csrf = null;
        this.defaults = {};
        this.options = $.extend({}, this.defaults, opt);
        this.methods = {
            GET: 'GET',
            POST: 'POST',
            HEAD: 'HEAD',
            PUT: 'PUT',
            DELETE: 'DELETE',
            CONNECT: 'CONNECT',
            OPTIONS: 'OPTIONS',
            TRACE: 'TRACE'
        };
    };

    _form.prototype = {
        init: function () {
            var me = this;
            var sBtn = me.options.submitBtn;

            me.for_form();
            me.initParams();
            me.enterSend();
            me.getCsrfTooken();

            me.data = {
                required: me.func.required,
                min: me.func.minOrMax,
                max: me.func.minOrMax,
                length: me.func.lengths,
                rules: me.func.rules,
                equal: me.func.equal,
                phone: me.func.mobile,
                email: me.func.email,
                idcard: me.func.IdCard,
                password: me.func.password,
                url: me.func.url
            };

            if (sBtn) {
                $(sBtn).on('click', function () {
                    me.clickValidation();
                });
            }

            return this;
        },

        enterSend: function () {
            var me = this;
            $('#' + me.form[0].id).off("keydown.t").on("keydown.t", function (ev) {
                var e = ev || window.event;
                if (e.ctrlKey && e.keyCode === 13) {
                    me.clickValidation();
                } else if (e.keyCode === 13) {
                    me.clickValidation();
                }
            });
        },

        attrLength: function (obj) {
            var dataAttrLength = obj.attr('data-length');
            if (dataAttrLength) {
                var data = dataAttrLength.split('-');
                if (data.length === 1) {
                    obj.attr('minlength', data[0]);
                    obj.attr('maxlength', data[0]);
                }
                if (data.length === 2) {
                    var max = data[data.length - 1];
                    if (max === '*') {
                        obj.attr('minlength', data[0]);
                    } else {
                        obj.attr('minlength', data[0]);
                        obj.attr('maxlength', max);
                    }
                }
            }
        },

        events: function (me, v_obj) {
            var is_success = true;
            if (v_obj.attr('type') !== 'radio' && v_obj.attr('type') !== 'checkbox') {
                $.each(v_obj[0].dataset, function (ii, vv) {
                    if (ii !== 'ruleMessage') {
                        if (!me.data[ii](v_obj)) {
                            me.errFunc[ii](v_obj, me);
                            is_success = me.data[ii](v_obj);
                        }
                        if (is_success) {
                            me.msg.success(v_obj)
                        }
                    }
                });
            } else {
                if (v_obj.attr('type') === 'checkbox') {
                    var checked = v_obj.is(':checked');
                    if (!checked) {
                        me.errFunc['required'](v_obj, me);
                        is_success = checked;
                    }
                    if (is_success) {
                        me.msg.success(v_obj)
                    }
                }
                if (v_obj.attr('type') === 'radio') {
                    console.log(v_obj)
                }
            }
        },

        for_form: function () {
            var me = this;
            $.each(me.form[0], function (i, v) {
                if ($(v)[0].name !== '') {
                    me.attrLength($(v));
                    $(v).on('input propertychange', function () {
                        me.events(me, $(v))
                    });
                    $(v).on('blur', function () {
                        me.events(me, $(v))
                    });
                }
            })
        },

        randomNum: function (minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        },

        initParams: function () {
            var me = this,
                send = (me.options.sends !== undefined) ? me.options.sends : true,
                method = me.methods[(me.options.method ? me.options.method : 'POST').trim().toUpperCase()];
            me.url = me.options.url ? me.options.url : me.form[0].action;
            me.method = (method !== undefined) ? method : 'POST';
            me.async = (me.options.async === true || me.options.async === false) ? me.options.async : true;
            me.sends = (send === true || send === false) ? send : true;

            if (me.form[0].id === '' || me.form[0].id === undefined) {
                // 当form id 不存在时 自动生成 form id
                me.form[0].id = me.formId()
            }
        },

        // 判断form id是否存在
        formId: function () {
            var me = this;
            var formId = '';
            while (true) {
                var temp = 'form-' + me.randomNum(4000, 5000);
                var formsId = [];
                $.each($('form'), function (i, form) {
                    formsId.push(form.id)
                });
                if ($.inArray(temp, formsId) === -1) {
                    formId = temp;
                    break;
                }
            }
            return formId;
        }
    };

    _form.prototype.errFunc = {
        required: function (target, me) {
            me.msg.error(target, target.attr('data-required'))
        },
        min: function (target, me) {
            me.msg.error(target, '最小值为:' + target.attr('data-min'))
        },
        max: function (target, me) {
            me.msg.error(target, '最大值为:' + target.attr('data-max'))
        },
        length: function (target, me) {
            var data = target.attr('data-length').split('-');
            if (data.length === 1) {
                me.msg.error(target, "最多最少输入" + data[0] + "位");
            }
            if (data.length === 2) {
                if (data[data.length - 1] === '*') {
                    me.msg.error(target, "最少输入" + data[0] + "位");
                } else {
                    var changdu = target.attr('data-length');
                    me.msg.error(target, "输入字符长度[" + changdu + "]位");
                }
            }
        },
        rules: function (target, me) {
            me.msg.error(target, target.attr('data-rule-message'))
        },
        equal: function (target, me) {
            me.msg.error(target, '输入不一致！')
        },
        phone: function (target, me) {
            me.msg.error(target, target.attr('data-phone'))
        },
        email: function (target, me) {
            me.msg.error(target, target.attr('data-email'))
        },
        idcard: function (target, me) {
            me.msg.error(target, target.attr('data-idcard'))
        },
        url: function (target, me) {
            me.msg.error(target, target.attr('data-url'))
        },
        password: function (target, me) {
            me.msg.error(target, target.attr('data-password'))
        }
    };

    _form.prototype.clickValidation = function () {
        var me = this;
        var is_success = true;
        $.each(me.form[0], function (i, v) {
            if ($(v)[0].name !== '') {
                if ($(v).attr('type') !== 'radio' && $(v).attr('type') !== 'checkbox') {
                    $.each($(v)[0].dataset, function (ii, vv) {
                        if (ii !== 'ruleMessage' && !me.data[ii]($(v), me)) {
                            me.errFunc[ii]($(v), me);
                            is_success = me.data[ii]($(v));
                        }
                    })
                } else {
                    if ($(v).attr('type') === 'checkbox') {
                        var checked = $(v).is(':checked');
                        if (!checked) {
                            me.errFunc['required']($(v), me);
                            is_success = checked;
                        }
                    }
                    if ($(v).attr('type') === 'radio') {
                        console.log(v)
                    }
                }
            }
        });

        if (is_success && me.sends) {
            me.sendData()
        }
    };

    _form.prototype.func = {
        required: function (objects) {
            var value = objects.val();

            if (value === '') {
                return false;
            }
            if (value == null) {
                return false;
            }
            return true
        },

        minOrMax: function (objects) {
            var value = objects.val(),
                min = parseInt(objects.attr("data-min")),
                max = parseInt(objects.attr("data-max"));
            value = parseInt(value);

            if (value) {
                if (isNaN(value) || min > value) {
                    return false;
                } else if (!isNaN(value) && max < value) {
                    return false;
                }
            }
            return true;
        },

        lengths: function (objects) {
            var value = objects.val(),
                start_end = objects.attr('data-length').split('-');

            if (value !== '' && start_end.length === 1) {
                var num = parseInt(start_end);
                if (value.length !== num) {
                    return false;
                }
            } else if (value !== '' && start_end.length === 2) {
                if (start_end[1] === '*') {
                    var min_length = parseInt(start_end[0]);
                    if (value.length < min_length) {
                        return false;
                    }
                } else {
                    var min = parseInt(start_end[0]),
                        max = parseInt(start_end[1]);
                    if (value.length < min || value.length > max) {
                        return false;
                    }
                }
            }
            return true;
        },

        rules: function (objects) {
            var value = objects.val(),
                rule = objects.attr("data-rules");

            rule = new RegExp(eval(rule));
            if (value !== '' && !rule.test(value)) {
                return false;
            }
            return true;
        },

        equal: function (objects) {
            var value = objects.val(),
                equal = $(objects.attr("data-equal")).val();

            if (value !== equal) {
                return false;
            }
            return true;
        },

        mobile: function (objects) {
            var value = objects.val(),
                rule_tel = /^(0\d{2,3}\d{7,8}|0\d{2,3}-)\d{7,8}$/,
                rule_phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

            if (value !== '' && !rule_phone.test(value) && !rule_tel.test(value)) {
                return false;
            }
            return true;
        },

        email: function (objects) {
            var value = objects.val(),
                rule_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if (value !== '' && !rule_email.test(value)) {
                return false;
            }
            return true;
        },

        password: function (objects) {
            var value = objects.val(),
                rule_password = /^[a-zA-Z0-9\.\_\~\!\@\#\$\%\^\&\*\(\)\+\-\=]{6,16}$/;

            if (value !== '' && !rule_password.test(value)) {
                return false;
            }
            return true;
        },

        IdCard: function (objects) {
            var value = objects.val(),
                rule_card = /^([1-9]\d{5}[1]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9xX]|[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3})$/;

            if (value !== '' && !rule_card.test(value)) {
                return false;
            }
            return true;
        },

        url: function (objects) {
            var value = objects.val();

            var r = /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
            if (value !== '' && !r.test(value)) {
                return false;
            }
            return true;
        }
    };

    _form.prototype.getCsrfTooken = function () {
        var me = this;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim().split('=');
                if (cookie[0] === "csrftoken") {
                    me.csrf = cookie[1]
                }
                break;
            }
        }
    };

    _form.prototype.formData = function () {
        var me = this;
        var data = {};
        var form = me.form[0];

        if ($(form).find('input[type="file"]').length <= 0) {
            $.each($(me.form[0]).serializeArray(), function (i, val) {
                data[val.name] = val.value;
            });
            if (!me.csrf && data.csrfmiddlewaretoken) {
                me.csrf = data.csrfmiddlewaretoken;
            }
            delete data.csrfmiddlewaretoken;
            $.each(me.options.data, function (k, v) {
                data[k] = v;
            });
            data = JSON.stringify(data);
        } else {
            data = new FormData(form);
            if (!me.csrf && data.has('csrfmiddlewaretoken')) {
                me.csrf = data.get('csrfmiddlewaretoken');
            }
            data.delete('csrfmiddlewaretoken');
            $.each(me.options.data, function (k, v) {
                data.append(k, v);
            })
        }
        return data
    };

    _form.prototype.sendData = function () {
        var me = this,
            data = me.formData();

        var xhr = new XMLHttpRequest();
        xhr.open(me.method, me.url, me.async);
        xhr.setRequestHeader("X-CSRFToken", me.csrf);
        xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
        if ($(me.form[0]).find('input[type="file"]').length <= 0) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (me.options.success) {
                        try {
                            me.options.success($.parseJSON(xhr.responseText))
                        } catch (e) {
                            me.options.success(xhr.responseText)
                        }
                    }
                } else {
                    if (me.options.error) {
                        try {
                            me.options.success($.parseJSON(xhr.responseText))
                        } catch (e) {
                            me.options.success(xhr.responseText)
                        }
                    }
                }
            }
        };
        xhr.send(data)
    };

    _form.prototype.msg = {
        error: function (target, errorMessage) {
            if ($(target).attr('type') !== 'checkbox' && $(target).attr('type') !== 'radio') {
                var tar = $(target.siblings()[0]);
                tar.attr({
                    'data-trigger': 'manual',
                    'data-placement': 'left',
                    'data-original-title': errorMessage,
                }).tooltip('show');
                tar.children('.input-group-text').css({
                    'border-color': '#EF5350',
                    'color': '#EF5350'
                });
                target.attr('check', false).css({
                    'border-color': '#EF5350',
                    'background-color': '#FFCDD2'
                });
            } else {
                if ($(target).attr('type') === 'checkbox') {
                    target.attr({
                        'check': false,
                        'data-trigger': 'manual',
                        'data-placement': 'left',
                        'data-original-title': errorMessage,
                    }).tooltip('show');
                }
            }
        },

        success: function (target) {
            if ($(target).attr('type') !== 'checkbox' && $(target).attr('type') !== 'radio') {
                var tar = $(target.siblings()[0]);
                tar.removeAttr('data-trigger');
                tar.removeAttr('data-placement');
                tar.removeAttr('data-original-title');
                tar.children('.input-group-text').removeAttr('style');
                tar.tooltip('hide');

                tar.find('.fa').css('color', '#28a745');
                target.attr('check', true).css({
                    'border-color': '#28a745',
                    'background-color': '#FFF'
                });
            } else {
                if ($(target).attr('type') === 'checkbox') {
                    target.attr('check', true);
                    target.removeAttr('data-trigger');
                    target.removeAttr('data-placement');
                    target.removeAttr('data-original-title');
                    target.tooltip('hide');
                }
            }
        }
    };

    $.fn.form = function (options) {
        var validation = new _form(this, options);

        return validation.init();
    };
})(jQuery, window, document);