var pivot = new Flexmonster({
    container: "#pivot-container",
    componentFolder: "https://cdn.flexmonster.com/",
    licenseFilePath: "https://cdn.flexmonster.com/codepen.key",
    toolbar: true,
    height: 430,
    beforetoolbarcreated: customizeToolbar,
       report: {
        dataSource: {
            filename: "data/sales.csv"
        },
        slice: {
            rows: [{
                uniqueName: "Result"
            },
                   {
                uniqueName: "Student"
            },
                   {
                uniqueName: "[Measures]"
            }],
            columns: [{
                uniqueName: "Courses",
                levelName: "Product Name",
                filter: {
                    members: [
                        "category.[condiments].[bbq sauce]",
                        "category.[breakfast cereals].[corn flakes]",
                        "category.[confectionery]",
                        "category.[bakery].[chocolate biscuits]",
                        "category.[fruit preserves].[apple jam]",
                        "category.[bakery].[apple cake]",
                        "category.[soups].[tomato soup]"
                    ]
                }
            }],
            measures: [{
                "uniqueName": "Reenue",
                "aggregation": "sum",
                "format": "2sfou03a"
            }],
            "expands": {
            "rows": [
                {
                    "tuple": [
                        "customer.[company a]"
                    ]
                }
            ]
        }
        },
        conditions: [{
            formula: "#value < 2500",
            measure: "Revenue",
            format: {
                backgroundColor: "#df3800",
                color: "#FFFFFF"
            },
            isTotal: false
        }, {
            formula: "#value > 20000",
            measure: "Revenue",
            format: {
                backgroundColor: "#00A45A",
                color: "#FFFFFF"
            },
            isTotal: false
        }],
        formats: [{
            name: "2sfou03a",
            thousandsSeparator: ",",
            decimalSeparator: ".",
            decimalPlaces: 2,
            currencySymbol: "$",
            currencySymbolAlign: "left",
            nullValue: "",
            textAlign: "right",
            isPercent: false
        }]
    }
});

function customizeToolbar(toolbar) {
    // get all tabs
    var tabs = toolbar.getTabs(); 
		toolbar.getTabs = function () {
        // add new tab
        tabs.unshift({
            id: "fm-tab-newtab",
            title: "Classic",
            handler: newtabHandler,
            icon: this.icons.options
        });
        return tabs;
    }

    var newtabHandler = function() {
    	// add new functionality
       flexmonster.setOptions({
        grid: {
            "type": "classic"
        }
    });
    flexmonster.refresh();
    }  

}