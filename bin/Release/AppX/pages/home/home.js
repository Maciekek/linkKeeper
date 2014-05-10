(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        ready: function (element, options) {
            var applicationData = Windows.Storage.ApplicationData.current;
            var roamingFolder = applicationData.roamingFolder;

            var addLinkButton = document.getElementById("cmdAdd");
            addLinkButton.addEventListener("click", this.addLinkButtonClickHandler, false);

            var saveLinkButton = document.getElementById("cmdSelectAll");
            saveLinkButton.addEventListener("click", this.selectAllHandler, false);

            var saveLinkButton = document.getElementById("cmdClearSelection");
            saveLinkButton.addEventListener("click", this.deselectAllHandler, false);

            var deleteButton = document.getElementById("cmdDelete");
            deleteButton.addEventListener("click", this.deleteClickHandler, false);

            appBar = document.getElementById("scenarioAppBar");

            var listView = document.getElementById("basicListView");
            listView.addEventListener("selectionchanging", this.showClickHandler, false);
           
           
                DataManager.createFolder(roamingFolder);
                //test();
            
        },

        addLinkButtonClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.target;
            link.href = "/pages/addLink/addLink.html";

            WinJS.Navigation.navigate(link.href);

        },
        showClickHandler: function (eventInfo) {
            appBar = document.getElementById("scenarioAppBar");
            var style = document.getElementById("scenarioAppBar").winControl;
            document.getElementById("scenarioAppBar").winControl.show();
            document.getElementById("scenarioAppBar").winControl.sticky = false;

        },
        deleteClickHandler: function (eventInfo) {
            console.log("---Delete item---");
            var listView = document.getElementById("basicListView").winControl;
            var test = listView.selection.getItems().done(function (selectedItemsToDelete) {
                try {
                    eventInfo.preventDefault();
                    var link = eventInfo.target;
                    link.href = "/pages/home/home.html";

                    DataManager.removeSelectedLinks(selectedItemsToDelete, listView.selection.getIndices());
                }
                catch (e) {
                    console.log(e);
                }

            });

        },
        selectAllHandler: function (eventInfo) {
            var listView = document.getElementById("basicListView").winControl;
            listView.selection.selectAll();
        },
        deselectAllHandler: function (eventInfo) {
            var listView = document.getElementById("basicListView").winControl;
            listView.selection.clear();
        },
    });
    var appBar;

   


})();
