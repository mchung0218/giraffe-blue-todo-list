DROP FUNCTION IF EXISTS createTask (varchar(20));

CREATE FUNCTION createTask(_username varchar(20)) RETURNS integer AS $$

	DECLARE
		maxExisting integer;
		newTaskNum integer;
	BEGIN
		select coalesce(max(tasknum),0) into maxExisting from task where task.username = _username;
		newTaskNum := maxExisting + 1;
		insert into task(username, tasknum) values (_username, newTaskNum);
		RETURN newTaskNum;
	END; $$	LANGUAGE plpgsql;
	
	
