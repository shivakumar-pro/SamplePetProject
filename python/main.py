from flask import Flask, jsonify, request, json
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="pets"
)


class PetModel:
    def __init__(self, petid, type, name, bread, description, price, pic):
        self.petid = petid
        self.name = name
        self.type = type
        self.bread = bread
        self.description = description
        self.price = price
        self.pic = pic

    def toJson(self):
        return json.dumps(self, default=lambda obj: obj.__dict__)


print(mydb)


@app.route('/list')
@cross_origin()
def hello_world():
    return 'List of employees'


@app.route("/getPets", methods=["GET"])
@cross_origin()
def get_pets():
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "select * from animals"
    mycursor.execute(sql)
    db = mycursor.fetchall()
    list = []
    for x in db:
        if x[1] == "dogs":
            sql = "select * from dogs where petid=%s"

        elif x[1] == "cats":
            sql = "select * from cats where petid=%s"

        elif x[1] == "birds":
            sql = "select * from birds where petid=%s"

        elif x[1] == "fish":
            sql = "select * from fish where petid=%s"

        mycursor.execute(sql, (x[0],))
        data = mycursor.fetchone()
        list.append(PetModel(x[0], x[1], x[2], data[1],
                    data[2], data[3], data[4]).toJson().strip())
    print("list=", list)
    return jsonify(list)


@app.route('/post', methods=['POST'])
@cross_origin()
def post():

    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "INSERT INTO animals (type, name) VALUES (%s, %s)"
    val = (data["type"], data["name"])
    mycursor.execute(sql, val)
    last_id = mycursor.lastrowid
    print("data pet id=", last_id)
    mydb.commit()

    if data["type"] == "dogs":

        sql = "INSERT INTO dogs (petid, bread, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "cats":

        sql = "INSERT INTO cats (petid, bread, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "birds":

        sql = "INSERT INTO birds (petid, bread, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "fish":

        sql = "INSERT INTO fish (petid, bread, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    val = (last_id, data["bread"], data["price"],
           data["description"], data["pic"])

    mycursor.execute(sql, val)

    mydb.commit()

    return json.dumps(True)


@app.route('/user', methods=['POST'])
def user():
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "INSERT INTO users (userid,password) VALUES (%s, %s)"
    val = (data["userid"], data["password"])
    mycursor.execute(sql, val)
    mydb.commit()
    return json.dumps(True)


@app.route("/deletePets/<petid>", methods=["DELETE"])
def guide_delete(petid):
    print("PRINTING ID ="+petid)
    mycursor = mydb.cursor()
    sql = "DELETE from animals where petid=%s"
    val = (petid,)
    mycursor.execute(sql, val)
    mydb.commit()
    return json.dumps(True)


# Endpoint for updating a record
@app.route("/editpet/<petid>", methods=['PUT'])
def edit_pet(petid):
    mycursor = mydb.cursor()
    data = request.json
    description = data["description"]
    petid = data["petid"]
    bread = data["name"]
    price = data["price"]
    type = data["type"]
    pic = data["pic"]

    if type == "dogs":

        # sql = "update animal set name=coalesce(nullif(%s,''),name),age=coalesce(nullif(%s,''),age),type=coalesce(nullif(%s,''),type),description=coalesce(nullif(%s,''),description),pic=coalesce(nullif(%s,''),pic) where id=%s"
       # mycursor.execute(sql, (name, age, type, description, pic, id))
        mycursor.execute(
            f"UPDATE `dogs` SET `bread` ='{bread}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "cats":
        mycursor.execute(
            f"UPDATE `cats` SET `bread` ='{bread}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "birds":
        mycursor.execute(
            f"UPDATE `birds` SET `bread` ='{bread}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "fish":
        mycursor.execute(
            f"UPDATE `fish` SET `bread` ='{bread}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    mydb.commit()
    return json.dumps(True)


@app.route("/getPet/<petid>", methods=["GET"])
@cross_origin()
def get_pet(petid):
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "select * from animals where petid=%s"
    val = (petid,)
    mycursor.execute(sql, val)
    db = mycursor.fetchall()
    print("data= ", db)

    for x in db:
        if x[1] == "dogs":
            sql = "select * from dogs where petid=%s"

        elif x[1] == "cats":
            sql = "select * from cats where petid=%s"

        elif x[1] == "birds":
            sql = "select * from birds where petid=%s"

        elif x[1] == "fish":
            sql = "select * from fish where petid=%s"

    mycursor.execute(sql, (x[0],))
    petdata = mycursor.fetchone()
    data = PetModel(x[0], x[1], x[2], petdata[1], petdata[2],
                    petdata[3], petdata[4]).toJson().strip()
    print(data)
    return data


# Endpoint for updating a record
""" @app.route("/editpet/<id>", methods=["PUT"])
@cross_origin()
def edit_pet(id):
	print("PRINTING ID ="+id)
	mycursor = mydb.cursor()
	data = request.json  # data is empty
	sql = "update animal set name=%s, age=%s, type=%s, description=%s, pic=%s where id=%s"
	val = (data["name"], data["age"], data["type"],
	       data["description"], data["pic"], id)
	mycursor.execute(sql, val)
	return json.dumps(True) """


if __name__ == '__main__':
    app.run()
