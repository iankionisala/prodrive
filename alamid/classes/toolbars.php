<?php

/**
 * Generates floatable toolbars on the right panel of the graphical user interface
 * @author Mugs and Coffee
 * @written Kenneth "digiArtist_ph" P. Vallejos
 * @since Tuesday, April 9, 2013
 * @version 1.0
 *
 */
class Toolbars extends Pagesection {
	private static $domElem;

	public static function loadSection(Pagetemplate $page) {
		self::buildDOM();		
		// builds the masthead
		$page->set_toolbars(self::$domElem);
		
	}
	
	protected static  function buildDOM() {
		global $almd_wrap;		
		$output ='';
		
		// runs hook here
		$objChild = '<ul><li><a href="#">Home</a></li><li><a href="#">Services</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>';
		$dom = array(
					'node' => 'div',
					'child' => $objChild,
					'prop' => get_elem_properties(array(
								'id' => 'toolbar-widgets'
							))
				);
		
		$output = $almd_wrap->wrap($dom);
		
		self::$domElem = trim($output);

	}
	
}

?>