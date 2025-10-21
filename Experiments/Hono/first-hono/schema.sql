create table customers
(
  id INTEGER primary key,
  name TEXT,
  email TEXT
);

insert into customers(name, email) values
  ('Mark Watney', 'mark.watney@example.com'),
  ('David Martens', 'david.martens@example.com'),
  ('Dustin Dalke', 'dustin.dalke@example.com');