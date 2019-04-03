queue()
    .defer(d3.json, "/data_article_topic")
    .await(makeGraphs);

function makeGraphs(error, recordsJson) {
	
	//Clean data
	var records = recordsJson;
	var dateFormat = d3.time.format("%Y-%m-%d");
	// console.log(records)
	
	records.forEach(function(d) {
		d["article_date"] = dateFormat.parse(d["article_date"]);
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(records);
	// console.log(ndx);

	//Define Dimensions
	var dateDim = ndx.dimension(function(d) { return d["article_date"]; });
	// console.log(dateDim)
	var ncommentDim = ndx.dimension(function(d) { return d["ncomments_segment"]; });
	// console.log(ncommentDim)
	var topicDim = ndx.dimension(function(d) { return d["topic_names"]; });
	var keywordsDim = ndx.dimension(function(d) { return d["topic_keywords"]; });
	// console.log(keywordsDim)
	var allDim = ndx.dimension(function(d) {return d;});


	//Group Data
	var numRecordsByDate = dateDim.group();
	var commentSegmentGroup = ncommentDim.group();
	var topicGroup = topicDim.group();
	var keywordsGroup = keywordsDim.group();
	var all = ndx.groupAll();


	//Define values (to be used in charts)
	var minDate = dateFormat.parse("2012-1-1")
	var maxDate = dateFormat.parse("2017-1-1")
	// console.log(maxDate);
	// console.log(minDate);


    //Charts
    var numberRecordsND = dc.barChart("#number-records-nd");
	var commentSegmentChart = dc.rowChart("#comment-segment-row-chart");
	var topicChart = dc.rowChart("#article-topic-row-chart");

	// commentSegmentChart.colors(d3.scale.category20b());
	// topicChart.colors(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628']);

	numberRecordsND
		.width(600)
		.height(550)
		.margins({top: 10, right: 30, bottom: 20, left: 35})
		.dimension(dateDim)
		.group(numRecordsByDate)
		.colors(['#87CEFA'])
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.yAxis().ticks(4);


	commentSegmentChart
		.width(170)
		.height(210)
        .dimension(ncommentDim)
        .group(commentSegmentGroup)
        .colors(['#FFFF00'])
        .ordering(function(d){
        	if(d.key == "1000+") return 0;
        	else if(d.key == "600-1000") return 1;
        	else if(d.key == "300-600") return 2;
        	else if(d.key == "100-300") return 3;
        	else if(d.key == "50-100") return 4;
        	else if(d.key == "50-") return 5;
        })
        .elasticX(true)
        .labelOffsetY(19)
        .xAxis().ticks(4);


    topicChart
    	.width(210)
		.height(590)
        .dimension(topicDim)
        .group(topicGroup)
        .colors(d3.scale.category20())
        .ordering(function(d) { return -d.value })
        // .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(14)
        .xAxis().ticks(4);

   	var textvar =""
   	_.each(allDim.top(Infinity), function (d) {
        textvar = d['topic_keywords'];
        num_postive = d['positive'];
        num_negative = d['negative'];
        t_names = d['topic_names'];
    	});
   	console.log(num_negative);
   	console.log(num_postive);
   	console.log(t_names);
    var wordcloud = function(textvar){
    	var myConfig = {
	      type: 'wordcloud',
	      options: {
	        text: textvar,
	      }
	    };

	    zingchart.render({
	      id: 'myChart',
	      data: myConfig,
	      height: 290,
	      width: '100%'
	    });
    };
    
    wordcloud(textvar);

	var sentiment_data = [{
	  values: [num_negative,num_postive],
	  labels: ['Negative','Positive'],
	  marker: {
	    colors: ['#1E90FF','#FF8C00']
	  },
	  type: 'pie'
	}];
	var layout = {
	  title: t_names,
	  height: 270,
	  width: 300
	};

	Plotly.newPlot('myDiv', sentiment_data,layout);

    dcCharts = [topicChart];

    _.each(dcCharts, function (dcChart) {
            dcChart.on("filtered", function (chart, filter) {
            	_.each(allDim.top(Infinity), function (d) {
			        textvar = d['topic_keywords'];
			        num_postive = d['positive'];
			        num_negative = d['negative'];
			        t_names = d['topic_names'];
			    	});
            	wordcloud(textvar);
            	var sentiment_data = [{
				  values: [num_negative,num_postive],
				  labels: ['Negative','Positive'],
				  marker: {
				    colors: ['#1E90FF','#FF8C00']
				  },
				  type: 'pie'
				}];
				var layout = {
				  title: t_names,
				  height: 270,
				  width: 300
				};

				Plotly.newPlot('myDiv', sentiment_data,layout);
            
        });

        });
    
	dc.renderAll();
	
	

};