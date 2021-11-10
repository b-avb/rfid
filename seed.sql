create database rfid;

\c rfid;

create table student(id int8 PRIMARY KEY, name VARCHAR(80), course VARCHAR(4));

insert into student values(1056928419, 'MARTINEZ PINEDA VANESA ALEJANDRA', '11t2');

create table entry(id serial PRIMARY KEY, student_id int8, date DATE, hour TIME, FOREIGN KEY(student_id) REFERENCES student(id));


