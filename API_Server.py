from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/top10/<year>')
def top10(year):
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = ""
        if year == 'all-time':
            query = """
                SELECT `User ID`, `Subscription Type`, SUM(`Monthly Revenue`) AS revenue
                FROM NetflixUser
                GROUP BY `User ID`
                ORDER BY revenue DESC
                LIMIT 10
            """
        else:
            query = f"""
                SELECT `User ID`, `Subscription Type`, `Monthly Revenue` AS revenue
                FROM NetflixUser
                WHERE `Join Date` = '{year}'
                ORDER BY `Monthly Revenue` DESC
                LIMIT 10
            """

        cur.execute(query)
        json_data = []
        for row in cur:
            user_id, subscription_type, revenue = row
            json_data.append({
                'User ID': user_id,
                'Subscription Type': subscription_type,
                'Monthly Revenue': revenue
            })

        return jsonify(json_data)

@app.route('/api/user/<user_id>')
def user(user_id):
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = f"""
            SELECT *
            FROM NetflixUser
            WHERE `User ID` = '{user_id}'
        """

        cur.execute(query)
        columns = [desc[0] for desc in cur.description]
        user_data = {}
        row = cur.fetchone()
        if row:
            for i in range(len(columns)):
                user_data[columns[i]] = row[i]

        return jsonify(user_data)

if __name__ == '__main__':
    app.run(debug=True)
