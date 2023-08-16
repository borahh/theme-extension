<?php

add_shortcode( 'qg_shortcode', 'qg_shortcode' );
function qg_shortcode()
{
	ob_start();
    $page_id = get_queried_object_id();

    // Obtain the property order from the meta field
    $property_order = get_post_meta($page_id, 'qg_property_order', true);
    $property_order = $property_order ? explode(',', $property_order) : array();

    // Fetch the properties and sort them
    $items = qg_populate_and_sort_properties($page_id);

    // Sort items according to saved order
    usort($items, function ($a, $b) use ($property_order) {
        $a_index = array_search($a['sorting_key'], $property_order);
        $b_index = array_search($b['sorting_key'], $property_order);
        return $a_index - $b_index;
    });

	
    // Your existing HTML and JavaScript code starts here
    ?>
    <div class="rh_page__head">
    <p class="rh_pagination__stats" data-page="0" data-max="18" data-total-properties="108" data-page-id="71">
	<span class="highlight_stats" id="counter_bh">0</span>
	<span> suggestions</span>
		</p><!-- /.rh_pagination__stats -->

<div class="rh_page__controls">

<div class="rh_sort_controls">
    <!-- Existing Filters -->
    <!-- Add City Filter -->
    <div class="dropdown bootstrap-select inspiry_select_picker_trigger inspiry_bs_default_mod inspiry_bs_listing inspiry_bs_green bs3 dropup" style="width: 100%;">
        <select name="filter-city" id="filter-city" class="inspiry_select_picker_trigger inspiry_bs_default_mod inspiry_bs_listing inspiry_bs_green" tabindex="-98">
            <option value="" disabled="" selected="">Select City</option>
            <?php
            $selected_cities = get_post_meta($page_id, 'qg_property_cities', true);
            if (!empty($selected_cities)) {
                foreach ($selected_cities as $city_id) {
                    $city_term = get_term($city_id, 'property-city');
                    if ($city_term && !is_wp_error($city_term)) {
                        echo '<option value="' . esc_attr($city_id) . '">' . esc_html($city_term->name) . '</option>';
                    }
                }
            }
            ?>
        </select>
    </div>
</div>

<div class="rh_sort_controls">
<div class="dropdown bootstrap-select inspiry_select_picker_trigger inspiry_bs_default_mod inspiry_bs_listing inspiry_bs_green bs3 dropup" style="width: 100%;"><select name="sort-properties" id="sort-properties" class="inspiry_select_picker_trigger inspiry_bs_default_mod inspiry_bs_listing inspiry_bs_green" tabindex="-98">
<option value="" disabled="" selected="">Filters</option>
<option value="ASC">A to Z</option>
<option value="DESC">Z to A</option>
<option value="COSTASC">Price Low to High</option>
<option value="COSTDESC">Price High to Low</option>
</select>
<div class="dropdown-menu open" style="max-height: 220px; overflow: hidden;"><div class="inner open" role="listbox" id="bs-select-1" tabindex="-1" aria-activedescendant="bs-select-1-0" style="max-height: 220px; overflow-y: auto;"><ul class="dropdown-menu inner " role="presentation" style="margin-top: 0px; margin-bottom: 0px;"><li class="disabled selected active"><a role="option" id="bs-select-1-0" aria-disabled="true" tabindex="-1" aria-setsize="7" aria-posinset="undefined" class="active selected" aria-selected="true"><span class="text">Filters</span></a></li><li><a role="option" id="bs-select-1-1" tabindex="0"><span class="text">Default Order</span></a></li><li><a role="option" id="bs-select-1-2" tabindex="0"><span class="text">A to Z</span></a></li><li><a role="option" id="bs-select-1-3" tabindex="0"><span class="text">Z to A</span></a></li><li><a role="option" id="bs-select-1-4" tabindex="0" aria-setsize="7" aria-posinset="4"><span class="text">Price Low to High</span></a></li><li><a role="option" id="bs-select-1-5" tabindex="0"><span class="text">Price High to Low</span></a></li><li><a role="option" id="bs-select-1-6" tabindex="0"><span class="text">Date Old to New</span></a></li><li><a role="option" id="bs-select-1-7" tabindex="0"><span class="text">Date New to Old</span></a></li></ul></div></div></div>
</div><!-- /.rh_sort_controls -->    </div>
<!-- /.rh_page__controls -->


</div>
<div class="rh_sort_controls" style="margin: 20px auto;">
<button id="clear-filters">Clear Filters</button>
</div>
<style>
h3.rhea_heading_stylish a:hover {
    color: #D2BF7F;
} 


</style>
    
    <div class="rhea_latest_properties_2" id="items">
        <?php
		
		
		
        // Loop through the sorted items
        foreach ($items as $item) {
			// Get the post ID for this property
			$post_id = $item['property_id']; // Make sure this is the correct key for your data structure

			$permalink = get_permalink($post_id);
			$thumbnail_id = get_post_thumbnail_id($post_id);
			$thumbnail_url = wp_get_attachment_image_src($thumbnail_id, $ere_property_grid_image)[0];
		
            $url = $item['url'];
            $title = $item['title'];
            $rooms = $item['rooms'];
            $cost = $item['cost'];
            $address = $item['address'];
            $estimated = $item['estimated'];

			$city_id = get_the_terms($post_id, 'property-city');
			if (!empty($city_id) && !is_wp_error($city_id)) {
				$city_id = $city_id[0]->term_id;
			} else {
				$city_id = ''; // Default value if no city is found
			}
            ?>
            <div class="rhea_property_card_ele_stylish" data-estimated="<?php echo $estimated; ?>" data-city="<?php echo $city_id; ?>" data-text="<?php echo $title; ?>">
                <div class="rhea_property_card_ele_stylish_inner">
                    <div class="rhea_thumbnail_wrapper" style="pointer-events: none;">
                    <a class="rhea_permalink <?php if ('yes' == $settings['ere_enable_thumbnail_animation']) {
    echo esc_attr('rhea_scale_animation');
} ?>" href="<?php echo $permalink; ?>">
    <?php
    if ($thumbnail_url) {
        echo '<img src="' . esc_url($thumbnail_url) . '" alt="' . esc_attr(get_the_title($post_id)) . '">';
    } else {
        inspiry_image_placeholder($ere_property_grid_image);
    }
    ?>
</a>
                    </div>
                    <div class="rhea_detail_wrapper rh_detail_wrapper_2">
                        <h3 class="rhea_heading_stylish"><a href="<?php echo $url; ?>"><?php echo $title; ?></a></h3>
                        <div class="rhea_address_sty">
                            <a class="rhea_trigger_map rhea_facnybox_trigger-684e75b" href="<?php echo $url; ?>">
                                <span class="rhea_address_pin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
	<style type="text/css">

		.st0{fill-rule:evenodd;clip-rule:evenodd;}

	</style>
	<path class="st0" d="M9 1c3.3 0 6 2.7 6 6S9 17 9 17 3 10.3 3 7 5.7 1 9 1zM9 5c1.1 0 2 0.9 2 2s-0.9 2-2 2S7 8.1 7 7 7.9 5 9 5z"></path>
</svg></span>
                                <?php echo $address; ?>
                            </a>
                        </div>
                        <br/>
                        <div class="rh_prop_card_meta_wrap_stylish">
                            <div class="rh_prop_card__meta">
                                <span class="rhea_meta_titles">Rooms</span>
                                <div class="rhea_meta_icon_wrapper">
                                <svg class="rh_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
 <defs>
  </defs>
  <path d="M1111.91,600.993h16.17a2.635,2.635,0,0,1,2.68,1.773l1.21,11.358a2.456,2.456,0,0,1-2.61,2.875h-18.73a2.46,2.46,0,0,1-2.61-2.875l1.21-11.358A2.635,2.635,0,0,1,1111.91,600.993Zm0.66-7.994h3.86c1.09,0,2.57.135,2.57,1l0.01,3.463c0.14,0.838-1.72,1.539-2.93,1.539h-4.17c-1.21,0-2.07-.7-1.92-1.539l0.37-3.139A2.146,2.146,0,0,1,1112.57,593Zm11,0h3.86a2.123,2.123,0,0,1,2.2,1.325l0.38,3.139c0.14,0.838-.72,1.539-1.93,1.539h-5.17c-1.21,0-2.07-.7-1.92-1.539L1121,594C1121,593.1,1122.48,593,1123.57,593Z" transform="translate(-1108 -593)"></path>
</svg>
                                    <span class="figure"><?php echo $rooms; ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="rhea_price_fav_box">
                            <div class="rhea_price_box">
                                <div class="rh_prop_card__priceLabel_sty">
                                    <p class="rh_prop_card__price_sty" style="color: #D2BF7F;">
                                        Estimated Cost: <?php echo $cost; ?> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
			
        } // End of loop
        ?>
	
    <script>
