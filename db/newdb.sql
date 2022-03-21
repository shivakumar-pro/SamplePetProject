create table animals(
petid int NOT NULL AUTO_INCREMENT,
type varchar(255) NOT NULL,
primary key (petid));

create table dogs(
petid int NOT NULL,
bread varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_birds FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table cats(
petid int NOT NULL,
bread varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_birds FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table birds(
petid int NOT NULL,
bread varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_birds FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);

create table fish(
petid int NOT NULL,
bread varchar(255) NOT NULL,
price int NOT NULL,
description varchar(255) NOT NULL,
pic mediumtext NOT NULL,
CONSTRAINT FK_birds FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE);






----------------------------------------------------------------------------------------------------------------------------------------


ALTER TABLE animals
MODIFY petid INT NOT NULL AUTO_INCREMENT; 


ALTER TABLE animals
ADD name varchar(255);

ALTER TABLE dogs
change bread breed varchar(255);


ALTER TABLE birds
  ADD CONSTRAINT birds_ibfk_1 FOREIGN KEY (petid) REFERENCES animals (petid) ON DELETE CASCADE;

insert into birds values(101,21,'dove',210);






ALTER TABLE animals ADD CONSTRAINT ok FOREIGN KEY (petid) REFERENCES animals (petid)ON
DELETE CASCADE;

create table customer(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    product varchar(255),
    price int NOT NULL, 
    contact int(10),
    address varchar(255),
    primary key (id));






