from app import app, db
from flask import request, jsonify
from models import Contact

# Get all contacts
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
  contacts = Contact.query.all() 
  result = [contact.to_json() for contact in contacts]
  return jsonify(result)

# POST: Create contact
@app.route("/api/contacts", methods=["POST"])
def create_contact():
    try:
        data = request.json

        # Validatations
        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400

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

        return jsonify(new_contact.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# Delete a contact
@app.route("/api/contacts/<int:id>", methods=["DELETE"])
def delete_contact(id):
    try:
        contact = Contact.query.get(id)
        if contact is None:
            return jsonify({"error":"Contact not found"}), 404
        
        db.session.delete(contact)
        db.session.commit()
        return jsonify({"msg":"Contact Deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update a contact
@app.route("/api/contacts/<int:id>", methods=["PATCH"])
def update_contact(id):
    try:
        contact = Contact.query.get(id)
        if contact is None:
            return jsonify({"error":"Contact not found"}), 404
        
        data = request.json

        contact.name = data.get("name", contact.name)
        contact.role = data.get("role", contact.role)
        contact.description = data.get("description", contact.description)
        contact.gender = data.get("gender", contact.gender)
        
        db.session.commit()
        return jsonify(contact.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500