"use strict";
require('../../scss/demo.scss');
$(document).ready(function(){
    var Slider = require('../mods/ui/card-slider');
    setTimeout(function(){
        var slider = new Slider($("#demo"));
        slider.on('change',function(num){
            console.log(num);
        });
    },300);
    console.log('log...........!!!!');
    console.log('hello world!!');
});
