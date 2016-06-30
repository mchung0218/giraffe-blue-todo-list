DROP FUNCTION IF EXISTS createTask (varchar(20));
DROP FUNCTION IF EXISTS getTask(varchar(20), integer);
DROP FUNCTION IF EXISTS getUserTasks(varchar(20));
DROP FUNCTION IF EXISTS updateTask(varchar(20), integer, text, varchar(20), varchar(20));
DROP FUNCTION IF EXISTS deleteTask(varchar(20), integer);

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


CREATE FUNCTION getTask(_username varchar(20), _tasknum integer) RETURNS SETOF task AS $$
	SELECT * FROM task WHERE task.username = _username AND task.tasknum = _tasknum;
	$$	LANGUAGE sql;



CREATE FUNCTION getUserTasks(_username varchar(20)) RETURNS SETOF task AS $$
	SELECT * FROM task WHERE task.username = _username;
	$$	LANGUAGE sql;


CREATE FUNCTION updateTask(_username varchar(20), _tasknum integer, _taskdesc text, _priority varchar(20), _status varchar(20)) RETURNS void AS $$
	UPDATE task SET
	taskdesc = _taskdesc,
	priority = _priority,
	status = _status
	WHERE username = _username AND tasknum = _tasknum;
	$$	LANGUAGE sql;


CREATE FUNCTION deleteTask(_username varchar(20), _tasknum integer) RETURNS void AS $$
	DELETE FROM task WHERE task.username = _username AND task.tasknum = _tasknum;
	$$	LANGUAGE sql;

	
	
