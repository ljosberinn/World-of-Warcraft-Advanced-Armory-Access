function checkImageExists(imageUrl, callBack) {
	var imageData = new Image();
	imageData.onload = function () {
		callBack(true);
	};
	imageData.onerror = function () {
		callBack(false);
	};
	imageData.src = imageUrl;
}

function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

// GENERAL CHARACTER INFORMATION

function call(character, region, realm) {

	$('.start').fadeOut(1000);
	$('head').append('<link rel="stylesheet" type="text/css" href="css/char.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="css/line-scale.min.css">');

	$('.name').prepend('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.general').prepend('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.equip').append('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.dungeon_body').prepend('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.mythic_plus_body').prepend('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.reputation').prepend('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.raid_1').append('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.raid_2').append('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.raid_3').append('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');
	$('.raid_4').append('<div class="la-line-scale la-2x" style="margin-left: calc(50% - 40px); margin-top: 15px; margin-bottom: 15px;"><div></div><div></div><div></div><div></div><div></div></div>');

	$('.result').fadeIn(1000);

	var character = $('#character').val();
	var region = $('#region').val();
	var realm = $('#realm').val();

	var api = '';

	var apiURL = 'https://' + region + '.api.battle.net/wow/character/' + realm + '/' + character + '?fields=items,statistics,achievements,talents&locale=en_GB&apikey=' + api + '';

	$.ajax({
		url: '' + apiURL + '',
		type: 'get',
		dataType: 'json',
		success: function (data) {


			var last_logout = data.lastModified;

			var name = data.name;

			var realm = data.realm;

			window.history.pushState('' + name + ' @ ' + realm + ' – ' + region.toUpperCase() + '', '' + name + ' @ ' + realm + ' – ' + region.toUpperCase() + '', '/?r=' + region.toUpperCase() + '&s=' + realm + '&c=' + character + '');

			document.title = '' + name + ' @ ' + realm + ' – ' + region.toUpperCase() + '';

			var battlegroup = data.battlegroup;

			// CLASS & TIER SET SWITCHER
			switch (data.class) {
				case 1:
					var cl = 'Warrior';
					var cl_color = 'rgba(199, 156, 110, 0.6)';
					var t19 = new Array(138351, 138354, 138357, 138360, 138363, 138374);
					var t20 = new Array(147187, 147188, 147189, 147190, 147191, 147192);
					break;
				case 2:
					var cl = 'Paladin';
					var cl_color = 'rgba(245, 140, 186, 0.6)';
					var t19 = new Array(138350, 138353, 138356, 138359, 138362, 138369);
					var t20 = new Array(147157, 147158, 147159, 147160, 147161, 147162);
					break;
				case 3:
					var cl = 'Hunter';
					var cl_color = 'rgba(102, 160, 77, 0.6)';
					var t19 = new Array(138339, 138340, 138342, 138344, 138347, 138368);
					var t20 = new Array(147139, 147140, 147141, 147142, 147143, 147144);
					break;
				case 4:
					var cl = 'Rogue';
					var cl_color = 'rgba(255, 245, 105, 0.6)';
					var t19 = new Array(138326, 138329, 138332, 138335, 138338, 138371);
					var t20 = new Array(147169, 147170, 147171, 147172, 147173, 147174);
					break;
				case 5:
					var cl = 'Priest';
					var cl_color = 'rgba(255, 255, 255, 0.6)';
					var t19 = new Array(138310, 138313, 138316, 138319, 138322, 138370);
					var t20 = new Array(147163, 147164, 147165, 147166, 147167, 147168);
					break;
				case 6:
					var cl = 'Death Knight';
					var cl_color = 'rgba(196, 31, 59, 0.6)';
					var t19 = new Array(138349, 138352, 138355, 138358, 138361, 138364);
					var t20 = new Array(147121, 147122, 147123, 147124, 147125, 147126);
					break;
				case 7:
					var cl = 'Shaman';
					var cl_color = 'rgba(0, 112, 222, 0.6)';
					var t19 = new Array(138341, 138343, 138345, 138346, 138348, 138372);
					var t20 = new Array(147175, 147176, 147177, 147178, 147179, 147180);
					break;
				case 8:
					var cl = 'Mage';
					var cl_color = 'rgba(105, 204, 240, 0.6)';
					var t19 = new Array(138309, 138312, 138315, 138318, 138321, 138365);
					var t20 = new Array(147145, 147146, 147147, 147148, 147149, 147150);
					break;
				case 9:
					var cl = 'Warlock';
					var cl_color = 'rgba(148, 130, 201, 0.6)';
					var t19 = new Array(138311, 138314, 138317, 138320, 137323, 138373);
					var t20 = new Array(147181, 147182, 147183, 147184, 147185, 147186);
					break;
				case 10:
					var cl = 'Monk';
					var cl_color = 'rgba(0, 255, 150, 0.6)';
					var t19 = new Array(138325, 138328, 138331, 138334, 138337, 138367);
					var t20 = new Array(147151, 147152, 147153, 147154, 147155, 147156);
					break;
				case 11:
					var cl = 'Druid';
					var cl_color = 'rgba(255, 125, 10, 0.6)';
					var t19 = new Array(138324, 138327, 138330, 138333, 138336, 138366);
					var t20 = new Array(147133, 147134, 147135, 147136, 147137, 147138);
					break;
				case 12:
					var cl = 'Demon Hunter';
					var cl_color = 'rgba(163, 48, 201, 0.6)';
					var t19 = new Array(138375, 138376, 138377, 138378, 138379, 138380);
					var t20 = new Array(147127, 147128, 147129, 147130, 147131, 147132);
					break;
			}

			$('.head').css('background-color', cl_color);

			// RACE SWITCHER
			switch (data.race) {
				case 1:
					var race = 'Human';
					break;
				case 2:
					var race = 'Orc';
					break;
				case 3:
					var race = 'Dwarf';
					break;
				case 4:
					var race = 'Night Elf';
					break;
				case 5:
					var race = 'Undead';
					break;
				case 6:
					var race = 'Tauren';
					break;
				case 7:
					var race = 'Gnome';
					break;
				case 8:
					var race = 'Troll';
					break;
				case 9:
					var race = 'Goblin';
					break;
				case 10:
					var race = 'Blood Elf';
					break;
				case 11:
					var race = 'Draenei';
					break;
				case 22:
					var race = 'Worgen';
					break;
				case 24:
					var race = 'Pandaren';
					break;
				case 25:
					var race = 'Pandaren';
					break;
				case 26:
					var race = 'Pandaren';
					break;
			}

			var achievementPoints = data.achievementPoints;

			var thumbnail = data.thumbnail;

			checkImageExists('http://' + region.toLowerCase() + '.battle.net/static-render/' + region.toLowerCase() + '/' + thumbnail + '', function (existsImage) {
				if (existsImage == true) {
					$('.thumbnail').append('<img src="http://' + region.toLowerCase() + '.battle.net/static-render/' + region.toLowerCase() + '/' + thumbnail + '" title="thumbnail" alt="thumbnail" />');
					$('head').append('<link href="http://' + region.toLowerCase() + '.battle.net/static-render/' + region.toLowerCase() + '/' + thumbnail + '" rel="shortcut icon" type="image/x-icon" />');
				} else {
					$('.thumbnail').append('<img src="https://us.battle.net/forums/static/images/avatars/avatar-default.png" title="' + name + ' thumbnail" alt="thumbnail" height="84px" />');
					$('head').append('<link href="http://media.blizzard.com/wow/icons/56/' + selected_spec_icon + '.jpg" rel="shortcut icon" type="image/x-icon" />');
				}
				$('.thumbnail').find('.la-line-scale').fadeOut(1);
			});


			// FACTION SWITCHER					
			switch (data.faction) {
				case 0:
					var faction = 'Alliance';
					break;
				case 1:
					var faction = 'Horde';
			}

			var averageItemLevel = data.items.averageItemLevel;

			var averageItemLevelEquipped = data.items.averageItemLevelEquipped;

			$('.itemlevel').find('.la-line-scale').fadeOut(500);
			$('.itemlevel').append('(' + averageItemLevelEquipped + '/' + averageItemLevel + ')');

			var honorableKills = data.honorableKills;

			// TALENTS		
			for (i = 0; i <= '4'; i++) {
				if (typeof (data.talents[i]) != 'undefined') {
					if (data.talents[i].selected == true) {
						var selected_spec_name = data.talents[i].spec.name;
						var selected_spec_icon = data.talents[i].spec.icon;
						var selected_spec_role = data.talents[i].spec.role;
					}
				}
			}

			$('.name').append('<div><h1 style="margin: 0 auto;">' + name + ' @ ' + realm + ' – ' + region.toUpperCase() + '</h1>' + race + ' ' + selected_spec_name + ' ' + cl + '<br /><a href="http://armory.gerritalex.de" title="Advanced Armory Access start page">lookup someone else</a></div>');
			$('.name').find('.la-line-scale').fadeOut(1);
			$('.spec').append('<img src="http://media.blizzard.com/wow/icons/56/' + selected_spec_icon + '.jpg" alt="spec" title="spec" width="84px"/>');

			switch (cl) {
				case 'Warrior':
					switch (selected_spec_name) {
						case 'Arms':
							var trait_spec = 71;
							break;
						case 'Fury':
							var trait_spec = 72;
							break;
						case 'Protection':
							var trait_spec = 73;
							break;
					}
					break;
				case 'Death Knight':
					switch (selected_spec_name) {
						case 'Blood':
							var trait_spec = 250;
							break;
						case 'Frost':
							var trait_spec = 251;
							break;
						case 'Unholy':
							var trait_spec = 252;
							break;
					}
					break;
				case 'Demon Hunter':
					switch (selected_spec_name) {
						case 'Havoc':
							var trait_spec = 577;
							break;
						case 'Vengeance':
							var trait_spec = 581;
							break;
					}
					break;
				case 'Druid':
					switch (selected_spec_name) {
						case 'Balance':
							var trait_spec = 102;
							break;
						case 'Feral':
							var trait_spec = 103;
							break;
						case 'Guardian':
							var trait_spec = 104;
							break;
						case 'Restoration':
							var trait_spec = 105;
							break;
					}
					break;
				case 'Hunter':
					switch (selected_spec_name) {
						case 'Beast Mastery':
							var trait_spec = 253;
							break;
						case 'Marksmanship':
							var trait_spec = 254;
							break;
						case 'Survival':
							var trait_spec = 255;
							break;
					}
					break;
				case 'Mage':
					switch (selected_spec_name) {
						case 'Arcane':
							var trait_spec = 62;
							break;
						case 'Fire':
							var trait_spec = 63;
							break;
						case 'Frost':
							var trait_spec = 64;
							break;
					}
					break;
				case 'Monk':
					switch (selected_spec_name) {
						case 'Brewmaster':
							var trait_spec = 268;
							break;
						case 'Mistweaver':
							var trait_spec = 270;
							break;
						case 'Windwalker':
							var trait_spec = 269;
							break;
					}
					break;
				case 'Paladin':
					switch (selected_spec_name) {
						case 'Holy':
							var trait_spec = 65;
							break;
						case 'Protection':
							var trait_spec = 66;
							break;
						case 'Retribution':
							var trait_spec = 70;
							break;
					}
					break;
				case 'Priest':
					switch (selected_spec_name) {
						case 'Discipline':
							var trait_spec = 256;
							break;
						case 'Holy':
							var trait_spec = 257;
							break;
						case 'Shadow':
							var trait_spec = 258;
							break;
					}
				case 'Rogue':
					switch (selected_spec_name) {
						case 'Assassination':
							var trait_spec = 259;
							break;
						case 'Outlaw':
							var trait_spec = 260;
							break;
						case 'Subtlety':
							var trait_spec = 261;
							break;
					}
					break;
				case 'Shaman':
					switch (selected_spec_name) {
						case 'Elemental':
							var trait_spec = 262;
							break;
						case 'Enhancement':
							var trait_spec = 263;
							break;
						case 'Restoration':
							var trait_spec = 264;
							break;
					}
					break;
				case 'Warlock':
					switch (selected_spec_name) {
						case 'Affliction':
							var trait_spec = 265;
							break;
						case 'Demonology':
							var trait_spec = 266;
							break;
						case 'Destruction':
							var trait_spec = 267;
							break;
					}
					break;
			}

			// ITEMS
			var items = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2'];

			var item_container = data.items;

			$('.equip').find('.la-line-scale').fadeOut(500);

			var t19_pcs = new Array();
			var t20_pcs = new Array();

			items.forEach(function (item) {
				var item_id = item_container[item].id;

				if (($.inArray(item_id, t19)) > -1) {
					t19_pcs.push(item_id);
				}
				if (($.inArray(item_id, t20)) > -1) {
					t20_pcs.push(item_id);
				}
			})

			if (t19_pcs.length > 0 || t20_pcs.length > 0) {
				var set = '' + t19_pcs[0] + ':' + t19_pcs[1] + ':' + t19_pcs[2] + ':' + t19_pcs[3] + ':' + t19_pcs[4] + ':' + t19_pcs[5] + ':' + t20_pcs[0] + ':' + t20_pcs[1] + ':' + t20_pcs[2] + ':' + t20_pcs[3] + ':' + t20_pcs[4] + ':' + t20_pcs[5] + '';
			}

			items.forEach(function (item) {
				var item_id = item_container[item].id;
				var item_name = item_container[item].name;
				var item_ilvl = item_container[item].itemLevel;


				if (item == 'neck' || item == 'shoulder' || item == 'back' || item == 'finger1' || item == 'finger2') {
					if (typeof (item_container[item].tooltipParams.enchant) != 'undefined') {
						var item_enchant = item_container[item].tooltipParams.enchant;

						// ENCHANT CONVERTER
						switch (item_enchant) {
							case 5437:
								var wowhead_id = '128551';
								var enchant_name = 'Enchant Neck - Mark of the Claw';
								break;
							case 5439:
								var wowhead_id = '128553';
								var enchant_name = 'Enchant Neck - Mark of the Hidden Satyr';
								break;
							case 5883:
								var wowhead_id = '140219';
								var enchant_name = 'Boon of the Bloodhunter';
								break;
							case 5889:
								var wowhead_id = '141908';
								var enchant_name = 'Enchant Neck - Mark of the Heavy Hide ';
								break;
							case 5890:
								var wowhead_id = '141909';
								var enchant_name = 'Enchant Neck - Mark of the Trained Soldier';
								break;
							case 5891:
								var wowhead_id = '141910';
								var enchant_name = 'Enchant Neck - Mark of the Ancient Priestess';
								break;
							case 5431:
								var wowhead_id = '128545';
								var enchant_name = 'Enchant Cloak - Word of Strength';
								break;
							case 5432:
								var wowhead_id = '128546';
								var enchant_name = 'Enchant Cloak - Word of Agility';
								break;
							case 5433:
								var wowhead_id = '128547';
								var enchant_name = 'Enchant Cloak - Word of Intellect';
								break;
							case 5434:
								var wowhead_id = '128548';
								var enchant_name = 'Enchant Cloak - Binding of Strength';
								break;
							case 5435:
								var wowhead_id = '128549';
								var enchant_name = 'Enchant Cloak - Binding of Agility';
								break;
							case 5436:
								var wowhead_id = '128550';
								var enchant_name = 'Enchant Cloak - Binding of Intellect';
								break;
							case 5423:
								var wowhead_id = '128537';
								var enchant_name = 'Enchant Ring - Word of Critical Strike';
								break;
							case 5424:
								var wowhead_id = '128538';
								var enchant_name = 'Enchant Ring - Word of Haste';
								break;
							case 5425:
								var wowhead_id = '128539';
								var enchant_name = 'Enchant Ring - Word of Mastery';
								break;
							case 5426:
								var wowhead_id = '128540';
								var enchant_name = 'Enchant Ring - Word of Versatility';
								break;
							case 5427:
								var wowhead_id = '128541';
								var enchant_name = 'Enchant Ring - Binding of Critical Strike';
								break;
							case 5428:
								var wowhead_id = '128542';
								var enchant_name = 'Enchant Ring - Binding of Haste';
								break;
							case 5429:
								var wowhead_id = '128543';
								var enchant_name = 'Enchant Ring - Binding of Mastery';
								break;
							case 5430:
								var wowhead_id = '128544';
								var enchant_name = 'Enchant Ring - Binding of Versatility';
								break;
							case 5442:
								var wowhead_id = '140214';
								var enchant_name = 'Boon of the Harvester';
								break;
							case 5882:
								var wowhead_id = '140218';
								var enchant_name = 'Boon of the Manaseeker';
								break;
							case 5440:
								var wowhead_id = '128554';
								var enchant_name = 'Boon of the Scavenger';
								break;
							case 5441:
								var wowhead_id = '140213';
								var enchant_name = 'Boon of the Gemfinder';
								break;
							case 5443:
								var wowhead_id = '140215';
								var enchant_name = 'Boon of the Butcher';
								break;
							case 5881:
								var wowhead_id = '140217';
								var enchant_name = 'Boon of the Salvager';
								break;
							case 5899:
								var wowhead_id = '144328';
								var enchant_name = 'Boon of the Builder';
								break;
							case 5900:
								var wowhead_id = '144346';
								var enchant_name = 'Boon of the Zookeeper';
								break;
							case 5438:
								var wowhead_id = '128550';
								var enchant_name = 'Enchant Neck - Mark of the Distant Army';
								break;
							case 5895:
								var wowhead_id = '144304';
								var enchant_name = 'Enchant Neck - Mark of the Master';
								break;
							case 5896:
								var wowhead_id = '144305';
								var enchant_name = 'Enchant Neck - Mark of the Versatile';
								break;
							case 5897:
								var wowhead_id = '144306';
								var enchant_name = 'Enchant Neck - Mark of the Quick';
								break;
							case 5898:
								var wowhead_id = '144307';
								var enchant_name = 'Enchant Neck - Mark of the Deadly';
								break;
							case 5888:
								var wowhead_id = '141861';
								var enchant_name = 'Boon of the Nether';
								break;
						}

						var missing_enchant = '<a class="item_mod" href="http://wowhead.com/item=' + wowhead_id + '">' + enchant_name + '</a>';
					} else {
						var item_enchant = '0';
						var missing_enchant = '<img src="img/me.png" title="missing enchant" alt="missing enchant" /> <span style="color: coral;" class="item_mod">missing enchant</span>';
					}
				}
				if (item != 'neck' && item != 'shoulder' && item != 'back' && item != 'finger1' && item != 'finger2') {
					var missing_enchant = '';
				}

				if ($.inArray(1808, item_container[item].bonusLists) > -1 && typeof (item_container[item].tooltipParams.gem0) == 'undefined') {
					var gem = '0';
					var missing_gem = '<img src="img/mg.png" title="missing gem" alt="missing gem" /> <span style="color: coral;" class="item_mod">missing gem</span>';
				}

				if ($.inArray(1808, item_container[item].bonusLists) > -1 && typeof (item_container[item].tooltipParams.gem0) != 'undefined') {
					var gem = item_container[item].tooltipParams.gem0;
					var missing_gem = '<a class="item_mod" href="http://wowhead.com/item=' + item_container[item].tooltipParams.gem0 + '">' + item_container[item].tooltipParams.gem0 + '</a>';
				}

				if ($.inArray(1808, item_container[item].bonusLists) == -1) {
					var gem = '0';
					var missing_gem = '';
				}

				if (($.inArray(item_id, t19)) > -1) {
					var set_info = '<span style="color: pink;">[T19]</span>';
				}
				if (($.inArray(item_id, t20)) > -1) {
					var set_info = '<span style="color: chartreuse;">[T20]</span>';
				}
				if (typeof (set_info) === 'undefined') {
					var set_info = '';
				}

				// LEGENDARY SOCKETS WORKAROUND
				if (item_id == 132444 || item_id == 137227 || item_id == 132269 || item_id == 132378 || item_id == 132410 || item_id == 132449 || item_id == 132452 || item_id == 132460 || item_id == 133973 || item_id == 133974 || item_id == 137037 || item_id == 137038 || item_id == 137039 || item_id == 137040 || item_id == 137041 || item_id == 137042 || item_id == 137043 || item_id == 137044 || item_id == 137045 || item_id == 137046 || item_id == 137047 || item_id == 137048 || item_id == 137049 || item_id == 137050 || item_id == 137051 || item_id == 137052 || item_id == 137054 || item_id == 137055 || item_id == 137220 || item_id == 137223 || item_id == 137276 || item_id == 137382 || item_id == 138854) {
					if ($.inArray(1808, item_container[item].bonusLists) > -1 || typeof (item_container[item].tooltipParams.gem0) != 'undefined') {
						var gem = item_container[item].tooltipParams.gem0;
						var missing_gem = '<a class="item_mod" href="http://wowhead.com/item=' + item_container[item].tooltipParams.gem0 + '">' + item_container[item].tooltipParams.gem0 + '</a>';
					}
				}


				var item_bonusLists = '' + item_container[item].bonusLists[0] + ':' + item_container[item].bonusLists[1] + ':' + item_container[item].bonusLists[2] + ':' + item_container[item].bonusLists[3] + '';

				if (item_container[item].quality == 5) {
					var item_ilvl = '<span class="legendary">' + item_ilvl + '</span>';
				}

				$('.equipment_body').append('<tr><td style="width: 85px;"><span class="item_slot">' + item + '</span></td><td class="gear"><a href="http://wowhead.com/item=' + item_id + '&bonus=' + item_bonusLists + '" rel="ench=' + item_enchant + '&gems=' + gem + '&pcs=' + set + '">' + item_name + '</a><br />' + missing_enchant + ' ' + missing_gem + '</td><td>' + item_ilvl + ' ' + set_info + '</td></tr>');
			})

			// SELECT ARTIFACT WEAPON ID DEPENDING ON CURRENT SPEC
			if (data.class == '1' && selected_spec_name == 'Fury') {
				var weapon_id = '128908';
			}
			if (data.class == '1' && selected_spec_name == 'Arms') {
				var weapon_id = '128910';
			}
			if (data.class == '1' && selected_spec_name == 'Protection') {
				var weapon_id = '128289';
			}

			if (data.class == '2' && selected_spec_name == 'Holy') {
				var weapon_id = '128823';
			}
			if (data.class == '2' && selected_spec_name == 'Protection') {
				var weapon_id = '128866';
			}
			if (data.class == '2' && selected_spec_name == 'Retribution') {
				var weapon_id = '120978';
			}

			if (data.class == '3' && selected_spec_name == 'Beast Mastery') {
				var weapon_id = '128861';
			}
			if (data.class == '3' && selected_spec_name == 'Marksmanship') {
				var weapon_id = '128826';
			}
			if (data.class == '3' && selected_spec_name == 'Survival') {
				var weapon_id = '128808';
			}

			if (data.class == '4' && selected_spec_name == 'Assassination') {
				var weapon_id = '128870';
			}
			if (data.class == '4' && selected_spec_name == 'Outlaw') {
				var weapon_id = '128872';
			}
			if (data.class == '4' && selected_spec_name == 'Sublety') {
				var weapon_id = '128476';
			}

			if (data.class == '5' && selected_spec_name == 'Discipline') {
				var weapon_id = '128868';
			}
			if (data.class == '5' && selected_spec_name == 'Holy') {
				var weapon_id = '128825';
			}
			if (data.class == '5' && selected_spec_name == 'Shadow') {
				var weapon_id = '128827';
			}

			if (data.class == '6' && selected_spec_name == 'Blood') {
				var weapon_id = '128402';
			}
			if (data.class == '6' && selected_spec_name == 'Frost') {
				var weapon_id = '128292';
			}
			if (data.class == '6' && selected_spec_name == 'Unholy') {
				var weapon_id = '128403';
			}

			if (data.class == '7' && selected_spec_name == 'Elemental') {
				var weapon_id = '128935';
			}
			if (data.class == '7' && selected_spec_name == 'Enhancement') {
				var weapon_id = '128819';
			}
			if (data.class == '7' && selected_spec_name == 'Restoration') {
				var weapon_id = '128911';
			}

			if (data.class == '8' && selected_spec_name == 'Arcane') {
				var weapon_id = '127857';
			}
			if (data.class == '8' && selected_spec_name == 'Fire') {
				var weapon_id = '128820';
			}
			if (data.class == '8' && selected_spec_name == 'Frost') {
				var weapon_id = '128862';
			}

			if (data.class == '9' && selected_spec_name == 'Affliction') {
				var weapon_id = '128942';
			}
			if (data.class == '9' && selected_spec_name == 'Demonology') {
				var weapon_id = '128943';
			}
			if (data.class == '9' && selected_spec_name == 'Destruction') {
				var weapon_id = '128941';
			}

			if (data.class == '10' && selected_spec_name == 'Brewmaster') {
				var weapon_id = '128938';
			}
			if (data.class == '10' && selected_spec_name == 'Mistweaver') {
				var weapon_id = '128937';
			}
			if (data.class == '10' && selected_spec_name == 'Windwalker') {
				var weapon_id = '128940';
			}

			if (data.class == '11' && selected_spec_name == 'Balance') {
				var weapon_id = '128858';
			}
			if (data.class == '11' && selected_spec_name == 'Feral') {
				var weapon_id = '128860';
			}
			if (data.class == '11' && selected_spec_name == 'Guardian') {
				var weapon_id = '128821';
			}
			if (data.class == '11' && selected_spec_name == 'Restoration') {
				var weapon_id = '128306';
			}

			if (data.class == '12' && selected_spec_name == 'Havoc') {
				var weapon_id = '127829';
			}
			if (data.class == '12' && selected_spec_name == 'Vengeance') {
				var weapon_id = '128832';
			}

			// CHECK IF WEAPON IS EQUIPPED (OFF HAND FOR SOME SPECS) AND FETCH RELICS
			if (item_container.mainHand.id == weapon_id) {

				if (typeof item_container.mainHand != 'undefined') {

					var item_name = item_container.mainHand.name;

					var weapon_ilvl = item_container.mainHand.itemLevel;

					var weapon_bonusLists = '' + item_container.mainHand.bonusLists[0] + ':' + item_container.mainHand.bonusLists[1] + ':' + item_container.mainHand.bonusLists[2] + ':' + item_container.mainHand.bonusLists[3] + '';

					var relic_container = item_container.mainHand.relics;

					for (i = 0; i <= 2; i++) {
						if (typeof (relic_container[i]) != 'undefined') {
							var relic_id = relic_container[i].itemId;

							var relic_bonusLists = '' + relic_container[i].bonusLists[0] + ':' + relic_container[i].bonusLists[1] + ':' + relic_container[i].bonusLists[2] + '';
						}

						$('.relics').append('<a href="http://wowhead.com/item=' + relic_id + '&bonus=' + relic_bonusLists + '&spec=' + trait_spec + '">' + relic_id + '</a> ');
					}

					var trait_container = item_container.mainHand.artifactTraits;
					var traits = 0;

					for (i = 0; i <= trait_container['length']; i++) {
						if (typeof (trait_container[i]) != 'undefined') {
							var traits = traits + trait_container[i]['rank'];
						}
					}

					$('.weapon').append('<tr style="border-top: 1px solid white;"><td style="text-align: center;"><a href="http://wowhead.com/item=' + weapon_id + '&bonus=' + weapon_bonusLists + '">' + item_name + '</a> (' + weapon_ilvl + ')</td></tr>');
				}

			} else {

				if (typeof item_container.offHand != 'undefined') {

					var item_name = item_container.offHand.name;

					var weapon_ilvl = item_container.offHand.itemLevel;

					var weapon_bonusLists = '' + item_container.offHand.bonusLists[0] + ':' + item_container.offHand.bonusLists[1] + ':' + item_container.offHand.bonusLists[2] + ':' + item_container.offHand.bonusLists[3] + '';

					var relic_container = item_container.offHand.relics;

					for (i = 0; i <= 2; i++) {
						if (typeof (relic_container[i]) != 'undefined') {
							var relic_id = relic_container[i].itemId;

							var relic_bonusLists = '' + relic_container[i].bonusLists[0] + ':' + relic_container[i].bonusLists[1] + ':' + relic_container[i].bonusLists[2] + '';
						}

						$('.relics').append('<a href="http://wowhead.com/item=' + relic_id + '&bonus=' + relic_bonusLists + '&spec=' + trait_spec + '">' + relic_id + '</a> ');
					}

					var trait_container = item_container.offHand.artifactTraits;
					var traits = 0;

					for (i = 0; i <= trait_container['length']; i++) {
						if (typeof (trait_container[i]) != 'undefined') {
							var traits = traits + trait_container[i]['rank'];
						}
					}

					$('.weapon').append('<tr style="border-top: 1px solid white;"><td style="text-align: center;"><a href="http://wowhead.com/item=' + weapon_id + '&bonus=' + weapon_bonusLists + '">' + item_name + '</a> (' + weapon_ilvl + ')</td></tr>');
				}
			}

			// ACHIEVEMENTS

			var achievements_container = data.achievements;

			for (var i = 0; i < achievements_container['achievementsCompleted'].length; i++) {
				if (typeof achievements_container['achievementsCompleted'][i] != 'undefined') {
					if (achievements_container['achievementsCompleted'][i] == 11162) {
						var mplus_cap = 15;
					}

					if (typeof (mplus_cap) == 'undefined') {
						if (achievements_container['achievementsCompleted'][i] == 11183) {
							var mplus_cap = 2;
						}
					}
					if (typeof (mplus_cap) == 'undefined') {
						if (achievements_container['achievementsCompleted'][i] == 11184) {
							var mplus_cap = 5;
						}
					}
					if (typeof (mplus_cap) == 'undefined') {
						if (achievements_container['achievementsCompleted'][i] == 11185) {
							var mplus_cap = 10;
						}
					}
				}
			}

			// EN CE & AOTC

			if ($.inArray(11191, achievements_container['achievementsCompleted']) == -1) {
				var ce_en = 0;
				var ce_en_text = '<span style="color: coral;">CE</span>';
			}
			if ($.inArray(11191, achievements_container['achievementsCompleted']) != -1) {
				var ce_en = 1;
				var ce_en_text = '<span style="color: yellowgreen;">CE</span>';
				var aotc_en = 1;
				var aotc_en_text = '<span style="color: yellowgreen;">AOTC</span>';
			}

			if (typeof (aotc_en) == 'undefined') {

				if ($.inArray(11194, achievements_container['achievementsCompleted']) != -1) {
					var aotc_en = 1;
					var aotc_en_text = '<span style="color: yellowgreen;">AOTC</span>';
				}
				if ($.inArray(11194, achievements_container['achievementsCompleted']) == -1) {
					var aotc_en = 0;
					var aotc_en_text = '<span style="color: coral;">AOTC</span>';
				}
			}

			// TOV CE & AOTC

			if ($.inArray(11580, achievements_container['achievementsCompleted']) == -1) {
				var ce_tov = 0;
				var ce_tov_text = '<span style="color: coral;">CE</span>';
			}
			if ($.inArray(11580, achievements_container['achievementsCompleted']) != -1) {
				var ce_tov = 1;
				var ce_tov_text = '<span style="color: yellowgreen;">CE</span>';
				var aotc_tov = 1;
				var aotc_tov_text = '<span style="color: yellowgreen;">AOTC</span>';
			}

			if (typeof (aotc_tov) == 'undefined') {

				if ($.inArray(11581, achievements_container['achievementsCompleted']) != -1) {
					var aotc_tov = 1;
					var aotc_tov_text = '<span style="color: yellowgreen;">AOTC</span>';
				}
				if ($.inArray(11581, achievements_container['achievementsCompleted']) == -1) {
					var aotc_tov = 0;
					var aotc_tov_text = '<span style="color: coral;">AOTC</span>';
				}
			}

			// NH CE & AOTC

			if ($.inArray(11192, achievements_container['achievementsCompleted']) == -1) {
				var ce_nh = 0;
				var ce_nh_text = '<span style="color: coral;">CE</span>';
			}
			if ($.inArray(11192, achievements_container['achievementsCompleted']) != -1) {
				var ce_nh = 1;
				var ce_nh_text = '<span style="color: yellowgreen;">CE</span>';
				var aotc_nh = 1;
				var aotc_nh_text = '<span style="color: yellowgreen;">AOTC</span>';
			}

			if (typeof (aotc_nh) == 'undefined') {

				if ($.inArray(11195, achievements_container['achievementsCompleted']) != -1) {
					var aotc_nh = 1;
					var aotc_nh_text = '<span style="color: yellowgreen;">AOTC</span>';
				}
				if ($.inArray(11195, achievements_container['achievementsCompleted']) == -1) {
					var aotc_nh = 0;
					var aotc_nh_text = '<span style="color: coral;">AOTC</span>';
				}
			}

			// TOS CE & AOTC

			if ($.inArray(99999999, achievements_container['achievementsCompleted']) == -1) {
				var ce_tos = 0;
				var ce_tos_text = '<span style="color: coral;">CE</span>';
			}
			if ($.inArray(99999999, achievements_container['achievementsCompleted']) != -1) {
				var ce_tos = 1;
				var ce_tos_text = '<span style="color: yellowgreen;">CE</span>';
				var aotc_tos = 1;
				var aotc_tos_text = '<span style="color: yellowgreen;">AOTC</span>';
			}

			if (typeof (aotc_tos) == 'undefined') {

				if ($.inArray(99999999, achievements_container['achievementsCompleted']) != -1) {
					var aotc_tos = 1;
					var aotc_tos_text = '<span style="color: yellowgreen;">AOTC</span>';
				}
				if ($.inArray(99999999, achievements_container['achievementsCompleted']) == -1) {
					var aotc_tos = 0;
					var aotc_tos_text = '<span style="color: coral;">AOTC</span>';
				}
			}

			for (var i = 0; i < achievements_container['criteria'].length; i++) {
				if (typeof achievements_container['criteria'][i] != 'undefined') {
					if (achievements_container['criteria'][i] == 30497) {
						var key_highmountain = i;
					}
					if (achievements_container['criteria'][i] == 30500) {
						var key_valsharah = i;
					}
					if (achievements_container['criteria'][i] == 30499) {
						var key_suramar = i;
					}
					if (achievements_container['criteria'][i] == 30501) {
						var key_stormheim = i;
					}
					if (achievements_container['criteria'][i] == 30498) {
						var key_azsuna = i;
					}
					if (achievements_container['criteria'][i] == 30496) {
						var key_wardens = i;
					}
					if (achievements_container['criteria'][i] == 35977) {
						var key_legionfall = i;
					}
					if (achievements_container['criteria'][i] == 30103) {
						var key_artifactpower = i;
					}
					if (achievements_container['criteria'][i] == 29395) {
						var key_artifactlevel = i;
					}
					if (achievements_container['criteria'][i] == 31466) {
						var key_artifactknowledge = i;
					}
					if (achievements_container['criteria'][i] == 33094) {
						var key_worldquests = i;
					}
					if (achievements_container['criteria'][i] == 33096) {
						var key_mythicplus2 = i;
					}
					if (achievements_container['criteria'][i] == 33097) {
						var key_mythicplus5 = i;
					}
					if (achievements_container['criteria'][i] == 33098) {
						var key_mythicplus10 = i;
					}
					if (achievements_container['criteria'][i] == 32028) {
						var key_mythicplus15 = i;
					}
					if (achievements_container['criteria'][i] == 36204) {
						var key_cen_normal = i;
					}
					if (achievements_container['criteria'][i] == 36215) {
						var key_cen_heroic = i;
					}
					if (achievements_container['criteria'][i] == 36216) {
						var key_cen_mythic = i;
					}
				}
			}

			var highmountain = achievements_container['criteriaQuantity'][key_highmountain];
			var valsharah = achievements_container['criteriaQuantity'][key_valsharah];
			var suramar = achievements_container['criteriaQuantity'][key_suramar];
			var stormheim = achievements_container['criteriaQuantity'][key_stormheim];
			var azsuna = achievements_container['criteriaQuantity'][key_azsuna];
			var wardens = achievements_container['criteriaQuantity'][key_wardens];
			var legionfall = achievements_container['criteriaQuantity'][key_legionfall];
			var ap = achievements_container['criteriaQuantity'][key_artifactpower];
			var al = achievements_container['criteriaQuantity'][key_artifactlevel];
			var ak = achievements_container['criteriaQuantity'][key_artifactknowledge];
			var wqs = achievements_container['criteriaQuantity'][key_worldquests];
			var mythic_plus2 = achievements_container['criteriaQuantity'][key_mythicplus2];
			var mythic_plus5 = achievements_container['criteriaQuantity'][key_mythicplus5];
			var mythic_plus10 = achievements_container['criteriaQuantity'][key_mythicplus10];
			var mythic_plus15 = achievements_container['criteriaQuantity'][key_mythicplus15];

			if (isNaN(ap)) {
				var ap = 0;
			}

			if (isNaN(ak)) {
				var ak = 0;
			}

			if (isNaN(al)) {
				var al = 0;
			}

			// REPUTATION

			$('.reputation').find('.la-line-scale').fadeOut(500);

			var faction_array = new Array('Armies of Legionfall', 'Court of Farondis', 'Dreamweavers', 'Highmountain Tribe', 'The Nightfallen', 'The Wardens', 'Valarjar');

			faction_array.forEach(function (faction) {
				switch (faction) {
					case 'Armies of Legionfall':
						if (typeof (legionfall) != 'undefined') {
							var rep = legionfall;
						}
						break;
					case 'Court of Farondis':
						if (typeof (azsuna) != 'undefined') {
							var rep = azsuna;
						}
						break;
					case 'Dreamweavers':
						if (typeof (valsharah) != 'undefined') {
							var rep = valsharah;
						}
						break;
					case 'Highmountain Tribe':
						if (typeof (highmountain) != 'undefined') {
							var rep = highmountain;
						}
						break;
					case 'The Nightfallen':
						if (typeof (suramar) != 'undefined') {
							var rep = suramar;
						}
						break;
					case 'The Wardens':
						if (typeof (wardens) != 'undefined') {
							var rep = wardens;
						}
						break;
					case 'Valarjar':
						if (typeof (stormheim) != 'undefined') {
							var rep = stormheim;
						}
						break;
				}

				if (rep >= '42000') {
					var color = 'cyan';
					var reputation = '<span style="color: ' + color + ';" title="' + rep + '">Exalted</span>';
					var progress = 100;
				}
				if (rep >= '21000' && rep < '42000') {
					var color = '#00ffcc';
					var reputation = '<span style="color: ' + color + ';" title="' + rep + '">Revered</span>';
					var progress = (rep-21000)/21000*100;
				}
				if (rep >= '9000' && rep < '21000') {
					var color = '#00ff88';
					var reputation = '<span style="color: ' + color + ';" title="' + rep + '">Honored</span>';
					var progress = (rep-9000)/12000*100;
				}
				if (rep >= '3000' && rep < '9000') {
					var color = 'lime';
					var reputation = '<span style="color: ' + color + ';" title="' + rep + '">Friendly</span>';
					var progress = (rep-3000)/6000*100;
				}
				if (rep < '3000') {
					var color = 'yellow';
					var reputation = '<span style="color: ' + color + ';" title="' + rep + '">Neutral</span>';
					var progress = rep/3000*100;
				}
				if (rep === undefined) {
					var color = 'coral';
					var reputation = '<span style="color: ' + color + ';">Faction not met</span>';
					var progress = 0;
				}

				$('.reputation').find('table').find('tbody').append('<tr><th>' + faction + ' </th></tr><tr><td>' + reputation + '<br /><div style="border: 1px solid ' + color + ';"><div style="height: 6px; background-color: ' + color + '; width: ' + progress + '%;"></div></div></td></tr>');

			});			

			// DUNGEON KILL PROGRESS
			var brh_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['21']['quantity'];
			var brh_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['22']['quantity'];
			var brh_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['23']['quantity'];

			$('.dungeons_table').find('.la-line-scale').fadeOut(500);
			$('.dungeons_body').append('<tr><td class="dungeon_name">Black Rook Hold</td><td class="dungeon_n">' + brh_normal + '</td><td class="dungeon_hc">' + brh_heroic + '</td><td class="dungeon_mythic">' + brh_mythic + '</td></tr>');

			if (typeof (achievements_container['criteriaQuantity'][key_cen_normal]) != 'undefined') {
				var cen_normal = achievements_container['criteriaQuantity'][key_cen_normal];
			} else {
				var cen_normal = '0';
			}
			if (typeof (achievements_container['criteriaQuantity'][key_cen_heroic]) != 'undefined') {
				var cen_heroic = achievements_container['criteriaQuantity'][key_cen_heroic];
			} else {
				var cen_heroic = '0';
			}
			if (typeof (achievements_container['criteriaQuantity'][key_cen_mythic]) != 'undefined') {
				var cen_mythic = achievements_container['criteriaQuantity'][key_cen_mythic];
			} else {
				var cen_mythic = '0';
			}

			$('.dungeons_body').append('<tr><td class="dungeon_name">Cathedral of Eternal Night</td><td class="dungeon_n">' + cen_normal + '</td><td class="dungeon_hc">' + cen_heroic + '</td><td class="dungeon_mythic">' + cen_mythic + '</td></tr>');

			var cos_heroic = '0';
			var cos_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['28']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Court of Stars</td><td class="dungeon_n"></td><td class="dungeon_hc">' + cos_heroic + '</td><td class="dungeon_mythic">' + cos_mythic + '</td></tr>');

			var dht_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['3']['quantity'];
			var dht_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['4']['quantity'];
			var dht_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['5']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Darkheart Thicket</td><td class="dungeon_n">' + dht_normal + '</td><td class="dungeon_hc">' + dht_heroic + '</td><td class="dungeon_mythic">' + dht_mythic + '</td></tr>');

			var eoa_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['0']['quantity'];
			var eoa_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['1']['quantity'];
			var eoa_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['2']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Eye of Azshara</td><td class="dungeon_n">' + eoa_normal + '</td><td class="dungeon_hc">' + eoa_heroic + '</td><td class="dungeon_mythic">' + eoa_mythic + '</td></tr>');

			var hov_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['9']['quantity'];
			var hov_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['10']['quantity'];
			var hov_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['11']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Halls of Valor</td><td class="dungeon_n">' + hov_normal + '</td><td class="dungeon_hc">' + hov_heroic + '</td><td class="dungeon_mythic">' + hov_mythic + '</td></tr>');

			var mos_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['24']['quantity'];
			var mos_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['25']['quantity'];
			var mos_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['26']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Maw of Souls</td><td class="dungeon_n">' + mos_normal + '</td><td class="dungeon_hc">' + mos_heroic + '</td><td class="dungeon_mythic">' + mos_mythic + '</td></tr>');

			var nl_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['6']['quantity'];
			var nl_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['7']['quantity'];
			var nl_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['8']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Neltharion\'s Lair</td><td class="dungeon_n">' + nl_normal + '</td><td class="dungeon_hc">' + nl_heroic + '</td><td class="dungeon_mythic">' + nl_mythic + '</td></tr>');

			var ukz_mythic = '0';
			$('.dungeons_body').append('<tr><td class="dungeon_name">Return to Karazhan: Upper</td><td class="dungeon_n">currently</td><td class="dungeon_hc">not</td><td class="dungeon_mythic">trackable</td></tr>');
			var lkz_mythic = '0';
			$('.dungeons_body').append('<tr><td class="dungeon_name">Return to Karazhan: Lower</td><td class="dungeon_n">currently</td><td class="dungeon_hc">not</td><td class="dungeon_mythic">trackable</td></tr>');

			var arc_heroic = '0';
			var arc_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['27']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">The Arcway</td><td class="dungeon_n"></td><td class="dungeon_hc">' + arc_heroic + '</td><td class="dungeon_mythic">' + arc_mythic + '</td></tr>');

			var votw_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['18']['quantity'];
			var votw_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['19']['quantity'];
			var votw_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['20']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Vault of the Wardens</td><td class="dungeon_n">' + votw_normal + '</td><td class="dungeon_hc">' + votw_heroic + '</td><td class="dungeon_mythic">' + votw_mythic + '</td></tr>');

			var vh_normal = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['12']['quantity'] + data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['13']['quantity'];
			var vh_heroic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['14']['quantity'] + data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['15']['quantity'];
			var vh_mythic = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['16']['quantity'] + data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['17']['quantity'];
			$('.dungeons_body').append('<tr><td class="dungeon_name">Violet Hold</td><td class="dungeon_n">' + vh_normal + '</td><td class="dungeon_hc">' + vh_heroic + '</td><td class="dungeon_mythic">' + vh_mythic + '</td></tr>');

			var sum_dungeons_n = parseInt(eoa_normal) + parseInt(dht_normal) + parseInt(nl_normal) + parseInt(hov_normal) + parseInt(vh_normal) + parseInt(votw_normal) + parseInt(brh_normal) + parseInt(mos_normal);
			var sum_dungeons_hc = parseInt(eoa_heroic) + parseInt(dht_heroic) + parseInt(nl_heroic) + parseInt(hov_heroic) + parseInt(vh_heroic) + parseInt(votw_heroic) + parseInt(brh_heroic) + parseInt(mos_heroic) + parseInt(arc_heroic) + parseInt(cos_heroic);
			var sum_dungeons_m = parseInt(brh_mythic) + parseInt(cen_mythic) + parseInt(cos_mythic) + parseInt(dht_mythic) + parseInt(eoa_mythic) + parseInt(hov_mythic) + parseInt(lkz_mythic) + parseInt(mos_mythic) + parseInt(nl_mythic) + parseInt(arc_mythic) + parseInt(vh_mythic) + parseInt(ukz_mythic) + parseInt(votw_mythic);

			$('.dungeons_body').append('<tr><td></td><td><b>' + sum_dungeons_n + '</b></td><td><b>' + sum_dungeons_hc + '</b></td><td><b>' + sum_dungeons_m + '</b></td></tr>');

			var m0 = sum_dungeons_m - parseInt(mythic_plus2);
			var m2_to_m5 = parseInt(mythic_plus2) - parseInt(mythic_plus5);
			var m5_to_m10 = parseInt(mythic_plus5) - parseInt(mythic_plus10);
			var m10_to_m15 = parseInt(mythic_plus10) - parseInt(mythic_plus15);
			var m15p = parseInt(mythic_plus15);			

			if (isNaN(m0)) {				
				var m0 = 0;
				var m2_to_m5 = 0;
				var m5_to_m10 = 0;
				var m10_to_m15 = 0;
				var m15p = 0;
			}

			if (isNaN(m2_to_m5)) {
				var m2_to_m5 = mythic_plus2;
				var m5_to_m10 = 0;
				var m10_to_m15 = 0;
				var m15p = 0;
			}
			if (isNaN(m5_to_m10)) {
				var m5_to_m10 = mythic_plus5;
				var m10_to_m15 = 0;
				var m15p = 0;
			}
			if (isNaN(m10_to_m15)) {
				var m10_to_m15 = mythic_plus10;
				var m15p = 0;
			}

			$('.mythic_plus_body').find('.la-line-scale').fadeOut(500);
			$('.mythic_plus_body').append('<tr><td>' + m0 + ' x M0</td><td>' + m2_to_m5 + ' x M2-5</td><td>' + m5_to_m10 + ' x M5-10</td><td>' + m10_to_m15 + ' x M10-15</td><td>' + m15p + ' x M15+</td></tr>');
			
			var artifact_level = traits - 3;
			$('.mythic_plus_body').append('<tr style="border-top: 4px solid rgba(56, 66, 88, 0.85);"><td colspan="3">Total Artifact Power collected</td><td colspan="2"><b>' + numberWithCommas(ap) + '</b></td></tr><tr><td colspan="3">Artifact Level (current weapon)</td><td colspan="2"><b>' + artifact_level + '</b> (AK <b>' + ak + '</b>)</td></tr><tr><td colspan="3">World Quests</td><td colspan="2"><b>' + wqs + '</b></td></tr>');

			// RAID PROGRESS

			////////// EMERALD NIGHTMARE
			// LFR EMERALD NIGHTMARE
			var en_lfr_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['30']['quantity'];
			var en_lfr_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['34']['quantity'];
			var en_lfr_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['38']['quantity'];
			var en_lfr_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['42']['quantity'];
			var en_lfr_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['46']['quantity'];
			var en_lfr_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['50']['quantity'];
			var en_lfr_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['54']['quantity'];

			// NORMAL EMERALD NIGHTMARE					
			var en_normal_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['31']['quantity'];
			var en_normal_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['35']['quantity'];
			var en_normal_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['39']['quantity'];
			var en_normal_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['43']['quantity'];
			var en_normal_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['47']['quantity'];
			var en_normal_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['51']['quantity'];
			var en_normal_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['55']['quantity'];

			// HEROIC EMERALD NIGHTMARE					
			var en_heroic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['32']['quantity'];
			var en_heroic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['36']['quantity'];
			var en_heroic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['40']['quantity'];
			var en_heroic_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['44']['quantity'];
			var en_heroic_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['48']['quantity'];
			var en_heroic_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['52']['quantity'];
			var en_heroic_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['56']['quantity'];

			// MYTHIC EMERALD NIGHTMARE					
			var en_mythic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['33']['quantity'];
			var en_mythic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['37']['quantity'];
			var en_mythic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['41']['quantity'];
			var en_mythic_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['45']['quantity'];
			var en_mythic_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['49']['quantity'];
			var en_mythic_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['53']['quantity'];
			var en_mythic_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['57']['quantity'];

			//////////

			////////// TRIAL OF VALOR
			// LFR TRIAL OF VALOR
			var tov_lfr_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['58']['quantity'];
			var tov_lfr_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['62']['quantity'];
			var tov_lfr_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['66']['quantity'];

			// NORMAL TRIAL OF VALOR
			var tov_normal_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['59']['quantity'];
			var tov_normal_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['63']['quantity'];
			var tov_normal_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['67']['quantity'];

			// HEROIC TRIAL OF VALOR
			var tov_heroic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['60']['quantity'];
			var tov_heroic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['64']['quantity'];
			var tov_heroic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['68']['quantity'];

			// MYTHIC TRIAL OF VALOR
			var tov_mythic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['61']['quantity'];
			var tov_mythic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['65']['quantity'];
			var tov_mythic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['69']['quantity'];
			//////////

			////////// THE NIGHTHOLD
			// LFR THE NIGHTHOLD
			var nh_lfr_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['70']['quantity'];
			var nh_lfr_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['74']['quantity'];
			var nh_lfr_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['78']['quantity'];
			var nh_lfr_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['82']['quantity'];
			var nh_lfr_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['86']['quantity'];
			var nh_lfr_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['90']['quantity'];
			var nh_lfr_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['94']['quantity'];
			var nh_lfr_8 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['98']['quantity'];
			var nh_lfr_9 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['102']['quantity'];
			var nh_lfr_10 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['106']['quantity'];

			// NORMAL THE NIGHTHOLD
			var nh_normal_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['71']['quantity'];
			var nh_normal_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['75']['quantity'];
			var nh_normal_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['79']['quantity'];
			var nh_normal_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['83']['quantity'];
			var nh_normal_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['87']['quantity'];
			var nh_normal_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['91']['quantity'];
			var nh_normal_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['95']['quantity'];
			var nh_normal_8 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['99']['quantity'];
			var nh_normal_9 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['103']['quantity'];
			var nh_normal_10 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['107']['quantity'];

			// HEROIC THE NIGHTHOLD
			var nh_heroic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['72']['quantity'];
			var nh_heroic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['76']['quantity'];
			var nh_heroic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['80']['quantity'];
			var nh_heroic_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['84']['quantity'];
			var nh_heroic_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['88']['quantity'];
			var nh_heroic_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['92']['quantity'];
			var nh_heroic_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['96']['quantity'];
			var nh_heroic_8 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['100']['quantity'];
			var nh_heroic_9 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['104']['quantity'];
			var nh_heroic_10 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['108']['quantity'];

			// MYTHIC THE NIGHTHOLD
			var nh_mythic_1 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['73']['quantity'];
			var nh_mythic_2 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['77']['quantity'];
			var nh_mythic_3 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['81']['quantity'];
			var nh_mythic_4 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['85']['quantity'];
			var nh_mythic_5 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['89']['quantity'];
			var nh_mythic_6 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['93']['quantity'];
			var nh_mythic_7 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['97']['quantity'];
			var nh_mythic_8 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['101']['quantity'];
			var nh_mythic_9 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['105']['quantity'];
			var nh_mythic_10 = data['statistics']['subCategories']['5']['subCategories']['6']['statistics']['109']['quantity'];
			//////////

			////////// TOMB OF SARGERAS
			// LFR TOMB OF SARGERAS
			var tos_lfr_1 = 0;
			var tos_lfr_2 = 0;
			var tos_lfr_3 = 0;
			var tos_lfr_4 = 0;
			var tos_lfr_5 = 0;
			var tos_lfr_6 = 0;
			var tos_lfr_7 = 0;
			var tos_lfr_8 = 0;
			var tos_lfr_9 = 0;

			// NORMAL TOMB OF SARGERAS
			var tos_normal_1 = 0;
			var tos_normal_2 = 0;
			var tos_normal_3 = 0;
			var tos_normal_4 = 0;
			var tos_normal_5 = 0;
			var tos_normal_6 = 0;
			var tos_normal_7 = 0;
			var tos_normal_8 = 0;
			var tos_normal_9 = 0;

			// HEROIC TOMB OF SARGERAS
			var tos_heroic_1 = 0;
			var tos_heroic_2 = 0;
			var tos_heroic_3 = 0;
			var tos_heroic_4 = 0;
			var tos_heroic_5 = 0;
			var tos_heroic_6 = 0;
			var tos_heroic_7 = 0;
			var tos_heroic_8 = 0;
			var tos_heroic_9 = 0;

			// MYTHIC TOMB OF SARGERAS
			var tos_mythic_1 = 0;
			var tos_mythic_2 = 0;
			var tos_mythic_3 = 0;
			var tos_mythic_4 = 0;
			var tos_mythic_5 = 0;
			var tos_mythic_6 = 0;
			var tos_mythic_7 = 0;
			var tos_mythic_8 = 0;
			var tos_mythic_9 = 0;
			//////////

			// EQ CALCULATION

			var threshold = 2228766330;

			var artifact_knowledge_levels = new Array("1", "1.25", "1.5", "1.9", "2.4", "3", "3.75", "4.75", "6", "7.5", "9.5", "12", "15", "18.75", "23.5", "29.5", "37", "46.5", "58", "73", "91", "114", "143", "179", "224", "250", "1000", "1300", "2200", "2900", "3800", "4900", "6400", "8300", "10800", "14000", "18200", "23700", "30800", "40000", "52000", "67600", "87900", "114300", "148600", "193200", "251200", "326600", "424500", "552000");

			for (i = 0; i <= artifact_knowledge_levels.length; i++) {
				if (typeof artifact_knowledge_levels[i] != 'undefined') {
					if (ak == i) {
						var ap_per_10_or_higher_key = 600 * artifact_knowledge_levels[i] * 2;
					}
				}
			}

			var worth = ((threshold / ap_per_10_or_higher_key) * 1466) / 150;

			// CLASS NORMALIZATION
			if (data.class == 11) {
				var eq_ap = ((((ap / threshold) * worth) / 4) * 3) / 2.5
			}
			if (data.class == 12) {
				var eq_ap = ((((ap / threshold) * worth) / 2) * 3) / 2.5;
			}
			if (data.class != 11 && data.class != 12) {
				var eq_ap = ((ap / threshold) * worth) / 2.5;
			}					
				
			// EN BOSSKILLS
			var en_lfr_bosskills = en_lfr_1 + en_lfr_2 + en_lfr_3 + en_lfr_4 + en_lfr_5 + en_lfr_6 + en_lfr_7;
			var en_n_bosskills = en_normal_1 + en_normal_2 + en_normal_3 + en_normal_4 + en_normal_5 + en_normal_6 + en_normal_7;
			var en_hc_bosskills = en_heroic_1 + en_heroic_2 + en_heroic_3 + en_heroic_4 + en_heroic_5 + en_heroic_6 + en_heroic_7;
			var en_m_bosskills = en_mythic_1 + en_mythic_2 + en_mythic_3 + en_mythic_4 + en_mythic_5 + en_mythic_6 + en_mythic_7;
			// TOV BOSSKILLS
			var tov_lfr_bosskills = tov_lfr_1 + tov_lfr_2 + tov_lfr_3;
			var tov_n_bosskills = tov_normal_1 + tov_normal_2 + tov_normal_3;
			var tov_hc_bosskills = tov_heroic_1 + tov_heroic_2 + tov_heroic_3;
			var tov_m_bosskills = tov_mythic_1 + tov_mythic_3 + tov_mythic_3;
			// NH BOSSKILLS
			var nh_lfr_bosskills = nh_lfr_1 + nh_lfr_2 + nh_lfr_3 + nh_lfr_4 + nh_lfr_5 + nh_lfr_6 + nh_lfr_7 + nh_lfr_8 + nh_lfr_9 + nh_lfr_10;
			var nh_n_bosskills = nh_normal_1 + nh_normal_2 + nh_normal_3 + nh_normal_4 + nh_normal_5 + nh_normal_6 + nh_normal_7 + nh_normal_8 + nh_normal_9 + nh_normal_10;
			var nh_hc_bosskills = nh_heroic_1 + nh_heroic_2 + nh_heroic_3 + nh_heroic_4 + nh_heroic_5 + nh_heroic_6 + nh_heroic_7 + nh_heroic_8 + nh_heroic_9 + nh_heroic_10;
			var nh_m_bosskills = nh_mythic_1 + nh_mythic_2 + nh_mythic_3 + nh_mythic_4 + nh_mythic_5 + nh_mythic_6 + nh_mythic_7 + nh_mythic_8 + nh_mythic_9 + nh_mythic_10;
			// TOS BOSSKILLS
			// var tos_lfr_bosskills = tos_lfr_1+tos_lfr_2+tos_lfr_3+tos_lfr_4+tos_lfr_5+tos_lfr_6+tos_lfr_7+tos_lfr_8+tos_lfr_9;
			var tos_lfr_bosskills = 0;
			// var tos_n_bosskills = tos_normal_1+tos_normal_2+tos_normal_3+tos_normal_4+tos_normal_5+tos_normal_6+tos_normal_7+tos_normal_8+tos_normal_9;
			var tos_n_bosskills = 0;
			// var tos_hc_bosskills = tos_heroic_1+tos_heroic_2+tos_heroic_3+tos_heroic_4+tos_heroic_5+tos_heroic_6+tos_heroic_7+tos_heroic_8+tos_heroic_9;
			var tos_hc_bosskills = 0;
			// var tos_m_bosskills = tos_mythic_1+tos_mythic_2+tos_mythic_3+tos_mythic_4+tos_mythic_5+tos_mythic_6+tos_mythic_7+tos_mythic_8+tos_mythic_9;
			var tos_m_bosskills = 0;
			
			//var eq = Math.round(wqs * 1 + (m0 * 8.29333) + (m2_to_m5 * 8.70666) + (m5_to_m10 * 9.12) + (m10_to_m15 * 9.54) + (m15p * 9.94666) + (en_lfr_bosskills * 4.2857) + (en_n_bosskills * 8.5714) + (en_hc_bosskills * 17.1429) + (en_m_bosskills * 42.8571) + (tov_lfr_bosskills * 10) + (tov_n_bosskills * 20) + (tov_hc_bosskills * 40) + (tov_m_bosskills * 100) + (nh_lfr_bosskills * 3) + (nh_n_bosskills * 6) + (nh_hc_bosskills * 12) + (nh_m_bosskills * 30) + (tos_lfr_bosskills * 3.3333) + (tos_n_bosskills * 6.6666) + (tos_hc_bosskills * 13.3333) + (tos_m_bosskills * 33.3333) + eq_ap + ((averageItemLevelEquipped - 850) * 51.7467));
			
			var eq = Math.round(wqs * 1 + (m0 * 8.5005555555) + (m2_to_m5 * 8.9255833333) + (m5_to_m10 * 9.3506111113) + (m10_to_m15 * 9.7756388887) + (m15p * 10.200666667) + (en_lfr_bosskills * 4.2857142857) + (en_n_bosskills * 8.5714285713) + (en_hc_bosskills * 17.142857143) + (en_m_bosskills * 42.857142857) + (tov_lfr_bosskills * 10) + (tov_n_bosskills * 20) + (tov_hc_bosskills * 40) + (tov_m_bosskills * 100) + (nh_lfr_bosskills * 3) + (nh_n_bosskills * 6) + (nh_hc_bosskills * 12) + (nh_m_bosskills * 30) + (tos_lfr_bosskills * 3.3333333334) + (tos_n_bosskills * 6.6666666667) + (tos_hc_bosskills * 13.333333333) + (tos_m_bosskills * 33.333333334) + eq_ap + ((averageItemLevelEquipped - 850) * 51.986666667));

			if (eq < '0') {
				eq = '0';
			}

			$('.mythic_plus_body').append('<tr><td colspan="3"><a href="http://ags.gerritalex.de/?eq" target="_blank" title="effort quota explanation">Effort Quota</a></td><td colspan="2"><b>' + eq + '</b></td></tr>');
			console.log('Following information was supposed to be found on the page but is too detailed to be useful for most users - http://ags.gerritalex.de/?eq');
			console.log('Values stand for the amount of Effort Quota points gained from the source mentioned');
			console.log('WQ points (' + wqs + ' * 1) = ' + wqs * 1 + '');
			console.log('m0 points (' + m0 + ' * 8.500555555) = ' + (m0 * 8.5005555555) + '');
			console.log('m2 5 points (' + m2_to_m5 + ' * 8.9255833333) = ' + (m2_to_m5 * 8.9255833333) + '');
			console.log('m5 10 points (' + m5_to_m10 + ' * 9.3506111113) = ' + (m5_to_m10 * 9.3506111113) + '');
			console.log('m10 15 points (' + m10_to_m15 + ' * 9.7756388887) = ' + (m10_to_m15 * 9.7756388887) + '');
			console.log('m15 points (' + m15p + ' * 10.200666667) = ' + (m15p * 10.200666667) + '');
			console.log('EN LFR points (' + en_lfr_bosskills + ' * 4.2857142857) = ' + (en_lfr_bosskills * 4.2857142857) + '');
			console.log('EN N points (' + en_n_bosskills + ' * 8.5714285713) = ' + (en_n_bosskills * 8.5714285713) + '');
			console.log('EN HC points (' + en_hc_bosskills + ' * 17.142857143) = ' + (en_hc_bosskills * 17.142857143) + '');
			console.log('EN M points (' + en_m_bosskills + ' * 42.857142857) = ' + (en_m_bosskills * 42.857142857) + '');
			console.log('TOV LFR points (' + tov_lfr_bosskills + ') * 10) = ' + (tov_lfr_bosskills * 10) + '');
			console.log('TOV N points (' + tov_n_bosskills + ' * 20) = ' + (tov_n_bosskills * 20) + '');
			console.log('TOV HC points (' + tov_hc_bosskills + ') * 40) = ' + (tov_hc_bosskills * 40) + '');
			console.log('TOV N points (' + tov_m_bosskills + ' * 100) = ' + (tov_m_bosskills * 100) + '');
			console.log('NH LFR points (' + nh_lfr_bosskills + ' * 3) = ' + (nh_lfr_bosskills * 3) + '');
			console.log('NH N points (' + nh_n_bosskills + ' * 6) = ' + (nh_n_bosskills * 6) + '');
			console.log('NH HC points (' + nh_hc_bosskills + ' * 12) = ' + (nh_hc_bosskills * 12) + '');
			console.log('NH M points (' + nh_m_bosskills + ' * 30) = ' + (nh_m_bosskills * 30) + '');
			console.log('TOS LFR points (' + tos_lfr_bosskills + ' * 3.3333333334) = ' + (tos_lfr_bosskills * 3.3333333334) + '');
			console.log('TOS N points (' + tos_n_bosskills + ' * 6.6666666667) = ' + (tos_n_bosskills * 6.6666666667) + '');
			console.log('TOS HC points (' + tos_hc_bosskills + ' * 13.333333333) = ' + (tos_hc_bosskills * 13.333333333) + '');
			console.log('TOS M points (' + tos_m_bosskills + ' * 33.333333334) = ' + (tos_m_bosskills * 33.333333334) + '');
			console.log('AP points: ' + eq_ap + '');		
			console.log('ITEMLEVEL points ((' + averageItemLevelEquipped + ' - 850) * 51.986666667) = ' + ((averageItemLevelEquipped - 850) * 51.986666667) + '');
			console.log('SUM ' + eq + '');



			// ALT CHECK
			// check highest M+ achievement AND raid kill
			// check if character has appropiate content done
			if (typeof (mplus_cap == 'undefined')) {
				if (m2_to_m5 > 0 || m5_to_m10 > 0 || m10_to_m15 > 0 || m15p > 0) {
					var alt_check = 1;
				}
			}
			if (mplus_cap == '2') {
				if (m5_to_m10 > 0 || m10_to_m15 > 0 || m15p > 0) {
					var alt_check = 1;
				}
			}
			if (mplus_cap == '5') {
				if (m10_to_m15 > 0 || m15p > 0) {
					var alt_check = 1;
				}
			}
			if (mplus_cap == '10') {
				if (m15p > 0) {
					var alt_check = 1;
				}
			}

			if (ce_en = 1) {
				if (en_mythic_7 == 0) {
					var alt_check = 1;
				}
			}

			if (aotc_en = 1) {
				if (en_mythic_7 == 0) {
					var alt_check = 1;
				}
			}

			if (ce_tov = 1) {
				if (tov_mythic_3 == 0) {
					var alt_check = 1;
				}
			}

			if (aotc_tov = 1) {
				if (tov_heroic_3 == 0) {
					var alt_check = 1;
				}
			}

			if (ce_nh = 1) {
				if (nh_mythic_10 == 0) {
					var alt_check = 1;
				}
			}

			if (aotc_nh = 1) {
				if (nh_heroic_10 == 0) {
					var alt_check = 1;
				}
			}

			// WARCRAFTLOGS API					

			if (selected_spec_role == 'HEALING') {
				var wlogs_role = 'hps';
			} else {
				var wlogs_role = 'dps';
			}

			var wlogs_api = '';

			var realm = $('#realm').val();

			switch (realm) {
				case 'ревущий-фьорд':
					var realm = 'ревущии-фьорд';
					break;
				case 'Ясеневый лес':
					var realm = 'Ясеневыи-лес';
					break;
				case 'Разувий':
					var realm = 'Разувии';
					break;
				case 'Черный Шрам':
					var realm = 'Черныи-Шрам';
					break;
				case 'Борейская тундра':
					var realm = 'Бореиская-тундра';
					break;
				case 'Confrérie du Thorium':
					var realm = 'Confrerie-du-Thorium';
					break;
				case 'Chants éternels':
					var realm = 'Chants-eternels';
					break;
				case 'La Croisade écarlate':
					var realm = 'La-Croisade-ecarlate';
					break;
			}

			var realm = realm.replace(' ', '-');
			var realm = realm.replace(/'/, "");
			var realm = realm.replace('Aggra-(Português)', 'Aggra-Portugues');

			// API CALL EMERALD NIGHTMARE
			$.ajax({
				url: 'https://www.warcraftlogs.com/v1/parses/character/' + character + '/' + realm + '/' + region + '?zone=10&metric=' + wlogs_role + '&api_key=' + wlogs_api + '&partition=2',
				type: 'get',
				dataType: 'json',
				success: function (data) {

					$('.raid_1').find('.la-line-scale').fadeOut(0);

					$('.raid_1').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')

					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Nythendra</td><td class="1_1_1">' + en_lfr_1 + '</td><td class="1_1_3">' + en_normal_1 + '</td><td class="1_1_4">' + en_heroic_1 + '</td><td class="1_1_5">' + en_mythic_1 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Elerethe Renferal</td><td class="1_2_1">' + en_lfr_2 + '</td><td class="1_2_3">' + en_normal_2 + '</td><td class="1_2_4">' + en_heroic_2 + '</td><td class="1_2_5">' + en_mythic_2 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Il\'gynoth, Heart of Corruption</td><td class="1_3_1">' + en_lfr_3 + '</td><td class="1_3_3">' + en_normal_3 + '</td><td class="1_3_4">' + en_heroic_3 + '</td><td class="1_3_5">' + en_mythic_3 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Ursoc</td><td class="1_4_1">' + en_lfr_4 + '</td><td class="1_4_3">' + en_normal_4 + '</td><td class="1_4_4">' + en_heroic_4 + '</td><td class="1_4_5">' + en_mythic_4 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Dragons of Nightmare</td><td class="1_5_1">' + en_lfr_5 + '</td><td class="1_5_3">' + en_normal_5 + '</td><td class="1_5_4">' + en_heroic_5 + '</td><td class="1_5_5">' + en_mythic_5 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Cenarius</td><td class="1_6_1">' + en_lfr_6 + '</td><td class="1_6_3">' + en_normal_6 + '</td><td class="1_6_4">' + en_heroic_6 + '</td><td class="1_6_5">' + en_mythic_6 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Xavius</td><td class="1_7_1">' + en_lfr_7 + '</td><td class="1_7_3">' + en_normal_7 + '</td><td class="1_7_4">' + en_heroic_7 + '</td><td class="1_7_5">' + en_mythic_7 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>total</td><td>' + en_lfr_bosskills + '</td><td>' + en_n_bosskills + '</td><td>' + en_hc_bosskills + '</td><td>' + en_m_bosskills + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr id="debug1"></tr>')


					if (typeof data['0'] != 'undefined') {
						if (typeof wlogs_id == 'undefined') {
							var wlogs_id = data['0'].specs['0'].data['0'].character_id;
						}

						data.forEach(function (data) {

							if (data.difficulty == '1') {
								var dif = 'lfr';
							}
							if (data.difficulty == '3') {
								var dif = 'normal';
							}
							if (data.difficulty == '4') {
								var dif = 'heroic';
							}
							if (data.difficulty == '5') {
								var dif = 'mythic';
							}

							var encounter = data.name;

							var parse = Math.round(data.specs['0'].data['0'].percent);

							var log = data.specs['0'].data['0'].report_code;

							switch (encounter) {
								case 'Nythendra':
									var identifier = 1;
									break;
								case 'Elerethe Renferal':
									var identifier = 2;
									break;
								case 'Il\'gynoth, Heart of Corruption':
									var identifier = 3;
									break;
								case 'Ursoc':
									var identifier = 4;
									break;
								case 'Dragons of Nightmare':
									var identifier = 5;
									break;
								case 'Cenarius':
									var identifier = 6;
									break;
								case 'Xavius':
									var identifier = 7;
									break;
							}

							if (parse >= 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(255, 128, 0);">' + parse + '%</a>';
							}
							if (parse >= 75 && parse < 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(204, 143, 246);">' + parse + '%</a>';
							}
							if (parse >= 50 && parse < 75) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(118, 178, 255);">' + parse + '%</a>';
							}
							if (parse >= 25 && parse < 50) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(30, 255, 0);">' + parse + '%</a>';
							}
							if (parse < 25) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: #ababab;">' + parse + '%</a>';
							}

							$('.1_' + identifier + '_' + data.difficulty + '').append('<sup>' + parse_color + '</sup>');

						});

						$('.raid_1').find('span').append('<br /><span style="font-size: 15px;">' + aotc_en_text + ' ' + ce_en_text + '</span>');

					} else {
						$('.raid_1').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
						$('.raid_1').find('span').append('<br /><span style="font-size: 15px;">' + aotc_en_text + ' ' + ce_en_text + '</span>');
					}
				},
				error: function (data) {
					$('.raid_1').find('.la-line-scale').fadeOut(0);

					$('.raid_1').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')

					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Nythendra</td><td>' + en_lfr_1 + '</td><td>' + en_normal_1 + '</td><td>' + en_heroic_1 + '</td><td>' + en_mythic_1 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Elerethe Renferal</td><td>' + en_lfr_2 + '</td><td>' + en_normal_2 + '</td><td>' + en_heroic_2 + '</td><td>' + en_mythic_2 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Il\'gynoth, Heart of Corruption</td><td>' + en_lfr_3 + '</td><td>' + en_normal_3 + '</td><td>' + en_heroic_3 + '</td><td>' + en_mythic_3 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Ursoc</td><td>' + en_lfr_4 + '</td><td>' + en_normal_4 + '</td><td>' + en_heroic_4 + '</td><td>' + en_mythic_4 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Dragons of Nightmare</td><td>' + en_lfr_5 + '</td><td>' + en_normal_5 + '</td><td>' + en_heroic_5 + '</td><td>' + en_mythic_5 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>Cenarius</td><td>' + en_lfr_6 + '</td><td>' + en_normal_6 + '</td><td>' + en_heroic_6 + '</td><td>' + en_mythic_6 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: #84724E;"><td>Xavius</td><td>' + en_lfr_7 + '</td><td>' + en_normal_7 + '</td><td>' + en_heroic_7 + '</td><td >' + en_mythic_7 + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr><td>total</td><td>' + en_lfr_bosskills + '</td><td>' + en_n_bosskills + '</td><td>' + en_hc_bosskills + '</td><td>' + en_m_bosskills + '</td></tr>')
					$('.raid_1').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
					$('.raid_1').find('span').append('<br /><span style="font-size: 15px;">' + aotc_en_text + ' ' + ce_en_text + '</span>');
					$('.raid_1').find('tbody').append('<tr id="debug1"></tr>')
				}
			})

			// API CALL TRIAL OF VALOR
			$.ajax({
				url: 'https://www.warcraftlogs.com/v1/parses/character/' + character + '/' + realm + '/' + region + '?zone=12&metric=' + wlogs_role + '&api_key=' + wlogs_api + '&partition=2',
				type: 'get',
				dataType: 'json',
				success: function (data) {

					$('.raid_2').find('.la-line-scale').fadeOut(0);

					$('.raid_2').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')
					$('.raid_2').find('tbody').append('<tr style="background-color: #84724E;"><td>Odyn</td><td class="2_1_1">' + tov_lfr_1 + '</td><td class="2_1_3">' + tov_normal_1 + '</td><td class="2_1_4">' + tov_heroic_1 + '</td><td class="2_1_5">' + tov_mythic_1 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr><td>Guarm</td><td class="2_2_1">' + tov_lfr_2 + '</td><td class="2_2_3">' + tov_normal_2 + '</td><td class="2_2_4">' + tov_heroic_2 + '</td><td class="2_2_5">' + tov_mythic_2 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr style="background-color: #84724E;"><td>Helya</td><td class="2_3_1">' + tov_lfr_3 + '</td><td class="2_3_3">' + tov_normal_3 + '</td><td class="2_3_4">' + tov_heroic_3 + '</td><td class="2_3_5">' + tov_mythic_3 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr><td>total</td><td>' + tov_lfr_bosskills + '</td><td>' + tov_n_bosskills + '</td><td>' + tov_hc_bosskills + '</td><td>' + tov_m_bosskills + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr id="debug2"></tr>')

					if (typeof data['0'] != 'undefined') {
						if (typeof wlogs_id == 'undefined') {
							var wlogs_id = data['0'].specs['0'].data['0'].character_id;
						}

						data.forEach(function (data) {

							if (data.difficulty == '1') {
								var dif = 'lfr';
							}
							if (data.difficulty == '3') {
								var dif = 'normal';
							}
							if (data.difficulty == '4') {
								var dif = 'heroic';
							}
							if (data.difficulty == '5') {
								var dif = 'mythic';
							}

							var encounter = data.name;

							var parse = Math.round(data.specs['0'].data['0'].percent);

							var log = data.specs['0'].data['0'].report_code;

							switch (encounter) {
								case 'Odyn':
									var identifier = 1;
									break;
								case 'Guarm':
									var identifier = 2;
									break;
								case 'Helya':
									var identifier = 3;
									break;
							}

							if (parse >= 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(255, 128, 0);">' + parse + '%</a>';
							}
							if (parse >= 75 && parse < 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(204, 143, 246);">' + parse + '%</a>';
							}
							if (parse >= 50 && parse < 75) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(118, 178, 255);">' + parse + '%</a>';
							}
							if (parse >= 25 && parse < 50) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(30, 255, 0);">' + parse + '%</a>';
							}
							if (parse < 25) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: #ababab;">' + parse + '%</a>';
							}

							$('.2_' + identifier + '_' + data.difficulty + '').append('<sup>' + parse_color + '</sup>');

						});

						$('.raid_2').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tov_text + ' ' + ce_tov_text + '</span>');

					} else {
						$('.raid_2').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
						$('.raid_2').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tov_text + ' ' + ce_tov_text + '</span>');
					}
				},
				error: function (data) {
					$('.raid_2').find('.la-line-scale').fadeOut(0);
					$('.raid_2').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')
					$('.raid_2').find('tbody').append('<tr style="background-color: #84724E;"><td>Odyn</td><td>' + tov_lfr_1 + '</td><td>' + tov_normal_1 + '</td><td>' + tov_heroic_1 + '</td><td>' + tov_mythic_1 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr><td>Guarm</td><td>' + tov_lfr_2 + '</td><td>' + tov_normal_2 + '</td><td>' + tov_heroic_2 + '</td><td>' + tov_mythic_2 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr style="background-color: #84724E;"><td>Helya</td><td>' + tov_lfr_3 + '</td><td>' + tov_normal_3 + '</td><td>' + tov_heroic_3 + '</td><td>' + tov_mythic_3 + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr><td>total</td><td>' + tov_lfr_bosskills + '</td><td>' + tov_n_bosskills + '</td><td>' + tov_hc_bosskills + '</td><td>' + tov_m_bosskills + '</td></tr>')
					$('.raid_2').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
					$('.raid_2').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tov_text + ' ' + ce_tov_text + '</span>');
					$('.raid_2').find('tbody').append('<tr id="debug2"></tr>')
				}
			})

			// API CALL THE NIGHTHOLD
			$.ajax({
				url: 'https://www.warcraftlogs.com/v1/parses/character/' + character + '/' + realm + '/' + region + '?zone=11&metric=' + wlogs_role + '&api_key=' + wlogs_api + '&partition=2',
				type: 'get',
				dataType: 'json',
				success: function (data) {

					$('.raid_3').find('.la-line-scale').fadeOut(0);

					$('.raid_3').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Skorpyron</td><td class="3_1_1">' + nh_lfr_1 + '</td><td class="3_1_3">' + nh_normal_1 + '</td><td class="3_1_4">' + nh_heroic_1 + '</td><td class="3_1_5">' + nh_mythic_1 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Chronomatic Anomaly</td><td class="3_2_1">' + nh_lfr_2 + '</td><td class="3_2_3">' + nh_normal_2 + '</td><td class="3_2_4">' + nh_heroic_2 + '</td><td class="3_2_5">' + nh_mythic_2 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Trilliax</td><td class="3_3_1">' + nh_lfr_3 + '</td><td class="3_3_3">' + nh_normal_3 + '</td><td class="3_3_4">' + nh_heroic_3 + '</td><td class="3_3_5">' + nh_mythic_3 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Spellblade Aluriel</td><td class="3_4_1">' + nh_lfr_4 + '</td><td class="3_4_3">' + nh_normal_4 + '</td><td class="3_4_4">' + nh_heroic_4 + '</td><td class="3_4_5">' + nh_mythic_4 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Star Augur Etraeus</td><td class="3_5_1">' + nh_lfr_5 + '</td><td class="3_5_3">' + nh_normal_5 + '</td><td class="3_5_4">' + nh_heroic_5 + '</td><td class="3_5_5">' + nh_mythic_5 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>High Botanist Tel\'arn</td><td class="3_6_1">' + nh_lfr_6 + '</td><td class="3_6_3">' + nh_normal_6 + '</td><td class="3_6_4">' + nh_heroic_6 + '</td><td class="3_6_5">' + nh_mythic_6 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Tichondrius</td><td class="3_7_1">' + nh_lfr_7 + '</td><td class="3_7_3">' + nh_normal_7 + '</td><td class="3_7_4">' + nh_heroic_7 + '</td><td class="3_7_5">' + nh_mythic_7 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Krosus</td><td class="3_8_1">' + nh_lfr_8 + '</td><td class="3_8_3">' + nh_normal_8 + '</td><td class="3_8_4">' + nh_heroic_8 + '</td><td class="3_8_5">' + nh_mythic_8 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Grand Magistrix Elisande</td><td class="3_9_1">' + nh_lfr_9 + '</td><td class="3_9_3">' + nh_normal_9 + '</td><td class="3_9_4">' + nh_heroic_9 + '</td><td class="3_9_5">' + nh_mythic_9 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Gul\'dan</td><td class="3_10_1">' + nh_lfr_10 + '</td><td class="3_10_3">' + nh_normal_10 + '</td><td class="3_10_4">' + nh_heroic_10 + '</td><td class="3_10_5">' + nh_mythic_10 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>total</td><td>' + nh_lfr_bosskills + '</td><td>' + nh_n_bosskills + '</td><td>' + nh_hc_bosskills + '</td><td>' + nh_m_bosskills + '</td></tr>')


					if (typeof data['0'] != 'undefined') {
						if (typeof wlogs_id == 'undefined') {
							var wlogs_id = data['0'].specs['0'].data['0'].character_id;
						}

						data.forEach(function (data) {

							if (data.difficulty == '1') {
								var dif = 'lfr';
							}
							if (data.difficulty == '3') {
								var dif = 'normal';
							}
							if (data.difficulty == '4') {
								var dif = 'heroic';
							}
							if (data.difficulty == '5') {
								var dif = 'mythic';
							}

							var encounter = data.name;

							var parse = Math.round(data.specs['0'].data['0'].percent);

							var log = data.specs['0'].data['0'].report_code;

							switch (encounter) {
								case 'Skorpyron':
									var identifier = 1;
									break;
								case 'Chronomatic Anomaly':
									var identifier = 2;
									break;
								case 'Trilliax':
									var identifier = 3;
									break;
								case 'Spellblade Aluriel':
									var identifier = 4;
									break;
								case 'Star Augur Etraeus':
									var identifier = 5;
									break;
								case 'High Botanist Tel\'arn':
									var identifier = 6;
									break;
								case 'Tichondrius':
									var identifier = 7;
									break;
								case 'Krosus':
									var identifier = 8;
									break;
								case 'Grand Magistrix Elisande':
									var identifier = 9;
									break;
								case 'Gul\'dan':
									var identifier = 10;
									break;
							}

							if (parse >= 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(255, 128, 0);">' + parse + '%</a>';
							}
							if (parse >= 75 && parse < 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(204, 143, 246);">' + parse + '%</a>';
							}
							if (parse >= 50 && parse < 75) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(118, 178, 255);">' + parse + '%</a>';
							}
							if (parse >= 25 && parse < 50) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(30, 255, 0);">' + parse + '%</a>';
							}
							if (parse < 25) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: #ababab;">' + parse + '%</a>';
							}

							$('.3_' + identifier + '_' + data.difficulty + '').append('<sup>' + parse_color + '</sup>');

						});

						$('.raid_3').find('span').append('<br /><span style="font-size: 15px;">' + aotc_nh_text + ' ' + ce_nh_text + '</span>');

					} else {
						$('.raid_3').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
						$('.raid_3').find('span').append('<br /><span style="font-size: 15px;">' + aotc_nh_text + ' ' + ce_nh_text + '</span>');
					}
				},
				error: function (data) {
					$('.raid_3').find('.la-line-scale').fadeOut(0);

					$('.raid_3').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Skorpyron></td><td>' + nh_lfr_1 + '</td><td>' + nh_normal_1 + '</td><td>' + nh_heroic_1 + '</td><td>' + nh_mythic_1 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Chronomatic Anomaly</td><td>' + nh_lfr_2 + '</td><td>' + nh_normal_2 + '</td><td>' + nh_heroic_2 + '</td><td>' + nh_mythic_2 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Trilliax</td><td>' + nh_lfr_3 + '</td><td>' + nh_normal_3 + '</td><td>' + nh_heroic_3 + '</td><td>' + nh_mythic_3 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Spellblade Aluriel</td><td >' + nh_lfr_4 + '</td><td>' + nh_normal_4 + '</td><td>' + nh_heroic_4 + '</td><td>' + nh_mythic_4 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Star Augur Etraeus</td><td>' + nh_lfr_5 + '</td><td>' + nh_normal_5 + '</td><td>' + nh_heroic_5 + '</td><td>' + nh_mythic_5 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>High Botanist Tel\'arn</td><td>' + nh_lfr_6 + '</td><td>' + nh_normal_6 + '</td><td>' + nh_heroic_6 + '</td><td>' + nh_mythic_6 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Tichondrius</td><td>' + nh_lfr_7 + '</td><td>' + nh_normal_7 + '</td><td>' + nh_heroic_7 + '</td><td>' + nh_mythic_7 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Krosus</td><td>' + nh_lfr_8 + '</td><td>' + nh_normal_8 + '</td><td>' + nh_heroic_8 + '</td><td>' + nh_mythic_8 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>Grand Magistrix Elisande</td><td>' + nh_lfr_9 + '</td><td>' + nh_normal_9 + '</td><td>' + nh_heroic_9 + '</td><td>' + nh_mythic_9 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr><td>Gul\'dan</td><td>' + nh_lfr_10 + '</td><td>' + nh_normal_10 + '</td><td>' + nh_heroic_10 + '</td><td>' + nh_mythic_10 + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: #84724E;"><td>total</td><td>' + nh_lfr_bosskills + '</td><td>' + nh_n_bosskills + '</td><td>' + nh_hc_bosskills + '</td><td>' + nh_m_bosskills + '</td></tr>')
					$('.raid_3').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
					$('.raid_3').find('span').append('<br /><span style="font-size: 15px;">' + aotc_nh_text + ' ' + ce_nh_text + '</span>');
				}
			})

			// API CALL TOMB OF SARGERAS
			$.ajax({
				url: 'https://www.warcraftlogs.com/v1/parses/character/' + character + '/' + realm + '/' + region + '?zone=13&metric=' + wlogs_role + '&api_key=' + wlogs_api + '&partition=2',
				type: 'get',
				dataType: 'json',
				success: function (data) {

					$('.raid_4').find('.la-line-scale').fadeOut(0);

					$('.raid_4').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')

					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Goroth</td><td class="4_1_1">' + tos_lfr_1 + '</td><td class="4_1_3">' + tos_normal_1 + '</td><td class="4_1_4">' + tos_heroic_1 + '</td><td class="4_1_5">' + tos_mythic_1 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Demonic Inquisition</td><td class="4_2_1">' + tos_lfr_2 + '</td><td class="4_2_3">' + tos_normal_2 + '</td><td class="4_2_4">' + tos_heroic_2 + '</td><td class="4_2_5">' + tos_mythic_2 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Harjatan</td><td class="4_3_1">' + tos_lfr_3 + '</td><td class="4_3_3">' + tos_normal_3 + '</td><td class="4_3_4">' + tos_heroic_3 + '</td><td class="4_3_5">' + tos_mythic_3 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Mistress Sassz\'line</td><td class="4_4_1">' + tos_lfr_4 + '</td><td class="4_4_3">' + tos_normal_4 + '</td><td class="4_4_4">' + tos_heroic_4 + '</td><td class="4_4_5">' + tos_mythic_4 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Sisters of the Moon</td><td class="4_5_1">' + tos_lfr_5 + '</td><td class="4_5_3">' + tos_normal_5 + '</td><td class="4_5_4">' + tos_heroic_5 + '</td><td class="4_5_5">' + tos_mythic_5 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Desolate Host</td><td class="4_6_1">' + tos_lfr_6 + '</td><td class="4_6_3">' + tos_normal_6 + '</td><td class="4_6_4">' + tos_heroic_6 + '</td><td class="4_6_5">' + tos_mythic_6 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Maiden of Vigilance</td><td class="4_7_1">' + tos_lfr_7 + '</td><td class="4_7_3">' + tos_normal_7 + '</td><td class="4_7_4">' + tos_heroic_7 + '</td><td class="4_7_5">' + tos_mythic_7 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>The Fallen Avatar</td><td class="4_8_1">' + tos_lfr_8 + '</td><td class="4_8_3">' + tos_normal_8 + '</td><td class="4_8_4">' + tos_heroic_8 + '</td><td class="4_8_5">' + tos_mythic_8 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Kil\'jaeden</td><td class="4_9_1">' + tos_lfr_9 + '</td><td class="4_9_3">' + tos_normal_9 + '</td><td class="4_9_4">' + tos_heroic_9 + '</td><td class="4_9_5">' + tos_mythic_9 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>total</td><td>' + tos_lfr_bosskills + '</td><td>' + tos_n_bosskills + '</td><td>' + tos_hc_bosskills + '</td><td>' + tos_m_bosskills + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr id="debug4"></tr>')


					if (typeof data['0'] != 'undefined') {
						if (typeof wlogs_id == 'undefined') {
							var wlogs_id = data['0'].specs['0'].data['0'].character_id;
						}

						data.forEach(function (data) {

							if (data.difficulty == '1') {
								var dif = 'lfr';
							}
							if (data.difficulty == '3') {
								var dif = 'normal';
							}
							if (data.difficulty == '4') {
								var dif = 'heroic';
							}
							if (data.difficulty == '5') {
								var dif = 'mythic';
							}

							var encounter = data.name;

							var parse = Math.round(data.specs['0'].data['0'].percent);

							var log = data.specs['0'].data['0'].report_code;

							switch (encounter) {
								case 'Goroth':
									var identifier = 1;
									break;
								case 'Demonic Inquisition':
									var identifier = 2;
									break;
								case 'Harjatan':
									var identifier = 3;
									break;
								case 'Mistress Sassz\'line':
									var identifier = 4;
									break;
								case 'Sisters of the Moon':
									var identifier = 5;
									break;
								case 'Desolate Host':
									var identifier = 6;
									break;
								case 'Maiden of Vigilance':
									var identifier = 7;
									break;
								case 'The Fallen Avatar':
									var identifier = 8;
									break;
								case 'Kil\'jaeden':
									var identifier = 8;
									break;
							}

							if (parse >= 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(255, 128, 0);">' + parse + '%</a>';
							}
							if (parse >= 75 && parse < 95) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(204, 143, 246);">' + parse + '%</a>';
							}
							if (parse >= 50 && parse < 75) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(118, 178, 255);">' + parse + '%</a>';
							}
							if (parse >= 25 && parse < 50) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: rgb(30, 255, 0);">' + parse + '%</a>';
							}
							if (parse < 25) {
								var parse_color = '<a href="https://www.warcraftlogs.com/reports/' + log + '/" title="Log Link" style="color: #ababab;">' + parse + '%</a>';
							}

							$('.4_' + identifier + '_' + data.difficulty + '').append('<sup>' + parse_color + '</sup>');

						});

						$('.raid_4').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tos_text + ' ' + ce_tos_text + '</span>');

					} else {
						$('.raid_4').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
						$('.raid_4').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tos_text + ' ' + ce_tos_text + '</span>');
					}
				},
				error: function (data) {
					$('.raid_4').find('.la-line-scale').fadeOut(0);

					$('.raid_4').find('tbody').append('<tr><td></td><td>LFR</td><td>Normal</td><td>Heroic</td><td>Mythic</td></tr>')

					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Goroth</td><td>' + tos_lfr_1 + '</td><td>' + tos_normal_1 + '</td><td>' + tos_heroic_1 + '</td><td>' + tos_mythic_1 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Demonic Inquisition</td><td>' + tos_lfr_2 + '</td><td>' + tos_normal_2 + '</td><td>' + tos_heroic_2 + '</td><td>' + tos_mythic_2 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Harjatan</td><td>' + tos_lfr_3 + '</td><td>' + tos_normal_3 + '</td><td>' + tos_heroic_3 + '</td><td>' + tos_mythic_3 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Mistress Sassz\'line</td><td>' + tos_lfr_4 + '</td><td>' + tos_normal_4 + '</td><td>' + tos_heroic_4 + '</td><td>' + tos_mythic_4 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Sisters of the Moon</td><td>' + tos_lfr_5 + '</td><td>' + tos_normal_5 + '</td><td>' + tos_heroic_5 + '</td><td>' + tos_mythic_5 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>Desolate Host</td><td>' + tos_lfr_6 + '</td><td>' + tos_normal_6 + '</td><td>' + tos_heroic_6 + '</td><td>' + tos_mythic_6 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Maiden of Vigilance</td><td>' + tos_lfr_7 + '</td><td>' + tos_normal_7 + '</td><td>' + tos_heroic_7 + '</td><td>' + tos_mythic_7 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>The Fallen Avatar</td><td>' + tos_lfr_8 + '</td><td>' + tos_normal_8 + '</td><td>' + tos_heroic_8 + '</td><td>' + tos_mythic_8 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: #84724E;"><td>Kil\'jaeden</td><td>' + tos_lfr_9 + '</td><td>' + tos_normal_9 + '</td><td>' + tos_heroic_9 + '</td><td>' + tos_mythic_9 + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr><td>total</td><td>' + tos_lfr_bosskills + '</td><td>' + tos_n_bosskills + '</td><td>' + tos_hc_bosskills + '</td><td>' + tos_m_bosskills + '</td></tr>')
					$('.raid_4').find('tbody').append('<tr style="background-color: transparent;"><td colspan="5" style="color: coral;">No logs could be found for this character for the current patch (possibly not public).</td></tr>');
					$('.raid_4').find('span').append('<br /><span style="font-size: 15px;">' + aotc_tos_text + ' ' + ce_tos_text + '</span>');
					$('.raid_4').find('tbody').append('<tr id="debug4"></tr>');
				}
			})


			$.getScript("http://wow.zamimg.com/widgets/power.js");

		},
		error: function (data) {
			if (data.responseText == '{"code":503, "type":"Service Unavailable", "detail":"Scheduled Maintenance"}') {
				$('.head').append('The World of Warcraft API is currently unavailable - please try again at a later point!');
			}
			if (data.responseText == '{"code":504, "type":"Gateway Timeout"}') {
				$('.head').append('The World of Warcraft API is currently unavailable - please try again at a later point!');
			}
		}
	})

	$(document).ajaxStop(function () {
		var size = $('.raid_3').height();

		var raid_1 = $('.raid_1').height();
		var new_height_1 = size - raid_1;

		var raid_2 = $('.raid_2').height();
		var new_height_2 = size - raid_2;

		var raid_4 = $('.raid_4').height();
		var new_height_4 = size - raid_4;

		$(document).find('#debug1').css('height', '' + new_height_1 + 'px');
		$(document).find('#debug2').css('height', '' + new_height_2 + 'px');
		$(document).find('#debug4').css('height', '' + new_height_4 + 'px');
		
		
		var size1 = $('.equip').height();
		var size2 = $('.dungeons').height();
		
		if(size1 > size2) {
			var compare = size1;
			$(document).find('.dungeons').css('height', '' + compare + 'px');
		}
		else {
			var compare = size2;
			$(document).find('.equip').css('height', '' + compare + 'px');
		}
		
		$(document).find('.reputation').find('table').css('height', '' + compare + 'px');
		

	});

};
