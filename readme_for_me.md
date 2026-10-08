
check db from terminal (only after sudo docker compose up -d) because you connect to the db inside of a container:

sudo docker exec -it commerce-logistics-postgres \
  psql -U commerce -d logistics_platform

\q - quit
\dt - show all tables inside of a container
\d <name of db> - show the structure of a table <name of db>
SELECT * FROM products - you can write any SQL queries here.