// Functions and namespace for this app.
var foods = {};
var page = 5;
var foodsContainer;
var foodsMarkup;
var foodContainer;
var foodMarkup;
var foodContent;
var categories;
var itemContainer;
foods.setup = false;
  
$(document).ready(function(){
  foods.userMessage({'food_color_background': '555555', 'color':  'ffffff'}, "Loading Foods", 6000);
  foods.loadContent();
  foods.searchFood();
  foods.loadCategories();

  foods.customizeInitialLoad();
  
});


foods.customizeInitialLoad = function() {
  $("div#search input.search").val("Search for a food");
  $("div#search input.search").focus(function(){
    $("div#search input.search").val('');
  });

};


foods.loadContent = function() {
  var path = "api/foods.php";
  var contentData = path + "?page=" + page + "&cache=" + Math.floor(Math.random()*11);
  
  var data = "";

  $.ajax({
    url:  contentData,
    dataType: 'json',
    data: data,
    success: foods.contentLoadSuccess,
    error: foods.loadDataError
  });

  return false;
};

foods.loadDataError = function(data) {
  console.log(data);
  return false;
};

foods.contentLoadSuccess = function(data) {
  foods.data = data;
  foods.content = data["foods"];

  if(window.location.hash !== "") {
    hash = window.location.hash.replace('#', '');
    foods.loadFood(hash);
  }
  else{
    if(foods.setup === false) {
      foods.setupLoadFoods();
      foods.loadFoods();
    }
    else {
      foods.loadFoods();   
    }


  foods.foodClick();
  
  // Isotope

  if($('div#foods .food').length > 0) {
    $(function(){      
      $('div#foods').isotope({
        itemSelector: '.food',
        layoutMode : 'masonry'
      });
    });    
  }
  else {
    foods.userMessage({'food_color_background': '555555', 'color':  'ffffff'}, "No results found", 10000);
  }
    
  }
  return false;
};

foods.foodClick = function() {

  $("div#foods div.food a").click(function(){
      var food_id = $(this).attr("id"); 


      foods.loadFood(food_id);
    }
  );
  return false;
};

foods.setupLoadFoods = function() {
  var type = "food";
  foodsContainer = $('div#foods');
  foodsMarkup = foodsContainer.html();
  foodContent = {};

  foodsContainer.empty();
  $.template( "foodsTemplate", foodsMarkup );  

  foodContainer = $('div#food');
  foodMarkup = foodContainer.html();
  $.template( "foodTemplate", foodMarkup ); 

  foods.setup = true;

};


foods.loadFoods = function() {
  foodsContainer.empty();
  for (var i in foods.content) {
    $.tmpl("foodsTemplate", foods.content[i])
      .appendTo(foodsContainer); 
  }
  
  $('div#foods .food').css('visibility', 'visible');

  return false;
};

foods.loadFood = function(key) {
  for (var i in foods.content) {  
    if(foods.content[i]["_id"] !== null && foods.content[i]['_id']['$id'] == key) {

      foodContainer.empty();
      
      foodContent = foods.content[i];

      $.tmpl("foodTemplate", foodContent )
      .appendTo(foodContainer);

      foods.editButtons(foodContent);
      foods.imageCrop();   

      break;
    }

  }

  return false;  
};

foods.loadData = function(content, source) {
  var data = {};
  for (var i in foods.content) {  

    if(foods.content[i].source_data !== null && foods.content[i].source_data !== undefined && source !== undefined) {
      if(foods.content[i].source_data[source] !== undefined) {
        data = foods.content[i].source_data[source];
      return data;
      }

    }
  }
};

foods.searchFood = function() {
    $("div#search input.search").keypress(function(e) {
      // On hit enter
      if ( e.which == 13 ) {
        foods.searchFoodQuery();
      }
    });
   $("div#search input.button").click(foods.searchFoodQuery);
}

foods.searchFoodQuery = function(){

  var searchValue = $("div#search input.search").val();
  $('div.search-string').html(searchValue);
  var path = "api/search.php?search=" + searchValue;
   console.log(path);
  var contentData = path + "&cache=" + Math.floor(Math.random()*11);
  
  var data = "";

  $.ajax({
    url:  contentData,
    dataType: 'json',
    data: data,
    success: foods.contentLoadSuccess,
    error: foods.loadDataError
  });


  return false;
}

foods.loadCategories = function() {
  
    var path = "api/categories.php";
   
    var contentData = path + "?cache=" + Math.floor(Math.random()*11);
    
    var data = "";
  
    $.ajax({
      url:  contentData,
      dataType: 'json',
      data: data,
      success: foods.categoriesLoadSuccess,
      error: foods.loadDataError
    });
};

