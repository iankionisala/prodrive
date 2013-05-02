<div id="container">
<h3>Edit user</h3>
	<div id="view_form">
	<?php if(!empty($users)):?>
	
	<?php echo form_open( base_url() . 'master/users/validateeditusers' );?>
	<?php if (!empty($error)):?>
		<p><?php echo $error;?></p>
		<?php endif;?>
		
		<?php foreach ($users as $user):?>
		<input type="hidden" name="user_id"  value="<?php echo $user->u_id;?>"/>
		<p><label>Username: </label><input type="text" name="username" value="<?php echo $user->username; ?>" /><span class="error"><?php echo form_error('username'); ?></span></p>
		<p><label>User type: </label><select name="utype">
		<?php endforeach;?>
			<?php if(!empty($utypes)):?>
				<option value="">Select User Type</option>
				<?php foreach ($utypes as $utype):?>
				<?php if($utype->id  == $user->id ):?>
				<option value="<?php echo $utype->id;?>" selected="selected"><?php echo $utype->type;?></option>
				<?php else:?>
				<option value="<?php echo $utype->id;?>"><?php echo $utype->type;?></option>
				<?php endif;?>
				<?php endforeach;?>
				
				
				
			<?php else:?>
			<option value="" selected="selected">Select User Type</option>
			<?php endif;?>
		<?php foreach ($users as $user):?>
		</select><span class="error"><?php echo form_error('utype'); ?></span></p>
		<p><label>Password: </label><input type="password" name="pword" /><span class="error"><?php echo form_error('pword'); ?></span></p>
		<p><label>First name: </label><input type="text" name="fname" value="<?php echo $user->fname; ?>"/><span class="error"><?php echo form_error('fname'); ?></span></p>
		<p><label>Middle name: </label><input type="text" name="mname" value="<?php echo $user->mname; ?>"/><span class="error"><?php echo form_error('mname'); ?></span></p>
		<p><label>Last name: </label><input type="text" name="lname" value="<?php echo $user->lname; ?>"/><span class="error"><?php echo form_error('lname'); ?></span></p>
		<p><label>Address: </label><input type="text" name="addr" value="<?php echo $user->addr; ?>"/><span class="error"><?php echo form_error('addr'); ?></span></p>
		<p><label>Status: </label> Active <input type="radio" name="status" value="1" <?php if($user->status == 1){echo 'checked="checked"';}?> /> In active<input type="radio" name="status" value="0" <?php if($user->status == 0){echo 'checked="checked"';}?> /><span class="error"><?php echo form_error('status'); ?></span></p>
		<p><input type="submit" value="Edit users" /></p>
		<?php endforeach;?>
	<?php echo form_close();?>
	<?php else :?>
	<p> Opps!!! Something goes wrong</p>
	<?php endif;?>
	</div>
</div>