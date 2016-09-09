"use strict";
require('../../scss/demo.scss');
$(document).ready(function(){
    var slider = require('../mods/ui/card-slider');
    setTimeout(function(){
        new slider($("#demo"));
    },300);
    console.log('log...........!!!!');
    console.log('hello world!!');
});
