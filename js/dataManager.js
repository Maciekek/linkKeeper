(function () {
    "use strict";
    var textInFile;
    var dataList;
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingFolder = applicationData.roamingFolder;
    var sizeDB = 0;
    var db = [];
    db.links = [];

    var write = function (roamingFolder, nameRetrieved, linkRetrieved) {
        console.log("JESTEM WRITE");
        
       
        WinJS.xhr({ url: linkRetrieved })
           .done(function complete(result) {
               // Report download.
               console.log("xhr");
               
               var title = result.responseText.match(/<title>.*<.title>/);
               title = title.toString();
               title = title.replace("<title>", "");
               title = title.replace("</title>", "");
               if (title.length > 15) {
                   title = title.slice(0, 15);
                   title = title.concat("...");
               }
               var date = "";
               if (getSavingDateStatus()) {
                   console.log("DODAJE DATE");
                   date = new Date();
                   date = date.toString().slice(0, 10);
               }

               roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    var newLink_ = {
                        id: ++sizeDB,
                        link: linkRetrieved,
                        name: nameRetrieved,
                        title: title,
                        date: date,
                    };
                    db.push(newLink_);
                    
                    return Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(db));
                }).done(function () {
                    
                    read(roamingFolder);
                });
           });
    };

    var read = function (roamingFolder) {
        console.log("JESTEM READ");
        
            roamingFolder.getFileAsync("dataFile.txt")
            .then(function (sampleFile) {
                return Windows.Storage.FileIO.readTextAsync(sampleFile);
            }).done(function (content) {
                var simpleListView = document.getElementById('basicListView').winControl;
                var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
                //try {
                console.dir(content.length);
                if (content.length === 0) {
                    console.log("Plik najprawdopodobniej jest pusty...");
                    return;
                };

                var json_file = JSON.parse(content);
                sizeDB = json_file.length;
                db = json_file;
                dataList = new WinJS.Binding.List(db);


                simpleListView.itemTemplate = simpleTemplate;
                simpleListView.itemDataSource = dataList.dataSource;

            });
            
        return dataList;
    };

    var removeSelectedLinks = function (itemsToDelete, number) {
        delete db[number];

        var contentToSave = JSON.stringify(db);
        console.log(contentToSave);
        contentToSave = contentToSave.replace("null,", "");
        contentToSave = contentToSave.replace(",null", "");
        contentToSave = contentToSave.replace("null", "");

        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    return Windows.Storage.FileIO.writeTextAsync(file, contentToSave);
                }).done(function () {
                    try {
                        read(roamingFolder);
                    } catch (e) {
                        read(roamingFolder);
                    }
                });
    };

    var createFolder = function (roamingFolder) {
        var folder = Windows.Storage.ApplicationData.current.roamingFolder;
        folder.getFileAsync('dataFile.txt').then(function (file) {
            read(folder);
        }, function (e) {
            roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    return Windows.Storage.FileIO.writeTextAsync(file, "");
                });
        });
    }

    var clearAllData = function () {
        var applicationData = Windows.Storage.ApplicationData.current;
        var roamingFolder = applicationData.roamingFolder;

        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
         .then(function (file) {
             db = [];
             return Windows.Storage.FileIO.writeTextAsync(file, "");
         });
    }

    var savingDate = function (status) {
        var applicationData = Windows.Storage.ApplicationData.current;
        var roamingSettings = applicationData.roamingSettings;
        roamingSettings.values["date"] = status;
        var result = roamingSettings.values["date"];
        console.log(result);
    };

    var getSavingDateStatus = function () {
        var applicationData = Windows.Storage.ApplicationData.current;
        var roamingSettings = applicationData.roamingSettings;
        var result = roamingSettings.values["date"];
        return result;
    }

    var publicMembers =
        {
            write: write,
            read: read,
            removeSelectedLinks: removeSelectedLinks,
            createFolder: createFolder,
            clearAllData: clearAllData,
            savingDate: savingDate,
            getSavingDateStatus: getSavingDateStatus,
        };
    WinJS.Namespace.define("DataManager", publicMembers);



})();