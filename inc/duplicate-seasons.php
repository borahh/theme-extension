<?php

function unq_register_season_template() {
	$labels = [
		"name" => esc_html__( "Season Templates", "hello-elementor" ),
		"singular_name" => esc_html__( "Season Template", "hello-elementor" ),
		"menu_name" => esc_html__( "Season Templates", "hello-elementor" ),
		"all_items" => esc_html__( "All Season Templates", "hello-elementor" ),
		"add_new" => esc_html__( "Add new", "hello-elementor" ),
		"add_new_item" => esc_html__( "Add new Season Template", "hello-elementor" ),
		"edit_item" => esc_html__( "Edit Season Template", "hello-elementor" ),
		"new_item" => esc_html__( "New Season Template", "hello-elementor" ),
		"view_item" => esc_html__( "View Season Template", "hello-elementor" ),
		"view_items" => esc_html__( "View Season Templates", "hello-elementor" ),
		"search_items" => esc_html__( "Search Season Templates", "hello-elementor" ),
		"not_found" => esc_html__( "No Season Templates found", "hello-elementor" ),
		"not_found_in_trash" => esc_html__( "No Season Templates found in trash", "hello-elementor" ),
		"parent" => esc_html__( "Parent Season Template:", "hello-elementor" ),
		"featured_image" => esc_html__( "Featured image for this Season Template", "hello-elementor" ),
		"set_featured_image" => esc_html__( "Set featured image for this Season Template", "hello-elementor" ),
		"remove_featured_image" => esc_html__( "Remove featured image for this Season Template", "hello-elementor" ),
		"use_featured_image" => esc_html__( "Use as featured image for this Season Template", "hello-elementor" ),
		"archives" => esc_html__( "Season Template archives", "hello-elementor" ),
		"insert_into_item" => esc_html__( "Insert into Season Template", "hello-elementor" ),
		"uploaded_to_this_item" => esc_html__( "Upload to this Season Template", "hello-elementor" ),
		"filter_items_list" => esc_html__( "Filter Season Templates list", "hello-elementor" ),
		"items_list_navigation" => esc_html__( "Season Templates list navigation", "hello-elementor" ),
		"items_list" => esc_html__( "Season Templates list", "hello-elementor" ),
		"attributes" => esc_html__( "Season Templates attributes", "hello-elementor" ),
		"name_admin_bar" => esc_html__( "Season Template", "hello-elementor" ),
		"item_published" => esc_html__( "Season Template published", "hello-elementor" ),
		"item_published_privately" => esc_html__( "Season Template published privately.", "hello-elementor" ),
		"item_reverted_to_draft" => esc_html__( "Season Template reverted to draft.", "hello-elementor" ),
		"item_scheduled" => esc_html__( "Season Template scheduled", "hello-elementor" ),
		"item_updated" => esc_html__( "Season Template updated.", "hello-elementor" ),
		"parent_item_colon" => esc_html__( "Parent Season Template:", "hello-elementor" ),
	];

	$args = [
		"label" => esc_html__( "Season Templates", "hello-elementor" ),
		"labels" => $labels,
		"description" => "",
		"public" => false,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"rest_namespace" => "wp/v2",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"can_export" => false,
		"rewrite" => [ "slug" => "season-template", "with_front" => true ],
		"query_var" => true,
		"supports" => [ "title", "editor" ],
		"show_in_graphql" => false,
	];

	register_post_type( "season-template", $args );
}

add_action( 'init', 'unq_register_season_template' );