foods.categoriesLoadSuccess = function(data) {
  var all = {'category':'all'};
  categories = data["categories"];
  categories.unshift(all); 
  itemsContainer = $('div#filters select#categories');
      
 
  var itemsMarkup = itemsContainer.html();
  itemsContainer.empty();
  $.template( "itemsTemplate", itemsMarkup ); 
  
  
  $.tmpl("itemsTemplate", categories)
  .appendTo(itemsContainer);



  $("div#filters").change(function(){
 
    var searchValues = '';
    var numberSelected = $("select#categories option:selected").length;
    var i = 0;
  
    $("select#categories option:selected").each(function () {
      searchValues += $(this).text().trim();
      if(i < numberSelected - 1) {
        searchValues += ",";
      }
      i++;    
    });
  
    var path = "api/search.php?category=" + searchValues;
/*     console.log(path); */
   
    var contentData = path + "&cache=" + Math.floor(Math.random()*11);
    
    var data = "";
  
    $.ajax({
      url:  contentData,
      dataType: 'json',
      data: data,
      success: foods.contentLoadSuccess,
      error: foods.loadDataError
    });
  
  
    return false;
  
  });
}

foods.editButtons = function(food) {
  var record = {};
  record.food = foodContent;

  $("div.colors .background input.picker").spectrum({
    color: foodContent.food_color_background
  });

  $("div.colors .background input.picker").spectrum({
    change: function(color) {
      var record = {};
      record.food = foodContent;
      var newColor = color.toHexString();
      newColor = newColor.replace('#', "");
      record.food.food_color_background = newColor;

      $("div#foods .food a#" + record.food["_id"]["$id"]).css("background-color", "#" + newColor);

      foods.updateRecord(record);
    }
  });


    var currentColor =  food.food_color_text;

    if(currentColor == '131313') {
      $('div.colors .text input[name=food_color_text]:nth(0)').attr('checked',true);
    }
    if(currentColor == 'EEEFE6') {

      $('div.colors .text input[name=food_color_text]:nth(1)').attr('checked',true);
    }


  $("div.colors .text input[name=food_color_text]").change(function() {
    var record = {};
    record.food = foodContent;
    var currentColor = $(this).val();
    if(currentColor == 'dark') {
      record.food.food_color_text = '131313';
    }
    if(currentColor == 'light') {
      record.food.food_color_text = 'EEEFE6';
    }

      $("div#foods .food a#" + record.food["_id"]["$id"]).css("color", "#" + record.food.food_color_text);

    foods.updateRecord(record);
  });
};

foods.updateRecord = function(record) {

    var path = "api/update.php";

    var contentData = path + "?cache=" + Math.floor(Math.random()*11);
  
    $.ajax({
      url:  contentData,
      type: 'POST',
      dataType: 'json',
      data: record,
      success: foods.updateLoadSuccess,
      error: foods.loadDataError
    });

};

foods.updateLoadSuccess = function(data, message) {
  foods.loadFood(data.food[0]["_id"]["$id"]);
  foods.userMessage(data.food[0], "Saved", 2000);
};

foods.userMessage = function(data, message, duration) {
  $('div#message').html(message);
  $('div#message').css('background-color', '#' + data.food_color_background);
  $('div#message').css('color', '#' + data.food_color_text);
  $('div#message').show().fadeOut(duration);
}

foods.imageCrop = function() {
  // Almost, not quite.
  // Trying to resize and crop images with canvas & javascript.
  var image  = {};
  var canvas = ['food-canvas'];
  var images = ['food-image'];
  
  image.canvas = {};
  image.context = {};
  image.img = {};
  image.imageObj = {};
  
  image.img["img"] = document.getElementById(images[0]);
  if(image.img["img"] !== undefined && image.canvas["food-canvas"] !== undefined) {
    image.canvas["food-canvas"] = document.getElementById(canvas[0]);
    image.context["context"] = image.canvas["food-canvas"].getContext("2d");

    image.imageObj["food-image"] = new Image();
    $(image.imageObj["food-image"]).attr('width', image.img["img"].width);
    $(image.imageObj["food-image"]).attr('height', image.img["img"].height);
    
    image.imageObj["food-image"].src = image.img["img"].src;

    image.imageObj["food-image"].onload = function(){
      image.width = parseInt($(this).attr('width'));
      image.height = parseInt($(this).attr('height'));      
      image.context["context"].drawImage(image.img["img"], image.width * -0.1,  image.height * -0.5,  image.width,  image.height);     
    }
  }
};

foods.formatDate = function (datetime) {

  var date = new Date(datetime.sec*1000);

  // hours part from the timestamp
  var hours = date.getHours();
  // minutes part from the timestamp
  var minutes = date.getMinutes();
  // seconds part from the timestamp
  var seconds = date.getSeconds();
  
  // will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes + ':' + seconds;

    return date;
}
