Drop table todo_user;
Drop table task;

CREATE TABLE todo_user (
	username varchar(20) PRIMARY KEY,
	email varchar(20) NOT NULL,
	pass text
);

CREATE TABLE task (
	username varchar(20),
	tasknum integer,
	taskdesc text,
	priority varchar(20) check (priority in ('Important', 'Moderate', 'Low')),
	status varchar(20) check (status in ('Completed', 'Open')),
	Primary Key (username, tasknum)
);