add_filter( 'rwmb_meta_boxes', 'unq_meta_box_group_register' );
function unq_meta_box_group_register( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Season Plans',
        'context' => 'normal',
        'pages' => ['season-template'],
        'fields' => array(
        	array(
				'name'    => esc_html__( 'Template Key', 'realhomes-vacation-rentals' ),
				'id'      => 'season_template_key',
				'type'    => 'text',
				'columns' => 4,
			),
            array(
				'name'              => esc_html__( 'Seasonal Plans', 'realhomes-vacation-rentals' ),
				'id'                => 'rvr_seasonal_plans',
				'type'              => 'group',
				'clone'             => true,
				'sort_clone'        => true,
				'tab'               => 'rvr',
				'columns'           => 12,
				'add_button'        => esc_html__( 'Add New Season', 'realhomes-vacation-rentals' ),
				'fields'            => array(
					array(
						'name'    => esc_html__( 'Season Name', 'realhomes-vacation-rentals' ),
						'id'      => 'rvr_season_name',
						'type'    => 'text',
						'columns' => 4,
					),
					array(
						'name'    => esc_html__( 'Start Date', 'realhomes-vacation-rentals' ),
						'id'      => 'rvr_price_start_date',
						'type'    => 'date',
						'columns' => 4,
					),
					array(
						'name'    => esc_html__( 'End Date', 'realhomes-vacation-rentals' ),
						'id'      => 'rvr_price_end_date',
						'type'    => 'date',
						'columns' => 4,
					),								
					array(
						'name'              => esc_html__( 'Plans', 'realhomes-vacation-rentals' ),
						'id'                => 'rvr_seasonal_plans_group',
						'type'              => 'group',
						'clone'             => true,
						'sort_clone'        => true,
						'columns'           => 12,
						'add_button'        => esc_html__( 'Add New Plan', 'realhomes-vacation-rentals' ),
						'fields'            => array(
							array(
								'name'    => esc_html__( 'Rooms', 'realhomes-vacation-rentals' ),
								'id'      => 'rvr_plan_rooms',
								'type'    => 'number',
								'columns' => 4,
							),
							
							array(
								'name'    => esc_html__( 'Per Week', 'realhomes-vacation-rentals' ),
								'id'      => 'rvr_plan_week_price',
								'type'    => 'number',
								'columns' => 4,
							),
							
							array(
								'name'    => esc_html__( 'Per Night', 'realhomes-vacation-rentals' ),
								'id'      => 'rvr_plan_night_price',
								'readonly' => true,
								'type'    => 'text',
								'columns' => 4,
							),
						),
					),

				),
			),
        ),
    );
    return $meta_boxes;
}


