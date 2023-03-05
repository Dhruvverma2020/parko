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