from app import app, db
from flask import request, jsonify
from models import Contact

# Get all contacts
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
  contacts = Contact.query.all() 
  result = [contact.to_json() for contact in contacts]
  return jsonify(result)

# Create a contact
# @app.route("/api/contacts",methods=["POST"])
# def create_contact():
#   try:
#     data = request.json

#     name = data.get("name")
#     role = data.get("role")
#     description = data.get("description")
#     gender = data.get("gender")

#     # Fetch avatar image based on gender
#     if gender == "male":
#       img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
#     elif gender == "female":
#       img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
#     else:
#       img_url = None

#     new_contact = Contact(name=name, role=role, description=description, gender=gender, img_url=img_url)

#     db.session.add(new_contact) 
#     db.session.commit()

#     return jsonify({"msg":"contact created successfully"}), 201
    
  # except Exception as e:
  #   db.session.rollback()
  #   return jsonify({"error":str(e)}), 500

#   # chatgpt debugger
#   # Simplified Create a contact route for testing
# @app.route("/api/contacts", methods=["POST"])
# def create_contact():
#     try:
#         data = request.json
#         return jsonify({"msg": "received", "data": data}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route("/api/contacts", methods=["POST"])
def create_contact():
    try:
        data = request.json

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        if (not name) or (not role) or (not description) or (not gender):
            return jsonify({"error": "All fields are required"}), 400

        # Fetch avatar image based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_contact = Contact(name=name, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_contact)
        db.session.commit()

        return jsonify({"msg": "contact created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500