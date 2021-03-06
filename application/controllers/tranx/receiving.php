<?php if( !defined('BASEPATH')) exit('Direct script access not allowed');

class Receiving extends CI_Controller{
	
	public function index() {
		$this->section();
	}
	
	public function section() {
		
		$section = ($this->uri->segment(4)) ? $this->uri->segment(4) : '';
		$id = ($this->uri->segment(5)) ? $this->uri->segment(5) : '';
		
		switch($section){
			case 'receiving':
				$this->_receiving();
				break;
			case 'addreceiving':
				$this->_addreceiving();
				break;
			default:
				$this->_receiving();
		}
	}
	
	private function _receiving() {
		
		$this->load->model('mdl_receiving');
		$dataset = $this->mdl_receiving->retrieve();
		$data['records'] = $dataset['records'];
		$data['count'] = $dataset['count'];
		$data['main_content'] = 'tranx/vehicle_receiving/vehicle_receiving_view';
		$this->load->view('includes/template', $data);
		
	}
	
	private function _addreceiving() {
		
		$data['main_content'] = 'tranx/vehicle_receiving/vehicle_receiving_add_view';
		$this->load->view('includes/template', $data);
		
	}
	
	public function validateaddreceivedvehicle() {
		
		$this->load->library('form_validation');
		$validation = $this->form_validation;
		
		$validation->set_rules('recdate', 'Date Received', 'required');
		$validation->set_rules('customercode', 'Customer Code');
		$validation->set_rules('customer', 'Customer', 'required');
		$validation->set_rules('ownedvehiclecode', 'Vehicle Code');
		$validation->set_rules('ownedvehicle', 'Vehicle', 'required');
		
		if($validation->run() === FALSE) {
			$this->_addreceiving();
		} else {
			$this->load->model('mdl_receiving');
			
			if($this->mdl_receiving->add()) {
				redirect(base_url('tranx/receiving'));
			} else {
				echo 'Inserting new record failed.';
			}
		}
		
	}
	
}