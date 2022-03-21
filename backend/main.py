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
    def __init__(self, petid, type, name, breed, description, price, pic):
        self.petid = petid
        self.name = name
        self.type = type
        self.breed = breed
        self.description = description
        self.price = price
        self.pic = pic

    def toJson(self):
        return json.dumps(self, default=lambda obj: obj.__dict__)

class CustModel:
    def __init__(self, id, name, product, price, contact, address):
        self.id = id
        self.name = name
        self.product = product
        self.price = price
        self.contact = contact
        self.address = address

        

    def toJson(self):
        return json.dumps(self, default=lambda obj: obj.__dict__)


@app.route("/getPets", methods=["GET"])
@cross_origin()
def get_pets():
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "select petid,type,name from animals"
    mycursor.execute(sql)
    db = mycursor.fetchall()
    list = []
    for x in db:
        if x[1] == "dogs":
            sql = "select breed, description, price, pic from dogs where petid=%s"

        elif x[1] == "cats":
            sql = "select breed, description, price, pic from cats where petid=%s"

        elif x[1] == "birds":
            sql = "select breed, description, price, pic from birds where petid=%s"

        elif x[1] == "fish":

            sql = "select breed, description, price, pic from fish where petid=%s"

        mycursor.execute(sql, (x[0],))
        data = mycursor.fetchone()
        list.append(PetModel(x[0], x[1], x[2], data[0], data[1], data[2], data[3]).toJson().strip())
    print("list=", data)
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

        sql = "INSERT INTO dogs (petid, breed, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "cats":

        sql = "INSERT INTO cats (petid, breed, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "birds":

        sql = "INSERT INTO birds (petid, breed, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    elif data["type"] == "fish":

        sql = "INSERT INTO fish (petid, breed, price, description, pic) VALUES (%s, %s, %s, %s, %s)"

    val = (last_id, data["breed"], data["price"],
           data["description"], data["pic"])
    mycursor.execute(sql, val)
    mydb.commit()

    return json.dumps(True)

@app.route('/customer', methods=['POST'])
@cross_origin()
def customer():

    mycursor = mydb.cursor()
    data = request.json  # data is empty
    print('all data', data)
    sql = "INSERT INTO customer (name, product,price, contact, address) VALUES (%s, %s, %s, %s, %s)"
    val = (data["name"], data["product"],data["price"], data["contact"],data["address"])
    mycursor.execute(sql, val)
    mydb.commit()

    return json.dumps(True)
    
@app.route("/custlist", methods=["GET"])
@cross_origin()
def get_cust():
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "select id,name,product,price,contact,address from customer"
    mycursor.execute(sql)
    db = mycursor.fetchall()
    list = []
    for x in db:

        list.append(CustModel (x[0], x[1], x[2], x[3], x[4], x[5]).toJson().strip())
    return jsonify(list)
 

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
    breed = data["breed"]
    price = data["price"]
    type = data["type"]
    pic = data["pic"]

    if type == "dogs":
        mycursor.execute(
            f"UPDATE `dogs` SET `breed` ='{breed}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "cats":
        mycursor.execute(
            f"UPDATE `cats` SET `breed` ='{breed}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "birds":
        mycursor.execute(
            f"UPDATE `birds` SET `breed` ='{breed}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    elif type == "fish":
        mycursor.execute(
            f"UPDATE `fish` SET `breed` ='{breed}',`description`='{description}',`price`='{price}',`pic`='{pic}' WHERE `petid`={petid}")

    mydb.commit()
    return json.dumps(True)


@app.route("/getPet/<petid>", methods=["GET"])
@cross_origin()
def get_pet(petid):
    mycursor = mydb.cursor()
    data = request.json  # data is empty
    sql = "select petid,type,name from animals where petid=%s"
    val = (petid,)
    mycursor.execute(sql, val)
    db = mycursor.fetchall()
    print("data= ", db)

    for x in db:
        if x[1] == "dogs":
            sql = "select breed, description, price, pic from dogs where petid=%s"

        elif x[1] == "cats":
            sql = "select breed, description, price, pic from cats where petid=%s"

        elif x[1] == "birds":
            sql = "select breed, description, price, pic from birds where petid=%s"

        elif x[1] == "fish":
            sql = "select breed, description, price, pic from fish where petid=%s"

    mycursor.execute(sql, (x[0],))
    petdata = mycursor.fetchone()
    data = PetModel(x[0], x[1], x[2], petdata[0], petdata[1],
                    petdata[2], petdata[3]).toJson().strip()
    # print(data)
    return data


if __name__ == '__main__':
    app.run()
