"use strict;"
const BASE = 'https://windy-brawny-lumber.glitch.me/movies'
$.get(BASE, function () {
    console.log('loading')
}).done(function (results){
    console.log(results)
})
