window.app = window.app || {};

(function defineUiCircleHelper(app) {
    'use strict';

    var createdSnapLists = [];

    function onPageBeforeShow(event) {
        var page = event.target,
            i = 0,
            lists = [].slice.call(page.querySelectorAll('.ui-listview'), 0),
            length = lists.length;

        for (i = 0; i < length; i += 1) {
            createdSnapLists.push(tau.helper.SnapListStyle.create(lists[i]));
        }
    }

    function onPageBeforeHide() {
        var i = 0,
            length = createdSnapLists.length;

        for (i = 0; i < length; i += 1) {
            createdSnapLists[i].destroy();
        }

        createdSnapLists = [];
    }

    function enableSnapListAutomaticCreation() {
        if (!tau.support.shape.circle) {
            return;
        }

        document.addEventListener('pagebeforeshow', onPageBeforeShow);
        document.addEventListener('pagebeforehide', onPageBeforeHide);
    }

    enableSnapListAutomaticCreation();

})(window.app);
