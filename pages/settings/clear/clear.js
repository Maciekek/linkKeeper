(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;
    var ui = WinJS.UI;


    ui.Pages.define("/pages/settings/clear/clear.html", {
        ready: function (element, options) {
            console.log("asas");
            var saveLinkButton = document.getElementById("clear");
            console.log(saveLinkButton);
            saveLinkButton.addEventListener("click", this.clearButtonHandler, false);
            //DataManager.clearAllData();
        },
        unload: function () {
            var roamingFolder = applicationData.roamingFolder;
            DataManager.read(roamingFolder);
            
        },
        clearButtonHandler: function () {
            DataManager.clearAllData();
            console.log("Wyczyszczone");
        }
    });

    

   

})();