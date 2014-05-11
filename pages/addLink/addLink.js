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
            var navState = {
                backStack: WinJS.Navigation.history.backStack.slice(0),
                forwardStack: WinJS.Navigation.history.forwardStack.slice(0),
                current: WinJS.Navigation.history.current
            };

            // Save history to state - simple!
            WinJS.Application.sessionState.navigationHistory = navState;

            var linkSessionSave = Windows.Storage.ApplicationData.current.roamingSettings.values["link"];
            var nameSessionSave = Windows.Storage.ApplicationData.current.roamingSettings.values["name"];

            var saveLinkButton = document.getElementById("saveLinkButton");
            saveLinkButton.addEventListener("click", this.saveLinkButtonHandler, false);

            var name = document.getElementById("linkInput");
            name.addEventListener("change", this.saveNameSessionHandler, false);

            var link = document.getElementById("nameInput");
            link.addEventListener("change", this.saveLinkSessionHandler, false);

            if (linkSessionSave.length > 0 && nameSessionSave.length > 0) {
                console.log("podmieniam");
                link.value = linkSessionSave;
                name.value = nameSessionSave;
            }

            

           

        },

        unload: function () {
            
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
                Windows.Storage.ApplicationData.current.roamingSettings.values["link"] = "";
                Windows.Storage.ApplicationData.current.roamingSettings.values["name"] = "";
                

                eventInfo.preventDefault();
                var link = eventInfo.target;
                link.href = "/pages/home/home.html";
                WinJS.Navigation.navigate(link.href);


            }
        },
        saveNameSessionHandler: function () {
            var name = document.getElementById("linkInput").value;
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

            Windows.Storage.ApplicationData.current.roamingSettings.values["name"] = name;

            console.log(Windows.Storage.ApplicationData.current.roamingSettings.values["name"]);
        },
        saveLinkSessionHandler: function () {
            var name = document.getElementById("nameInput").value;
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

            Windows.Storage.ApplicationData.current.roamingSettings.values["link"] = name;

            console.log(Windows.Storage.ApplicationData.current.roamingSettings.values["link"]);
        },


    });


})();

