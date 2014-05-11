(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;
    var ui = WinJS.UI;


    ui.Pages.define("/pages/settings/about.html", {
        ready: function (element, options) {
            document.getElementById("about").addEventListener(
                "afterhide", afterSettingsHide, false);
        },
        unload: function () {
            document.getElementById("about").removeEventListener(
                "afterhide", afterSettingsHide);
        }
    });

    function afterSettingsHide() {
        
    };

})();