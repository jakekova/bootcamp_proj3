from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


# Noah's data
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

# Jakes data
@app.route('/api/subscription')
def get_subscription():
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = """
            SELECT `Age`, `Device`, `Monthly Revenue`, `Join Date`, `Last Payment Date`, `SubscriptionType`
            FROM NetflixUser
        """

        cur.execute(query)
        data = cur.fetchall()

        subscription = []
        for row in data:
            age, device, revenue, join_date, last_payment_date, subscription_type= row
            subscription_data = {
                'Age': age,
                'Device': device,
                'MonthlyRevenue': revenue,
                'JoinDate': join_date,
                'LastPaymentDate': last_payment_date,
                'SubscriptionType': subscription_type
            }
            subscription.append(subscription_data)

        return jsonify(subscription)

# Naveen's data
@app.route('/api/age_distribution')
def get_age_distribution_by_country():
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = """
            SELECT `Age`, `Country`
            FROM NetflixUser
        """

        cur.execute(query)
        data = cur.fetchall()

        age_distribution = {}
        for row in data:
            age, country = row
            if country not in age_distribution:
                age_distribution[country] = []
            age_distribution[country].append(age)

        return jsonify(age_distribution)



#Bear's data
@app.route('/api/gender_country')
def get_gender_country_data():
    with sqlite3.connect('NetflixUser.db') as con:
        cur = con.cursor()

        query = """
            SELECT `Gender`, `Country`, COUNT(*) AS `UserCount`
            FROM NetflixUser
            GROUP BY `Gender`, `Country`
        """

        cur.execute(query)
        data = cur.fetchall()

        gender_country_data = []
        for row in data:
            gender, country, user_count = row
            entry = {
                'Gender': gender,
                'Country': country,
                'UserCount': user_count
            }
            gender_country_data.append(entry)

        return jsonify(gender_country_data)




if __name__ == '__main__':
    app.run(debug=True)

