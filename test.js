function HistoryTracker(size){
    this.object_size    = size;
    this.urlData        = [];

    /*------------------ update records in the view ---------------------*/
this.updateView     = function (list_id, element) {
    var new_ul      = document.getElementById(list_id);
    var new_li      = document.createElement("li");
    var new_anchor  = document.createElement('a');
    new_anchor.appendChild(document.createTextNode(element));
    new_li.appendChild(new_anchor);
    new_ul.appendChild(new_li);
};

/*---------------- Log visited URls ---------------------------------*/
this.logVisit = function (provided_url) {
    if (provided_url.length > 10) {
        if (Object.keys(this.urlData).length < this.object_size) {
            this.urlData.push({
                url: provided_url
            });
            this.updateView("url-list", provided_url);
            document.getElementById('url_check_label').innerHTML = 'Added New URL "' + provided_url + '"';
        } else {
            var currentSize = Object.keys(this.urlData).length;
            var new_url = [],
                counter = 0;
            for(i = 1; i < currentSize; i++){
                new_url[counter] = this.urlData[i];
                counter++;
            }
            this.urlData = new_url;
            this.urlData.push({
                url: provided_url
            });
            this.loadList();
        }
    }
    else{
        document.getElementById('url_check_label').innerHTML = 'Please enter a correct URL';
    }
            
};


/*------------------ Searches for the appropriate URL ---------------*/
this.pagesVisitedOn = function (url_check) {
    document.getElementById("searchedurl_list").innerHTML = "";
    var that = this;
    var counter = 0;
    this.urlData.filter(function (node) {
        var data = node.url;
        if (data.indexOf(url_check) !== -1) {
            counter++;
            var newUrl = ("'" + data.split(url_check)[1] + "'");
            that.updateView("searchedurl_list", newUrl);
        }
    });
    document.getElementById('url_search_label').innerHTML = counter + ' URLS found for search term "' + url_check + '"';
};

/*------------------ Will rezise the Object -------------------------*/
this.resizeObject = function (selectObject) {
    var currentSize = Object.keys(this.urlData).length;
    if (currentSize < selectObject.value) {
        this.object_size = selectObject.value;
    } else {
        this.object_size = selectObject.value;
        

        var dInSize = currentSize - selectObject.value;
        var new_url = [];
        var counter = 0;
        for (var i =dInSize-1; i < currentSize-1; i++) {
            new_url[counter] = this.urlData[i];
            counter++;
        }
        this.urlData = new_url;
        this.loadList();
    }
};

/*----------- Will add url to the url Collection --------------------*/
this.addUrl = function () {
    
        var value = document.getElementById('first-input').value;
        document.getElementById("first-input").value = "";
        this.logVisit(value);
};

/*----------- Will search url from the url Collection ---------------*/
this.searchURL = function () {
    
        var value = document.getElementById('second-input').value;
        document.getElementById("second-input").value = "";
        this.pagesVisitedOn(value);
    };
    
/*----------------- show curent URLs in the list --------------------*/
this.loadList = function () {
        document.getElementById("url-list").innerHTML = "";
        var that = this;
        this.urlData.filter(function (node) {
            var url = node.url;
            that.updateView("url-list", url);
        });
    };
this.loadList();
    
/*----------------- Clear search records ----------------------------*/
this.clearSearch = function () {
        document.getElementById("searchedurl_list").innerHTML = "";
    };

}


var tracker = new HistoryTracker(25);
tracker.logVisit('http://1www.pivotaltracker.com/v1/test');
tracker.logVisit('https://2www.google.co.uk/search?source=hp&q=happy+penguins');
tracker.logVisit('https://3www.google.co.uk/search?q=news');
tracker.logVisit('http://4www.google.co.uk/finance');
tracker.logVisit('https://5finance.google.co.uk/finance/portfolio?action=view');
tracker.logVisit('http://6www.pivotaltracker.com/v1/test');
tracker.logVisit('https://7www.google.co.uk/search?source=hp&q=happy+penguins');
tracker.logVisit('https://8www.google.co.uk/search?q=news');
tracker.logVisit('http://9www.google.co.uk/finance');
tracker.logVisit('https://finance.google.co.uk/finance/portfolio?action=view');
tracker.logVisit('http://www.pivotaltracker.com/v1/test');
tracker.logVisit('https://www.google.co.uk/search?source=hp&q=happy+penguins');
tracker.logVisit('https://www.google.co.uk/search?q=news');
tracker.logVisit('http://www.google.co.uk/finance');
tracker.logVisit('https://finance.google.co.uk/finance/portfolio?action=view');
tracker.logVisit('https://www.google.com');