from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/users')
def get_users():
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = """
            SELECT `Age`, `Device`
            FROM NetflixUser
        """

        cur.execute(query)
        data = cur.fetchall()

        users = []
        for row in data:
            age, device = row
            user_data = {
                'Age': age,
                'Device': device
            }
            users.append(user_data)

        return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)

