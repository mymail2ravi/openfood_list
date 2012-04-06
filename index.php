<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Foods</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">


    <link href="css/style.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <body data-spy="scroll" data-target=".subnav" data-offset="50">


  <!-- Navbar
    ================================================== -->
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="./index.html">Foods</a>
          <div class="nav-collapse">
            <ul class="nav">

            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container">

<!-- Masthead
================================================== -->

<div class="content">

  <div id="search">
    <input class="search" type="text" />
    <input class="button" type="submit" value="submit" />
  </div>  

  <div id="filters">
    <label>Categories</label>
    <select id="categories" name="categories" multiple="multiple">
      <option>${category}</option>
    </select>
  </div>  

      <!-- about modal content -->
    <div id="food" class="modal hide">
      <div class="modal-header">
        <a class="close" data-dismiss="modal" >&times;</a>
        <h3>${name}</h3>
      </div>
      <div class="modal-body">
        <h4>Names</h4>
        <dd>
          <dt>Scientific Name</dt><dd>${scientific_name}</dd>
          <dt>Alternate names</dt><dd>${alternate_names}</dd>
        </dd>
        <h4>Categories</h4>
        <div class="categories">
          ${category}
        </div>
        <div class="color">
          ${food_color_background}
          ${food_color_text}
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn" data-dismiss="modal" >Close</a>
      </div>
    </div>

  <div id="foods" class="inner-transition">
    <div class="food">
      <p><a id="${_id.$id}" href="#food" data-toggle="modal" style="background-color:{{if food_color_background}}#${food_color_background}{{else}}#dedede{{/if}};color:{{if food_color_text}}#${food_color_text}{{else}}#222{{/if}}">${name}</a></p>
    </div>
  </div>
  
  


</div>


     <!-- Footer
      ================================================== -->
      <footer class="footer">
     </footer>

    </div><!-- /container -->



    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/google-code-prettify/prettify.js"></script>
    <script src="assets/js/bootstrap-transition.js"></script>
    <script src="assets/js/bootstrap-alert.js"></script>
    <script src="assets/js/bootstrap-modal.js"></script>
    <script src="assets/js/bootstrap-dropdown.js"></script>
    <script src="assets/js/bootstrap-scrollspy.js"></script>
    <script src="assets/js/bootstrap-tab.js"></script>
    <script src="assets/js/bootstrap-tooltip.js"></script>
    <script src="assets/js/bootstrap-popover.js"></script>
    <script src="assets/js/bootstrap-button.js"></script>
    <script src="assets/js/bootstrap-collapse.js"></script>
    <script src="assets/js/bootstrap-carousel.js"></script>
    <script src="assets/js/bootstrap-typeahead.js"></script>
    <script src="assets/js/application.js"></script>

    <script src="js/jquery-tmpl/jquery.tmpl.min.js"></script>
    <script src="js/jquery.isotope.min.js"></script>
    <script src="js/foodcards.js"></script>

  </body>
</html>
