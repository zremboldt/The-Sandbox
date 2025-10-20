create table customers
(
  id INTEGER primary key,
  name TEXT,
  email TEXT
);

insert into customers(name, email) values
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com'),
  ('Mark Watney', 'mark.watney@example.com');