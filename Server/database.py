import config
import mysql.connector as mysql

class Database:
    @staticmethod
    def connection(database=False):
        args = {
            'host': config.HOST,
            'port': config.PORT,
            'user': config.USER,
            'password': config.PASSWORD,
            'use_pure': True
        }
        if database:
            args['database'] = database
        return mysql.connect(**args)

    def __init__(self) -> None:
        try:
            print(f"Connecting to MySQL server on {config.HOST}:{config.PORT}...")
            self.conn = self.connection()
        except mysql.errors.ProgrammingError:
            print("MySQL User or password incorrect in config.py")
            exit()
        except mysql.errors.InterfaceError:
            print("Can't connect to the MySQL Server.")
            print("Make sure that the server is running")
            exit()

        print(f"Connecting to {config.DATABASE} database...")
        cur = self.conn.cursor(buffered=True)
        cur.execute("SHOW DATABASES")
        newDB = False
        if (config.DATABASE,) not in cur.fetchall():
            print(f"No database named {config.DATABASE} found. Creating Database...")
            self.createDB()
            newDB = True
        cur.close()
        self.conn.close()
        self.conn = self.connection(config.DATABASE)

        if newDB:
            print("Creating required tables in the database...")
            self.createTables()

    def createDB(self):
        cur = self.conn.cursor()
        cur.execute(f"CREATE DATABASE {config.DATABASE}")
        cur.close()
    
    def createTables(self):
        conn = self.conn
        cur = conn.cursor()

        cur.execute("""CREATE TABLE user(
                        user_id INT AUTO_INCREMENT PRIMARY KEY,
                        first_name VARCHAR(50),
                        last_name VARCHAR(50),
                        email VARCHAR(100),
                        phone CHAR(10),
                        login_id INT
                    )""")

        cur.execute("""CREATE TABLE vehicle(
                        vehicle_number VARCHAR(20) PRIMARY KEY,
                        model VARCHAR(50),
                        vehicle_type_id INT,
                        user_id INT
                    )""")

        cur.execute("""CREATE TABLE vehicle_type(
                        vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY,
                        type VARCHAR(50)
                    )""")

        cur.execute("""CREATE TABLE login(
                        login_id INT AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(50),
                        password_hash CHAR(64)
                    )""")

        cur.execute("""CREATE TABLE reservation(
                        reservation_id INT AUTO_INCREMENT PRIMARY KEY,
                        user_id INT,
                        spot_id INT,
                        penalty INT,
                        reservation_time DATETIME,
                        start_time DATETIME,
                        end_time DATETIME
                    )""")

        cur.execute("""CREATE TABLE payment(
                        transaction_id CHAR(12) PRIMARY KEY,
                        amount INT,
                        payment_type VARCHAR(10),
                        status BOOLEAN
                    )""")

        cur.execute("""CREATE TABLE parking_spot(
                        spot_id INT AUTO_INCREMENT PRIMARY KEY,
                        spot_num INT,
                        price INT,
                        block VARCHAR(50),
                        vehicle_type_id INT,
                        space_id INT
                    )""")

        cur.execute("""CREATE TABLE parking_space(
                        space_id INT AUTO_INCREMENT PRIMARY KEY,
                        space_name VARCHAR(50),
                        space_type VARCHAR(100),
                        capacity INT,
                        latitude DOUBLE,
                        longitude DOUBLE,
                        owner_id INT,
                        telephone VARCHAR(12)
                    )""")

        cur.execute("""CREATE TABLE parking_space_owner(
                        owner_id INT AUTO_INCREMENT PRIMARY KEY,
                        first_name VARCHAR(50),
                        last_name VARCHAR(50),
                        phone CHAR(10),
                        login_id INT
                    )""")
                    
        conn.commit()
        cur.close()

    def new_user(self, first_name, last_name, email, phone, username, password_hash):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""INSERT INTO login(username, password_hash)
                    VALUES(%s, %s)""",
                    (username, password_hash))
        conn.commit()
        login_id = cur.lastrowid
        cur.execute("""INSERT INTO user(first_name, last_name, email, phone, login_id)
                    VALUES(%s, %s, %s, %s, %s)""",
                    (first_name, last_name, email, phone, login_id))

        conn.commit()
        cur.close()

    def new_vehicle_type(self, type_name):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""INSERT INTO vehicle_type(type)
                    VALUES(%s)""",
                    (type_name,))
        conn.commit()
        cur.close()

    def register_vehicle(self, number, model, type_name, user_id):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""SELECT vehicle_type_id FROM vehicle_type
                        WHERE type = %s""",
                        (type_name,))
        vehicle_type_id = cur.fetchone()[0]
        cur.execute("""INSERT INTO vehicle(vehicle_number, model, Vehicle_type_id, user_id)
                        VALUES(%s, %s, %s, %s)""",
                        (number, model, vehicle_type_id, user_id))
        conn.commit()
        cur.close()

    def new_space_owner(self, first_name, last_name, phone, username, password_hash):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""INSERT INTO login(username, password_hash)
                    VALUES(%s, %s)""",
                    (username, password_hash))
        conn.commit()
        login_id = cur.lastrowid
        cur.execute("""INSERT INTO parking_space_owner(first_name, last_name, phone, login_id)
                    VALUES(%s, %s, %s, %s)""",
                    (first_name, last_name, phone, login_id))

        conn.commit()
        cur.close()

    def new_space(self, space_name, space_type, capacity, lat, lon, owner_phone, tel):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""SELECT owner_id FROM parking_space_owner
                        WHERE phone = %s""",
                        (owner_phone,))
        owner_id = cur.fetchone()[0]

        cur.execute("""INSERT INTO parking_space(space_name, space_type, capacity,
                    latitute, longitude, owner_id, telephone)
                    VALUES(%s, %s, %s, %s, %s, %s, %s)""",
                    (space_name, space_type, capacity, lat, lon, owner_id, tel))
        conn.commit()
        space_id = cur.lastrowid
        cur.close()
        return space_id

    def get_space_owner_phone(self, space_id):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""SELECT owner_id FROM parking_space
                        WHERE space_id = %s""",
                        (space_id,))
        owner_id = cur.fetchone()[0]
        cur.execute("""SELECT phone FROM parking_space_owner
                        WHERE owner_id = %s""",
                        (owner_id,))
        phone = cur.fetchone()[0]
        cur.close()
        return phone

    def new_spot(self, space_id, spot_num, price, block, vehicle_type):
        conn = self.conn
        cur = conn.cursor()
        cur.execute("""SELECT vehicle_type_id FROM vehicle_type
                        WHERE type = %s""",
                        (vehicle_type,))
        vehicle_type_id = cur.fetchone()[0]

        cur.execute("""INSERT INTO parking_spot(spot_num, price,
                        block, vehicle_type_id, space_id)
                        VALUES(%s, %s, %s, %s, %s)""",
                        (spot_num, price, block, vehicle_type_id, space_id))

        conn.commit()
        cur.close()


    def get_pw_hash(self, phone):
        conn = self.conn()
        cur = conn.cursor()
        cur.execute("""SELECT login_id FROM user
                        WHERE phone = %s""",
                        (phone,))
        login_id = cur.fetchone()[0]


if __name__ == '__main__':
    # Getting confirmation from the user
    print("Running this script explicitly will delete the database with name as in config.py")
    x = input("Do you want to delete the database? [Y/n] ").upper()
    if x == 'Y' or x == 'YES':
        # Deleting the database with name as in config file
        db = Database()
        cur = db.conn.cursor()
        cur.execute(f"DROP DATABASE IF EXISTS {config.DATABASE}")
        cur.close()
        print("database deleted")
    print(db.conn)
    db.conn.close()