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
	def __init__(self, id,name,description,age,pic,type):
		self.id = id
		self.name = name
		self.description = description
		self.age = age
		self.pic = pic
		self.type = type
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
	sql = "select * from animal"
	mycursor.execute(sql)
	db = mycursor.fetchall()
	list = []
	for x in db:
		print(x)
		list.append(PetModel(x[0],x[1],x[2],x[3],x[4],x[5]).toJson().strip())
	print(list)
	return jsonify(list)

@app.route('/addpet',methods = ['POST'])
@cross_origin()
def post():
	mycursor = mydb.cursor()
	data = request.json  # data is empty
	sql = "INSERT INTO animal (name, age, type, description, pic) VALUES (%s, %s, %s, %s, %s)"

	# val = (data.name, data.age, data.description, data.pic)
	val = (data["name"], data["age"], data["type"], data["description"], data["pic"])
	mycursor.execute(sql, val)
	mydb.commit()
	return json.dumps(True)


# Endpoint for deleting a record
@app.route("/deletePets/<id>", methods=["DELETE"])
def guide_delete(id):
	print("PRINTING ID ="+id)
	mycursor = mydb.cursor()
	sql = "DELETE from animal where id=%s"
	val=(id,)
	mycursor.execute(sql, val)
	mydb.commit()
	return json.dumps(True)

# Endpoint for getting a record
@app.route("/getPet/<id>", methods=["GET"])
@cross_origin()
def get_pet(id):
	print("PRINTING ID ="+id)
	mycursor = mydb.cursor()
	data = request.json  # data is empty
	sql = "select * from animal where id=%s"
	val=(id,)
	mycursor.execute(sql, val)
	x = mycursor.fetchone()
	data = PetModel(x[0],x[1],x[2],x[3],x[4],x[5]).toJson().strip()
	print(data)
	return data

# Endpoint for updating a record
@app.route("/editpet/<id>", methods=["PUT"])
@cross_origin()
def edit_pet(id):
	print("PRINTING ID ="+id)
	mycursor = mydb.cursor()
	data = request.json  # data is empty
	sql = "update animal set name=%s, age=%s, type=%s, description=%s, pic=%s where id=%s"
	val = (data["name"], data["age"], data["type"], data["description"], data["pic"], id)
	mycursor.execute(sql, val)
	return json.dumps(True)

if __name__ == '__main__':
   app.run()