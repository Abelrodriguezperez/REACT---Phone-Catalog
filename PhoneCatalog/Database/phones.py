import sqlite3
from sqlite3 import Error

from .connection import create_connection

def insert_phone(phone):
    connection = create_connection()

    sql = """ INSERT INTO phones (id, phoneName, manufacturer, description, color, price, imageFileName, screen, processor, ram)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    try:
        cur = connection.cursor()
        cur.execute(sql, phone)
        connection.commit()
        return cur.lastrowid
    except Error as e:
        print(f"Error insertando telefono:  + {str(e)}")
        return False

    finally:
        if connection:
            cur.close()
            connection.close()

def select_phone_by_id(_id):
    connection = create_connection()

    sql = f"SELECT * FROM phones WHERE id = {_id}"

    try:
        connection.row_factory = sqlite3.Row
        cur = connection.cursor()
        cur.execute(sql)
        phone = dict(cur.fetchone())
        return phone
    except Error as e:
        print(f"Error seleccionando telefono por id: {str(e)}")
        return false
    finally:
        if connection:
            cur.close()
            connection.close()

def get_all_phones():
    connection = create_connection()

    sql = "SELECT * FROM phones"
    try:
        connection.row_factory = sqlite3.Row
        cur = connection.cursor()
        cur.execute(sql)
        phone_elements = cur.fetchall()
        phones = [dict(row) for row in phone_elements]
        return phones
    except Error as e:
        print(f"Error obteniendo lista de telefonos: {str(e)}")
        return False
    finally:
        if connection:
            cur.close()
            connection.close()

def edit_phone(_id, phone):
    connection = create_connection()

    sql = f""" UPDATE phones SET phoneName = ?, manufacturer = ?, description = ?, color = ?, price = ?, imageFileName = ?, screen = ?, processor = ?, ram = ?
        WHERE id = {_id}
    """

    try:
        cur = connection.cursor()
        cur.execute(sql, phone)
        connection.commit()
        return True
    except Error as e:
        print(f"Error editando telefono: {str(e)}")
        return False

    finally:
        if connection:
            cur.close()
            connection.close()


def delete_phone(_id):
    connection = create_connection()

    sql = f"DELETE FROM phones WHERE id = {_id}"

    try:
        cur = connection.cursor()
        cur.execute(sql)
        connection.commit()
        return True
    except Error as e:
        print(f"Error eliminando telefono: {str(e)}")
    finally:
        if connection:
            cur.close()
            connection.close()