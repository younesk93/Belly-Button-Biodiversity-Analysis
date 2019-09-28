// @TODO: YOUR CODE HERE!

var width = parseInt(d3.select("#scatter").style("width"));

// Determine the height 
var height = width - width / 3.9;

// Determine the margin
var margin = 20;

// Words placing
var labelArea = 110;

var tPadBot = 40;
var tPadLeft = 40;

// Create an SVG wrapper, append an SVG group that will hold our chart
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

// Set the radius for each dot that will appear in the graph
var circRadius;
function crGet() {
    if (width <= 530) {
        circRadius = 5;
    }
    else {
        circRadius = 10;
    }
}
crGet();

svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

function xTextRefresh() {
    xText.attr(
        "transform",
        "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        ", " +
        (height - margin - tPadBot) +
        ")"
    );
}
xTextRefresh();

// Append three text SVG files, with y coordinates specified to space out the values

    // 1. Poverty
xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

    // 2. Age
xText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Age (Median)");

    // 3. Income
xText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Household Income (Median)");


// B) Left Axis

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// We add a second label group, this time for the axis left of the chart.
svg.append("g").attr("class", "yText");

// yText will allows us to select the group without excess code.
var yText = d3.select(".yText");

// Like before, we nest the group's transform attr in a function
// to make changing it on window change an easy operation.
function yTextRefresh() {
    yText.attr(
        "transform",
        "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
    );
}
yTextRefresh();

// Now we append the text.
// 1. Obesity
yText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Obese (%)");

// 2. Smokes
yText
    .append("text")
    .attr("x", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)");

// 3. Lacks Healthcare
yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Lacks Healthcare (%)");

// 2. Import csv 


d3.csv("assets/data/data.csv").then(function (data) {

    // Visualize the data
    visualize(data);
});


// Create our visualization function

