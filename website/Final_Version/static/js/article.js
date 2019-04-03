
screen_height = screen.height - 50;
screen_width = screen.width/2;
var margin = {top: 20, right: 20, bottom: 10, left: 20};
var align = 50;

height = screen_height/2 - margin.bottom
width = screen_width - margin.left - margin.right

function refresh(){
  d3.select("#rightContainer").select("#divComment")
  .select("#mainCommentDiv").remove();

  d3.select("#rightContainer").select("#divComment")
  .append("div")
  .attr("id","mainCommentDiv")
}
function showArticle()
{
  $("#tempArticle").css('display', "block");
}

function hideArticle()
{
  $("#tempArticle").css('display', "none");
}

function getArticleID(articleID)
{
 /* Article Title Section*/
d3.json("/data/gnm_articles/"+articleID.toString())
.get(function(error,data){
  Data = data

 var articleTitle = svgArticle.append("foreignObject")
 .attr('y', margin.top + 'px')
 .attr("text-align", "center")
 .attr('width', (width - 40) + 'px')
 .append("xhtml:body")
 .html('<div id="article_title" class="widget"><h4 class="heading_info">\
 <a id = "title_url" href = "#" target = "_blank">\
 <p id = "title" class = "title_info"></p></a></h4></div>');

 $('#title').text(Data[0].title);
 $("#title_url").attr("href", Data[0].article_url)

 /* Published Date Section*/
 var articleDate = articleTitle.append("foreignObject")
 .attr('width', (width - 40) + 'px')
 .attr('margin-top' , '10px')
 .append("xhtml:body")
 .html('<hr><div class = "div_date_info widget" id="article_date">\
 <p id = "pub_date" class="date_info"></p></div><hr>')

 $('#pub_date').html('<ul class="list-inline"><li><i class="fa fa-user">&nbsp;' + Data[0].author + '</i></li>\
 <li><i class="fa fa-clock-o">&nbsp;'+ Data[0].published_date +'</i></li>\
<li><i class="fa fa-comment-o">&nbsp;'+ Data[0].ncomments +'</i></li></ul>');

 /* Main Content Section*/
 var articleContent = articleDate.append("foreignObject")
 .append("xhtml:body")
 .attr('width', (width - 40)+ 'px')
 .html('<div id="article_content" class="widget" style="padding-bottom:20px"><p id = "main_content" class="main_info"></p></div>');

 $('#main_content').html(Data[0].article_text.slice(0,350) + "&nbsp;..."+  '</br /><br />\
 <a href="#" id ="article_url" class="btn btn-primary" target="_blank">Read More &rarr;</a>');
 $("#article_url").attr("href", Data[0].article_url)
})

/* Collapsible Tree Layout */
var i = 0, duration = 700, root;

function jsonData(data){
for(var i=0; i<data.length;i++)
{
  if(data[i].key ==articleID)
  {

    return(data[i].value[0])
  }
}
}

d3.json("data/data_tree/"+articleID.toString(), function(error,data) {
// d3.json("data/data_tree.json", function(error,data) {
  if (error) throw error;
  // var data = d3.entries(data)
  // var treeData = jsonData(data)
  treeData = data[0]

  console.log(treeData)


// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, function(d) { return d.children; });;
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root);
  // Compute the new tree layout.
  var nodes = treeData.descendants(),
  links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 150; });

  // Update the nodes…
  var node = svgTreeLayout.selectAll("g.node")
  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", 'node')
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

      // Add Circle for the nodes
  nodeEnter.append('circle')
  .attr('class', 'node')
  .attr('r', 1e-6)
  .style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  });

  // Add labels for the nodes
  nodeEnter.append('text')
  .attr("dy", ".35em")
  .attr("x", function(d) {
    return d.children || d._children ? -15 : 10;
  })
  .attr("text-anchor", function(d) {
    return d.children || d._children ? "end" : "start";
  })
  .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
  .attr('r', 7)
  .style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  })
  .attr('cursor', 'pointer');

  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
  .duration(duration)
  .attr("transform", function(d) {
    return "translate(" + source.y + "," + source.x + ")";
  })
  .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
  .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
  .style('fill-opacity', 1e-6);

  // Update the links...
  var link = svgTreeLayout.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`
    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
});

/* Comment Information */
d3.json("data/clean_gnm_comments_compact/"+articleID.toString())
.get(function(error, data){
  commentData = data

var titleSelection = svgComment.append("foreignObject")
.attr('y', margin.top + 'px')
.attr('x', '25px')
.attr('width', (width - align) + 'px')
.append("xhtml:body")
.html('<div class="div_date_info">\
<h5 class="heading_info_2" style="width:600px;margin-left:0px">\
<i class="fa fa-comments"></i>\
<strong>&nbsp; &nbsp;Popular Comments</strong></h5></div>');

var mainCommentDiv = titleSelection.append("div")
.attr("id", "mainCommentDiv")
.attr("margin-left", margin.left + 'px')
.attr('y', margin.top + 'px')
.attr('x', '25px')
.attr('width', (width - align) + 'px')

var enterDiv = mainCommentDiv.selectAll("div")
.data(commentData)
.enter().append("div")
.attr("class","col-sm-5")
.attr("class","panel panel-default")
.attr("width",screen_width - margin.left - margin.right)
.style("opacity", 0.8);

enterDiv.append("div")
.attr("class","font_bold")
.attr("class", "panel-heading")
.text(function(d) { return d.comment_author });

enterDiv.append("div")
.attr("class", "panel-heading")
.text(function(d){ return d.timestamp.split('.')[0] });

enterDiv.append("div")
.attr("class", "panel-body")
.text(function(d) { return d.comment_text });
})
}