add_action('admin_footer', function ()
{
	?>
	<style type="text/css">
        .content, .preview-content {
            position: fixed;
            top: 10%;
            left: 5%;
            transform: translate(0%, -10%);
            width: 90%;
            height: 90vh;
            text-align: center;
            background-color: #e8eae6;
            box-sizing: border-box;
            padding: 10px;
            z-index: 99999;
            display: none;
        }
        .close-btn {
            position: absolute;
            right: 20px;
            top: 15px;
            background-color: black;
            color: white;
            border-radius: 50%;
            padding: 4px;
            width: 20px;
        }
        .preview-content{z-index: 9999999;}
    </style>
    <!-- div containing the popup -->
    <?php $seasonTemplates = get_posts("post_type=season-template&numberposts=-1"); ?>
    <div class="content">
        <div onclick="togglePopup();" class="close-btn">×</div>
        <h3>Season Templates</h3>
        <div id="step-box" style="max-height: 80vh;overflow-y: scroll;">
	        <table>
	        	<thead>
	        		<tr>
	        			<th>Season Name</th>
	        			<th>Description</th>
	        			<th></th>
	        		</tr>
	        	</thead>
	        	<tbody>
	        		<?php if ($seasonTemplates): ?>
		        		<?php foreach ($seasonTemplates as $tmpltKey => $tmpltVal): ?>
			        		<tr>
			        			<td><a href="javascript:togglePrevPopup(<?php echo $tmpltVal->ID; ?>);"><?php echo $tmpltVal->post_title; ?></a></td>
			        			<td><?php echo $tmpltVal->post_content ?></td>
			        			<td><a href="javascript:load_years_selected_season(<?php echo (get_the_ID() ?? 0), ',', $tmpltVal->ID; ?>);" class="button-primary">Import</a></td>
			        		</tr>
		        		<?php endforeach ?>
	        		<?php endif ?>
	        	</tbody>
	        </table>
        </div>
    </div>
    <div class="preview-content">
        <div onclick="togglePrevPopup(0);" class="close-btn">×</div>
        <h3>Preview</h3>
        <div id="tmpl-prev-box" style="max-height: 80vh;overflow-y: scroll;">
        </div>
    </div>
	<script type="text/javascript">
		function togglePopup() {
            $(".content").toggle();
        }
        function togglePrevPopup(tmplID) {
        	if (tmplID) {
        		$.post('<?php echo admin_url('admin-ajax.php') ?>', {action:'load_season_tmpl', tmplID:tmplID}, function(resp, textStatus, xhr) {
	        		if (resp.success) {
	        			jQuery('#tmpl-prev-box').html(resp.data.htmlTable);
	        		} else {
	        			alert(resp.data.err);
	        		}
	        	});
        	} else {
				jQuery('#tmpl-prev-box').html("");
        	}
            $(".preview-content").toggle();
        }
        function load_years_selected_season(postID, tmplID) {
        	$.post('<?php echo admin_url('admin-ajax.php') ?>', {action:'import_duplicate_years',postID: postID, tmplID:tmplID}, function(resp, textStatus, xhr) {
        		if (resp.success) {
        			jQuery('#step-box').html(resp.data.htmlForm);
        		} else {
        			alert(resp.data.err);
        			$(".content").toggle();
        		}
        	});
        }
        function load_seasons_form(postID, tmplID) {
        	var form = jQuery('#multi-seasons-form').serialize();
        	$.post('<?php echo admin_url('admin-ajax.php') ?>', form, function(resp, textStatus, xhr) {
        		if (resp.success) {
        			jQuery('#step-box').html(resp.data.htmlForm);
        		} else {
        			alert(resp.data.err);
        			$(".content").toggle();
        		}
        	});
        }
        function finish_import() {
        	var form = jQuery('#form-season-plan-finish').serialize();
        	$.post('<?php echo admin_url('admin-ajax.php') ?>', form, function(resp, textStatus, xhr) {
        		if (resp.success) {
        			alert(resp.data);
        			window.location.href = '<?php echo get_edit_post_link(get_the_ID(), '&') ?>';
        		} else {
        			alert(resp.data.err);
        			$(".content").toggle();
        		}
        	});
        }

	</script>
	<?php
});

add_action('wp_ajax_finish_import', function ()
{

	if (isset($_POST['postID']) && !empty($_POST['postID'])) $postID = sanitize_text_field($_POST['postID']);
	if (isset($_POST['tmplID']) && !empty($_POST['tmplID'])) $tmplID = sanitize_text_field($_POST['tmplID']);
	if (isset($_POST['rvr_seasonal_plans']) && is_array($_POST['rvr_seasonal_plans']) && count($_POST['rvr_seasonal_plans'])) $rvr_seasonal_plans = $_POST['rvr_seasonal_plans'];
	if ($postID && get_post_status($postID) == 'auto-draft') wp_send_json_error(['err'=>'Post Not Saved. Save post before importing.']);
	if ($postID && $rvr_seasonal_plans) {
		update_post_meta($postID, 'rvr_seasonal_plans', $rvr_seasonal_plans);
		wp_send_json_success("Imported");
	}
	wp_send_json_error(['err'=>"Failed To Import. Something went wrong."]);
});

