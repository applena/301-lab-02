'use strict';

const objArray = [];
const keywordArray = [];
const hornsArray = [];


function Horned(animalObject) {
  this.url = animalObject.image_url;
  this.title = animalObject.title;
  this.description = animalObject.description;
  this.keyword = animalObject.keyword;
  this.horns = animalObject.horns;
  objArray.push(this);

 
}

Horned.prototype.render = function() {
  let hornSource = $('#container').html();
  let hornTemplate = Handlebars.compile(hornSource);
  let hornHtml = hornTemplate(this);

  $('main').append(hornHtml);
}


function sortTitle(arr){
  arr.sort((a,b) =>{
    if(a.title.toUpperCase() < b.title.toUpperCase()){
      return -1;
    } if (a.title.toUpperCase() > b.title.toUpperCase()){
      return 1
  }
  return 0;
});
}




function renderImages() {
  objArray.forEach(obj => {
    obj.render();
 
  });

checkKeywords();
checkHorns();
addOptionEl();

}

//read data and create objects
 function readData() {
   $.get('../data/page-2.json', data => {
     data.forEach(obj => {
       new Horned(obj);
       sortTitle(objArray);
      //  sortTitle(objArray);
      //  console.log(sortTitle(objArray));
     });
   }).then(renderImages);
 }

function checkKeywords() {

  objArray.forEach(obj => {
    if (!keywordArray.includes(obj.keyword)) {
      keywordArray.push(obj.keyword);
    }
  });
}

function addOptionEl() {
  keywordArray.forEach(keyword => {
    $('select').append('<option id = "temp"></option>');
    $('#temp').text(keyword).attr('value', keyword).removeAttr('id');
  });
}

function checkHorns() {
  objArray.forEach(obj => {
    if (!hornsArray.includes(obj.horns)) {
      hornsArray.push(obj.horns);
    }
  });
}


readData(); 
addOptionEl();

$('select').on('change', function(){
  let $select = $(this).val();
  $('div').hide();
  $(`div[data-keyword="${$select}"]`).show();
})