function visualize(theData) {
   
    var curX = "poverty";
    var curY = "obesity";

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([40, -60])
        .html(function (d) {
            console.log(d)
            // x key
            var theX;
            // Grab the state name.
            var theState = "<div>" + d.state + "</div>";
            // Snatch the y value's key and value.
            var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
            // If the x key is poverty
            if (curX === "poverty") {
                // Grab the x key and a version of the value formatted to show percentage
                theX = "<div>" + curX + ": " + d[curX] + "%</div>";
            }
            else {
                // Otherwise
                // Grab the x key and a version of the value formatted to include commas after every third digit.
                theX = "<div>" +
                    curX +
                    ": " +
                    parseFloat(d[curX]).toLocaleString("en") +
                    "</div>";
            }
            // Display what we capture.
            return theState + theX + theY;
        });
    // Call the toolTip function.
    svg.call(toolTip);


    function xMinMax() {
        // min will grab the smallest datum from the selected column.
        xMin = d3.min(theData, function (d) {
            return parseFloat(d[curX]) * 0.90;
        });

        // .max will grab the largest datum from the selected column.
        xMax = d3.max(theData, function (d) {
            return parseFloat(d[curX]) * 1.10;
        });
    }

    function yMinMax() {
        // min will grab the smallest datum from the selected column.
        yMin = d3.min(theData, function (d) {
            return parseFloat(d[curY]) * 0.90;
        });

        // .max will grab the largest datum from the selected column.
        yMax = d3.max(theData, function (d) {
            return parseFloat(d[curY]) * 1.10;
        });
    }

    function labelChange(axis, clickedText) {
        // Switch the currently active to inactive.
        d3
            .selectAll(".aText")
            .filter("." + axis)
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true);

        // Switch the text just clicked to active.
        clickedText.classed("inactive", false).classed("active", true);
    }

    xMinMax();
    yMinMax();


    var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin]);
    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        // Height is inverses due to how d3 calc's y-axis placement
        .range([height - margin - labelArea, margin]);



    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);


    function tickCount() {
        if (width <= 500) {
            xAxis.ticks(5);
            yAxis.ticks(5);
        }
        else {
            xAxis.ticks(10);
            yAxis.ticks(10);
        }
    }
    tickCount();

    svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    svg
        .append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

    var theCircles = svg.selectAll("g theCircles").data(theData).enter();

    theCircles
        .append("circle")

        .attr("cx", function (d) {
            return xScale(d[curX]);
        })
        .attr("cy", function (d) {
            return yScale(d[curY]);
        })
        .attr("r", circRadius)
        .attr("class", function (d) {
            return "stateCircle " + d.abbr;
        })

        .on("mouseover", function (d) {

            toolTip.show(d, this);

            d3.select(this).style("stroke", "#323232");
        })
        .on("mouseout", function (d) {

            toolTip.hide(d);

            d3.select(this).style("stroke", "#e3e3e3");
        });

    theCircles
        .append("text")

        .text(function (d) {
            return d.abbr;
        })

        .attr("dx", function (d) {
            return xScale(d[curX]);
        })
        .attr("dy", function (d) {

            return yScale(d[curY]) + circRadius / 2.5;
        })
        .attr("font-size", circRadius)
        .attr("class", "stateText")
        // Hover Rules
        .on("mouseover", function (d) {
            // Show the tooltip
            toolTip.show(d);
            // Highlight the state circle's border
            d3.select("." + d.abbr).style("stroke", "#323232");
        })
        .on("mouseout", function (d) {
            // Remove tooltip
            toolTip.hide(d);
            // Remove highlight
            d3.select("." + d.abbr).style("stroke", "#e3e3e3");
        });


    d3.selectAll(".aText").on("click", function () {

        var self = d3.select(this);


        if (self.classed("inactive")) {

            var axis = self.attr("data-axis");
            var name = self.attr("data-name");

            if (axis === "x") {

                curX = name;


                xMinMax();

                xScale.domain([xMin, xMax]);

                svg.select(".xAxis").transition().duration(300).call(xAxis);

                d3.selectAll("circle").each(function () {

                    d3
                        .select(this)
                        .transition()
                        .attr("cx", function (d) {
                            return xScale(d[curX]);
                        })
                        .duration(300);
                });

                d3.selectAll(".stateText").each(function () {

                    d3
                        .select(this)
                        .transition()
                        .attr("dx", function (d) {
                            return xScale(d[curX]);
                        })
                        .duration(300);
                });

                labelChange(axis, self);
            }
            else {
                curY = name;

                yMinMax();

                yScale.domain([yMin, yMax]);

                svg.select(".yAxis").transition().duration(300).call(yAxis);

                d3.selectAll("circle").each(function () {


                    d3
                        .select(this)
                        .transition()
                        .attr("cy", function (d) {
                            return yScale(d[curY]);
                        })
                        .duration(300);
                });

                d3.selectAll(".stateText").each(function () {

                    d3
                        .select(this)
                        .transition()
                        .attr("dy", function (d) {
                            return yScale(d[curY]) + circRadius / 3;
                        })
                        .duration(300);
                });

                labelChange(axis, self);
            }
        }
    });

    d3.select(window).on("resize", resize);

    function resize() {

        width = parseInt(d3.select("#scatter").style("width"));
        height = width - width / 3.9;
        leftTextY = (height + labelArea) / 2 - labelArea;

        svg.attr("width", width).attr("height", height);

        xScale.range([margin + labelArea, width - margin]);
        yScale.range([height - margin - labelArea, margin]);

        svg
            .select(".xAxis")
            .call(xAxis)
            .attr("transform", "translate(0," + (height - margin - labelArea) + ")");

        svg.select(".yAxis").call(yAxis);

        tickCount();

        xTextRefresh();
        yTextRefresh();

        crGet();

        d3
            .selectAll("circle")
            .attr("cy", function (d) {
                return yScale(d[curY]);
            })
            .attr("cx", function (d) {
                return xScale(d[curX]);
            })
            .attr("r", function () {
                return circRadius;
            });

        d3
            .selectAll(".stateText")
            .attr("dy", function (d) {
                return yScale(d[curY]) + circRadius / 3;
            })
            .attr("dx", function (d) {
                return xScale(d[curX]);
            })
            .attr("r", circRadius / 3);
    }
}
