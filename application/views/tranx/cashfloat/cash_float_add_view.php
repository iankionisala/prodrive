<div id="wrapper">
	
    <h3>Add New Cash Float</h3>
	<?php echo form_open(base_url('tranx/cashfloat/validateaddcashfloat')); ?>
    <input type="hidden" name="cashierid" value="<?php echo $cashierid; ?>" />
    <input type="hidden" name="cashiername" value="<?php echo $cashiername; ?>" />
    <input type="hidden" name="curdate" value="<?php echo curdate(); ?>" />
    <p><label>Particulars</label><input type="text" name="particulars" /><?php echo form_error('particulars', '<span class="error">', '</span>'); ?></p>
    <p><label>Reference No.</label><input type="text" name="refno" /></p>
    <p><label>Amount</label><input type="text" name="amnt" /><?php echo form_error('amnt', '<span class="error"', '</span>'); ?></p>
    <p><input type="submit" value="Save" /></p>
    <?php echo form_close(); ?>
</div>