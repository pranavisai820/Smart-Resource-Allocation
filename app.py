from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Store data
needs = []
volunteers = []

# Home route (for testing)
@app.route('/')
def home():
    return "Backend is running!"

# Add community need
@app.route('/add_need', methods=['POST'])
def add_need():
    data = request.json

    #priority = int(data['severity']) * 10
    severity=int(data['severity'])
    if severity>=4:
        level="High"
    elif severity==3:
        level="Medium"
    else:
        level="Low"
    priority=severity*10
    needs.append({
        "area": data['area'],
        "issue": data['issue'],
        "severity": severity,
        "priority": priority,
        "level":level
    })

    return jsonify({"message": "Need added successfully"})

# Add volunteer
@app.route('/add_volunteer', methods=['POST'])
def add_volunteer():
    data = request.json

    volunteers.append({
        "name": data['name'],
        "skill": data['skill'],
        "location": data['location']
    })

    return jsonify({"message": "Volunteer added successfully"})

# Allocate volunteers
@app.route('/allocate', methods=['GET'])
def allocate():
    global needs, volunteers
    sorted_needs = sorted(needs, key=lambda x: x['priority'], reverse=True)

    result = []

    for need in sorted_needs:
        for v in volunteers:
            if v['skill'].lower() == need['issue'].lower():
                result.append({
                    "area": need['area'],
                    "issue": need['issue'],
                    "volunteer": v['name'],
                    "level":need['level']
                })
                break
    needs=[]
    volunteers=[]
    return jsonify(result)

# Run server
if __name__ == '__main__':
    app.run(debug=True)