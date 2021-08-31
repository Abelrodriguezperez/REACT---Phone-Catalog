import sqlite3
from sqlite3 import Error


def create_connection():
    connection = None

    try:
        connection = sqlite3.connect("C:/Users/usuario/PycharmProjects/pythonProject1/Database/phones.db")
    except Error as e:
        print("Error al conectar con la base de datos: " + str(e))
    return connection
