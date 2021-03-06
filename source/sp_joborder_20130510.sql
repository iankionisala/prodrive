DELIMITER $$
DROP PROCEDURE IF EXISTS `sp_joborder` $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_joborder`(
IN 	m_jo_num   		VARCHAR(75),
IN 	m_v_id   		INT,
IN 	m_v_name 		VARCHAR(12),
IN	m_clr_id		INT,
IN	m_clr_name		VARCHAR(12),
IN 	m_customer 	INT,
IN	m_plate		VARCHAR(50),
IN	m_contactnum	VARCHAR(75),
IN	m_address		TEXT,
IN	m_trnxdate	DATE,
OUT 	o_jo_id		INT,
INOUT	flag		INT
)
BEGIN

DECLARE status INT DEFAULT 0;
DECLARE v_last_id INT DEFAULT 0;
DECLARE jo_last_id INT DEFAULT 0;
DECLARE c_last_id INT DEFAULT 0;
DECLARE EXIT handler for sqlexception set flag = 1;

IF NOT EXISTS(SELECT `v_id` FROM `vehicle` WHERE `v_id` = `m_v_id`) 
    THEN
	INSERT INTO `vehicle` set `make`=m_v_name, `status`=1;
	SET v_last_id = LAST_INSERT_ID();
	
	IF NOT EXISTS(SELECT `clr_id` FROM `color` WHERE `clr_id` = `m_clr_id`) 
    		THEN
			INSERT INTO `color` set `name`=m_clr_name;
			SET c_last_id = LAST_INSERT_ID();
			INSERT INTO `joborder` set `jo_number`=m_jo_num, `v_id`=v_last_id, `customer`=m_customer, `plate`=m_plate, `color`=c_last_id, `contactnumber`=m_contactnum, `address`=m_address, `trnxdate`=m_trnxdate;
			SET jo_last_id = LAST_INSERT_ID();
			set o_jo_id = jo_last_id;
	ELSE
		INSERT INTO `joborder` set `jo_number`=m_jo_num,`v_id`=v_last_id, `customer`=m_customer, `plate`=m_plate, `color`=m_clr_id, `contactnumber`=m_contactnum, `address`=m_address, `trnxdate`=m_trnxdate;
		SET jo_last_id = LAST_INSERT_ID();
		set o_jo_id = jo_last_id;
	END IF;

ELSE
	IF EXISTS(SELECT `clr_id` FROM `color` WHERE `clr_id` = `m_clr_id`) 
    		THEN
			INSERT INTO `joborder` set `jo_number`=m_jo_num, `v_id`=m_v_id, `customer`=m_customer, `plate`=m_plate, `color`=m_clr_id, `contactnumber`=m_contactnum, `address`=m_address, `trnxdate`=m_trnxdate;
			SET jo_last_id = LAST_INSERT_ID();
			set o_jo_id = jo_last_id;
	ELSE
		INSERT INTO `color` set `name`=m_clr_name;
		SET c_last_id = LAST_INSERT_ID();
		INSERT INTO `joborder` set `jo_number`=m_jo_num,`v_id`=m_v_id, `customer`=m_customer, `plate`=m_plate, `color`=c_last_id, `contactnumber`=m_contactnum, `address`=m_address, `trnxdate`=m_trnxdate;
		SET jo_last_id = LAST_INSERT_ID();
		set o_jo_id = jo_last_id;
	END IF;

    
END IF;



END $$
DELIMITER ;