document.getElementById('clear-filters').addEventListener('click', function() {
    // Get the current URL without query parameters
    var url = window.location.href.split('?')[0];
    
    // Redirect to the URL without query parameters
    window.location.href = url;
});

 document.addEventListener('DOMContentLoaded', function() {
    var selectedCity = "<?php echo isset($_GET['city']) ? $_GET['city'] : ''; ?>";
    var sort_order = "<?php echo isset($_GET['sortby']) ? $_GET['sortby'] : ''; ?>";
    console.log('Selected City:', selectedCity);
    console.log('Sort Order:', sort_order);

    var items = document.querySelectorAll('#items .rhea_property_card_ele_stylish');
    var itemsArray = Array.from(items);

    // Filter items based on the selected city, if provided
    if (selectedCity && selectedCity !== '') {
        itemsArray = itemsArray.filter(function(item) {
            var itemCity = item.dataset.city;
            return selectedCity === itemCity;
        });
    }
    console.log('Filtered Items:', itemsArray);

    // Sort items based on the selected order, if provided
    if (sort_order && sort_order !== '') {
        itemsArray.sort(function(a, b) {
            if (sort_order === 'COSTASC' || sort_order === 'COSTDESC') {
                var aEstimated = parseInt(a.dataset.estimated);
                var bEstimated = parseInt(b.dataset.estimated);
                return sort_order === 'COSTASC' ? aEstimated - bEstimated : bEstimated - aEstimated;
            } else if (sort_order === 'ASC') {
                var aTitle = a.dataset.text;
                var bTitle = b.dataset.text;
                return aTitle.localeCompare(bTitle);
            } else if (sort_order === 'DESC') {
                var aTitle = a.dataset.text;
                var bTitle = b.dataset.text;
                return bTitle.localeCompare(aTitle);
            }
        });
    }

    // Update the DOM with sorted and filtered items
    var container = document.querySelector('#items');
    container.innerHTML = '';
    itemsArray.forEach(function(item) {
        container.appendChild(item);
    });

	// Set the selected option in the dropdown based on the current filter
    var cityFilter = document.getElementById('filter-city');
    if (selectedCity && cityFilter) {
        for (var i = 0; i < cityFilter.options.length; i++) {
            if (cityFilter.options[i].value === selectedCity) {
                cityFilter.options[i].selected = true;
                break;
            }
        }
    }

	var sortFilter = document.getElementById('sort-properties');
    if (sort_order && sortFilter) {
        for (var i = 0; i < sortFilter.options.length; i++) {
            if (sortFilter.options[i].value === sort_order) {
                sortFilter.options[i].selected = true;
                break;
            }
        }
    }
});

// Event listener to update the URL when the city filter is changed
document.getElementById('filter-city').addEventListener('change', function() {
    var selectedCity = this.value;
    var url = new URL(window.location.href);
    url.searchParams.set('city', selectedCity);
    window.location.href = url.toString();
});

function updateCounter() {
    var itemsContainer = document.getElementById('items');
    var itemCount = itemsContainer ? itemsContainer.children.length : 0;
    var counterElement = document.getElementById('counter_bh');
    if (counterElement) {
        counterElement.innerText = itemCount;
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', updateCounter);

    </script>


    </div>
    <script>
        document.getElementById('counter_bh').innerText = document.getElementById('items').children.length;
    </script>
    <?php
    return ob_get_clean();
}
