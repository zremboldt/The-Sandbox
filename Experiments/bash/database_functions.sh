#!/bin/bash

# Define an absolute path to my database file
DATABASE="/Users/zac.remboldt/code/zr-code/The-Sandbox/Experiments/bash/database"

# Create a database file if it doesn't exist
if [ ! -f "$DATABASE" ]; then
  touch "$DATABASE"
fi

# Define a function that takes a key-value pair and adds them to the database (text file)
db_set () {
  echo "$1,$2" >> "$DATABASE"
}

# Define a function that takes a key and returns a value from the database
db_get () {
  grep "^$1," "$DATABASE" | sed -e "s/^$1,//" | tail -n 1
}
