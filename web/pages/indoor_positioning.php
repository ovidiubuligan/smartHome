<head>
		<link rel="stylesheet" type="text/css" href="/css/indoor_positioning.css">
			<script src="js/indoor_positioning.js"></script>

</head>
<body>
	
	<?php
	  include "basic_menu.php";
	?>

	<div>
		<h1><?php etrans("indoor_positioning"); ?></h1>
		<p><?php etrans("indoor_positioning_description"); ?>
		</p>
	</div>

	<div id="button_area">
	</div>
	<script>
	loadIndoorPos();
	</script>
	<div>
		<button type="button" class="btn btn-primary" id="add-button-pos"><?php etrans("add_switch"); ?></button>
	</div>
</body>