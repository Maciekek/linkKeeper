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


        console.log(sizeDB);
        console.log(db[0]);

        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    var newLink_ = {
                        id: ++sizeDB,
                        link: linkRetrieved,
                        name: nameRetrieved
                    };
                    db.push(newLink_);
                    return Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(db));
                }).done(function () {
                    //read(roamingFolder);
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
                console.log(sizeDB);
                db = json_file;
                console.log(db);
                dataList = new WinJS.Binding.List(db);


                simpleListView.itemTemplate = simpleTemplate;
                simpleListView.itemDataSource = dataList.dataSource;

            });
       
        return dataList;
    };


    var removeSelectedLinks = function (itemsToDelete, number) {
        console.log("---remove method---");
        delete db[number];

        var contentToSave = JSON.stringify(db);
        console.log(contentToSave);
        contentToSave = contentToSave.replace("null,", "");
        contentToSave = contentToSave.replace(",null", "");
        contentToSave = contentToSave.replace("null", "");
        console.log(contentToSave);

        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    return Windows.Storage.FileIO.writeTextAsync(file, contentToSave);
                }).done(function () {
                    console.log("zapis udany");
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

    var publicMembers =
        {
            write: write,
            read: read,
            removeSelectedLinks: removeSelectedLinks,
            createFolder: createFolder,
        };
    WinJS.Namespace.define("DataManager", publicMembers);



})();