/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('.groupedDashboardContainer').on('click', function () {
        $('#groupedBarChartDiv').show();
        $('#dashboardDiv').hide();
        $('#barChartDiv').hide();
        $('.nav li').removeClass('active');
        $(this).addClass('active')
        getGroupedBarChart()
    })

})
//------------------------------------------------------------------------------
/*Function to get grouped bar chart*/
function getGroupedBarChart(data) {
    $('#grouped_bar').empty();
    var margin = {
        top: 20,
        right: 100,
        bottom: 50,
        left: 50
    },
            width = $('#grouped_bar').width(),
            height = 210;
    var x0 = d3.scale.ordinal()
            .rangeBands([0, width - margin.right], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x0)
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "s")
    var svg = d3.select('#grouped_bar').append("svg")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom + 95)
            .attr('id', "svg_id")
            .append("g")
            .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")");
    $.getJSON("json/groupedBar.json", function (data) {
        var dataset = data.groupedBarData;
        var options = d3.keys(dataset[0]).filter(function (key) {
            return key !== "label";
        });
        dataset.forEach(function (d) {
            d.valores = options.map(function (name) {
                return {
                    name: name,
                    value: +d[name]
                };
            });
        });
        x0.domain(dataset.map(function (d) {
            return d.label;
        }));
        var minBarValue = d3.min(dataset, function (d) {
            return d3.min(d.valores, function (d) {
                return d.value;
            });
        })
        if (minBarValue < 0) {
            minBarValue = minBarValue;
        } else {
            minBarValue = 0;
        }
        x1.domain(options).rangeBands([0, x0.rangeBand()]);
        y.domain([minBarValue, d3.max(dataset, function (d) {
                return d3.max(d.valores, function (d) {
                    return d.value;
                });
            })]);
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -45)
                .attr("x", -102)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .style("font-size", function () {
                    return '10px';
                })
                .style("font-family", "Open Sans,sans-serif;")
                .text(function () {
                    return "yaxisTittle";
                });

        var bar = svg.selectAll(".bar")
                .data(dataset)
                .enter().append("g")
                .attr("class", "rect")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.label) + ",0)";
                });
        var rangeBand = x0.rangeBand();
        bar.selectAll("rect")
                .data(function (d) {
                    return d.valores;
                })
                .enter().append("rect")
                .attr("width", rangeBand / 2)
                .attr("x", function (d) {
                    return x1(d.name)
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("value", function (d) {
                    return d.name;
                })
                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .style("fill", function (d, i) {
                    if (i == 0) {
                        return "steelblue"
                    } else {
                        return "rgba(0, 128, 0, 0.49)"
                    }
                });
    });
}