drop table if exists dogs;
drop table if exists birds;
drop table if exists cats;
drop table if exists fish;
drop table if exists customer;
drop table if exists animals;



create table animals(
petid int NOT NULL AUTO_INCREMENT,
type varchar(255) NOT NULL,
name varchar(255),
primary key (petid));

create table dogs(
petid int NOT NULL,
breed varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_dogs FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table cats(
petid int NOT NULL,
breed varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_cats FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table birds(
petid int NOT NULL,
breed varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_birds FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table fish(
petid int NOT NULL,
breed varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_fish FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table customer(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    product varchar(255),
    price int NOT NULL, 
    contact int(10),
    address varchar(255),
    primary key (id));



