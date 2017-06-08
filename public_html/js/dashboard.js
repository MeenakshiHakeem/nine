/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    $('.dashboardContainer').on('click',function(){
        $('#groupedBarChartDiv').hide();
        $('#dashboardDiv').show();
        $('#barChartDiv').hide();
        $('.nav li').removeClass('active');
        $(this).addClass('active')
    })
})

