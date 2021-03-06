<?php if (! defined('BASEPATH')) exit ('No direct script access allowed.');

if(! function_exists('almd_draw_window')) {
	function almd_draw_window($params = array(), $section) {
		$output = '';
	
		// wraps it again
	 	$output = sprintf("<li>%s</li>", $output);
	 	
		switch ($section) {
			case 'section_masthead':
				$output = build_per_section($params);
				Masthead::buildChildDOM($output);
				break;
			case 'section_panels':
				$output = build_per_section($params);
				Panels::buildChildDOM($output);
				break;
			case 'section_pasteboard':
				$output = build_per_section($params, FALSE, FALSE);
				Pasteboard::buildChildDOM($output);
				break;
			case 'section_toolbars':
				$output = build_per_section($params);
				Toolbars::buildChildDOM($output);
				break;
			case 'section_footer':
				$output = build_per_section($params);
				footer::buildChildDOM($output);
				break;
		}	
	}
}

if(! function_exists('build_per_section')) {
	function build_per_section($params, $hastitle = TRUE, $hasitems = TRUE) {
		global $almd_wrap;
		$output = '';
		
		if($hastitle):
			$title_section = $almd_wrap->wrap(array('node' => 'p', 'prop' => get_elem_properties(array('class' => 'panel-menu-title')), 'child' => $params['section_title']));
			$output = $title_section;
		endif;
		
		if($hasitems)
			$output .= almd_menu_walker($params['items'], '');
		
		if(!$hastitle && !$hasitems)
			$output = (isset($params['content'])) ? $params['content'] : ''; 
		
		return $output;
	}
}

if(! function_exists('almd_menu_walker')) {
	function almd_menu_walker($params, $section) {
		global $almd_wrap;
		$output = '';	
		$item = '';
		
		foreach($params as $val) {
			
			$dom = array(
						'node' => 'a',
						'prop' => sprintf(' href="%s" ', $val[1]),
						'child' => $val[0]
					);
			
			$item .= $almd_wrap->wrap($dom);
			
			$dom_li = array('node' => 'li', 'prop' => get_elem_properties(array('class' => 'menu-item')), 'child' => $item);
			$output .= $almd_wrap->wrap($dom_li);
			
			// resets some values
			$item = '';
			
			}
			
			// here you'd add some config settings for the parent container
			$output = sprintf("<ul>%s</ul>", $output);
		
			return $output;
	
	}
}

if(! function_exists('almd_build_meta')) {
	/**
	 * Builds the meta tags inside the head
	 * @param array $param
	 * @author Mugs and Coffee
	 * @written Kenneth "digiArtist_ph" P. Vallejos
	 * @since Friday, April 19, 2013
	 * @version 1.0.0 
	 * 
	 * 	format for the array structure
	 *	$param = array(
	 *				'meta' => array(
	 *							array('name' => 'description', 'content' => 'Prodrive Motowerks'),
	 *							array('name' => 'keywords', 'content' => 'HTML,CSS,XML,JavaScript'),
	 *							array('name' => 'author', 'content' => 'Mugs and Coffee'),
	 *							array('name' => 'Viewport', 'width' => 'devicewidth')
	 *						)
	 *			);
	 *	
	 */
	function almd_build_meta($param = array()) {
	
		global $almd_wrap;
		$output = '';
		
		if(array_key_exists('meta', $param)) {
			foreach($param['meta'] as $val) {
				$metaProps  = '';
				foreach($val as $key => $v) {
					$metaProps .= sprintf(' %s="%s" ', $key, $v);			
				}
				
				$struc = array(
							'node' => 'meta',
							'child' => '',
							'prop' => trim($metaProps)
						);
				
				$output .= $almd_wrap->wrap($struc);
				$struc = array();
			}
			
			Metahead::buildSiblingDOM($output);
		}
	}
}

if(! function_exists('almd_build_metascript')) {
	/**
	 * Builds the script tags inside the head
	 * @param array $param
	 * @author Mugs and Coffee
	 * @written Kenneth "digiArtist_ph" P. Vallejos
	 * @since Friday, April 19, 2013
	 * @version 1.0.0
	 *
	 * 	format for the array structure
	 *	$param = array(
	 *				'meta' => array(
	 *							array('type' => 'text/javascript', 'src' => 'http://localhost/alamid/js/jsni.js'),
	 *							array('type' => 'text/javascript', 'src' => '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js')
	 *						)
	 *			);
	 *
	 */
	function almd_build_metascript($param = array()) {
	
		global $almd_wrap;
		$output = '';
		
		if(array_key_exists('script', $param)) {
			foreach($param['script'] as $val) {
				$metaProps  = '';
				foreach($val as $key => $v) {
	
					$metaProps .= sprintf(' %s="%s" ', $key, $v);
				}
				
	
				$struc = array(
						'node' => 'script',
						'child' => ' ',
						'prop' => trim($metaProps)
				);
					
				$output .= $almd_wrap->wrap($struc);
	
				$struc = array();
			}
	
			Metascript::buildSiblingDOM($output);
		}
	}
}


if(! function_exists('almd_build_metastyle')) {
	function almd_build_metastyle($param = array()) {
	
		global $almd_wrap;
		$output = '';
	
		if(array_key_exists('style', $param)) {
			foreach($param['style'] as $val) {
				$metaProps  = '';
				foreach($val as $key => $v) {
	
					$metaProps .= sprintf(' %s="%s" ', $key, $v);
				}
					
	
				$struc = array(
						'node' => 'link',
						'child' => ' ',
						'prop' => trim($metaProps)
				);
	
				$output .= $almd_wrap->wrap($struc);
	
				$struc = array();
			}
	
			Metastyle::buildSiblingDOM($output);
		}
	}
}

?>