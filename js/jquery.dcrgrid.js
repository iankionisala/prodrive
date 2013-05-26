 // JavaScript Document
/**
 * @author Mugs and Coffee
 * @written Kenneth "digiArtist_ph" P. Vallejos
 * @since Wednesday, May 15, 2013
 * 
 */
(function($){
	var dcrbase_url = $('meta[name*="url"]').attr('content');
	$.fn.dcrgrid = function(options) {
		var curObj = $(this);
		var settings = $.extend({}, options);
		
		// builds datagrid
		curObj.append(tableEntry);
		curObj.append(tablegrid);
		// curObj.append(bntSaveDcrDetails);
		
		// event listeners
		$('#addbtn').bind('click', evtAdd);		
		$('#btnDcrSave').bind('click', evtbtnSaveDcrDetails);
//		$('#datagrid').bind('click', testLoad);
	}
	
	var testLoad = function() {
		// reads dcrdetails table
		var output = '';
		$.post(dcrbase_url + 'ajax/ajxdcr/retrieveDcrDetails', {post_dcr_id:6})
		.success(function(data) {
//			alert(data);
			data = $.parseJSON(data);
			for(var dt in data) {
				output += '<tr' + buildDataProp(data[dt]) + '>';
				console.log(data[dt].dcrdtl_id + " || " + data[dt].particulars + " || " + data[dt].refno + " || " + data[dt].paytype);
//				$('tr').last().data('record', {'particular': mParticular, 'tender': mTenderCode, 'refno': mReferenceNoCode, 'amnt': mAmt, 'dcrdetailid': mDcrId});
				output += '<td>' + data[dt].particulars + '</td>' + '<td>' + data[dt].paytype + '</td>' + '<td>' + data[dt].refno + '</td>' + '<td>' + data[dt].amnt + '</td>' + '<td><a class="EditBtn" href="#">Edit</a>&nbsp;<a class="DelBtn" href="#">Delete</a></td>';
				output += '</tr>';
			}
			$('#datagrid tbody').append(output);
			
			// event listeners
			$('.DelBtn').bind('click', evtDelBtn);
			$('.EditBtn').bind('click', evtEditData);
		});
	} 
	
	
	var bntSaveDcrDetails = function() {
		var output = '';
		
		//<p><input id="btnDcrSave" type="button" value="Save" /></p>
		output += '<p>';
		output += '<input id="btnDcrSave" type="button" value="Save" />';
		output += '</p>';
		
		return output;
	}

	var tablegrid = function() {
		var output = '';
		
		
		output += '<table id="datagrid">';
		output += '<thead>';
		output += '<tr>';
		output += '<th>Particular</th>';
		output += '<th>Tender</th>';
		output += '<th>Reference No.</th>';
		output += '<th>Amount</th>';
		output += '<th>Action</th>';
		output += '</tr>';
		output += '</thead>';
		output += '<tbody>';
		output += '</tbody>';
		output += '</table>';
		
		testLoad();
		
		return output;		
	}
	
	var tableEntry = function() {
		var output = '';
		
		output += '<table id="entryfield">';
		output += '<thead>';
		output += '<tr>';
		output += '<th>Particular</th>';
		output += '<th>Tender</th>';
		output += '<th>Reference No.</th>';
		output += '<th>Amount</th>';
		output += '<th>Action</th>';
		output += '</tr>';
		output += '</thead>';
		output += '<tbody>';
		output += '<tr>';
		output += '<td><input type="text" name="particular" /></td>';
		output += '<td><select name="tender"><option value=""> Select a tender </option><option value="1">Cash</option><option value="2">Check</option></select></td>';
		output += '<td><select name="refernce"><option value=""> Select a reference no. </option><option value="ref1">Reference 1</option><option value="ref2">Reference 2</option></select></td>';
		output += '<td><input type="text" name="amount" /></td>';
		output += '<td><input type="button" id="addbtn" value="Add" /></td>';
		output += '</tr>';
		output += '</tbody>';
		output += '</table>';
		
		return output;
	}
	
	// event handlers
	var evtbtnSaveDcrDetails = function() {
		alert("You've pressed the Save button");
		return false;
	}
	
	var evtAdd = function() {
		var mButton = $('#addbtn');
		var output = '';
		var mParticular;
		var mTender;
		var mTenderCode;
		var mReferenceNo;
		var mReferenceNoCode;
		var mAmt;

		
		// if button is in edit mode
		if(mButton.attr('value')== 'Add') {
			mParticular = $('input[name="particular"]').val();
			mTender = $('select[name="tender"] option:selected').text();
			mTenderCode = $('select[name="tender"] option:selected').val();
			mReferenceNo = $('select[name="refernce"] option:selected').text();
			mReferenceNoCode = $('select[name="refernce"] option:selected').val();
			mAmt = $('input[name="amount"]').val();
			mDcrId = $('#dcr_id').val();
			
			if(mParticular == "" || mAmt == "" || mTenderCode == "")
				return;
			
			output += '<tr>';
			output += '<td>' + mParticular + '</td>';
			output += '<td>' + mTender + '</td>';
			output += '<td>' + ((mReferenceNoCode!="") ? mReferenceNo : "" ) + '</td>';
			output += '<td>' + mAmt + '</td>';
			output += '<td><a class="EditBtn" href="#">Edit</a>&nbsp;<a class="DelBtn" href="#">Delete</a></td>';
			output += '</tr>';
		
			// AJAX part
			$.post(dcrbase_url + 'ajax/ajxdcr/addDcrDetail', {post_dcr: mDcrId , post_particulars: mParticular, post_refno: mReferenceNoCode, post_amnt: mAmt, post_tender: mTenderCode})
			.success(function(data){
				// parse returned data from ajax call
				var returnedData = data.split("|");
				
				if(returnedData[0] == "1") {
				// appends new dom
					
				$('#datagrid tbody').append(output);
				
				// appends data
				$('tr').last().data('record', {'particular': mParticular, 'tender': mTenderCode, 'refno': mReferenceNoCode, 'amnt': mAmt, 'dcrdetailid': returnedData[1]});
				// event handlers
				$('.DelBtn').unbind('click', evtDelBtn);
				$('.EditBtn').unbind('click', evtEditData);
				$('.DelBtn').bind('click', evtDelBtn);
				$('.EditBtn').bind('click', evtEditData);
				} else {
					alert("Insert failed.");
				}
			});
			
			
			// clears all entry fields
			clearEntryFields();
			
		} else  {
			mParticular = $('input[name="particular"]').val();
			mTender = $('select[name="tender"] option:selected').text();
			mTenderCode = $('select[name="tender"] option:selected').val();
			mReferenceNo = $('select[name="refernce"] option:selected').text();
			mReferenceNoCode = $('select[name="refernce"] option:selected').val();
			mAmt = $('input[name="amount"]').val();
			mDcrId = $('input[name="particular"]').data('record').dcrdetailid;
			
			
			if(mParticular == "" || mAmt == "" || mTenderCode == "")
				return;
			
			output += '<td>' + mParticular + '</td>';
			output += '<td>' + mTender + '</td>';
			output += '<td>' + ((mReferenceNoCode!="") ? mReferenceNo : "" ) + '</td>';
			output += '<td>' + mAmt + '</td>';
			output += '<td><a class="EditBtn" href="#">Edit</a>&nbsp;<a class="DelBtn" href="#">Delete</a></td>';
			
			// AJAX part here
			$.post(dcrbase_url + 'ajax/ajxdcr/editDcrDetail', {post_particulars:mParticular, post_refno:mReferenceNoCode, post_amnt:mAmt, post_tender:mTenderCode, post_dcrdtl_id:mDcrId})
			.success(function(data) {
				// appends new dom
//				alert(data);
				if(data == "1") {
					$('#datagrid tbody tr[edited="true"]').empty().append(output);
					
					// appends data
					$('tr').last().data('record', {'particular': mParticular, 'tender': mTenderCode, 'refno': mReferenceNoCode, 'amnt': mAmt, 'dcrdetailid': mDcrId});
					
					// event handlers
					$('.DelBtn').unbind('click', evtDelBtn);
					$('.EditBtn').unbind('click', evtEditData);
					$('.DelBtn').bind('click', evtDelBtn);
					$('.EditBtn').bind('click', evtEditData);					

				} else {
					alert("Edited data failed.");
				}
			});			
		}

		// clears the entry fields
		$('input[name="particular"]').val("");
		$('select[name="tender"]').val("");
		$('select[name="refernce"]').val("");
		$('input[name="amount"]').val("");
		
		// resets the button's caption into "Add"
		mButton.attr('value', 'Add');
		// removes the "edited=true" attribute
		$('#datagrid tbody tr[edited="true"]').removeAttr('edited');
		
		// clears current selection on the dcr details
		clearEditedSelection();

		focusToEntryField();
		
		// sets focus
		$('#entryfield input[name="particular"]').focus();
		
	}
	
	var evtDelBtn = function() {
		var curObj = $(this);
		var mButton = $('#addbtn');
		
		// removes the row
		curObj.parent().parent().remove();
		// resets the button's caption into "Add"
		mButton.attr('value', 'Add');
		// clears current selection on the dcr details
		clearEditedSelection();
		// clears all entry fields
		clearEntryFields();
		// sets focus
		focusToEntryField();
		
		return false;
	}
	
	var evtEditData = function() {
		
		var parentRow = $(this).parent().parent();
		var entryRow = $('#entryfield tbody tr:eq(0)');
		var recData = $(this).parent().parent().data('record');

		toggleEditedRecord(parentRow);
		
		// gets the current selected row and put them into the entry field for edit
		$('input[name="particular"]', entryRow).data('record',{'dcrdetailid': recData.dcrdetailid});
		$('input[name="particular"]', entryRow).val(recData.particular);
		$('td select[name="tender"]', entryRow).val(recData.tender);
		$('select[name="refernce"]', entryRow).val(recData.refno);
		$('input[name="amount"]', entryRow).val(recData.amnt);
		
		// tags the current row being edited
		//parentRow.attr('Edited', true);
		EditRecord(parentRow);
		
		// setfocus to the entry field
		// $('td input[name="particular"]', entryRow).focus();
		focusToEntryField();
		
		return false;
	}
	
	function focusToEntryField() {
		$('#entryfield input[name="particular"]').focus();
	}
	
	function buildDataProp(dt) {
		var output = '';
//		$('tr').last().data('record', {'particular': mParticular, 'tender': mTenderCode, 'refno': mReferenceNoCode, 'amnt': mAmt, 'dcrdetailid': mDcrId});
		output += ' attrParticulars="' + dt.particulars + '" attrTenderCode="' +  dt.tendercode + '" attrRefNo="' + dt.refno + '" attrAmnt="' + dt.amnt + '" attrDcrdtl_id="' + dt.dcrdtl_id + '" '; 
		
		return output;
	}
	
	function EditRecord(obj, flag) {
		var mButton = $('#addbtn');
		flag = flag || true;
		
		if(flag) {
			obj.attr('edited', flag);
			mButton.attr('value', 'Edit');
		} else {
			mButton.attr('value', 'Add');			
		}
		
	}
	
	function toggleEditedRecord(obj) {
		$($('tr', obj.parent().parent()).css({'border':'none'}));
		obj.css({'border': '1px solid #ccc'});
	}
	
	function clearEditedSelection() {
		$($('#datagrid tbody tr').css({'border':'none'}));
	}
	
	function clearEntryFields() {
		// clears the entry fields
		$('input[name="particular"]').val("");
		$('select[name="tender"]').val("");
		$('select[name="refernce"]').val("");
		$('input[name="amount"]').val("");	
	}

})(jQuery);