add_action('wp_ajax_load_seasons_form', function (){
	if (isset($_POST['postID']) && !empty($_POST['postID'])) $postID = sanitize_text_field($_POST['postID']);
	if (isset($_POST['tmplID']) && !empty($_POST['tmplID'])) $tmplID = sanitize_text_field($_POST['tmplID']);
	if (isset($_POST['duplicate_years']) && is_array($_POST['duplicate_years']) && count($_POST['duplicate_years'])) $duplicate_years = $_POST['duplicate_years'];
	if ($postID && get_post_status($postID) == 'auto-draft') wp_send_json_error(['err'=>'Post Not Saved. Save post before importing.']);
	if ($postID && $tmplID && $duplicate_years) {
		$template_key = get_post_meta($tmplID, 'season_template_key', true);

		$form = "";
		$form .= '<form id="form-season-plan-finish">';
		$form .= '<input type="hidden" name="action" value="finish_import">';
		$form .= '<input type="hidden" name="postID" value="'.$postID.'">';
		$form .= '<input type="hidden" name="tmplID" value="'.$tmplID.'">';
		if ($duplicate_years) {
			foreach ($duplicate_years as $year) {
				$plans = get_post_meta($tmplID, 'rvr_seasonal_plans', true);
				$plans = unq_str_replace_json($template_key, $year, $plans);
				$form .= "<h3>Year: $year</h3>";
				$form .= '<table border="0" cellspacing="0">';
				if ($plans && count($plans)) {
					foreach ($plans as $pk => $pv) {
						$form .= "<tr>";
						$form .= '<th>Season Name</th>';
						$form .= '<th>Start Date</th>';
						$form .= '<th>End Date</th>';
						$form .= "</tr>";
						$form .= "<tr>";
						$form .= '<td><input type="text" name="rvr_seasonal_plans['.$year.$pk.'][rvr_season_name]" id="" value="'.$pv['rvr_season_name']. '"></td>';
						$form .= '<td><input type="date" name="rvr_seasonal_plans['.$year.$pk.'][rvr_price_start_date]" id="" value="'.$pv['rvr_price_start_date']. '"></td>';
						$form .= '<td><input type="date" name="rvr_seasonal_plans['.$year.$pk.'][rvr_price_end_date]" id="" value="'.$pv['rvr_price_end_date']. '"></td>';
						$form .= "</tr>";
						if (array_key_exists('rvr_seasonal_plans_group', $pv) && count($pv['rvr_seasonal_plans_group'])) {
							foreach ($pv['rvr_seasonal_plans_group'] as $pgk => $pgv) {
								$form .= "<tr>";
								$form .= '<th>Rooms</th>';
								$form .= '<th>Per Week</th>';
								$form .= '<th>Per Night</th>';
								$form .= "</tr><tr>";
								$form .= '<td><input type="text" name="rvr_seasonal_plans['.$year.$pk.'][rvr_seasonal_plans_group]['.$pgk.'][rvr_plan_rooms]" id="" value="'.$pgv['rvr_plan_rooms'].'" ></td>';
								$form .= '<td><input type="text" name="rvr_seasonal_plans['.$year.$pk.'][rvr_seasonal_plans_group]['.$pgk.'][rvr_plan_week_price]" id="" value="'.$pgv['rvr_plan_week_price'].'" ></td>';
								$form .= '<td><input type="text" name="rvr_seasonal_plans['.$year.$pk.'][rvr_seasonal_plans_group]['.$pgk.'][rvr_plan_night_price]" readonly id="" value="'.$pgv['rvr_plan_night_price'].'" ></td>';
								$form .= "</tr>";
							}
						}
					}
				}
				$form .= "</table>";
			}
		}

		$form .= '<button type="button" id="finish-import" onclick="finish_import();" class="button-primary" name="">Finish Import</button>';

		$form .= '</form>';
		wp_send_json_success(['htmlForm'=>$form]);
	}else{
		wp_send_json_error(['err'=>"Something Went Wrong"]);
	}
});


add_action('wp_ajax_import_duplicate_years', function ()
{
	if (isset($_POST['postID']) && !empty($_POST['postID'])) $postID = sanitize_text_field($_POST['postID']);
	if (isset($_POST['tmplID']) && !empty($_POST['tmplID'])) $tmplID = sanitize_text_field($_POST['tmplID']);
	if ($postID && get_post_status($postID) == 'auto-draft') wp_send_json_error(['err'=>'Post Not Saved. Save post before importing.']);
	if ($postID && $tmplID) {
		$years = range(date('Y'), date('Y')+3);
		$form = "";

		$form .= '<form action="" id="multi-seasons-form">';
		$form .= '<input type="hidden" name="postID" value="'.$postID.'">';
		$form .= '<input type="hidden" name="tmplID" value="'.$tmplID.'">';
		$form .= '<input type="hidden" name="action" value="load_seasons_form">';
		$form .= 'Select the years, you wanna duplicate';
		$form .= '<ul style="list-style: none;padding: 0;">';
		if ($years) {
			foreach ($years as $year) {
				$form .= '<li><label><input type="checkbox" name="duplicate_years['.$year.']" value="'.$year.'"> '.$year.'</label></li>';
			}
		}
		$form .= "</ul>";
		$form .= '<button type="button" onclick="load_seasons_form('.$postID.','.$tmplID.')" class="button-primary">Generate Seasons For Selected Years</button>';

		$form .= "</form>";
		wp_send_json_success(['htmlForm'=>$form]);
	}else{
		wp_send_json_error(['err'=>"Something Went Wrong"]);
	}
});

