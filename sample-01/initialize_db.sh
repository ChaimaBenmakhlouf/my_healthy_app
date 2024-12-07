#!/bin/bash

# Define database connection parameters
DB_HOST="127.0.0.1"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="health_app"
SQL_FILE="setup.sql"

# Preprocess the SQL file to remove comments
CLEAN_SQL_FILE="cleaned_setup.sql"
grep -vE "^\s*--|^\s*/\*|^\s*\*/" $SQL_FILE > $CLEAN_SQL_FILE

# Check if the database exists
DB_EXISTS=$(mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "SHOW DATABASES LIKE '$DB_NAME';" | grep "$DB_NAME")

if [ -z "$DB_EXISTS" ]; then
    echo "Database $DB_NAME does not exist. Creating database and initializing tables..."
    # Run the cleaned SQL file to create the database and all tables
    mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD < $CLEAN_SQL_FILE
    if [ $? -eq 0 ]; then
        echo "Database initialized successfully."
    else
        echo "Error: Failed to initialize the database."
        exit 1
    fi
else
    echo "Database $DB_NAME already exists. Checking for new or removed tables..."

    # Get the list of tables defined in the cleaned SQL file
    DEFINED_TABLES=$(grep -i "CREATE TABLE" $CLEAN_SQL_FILE | awk '{print $3}' | tr -d '(`')

    # Get the list of tables currently in the database
    DATABASE_TABLES=$(mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -D $DB_NAME -e "SHOW TABLES;" | tail -n +2)

    # Convert the lists to arrays
    DEFINED_TABLES_ARRAY=($DEFINED_TABLES)
    DATABASE_TABLES_ARRAY=($DATABASE_TABLES)

    # Check for missing tables (tables in the SQL file but not in the database)
    for TABLE in "${DEFINED_TABLES_ARRAY[@]}"; do
        if [[ ! " ${DATABASE_TABLES_ARRAY[@]} " =~ " ${TABLE} " ]]; then
            echo "Table $TABLE does not exist in the database. Creating..."
            # Extract and execute the specific CREATE TABLE command for the missing table
            CREATE_TABLE_SQL=$(awk "/CREATE TABLE $TABLE/,/);/" $CLEAN_SQL_FILE)
            mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -D $DB_NAME -e "$CREATE_TABLE_SQL"
            if [ $? -eq 0 ]; then
                echo "Table $TABLE created successfully."
            else
                echo "Error: Failed to create table $TABLE."
            fi
        fi
    done

    # Check for obsolete tables (tables in the database but not in the SQL file)
    for TABLE in "${DATABASE_TABLES_ARRAY[@]}"; do
        if [[ ! " ${DEFINED_TABLES_ARRAY[@]} " =~ " ${TABLE} " ]]; then
            echo "Table $TABLE is no longer defined in the SQL file. Dropping..."
            mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -D $DB_NAME -e "DROP TABLE $TABLE;"
            if [ $? -eq 0 ]; then
                echo "Table $TABLE dropped successfully."
            else
                echo "Error: Failed to drop table $TABLE."
            fi
        fi
    done
fi

# Clean up the temporary file
rm -f $CLEAN_SQL_FILE
