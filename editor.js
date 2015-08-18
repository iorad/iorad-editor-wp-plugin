(function($, win) {
    iorad = win.iorad || {};
    tinyMCE = win.tinyMCE || {};

    iorad.init({
        pluginType: 'wordpress',
        env: 'live'
    }, function() {
        //iorad is ready now
        var t = 0;
        $('#new-tutorial-btn').on('click', function() {
            $('body').addClass('iorad-loading');
            iorad.createTutorial();
            t = setTimeout(function() {
                $('body').removeClass('iorad-loading');
            }, 5000);
            $('#iorad-editor').off().load(function() {
                $('body').addClass('iorad-open');
                clearTimeout(t);
            });

            return false;
        });
        iorad.on('editor:close', function(tutorialParams) {
            $('body').removeClass('iorad-open iorad-loading');
            clearTimeout(t);
            var iframe = iorad.getEmbeddedPlayerUrl(tutorialParams.uid,
                tutorialParams.tutorialId, tutorialParams.tutorialTitle);
            var steps = tutorialParams.steps,
                stepsHtml = '<div style="display: none"><ol>';
            $.each(steps, function(i, step) {
                stepsHtml += '<li>' + step.description + '</li>';
            });
            stepsHtml += '</ol></div>'
            var content = iframe + stepsHtml;
            if (tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden()) {
                tinyMCE.execCommand('mceFocus',false,'content');
                tinyMCE.activeEditor.selection.setContent(content);
            } else {
                insertAtCursor($('textarea#content').get(0), content);
            }
        });

    });


    function insertAtCursor(myField, myValue) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        } else {
            myField.value += myValue;
        }
    }


})(jQuery, window);
