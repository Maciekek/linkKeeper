// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingFolder = applicationData.roamingFolder;
    WinJS.UI.Pages.define("/pages/addLink/addLink.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var saveLinkButton = document.getElementById("saveLinkButton");
            saveLinkButton.addEventListener("click", this.saveLinkButtonHandler, false);


        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
        saveLinkButtonHandler: function (eventInfo) {
            if (document.getElementById("linkInput").value.length < 2 || document.getElementById("linkInput").value.length < 2) {

            } else {
                var link = document.getElementById("nameInput").value;
                var name = document.getElementById("linkInput").value;
                var pattern = new RegExp("^https?://", "g");

                if (pattern.test(link)) {
                    console.log("OK");
                    DataManager.write(roamingFolder, name, link);
                }
                else {
                    "http://".concat(link);
                    DataManager.write(roamingFolder, name, "http://".concat(link));
                }


                eventInfo.preventDefault();
                var link = eventInfo.target;
                link.href = "/pages/home/home.html";
                WinJS.Navigation.navigate(link.href);
            }
        },

    });


})();

