$(document).ready(function(){
	
	var base_url = $('meta[name*="url"]').attr('content');
	
	
	$('.jo_buildform').populatetable();
	$('#dcrdatagrid').dcrgrid();
	// Data Validation
	
	$('.amnt, .datavaldecimal').decimal();
	var dir = $('.dir');
	dir.change(loaddataDir);
	var dataFile = $('.datafile');
	function loaddataDir(){
		
		if(dir.val() == ""){
			
			dataFile.html('<option value="none">Select source file</option>');
		}else{
			
			var inputr = {'directory' : dir.val()}
			
			dataFile.html('<option value="none">Loading files</option>');
			
			$.post(base_url + "utility/datarecovery/dirdata", inputr)
			.success(function(data) {
				
				var options = jQuery.parseJSON(data);
				if(options == ''){
					dataFile.html('<option value="none">Select source file</option>');
				}else{
					dataFile.html('');
					dataFile.html('<option>Files Loaded</option>');
					$.each(options, function(key, val){
						dataFile.append('<option value="' + val+ '">' + val +'</option>');
					});
				}
			});	
			
		}
	}
	$('.restore_db').click(function(){
		
		var tr = $(this).closest("tr");
		var input = {
					'ajax' : 1,
					'file_name' : tr.find("td:nth-child(2)").text()
					}
		
		$.post(base_url + "utility/datarecovery/validaterestoredefault", input)
		.success(function(data) {
			if(data ==1){
				tr.animate({ 
			        'color': '#000000',
			        backgroundColor: "#009ACD" 
			    }, 1000);
				tr.animate({ 
			        'color': '#000000',
			        backgroundColor: "#FFFFFF" 
			    }, 1000);
				$( ".dialog p").text("\"" + tr.find("td:nth-child(2)").text() +"\" has been restored!");
				$( ".dialog" ).dialog("open");
				
				
			}else{
				$( ".dialog p").text("SOMETHINE WENT WRONG");
				$( ".dialog" ).dialog();
			}
		});	
	return false;
	}
);
	
	//submit clicked
	$('.submit').click(function(){
		
		if( ValidateCust() & ValidateVhcle() & ValidateAddr() ){
			
			var input = {
				'jo_num' : $('input[name="jo_number"]').val(),
				'jo_date' : $('input[name="jo_date"]').val(),
				'cust' : $('.cust_id').val(),
				'vehicle' : $('.v_id').val(),
				'addr' : $('input[name="addr"]').val(),
				'plate' : $('input[name="plate"]').val(),
				'clr' : $('.clr_id').val(),
				'phone' : $('input[name="number"]').val()
				}
			
			$.post(base_url + 'ajax/ajaxjo/savejoborder', input)
			.success(function(data) {
				//alert(data);
				return true;
			});
		}else{
			
		}
	});
	
	function ValidateCust(){
		if($('.cust_id').val() == 0){
			$('.customer').closest('p').append('<span class="error">Select a customer first</span>');
			return false;
		}else{
			$('.customer').closest('p').append('<span class="error"></span>');
			return true;
		}
		
	}

	function ValidateVhcle(){
		if($('.v_id').val() == 0){
			$('.vehicle').closest('p').append('<span class="error">Select a Vehicle first</span>');
			return false;
		}else{
			$('.vehicle').closest('p').append('<span class="error"></span>');
			return true;
		}
		
	}
	
	function ValidateAddr(){
		if($('input[name="addr"]').val() == ''){
			$('input[name="addr"]').closest('p').append('<span class="error">Select a customer first</span>');
			return false;
		}else{
			$('input[name="addr"]').closest('p').append('<span class="error"></span>');
			return true;
		}
		
	}
	
	/* autocomplete bye digiArtist_ph */
	$(".vehicleowner").autocomplete({ autoFocus: true }, {source: 'http://localhost/prodrive/ajax/ajxautocomplete/vehicle'}, {select: function(evt, ui){
			$('input[name="makecode"]').val(ui.item.index);
		}});
	$(".vehiclecolor").autocomplete({ autoFocus: true }, {source: 'http://localhost/prodrive/ajax/ajxautocomplete/color'}, {select: function(evt, ui){
			$('input[name="colorcode"]').val(ui.item.index);
		}});
	$(".vehiclecustomer").autocomplete({ autoFocus: true }, {source: 'http://localhost/prodrive/ajax/ajxautocomplete/customer'}, {select: function(evt, ui){
			$('input[name="customercode"]').val(ui.item.index);
		}});
	$(".vehiclecustomer-ownedvehicle").autocomplete({ autoFocus: true }, {source: 'http://localhost/prodrive/ajax/ajxautocomplete/customer'}, {select: function(evt, ui){
			$('input[name="customercode"]').val(ui.item.index);	
			var customerid = ui.item.index;	
			// loads the filtered data
			$.post(base_url + 'ajax/ajxautocomplete/ownedvehicle', {post_customer: customerid})
			.success(function(data){
				// appends dom
				data = $.parseJSON(data);
				var output = '';
				var cntr = 0;
				
				for(x in data) {
					
					if(cntr == 0)
						output += '<option selected="selected" value="' + data[x].index  +  '">' + data[x].value + '</option>';
					else
						output += '<option value="' + data[x].index  +  '">' + data[x].value + '</option>';
					
					cntr++;
				}
				
				$('#dialog-receiving select').empty().append(output);
				// opens the dialog box
				$("#dialog-receiving").dialog("open");
			});
			
		}});
		
	$('.ownedvehicle')
	 $("#dialog-receiving").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		title: "Select a vehicle",
		buttons: {
				"Select this vehicle": function(){
					var selectedVehicleCode = $('select option:selected', this).val();
					var selectedVehicleDescription = $('select option:selected', this).text();
					// closes the dialog box
					// assigns seleted record into some form element
					$('input[name="ownedvehiclecode"]').val(selectedVehicleCode);
					$('input[name="ownedvehicle"]').val(selectedVehicleDescription);					
					$(this).dialog("close");
				}
			}
		});
	
	/* datepicker */
	$( ".datepicker" ).datepicker({dateFormat: 'yy-mm-dd'});
	
	// autocomplete vehicle
	$('.vehicle').autocomplete(
			{ autoFocus: true },
			{source: function(request, response) {
				
					$.ajax({
							url: base_url + "tranx/joborder/autocomplete_vehicle",
							type: 'POST',
							dataType: "json",
							data: {
								'term' : request.term
								},
							success: function(data) {
								
								 response( $.map( data, function( item ) {
				                        return {
				                            label: item.label,
				                            val: item.val
				                        }
				                    }));
							}
						});
						
					}
			},
			{select : function(evt, u) {
				$('.v_id').val(u.item.val);
			}}
	);
	
	//color autocomplete
	$('.color').autocomplete(
			{ autoFocus: true },
			{source: function(request, response) {
				
					$.ajax({
							url: base_url + "tranx/joborder/autocomplete_color",
							type: 'POST',
							dataType: "json",
							data: {
								'term' : request.term
								},
							success: function(data) {
								
								 response( $.map( data, function( item ) {
				                        return {
				                            label: item.label,
				                            val: item.val
				                        }
				                    }));
							}
						});
						
					}
			},
			{select : function(evt, u) {
				$('.clr_id').val(u.item.val);
			}}
	);
	
	
	//customer autocomplete
	$('.customer').autocomplete(
			{ autoFocus: true },
			{source: function(request, response) {
				
					$.ajax({
							url: base_url + "tranx/joborder/autocomplete_customer",
							type: 'POST',
							dataType: "json",
							data: {
								'term' : request.term
								},
							success: function(data) {
								
								 response( $.map( data, function( item ) {
				                        return {
				                            label: item.label,
				                            val: item.val
				                        }
				                    }));
							}
						});
						
					}
			},
			{select : function(evt, u) {
				$('.cust_id').val(u.item.val);
			}}
	);
	
	// labor autocomplete
	$('.labor').keydown( function( event ) {
		
		if( $('.jotype').val() == 'labor'){
			$('.labor').autocomplete(
					{ disabled: false },
					{minLength: 0},
					{ autoFocus: true },
					{source: function(request, response) {
						
						$.ajax({
								url: base_url + "tranx/joborder/autocomplete_labortype",
								type: 'POST',
								dataType: "json",
								data: {
									'term' : request.term
									},
								success: function(data) {
									
									 response( $.map( data, function( item ) {
					                        return {
					                            label: item.label,
					                            val: item.val
					                        }
					                    }));
								}
							});
							
						}
				},
				{select : function(evt, u) {
					$('.lbr').val(u.item.val);
				}}
			);
		}else if ( $('.jotype').val() == 'parts' ) {
			$('.labor').autocomplete({ disabled: true });
		}else if ( $('.jotype').val() == '' ) {
			$('.labor').autocomplete({ disabled: true });
		}

	})
	
	$('.delvehicle').click(function(){
		// alert( $(this).attr('vehiclecode') );
		//$("#dialog-confirm p").text();
		var currtr = $(this);
		$("#dialog-confirm p").text("Delete Vehicle with Plate No. \"" + $(this).closest('tr').find('td:eq(1)').text() + "\"");
		 $("#dialog-confirm").dialog({
							resizable : false,
							height : 140,
							modal : true,
							buttons : {
								"Delete" : function() {
									
									var inputownvehicle = {'id' : currtr.attr('vehiclecode') }
									$.post(base_url + 'master/ownedvehicle/ajaxdelvehicle', inputownvehicle)
									.success(function(data) {
										if(data == 1){
											currtr.closest('tr').remove('tr');
										}else{
											alert('data cannot be deleted');
										}
									});
									$(this).dialog("close");
								},
								Cancel : function() {
									$(this).dialog("close");
								}
							}
						});
		 return false;
	});
	
});	//end of parent Dom