add_action('wp_ajax_load_season_tmpl', function ()
{
	if (isset($_POST['tmplID']) && !empty($_POST['tmplID'])) $tmplID = sanitize_text_field($_POST['tmplID']);
	if ($tmplID) {
		$tmpl = get_post($tmplID);
		$plans = get_post_meta($tmplID, 'rvr_seasonal_plans', true);
		$html = "";

		$html .= "<h3>Template: {$tmpl->post_title}</h3>";
		$html .= '<table border="0" cellspacing="0">';
		$html .= '<colgroup>';
		$html .= '<col width="33">';
		$html .= '<col width="33">';
		$html .= '<col width="33">';
		$html .= '</colgroup>';
		if ($plans && count($plans)) {
			foreach ($plans as $pk => $pv) {
				$html .= "<tr>";
				$html .= '<th>Season Name</th>';
				$html .= '<th>Start Date</th>';
				$html .= '<th>End Date</th>';
				$html .= "</tr>";
				$html .= "<tr>";
				$html .= '<td>'.$pv['rvr_season_name'].'</td>';
				$html .= '<td>'.$pv['rvr_price_start_date'].'</td>';
				$html .= '<td>'.$pv['rvr_price_end_date'].'</td>';
				$html .= "</tr>";
				if (array_key_exists('rvr_seasonal_plans_group', $pv) && count($pv['rvr_seasonal_plans_group'])) {
					foreach ($pv['rvr_seasonal_plans_group'] as $pgk => $pgv) {
						$html .= "<tr>";
						$html .= '<th>Rooms</th>';
						$html .= '<th>Per Week</th>';
						$html .= '<th>Per Night</th>';
						$html .= "</tr><tr>";
						$html .= '<td>'.$pgv['rvr_plan_rooms'].'</td>';
						$html .= '<td>'.$pgv['rvr_plan_week_price'].'</td>';
						$html .= '<td>'.$pgv['rvr_plan_night_price'].'</td>';
						$html .= "</tr>";
					}
				}
			}
		}
		$html .= "</table>";
		wp_send_json_success(['htmlTable'=>$html]);
	}
	wp_send_json_error(['err'=>'Template ID required...']);
});

function unq_rvr_import_metabox_fields( $property_metabox_fields ) {
		$rvr_metabox_fields = [
			[
				'type' => 'divider',
				'tab'  => 'rvr',
			],
			[
				'name'              => esc_html__( 'Import Seasons', 'realhomes-vacation-rentals' ),
				'id'                => 'rvr_import',
				'type'              => 'group',
				'tab'               => 'rvr',
				'columns'           => 12,
				'fields'            => [
						[
							'type'    => 'custom_html',
							'std' 	  => '<a href="javascript:togglePopup();" class="button-primary" id="importSeason">Import Seasons</a>',
						],
					],
			]
		];
	return array_merge( $property_metabox_fields, $rvr_metabox_fields );
}

add_filter( 'ere_property_metabox_fields', 'unq_rvr_import_metabox_fields', 10 );

function unq_str_replace_json($search, $replace, $subject) 
{
    return json_decode(str_replace($search, $replace, json_encode($subject)), true);
}

