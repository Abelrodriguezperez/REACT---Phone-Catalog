import sqlite3
from sqlite3 import Error

from .connection import create_connection


def read_file(path):
    with open(path, "r") as sql_file:
        return sql_file.read()


def create_tables():
    connection = create_connection()

    path = "C:/Users/usuario/PycharmProjects/pythonProject1/Database/sql/tables.sql"

    sql = read_file(path)
    try:
        cur = connection.cursor()
        cur.execute(sql)
        connection.commit()
        return True
    except Error as e:
        print("Error creating tables:  + {str(e)}")
        return False
    finally:
        if connection:
            cur.close()
            connection.close()
