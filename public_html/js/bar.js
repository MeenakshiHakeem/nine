/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var barData=[]
$(document).ready(function(){
    $('.barGraph').on('click',function(){
        $('#groupedBarChartDiv').hide();
        $('#dashboardDiv').hide()
        $('#barChartDiv').show()
        $('.nav li').removeClass('active');
        $(this).addClass('active')
        getBarChart()
    })
})
/*Function to get bar chart*/
function getBarChart() {
    $('#bar1').empty();
        /*Margins*/
        var margin = {top: 20, right: 40, bottom: 70, left: 60},
                width = $('#bar1').width() - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;
        /*Svg*/
        var svg = d3.select("#bar1").append("svg")
                .attr('id', 'svg_id')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
        /*Axes*/
        var xAxis = d3.svg.axis()
        var yAxis = d3.svg.axis()
        /*scales and Ranges*/
        var x0 = d3.scale.ordinal()
                .rangeBands([0, width - margin.right], .2);
        var y = d3.scale.linear()
                .range([height, 0]);
        /*scales to axes*/
        xAxis.scale(x0)
                .orient("bottom")
        yAxis.scale(y)
                .orient("left")
        $.getJSON("json/bar1.json", function (data) {
            /*reading data*/
            barData = data.bardata;
            /*setting domains*/
            x0.domain(barData.map(function (d) {
                return d.Name
            }));
            y.domain([0, d3.max(barData, function (d) {
                    return d.Value
                })]);
            /*Appending axex to svg*/
            svg.append("g")
                    .attr("class", "bar_x_axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)");
            svg.append("g")
                    .attr("class", "bar_y_axis")
                    .call(yAxis)
            svg.append("g").selectAll("bar")
                    .data(barData)
                    .enter().append("rect")
                    .style("fill", "steelblue")
                    .attr("x", function (d) {
                        return x0(d.Name);
                    })
                    .attr("width", x0.rangeBand() / 2)
                    .attr("y", function (d, i) {
                        return y(d.Value);
                    })
                    .attr("height", function (d) {
                        return y(0) - y(d.Value)
                    });
        });
    }
//------------------------------------------------------------------------------
