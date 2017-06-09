<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="Gerrit Alex" />
	<meta name="robots" content="index, nofollow" />
	<meta name="language" content="en" />
	<meta name="description" content="Advanced Armory Access combines provides instant in-depth progress statistics of any World of Warcraft:Legion character" />
	<meta name="keywords" lang="en" content="world of warcraft, legion, character, raid, heroic, mythic, progress, mythic plus, mythic+" />
	<meta name="reply-to" content="admin@gerritalex.de">
	<meta name="distribution" content="global">
	<meta name="revisit-after" content="7 days">
	<meta name="page-topic" content="quick lookup tool for World of Warcraft: Legion characters">
	<meta charset="UTF-8">
	<title>Advanced Armory Access</title>
	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script>
		var wowhead_tooltips = {
			iconizelinks: true,
			renamelinks: true,
			droppedby: true,
			"hide": {
				"dropchance": true,
				"sellprice": true,
				"maxstack": true,
			}
		}
	</script>
	<script>
		( function ( i, s, o, g, r, a, m ) {
			i[ "GoogleAnalyticsObject" ] = r;
			i[ r ] = i[ r ] || function () {
				( i[ r ].q = i[ r ].q || [] ).push( arguments )
			}, i[ r ].l = 1 * new Date();
			a = s.createElement( o ),
				m = s.getElementsByTagName( o )[ 0 ];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore( a, m )
		} )( window, document, "script", "https://www.google-analytics.com/analytics.js", "ga" );

		ga( "create", "UA-96406935-1", "auto" );
		ga( "send", "pageview" );
	</script>

	<script type="text/javascript" src="js/call-min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/realms.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
	<link rel="stylesheet" href="css/core.css"/>
</head>

<body>
	<div class="wrapper">

		<div class="start">

			<?php

			if ( isset( $_GET[ 'r' ] ) && isset( $_GET[ 's' ] ) && isset( $_GET[ 'c' ] ) ) {

				echo '				
				<form method="GET" action="">
					<input type="text" id="character" value="' . $_GET[ 'c' ] . '" hidden />
					<input type="text" id="region" value="' . $_GET[ 'r' ] . '" hidden />
					<input type="text" id="realm" value="' . $_GET[ 's' ] . '" hidden />				
				</form>';

			} else {

				echo '
				<h1 style="text-align: center; color: orange;">Advanced Armory Access</h1>
				<br />
				<h2 style="text-align: center; color: orange;">extended tool of <a href="http://ags.gerritalex.de">Advanced Guild Statistics</a></h2>
				<p style="text-align: center; color: orange;">
				for direct access, add /?r=REGION&s=REALM&c=CHARACTER to this url
				<br />
				<a href="http://armory.gerritalex.de/?r=EU&s=Blackmoore&c=Xepheris" title="developer character as example">example character</a></p>
			<div style="padding: 10px; height: auto; margin: 0 auto; width: 322px; position: relative;">			
				
				<div class="mdl-textfield mdl-js-textfield mdl-js-textfield">
					<input class="mdl-textfield__input" type="text" id="character" placeholder="character name" maxlength="16" style="color: white;">
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-js-textfield">
					<input class="mdl-textfield__input" type="text" id="region" placeholder="region (EU, US, TW, KR)" maxlength="2" style="color: white;"/>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-js-textfield">
					<input class="mdl-textfield__input" type="text" id="realm" placeholder="server" oninput="realmpop();" style="color: white;"/>
				</div>			
				
				<center><button id="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="call();">Fetch</button></center>
				
			</div>
			<p style="color: yellowgreen; text-align: center;">5th May updates: EQ values have been adjusted to 7.2 values, you will, in average, see a small increase</p>';
			}

			?>

		</div>

		<div class="result">
			<div class="head">
				<div class="thumbnail">

				</div>
				<div class="name">

				</div>

				<div class="spec">

				</div>

			</div>

			<div class="equip">
				<p class="RBold">Current Equipment <span class="itemlevel"></span>
				</p>
				<table class="equipment_table">
					<thead>
					</thead>
					<tbody class="equipment_body">
					</tbody>
				</table>
				<table class="equipment_table">
					<thead>
					</thead>
					<tbody class="weapon">
					</tbody>
				</table>
				<table class="equipment_table">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td class="relics"></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="dungeons">
				<p class="RBold">Dungeons</p>
				<table class="dungeons_table">
					<thead>
						<tr>
							<th></th>
							<th>N</th>
							<th>HC</th>
							<th>Mythic</th>
						</tr>
					</thead>
					<tbody class="dungeons_body">
					</tbody>
				</table>
				<table class="dungeons_table" style="border-top: 4px solid rgba(56, 66, 88, 0.85);">
					<thead>
					</thead>
					<tbody class="mythic_plus_body">

					</tbody>
				</table>
			</div>

			<div class="reputation">
				<table>
					<thead>

					</thead>
					<tbody>
						<tr>

						</tr>
					</tbody>
				</table>
			</div>

			<div class="raids">
				<table class="raid_1">
					<tbody>
						<tr style="height: 60px;">
							<td colspan="5"><span style="color: orange; font-size: 20px;" class="RBold">Emerald Nightmare</span>
							</td>
						</tr>
					</tbody>
				</table>

				<table class="raid_2">
					<tbody>
						<tr style="background-position-y: 385px; height: 60px;">
							<td colspan="5"><span style="color: orange; font-size: 20px;" class="RBold">Trial of Valor</span>
							</td>
						</tr>
					</tbody>
				</table>

				<table class="raid_3">
					<tbody>
						<tr style=" background-position-y: 170px; height: 60px;">
							<td colspan="5"><span style="color: orange; font-size: 20px;" class="RBold">The Nighthold</span>
							</td>
						</tr>
					</tbody>
				</table>

				<table class="raid_4">
					<tbody>
						<tr style="height: 60px;">
							<td colspan="5"><span style="color: orange; font-size: 20px;" class="RBold">Tomb of Sargeras</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<?php

	if ( isset( $_GET[ 'r' ] ) && isset( $_GET[ 's' ] ) && isset( $_GET[ 'c' ] ) ) {
		echo '<script type="text/javascript">call();</script>';
	}

	?>
	<script type="text/javascript">
		$( document ).keypress( function ( e ) {
			if ( e.which == 13 ) {
				$( "#button" ).click();
			}
		} );
	</script>
</body>

</html>