add_action('admin_footer', 'dp_footer_script');
function dp_footer_script(){
	?>
	<script type="text/javascript">
		var num = Math.floor(Math.random() * 999999);
		jQuery(document).ready(function($) {
			jQuery('[for="rvr_season_name"]').each(function (i, v) {
			    jQuery(v).append('<a href="javascript:void(0);" class="season-duplicate button-primary" id="season-duplicate-'+i+'">Duplicate</a>');
			})
		});	
		jQuery(document).on('click','.season-duplicate',function(event) {
			var e = jQuery(this);
			var p = e.parent().parent().parent().parent().parent().parent();
			var start_date = null;
			var end_date = null;
			num++;
			// var num = Math.floor((Math.random() * 100) + 99999);
			var html = p.attr('id', 'newBox').prop('outerHTML');
			html = html.replaceAll(/rvr_seasonal_plans\[([\d])\]/g, "rvr_seasonal_plans["+num+"]");
			html = html.replaceAll(/rvr_seasonal_plans\[([\d]{6})\]/g, "rvr_seasonal_plans["+num+"]");
			html = html.replaceAll(/rvr_seasonal_plans\[([\d]{5})\]/g, "rvr_seasonal_plans["+num+"]");
			html = html.replaceAll(/rvr_seasonal_plans_([\d]{6})_rvr_price_start_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_start_date");
			html = html.replaceAll(/rvr_seasonal_plans_([\d]{6})_rvr_price_end_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_end_date");
			html = html.replaceAll(/rvr_seasonal_plans_([\d]{5})_rvr_price_start_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_start_date");
			html = html.replaceAll(/rvr_seasonal_plans_([\d]{5})_rvr_price_end_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_end_date");
			html = html.replaceAll(/rvr_seasonal_plans_([\d])_rvr_price_start_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_start_date");
			html = html.replaceAll(/rvr_seasonal_plans_([\d])_rvr_price_end_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_end_date");
			html = html.replaceAll(/rvr_seasonal_plans_rvr_price_start_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_start_date");
			html = html.replaceAll(/rvr_seasonal_plans_rvr_price_end_date/g, "rvr_seasonal_plans_"+num+"_rvr_price_end_date");
			p.after(html);
			p.attr('id', 'oldBox');

			var box = jQuery('#newBox input');
			jQuery('#oldBox input').each(function (i, v) {
				box[i].value = v.value;
			})
			var prevseasonname = jQuery('#newBox [name$="[rvr_season_name]"]').val();
			var seasonname = prevseasonname.replace(/\d+/g, function(n){ return ++n });
			jQuery('#newBox [name$="[rvr_season_name]"]').val(seasonname);
			var e_start_date = jQuery('#newBox [name$="[rvr_price_start_date]"]');
			var e_end_date = jQuery('#newBox [name$="[rvr_price_end_date]"]');
			if(e_start_date.val() !== undefined){console.log(498);console.log(e_start_date.val() !== undefined);
				start_date = new Date(e_start_date.val());console.log(start_date);
				start_date.setFullYear(start_date.getFullYear() +1);console.log(start_date);
				start_date = start_date.getFullYear() +'-'+(start_date.getMonth()+1)+'-'+start_date.getDate();console.log(start_date);
			}
			if(e_end_date.val() !== undefined){
				end_date = new Date(e_end_date.val());
				end_date.setFullYear(end_date.getFullYear() +1);
				end_date = end_date.getFullYear()+'-'+(end_date.getMonth()+1)+'-'+end_date.getDate();
			}
			
			e_start_date.removeClass("hasDatepicker");
			e_start_date.datepicker('destroy');
			var start_date_options = e_start_date.data('options')
			e_start_date.datepicker(start_date_options);
			e_end_date.removeClass("hasDatepicker");
			e_end_date.datepicker('destroy');
			var end_date_options = e_end_date.data('options')
			
			e_end_date.datepicker(end_date_options);
			if(start_date){console.log(start_date);
				e_start_date.val(start_date);
			}
			if(end_date){
				e_end_date.val(end_date);
			}
			jQuery('.season-duplicate').remove();
			jQuery('[for="rvr_season_name"]').each(function (i, v) {
			    jQuery(v).append('<a href="javascript:void(0);" class="season-duplicate season-duplicate-'+num+' button-primary" id="season-duplicate-'+i+'">Duplicate</a>');
			})
			jQuery('#newBox, #oldBox').removeAttr('id');
		});
	</script>
	<?php
}