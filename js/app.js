'use strict';

const objArray = [];

function Horned(animalObject) {
  this.url = animalObject.image_url;
  this.title = animalObject.title;
  this.description = animalObject.description;
  this.keyword = animalObject.keyword;
  this.horns = animalObject.horns;
  objArray.push(this);
}


Horned.prototype.render = function() {
  $('main').append('<div id="copy"></div>');
  let $imgContainer = $('div[id = "copy"]');
  let $imgTemplate = $('#photo-template').html();


  $imgContainer.html($imgTemplate);

  $imgContainer.find('img').attr('src', this.url);
  $imgContainer.find('img').attr('data-keyword', this.keyword);
  $imgContainer.find('img').attr('data-horns', this.horns);
  $imgContainer.find('img').attr('alt', this.keyword);
  $imgContainer.find('h2').text(this.title);
  $imgContainer.find('p').text(this.description);

  $imgContainer.removeAttr('id');
}

//render all images
function renderImages() {
  objArray.forEach(obj => {
    obj.render();
  });
}

//read data and create objects
 function readData() {
   $.get('../data/page-1.json', data => {
     data.forEach(obj => {
       new Horned(obj);
     });
   }).then(renderImages);
 }

readData();
