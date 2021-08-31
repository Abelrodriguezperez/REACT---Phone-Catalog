from flask import Flask, request, jsonify
from Database import phones, setup

app = Flask(__name__)
setup.create_tables()


@app.route('/phones', methods=['POST'])
def add_phone():
    id = request.json['id']
    phoneName = request.json['phoneName']
    manufacturer = request.json['manufacturer']
    description = request.json['description']
    color = request.json['color']
    price = request.json['price']
    imageFileName = request.json['imageFileName']
    screen = request.json['screen']
    processor = request.json['processor']
    ram = request.json['ram']

    phone = (id, phoneName, manufacturer, description, color, price, imageFileName, screen, processor, ram)
    phone_id = phones.insert_phone(phone)

    if phone_id:
        phone = phones.select_phone_by_id(phone_id)
        return jsonify({'phone': phone})
    return jsonify({'message': 'Error'})

@app.route('/phones', methods=['GET'])
def get_phones():
    rslt = phones.get_all_phones()

    if rslt:
        return jsonify({"phones": rslt})
    elif rslt == False:
        return jsonify({'message': 'Error'})
    else:
        return jsonify({"phones": {}})

@app.route('/phones', methods=['PUT'])
def edit_phone():
    phone_id = request.args.get('id')
    phoneName = request.json['phoneName']
    manufacturer = request.json['manufacturer']
    description = request.json['description']
    color = request.json['color']
    price = request.json['price']
    imageFileName = request.json['imageFileName']
    screen = request.json['screen']
    processor = request.json['processor']
    ram = request.json['ram']


    if phones.edit_phone(phone_id, (phoneName, manufacturer, description, color, price, imageFileName, screen, processor, ram)):
        phone = phones.select_phone_by_id(phone_id)
        return jsonify(phone)
    return jsonify({'message': 'Error'})

@app.route('/phones', methods=['DELETE'])
def delete_phone():
    phone_id = request.args.get('id')

    if phones.delete_phone(phone_id):
        return jsonify({'message': 'phone deleted'})
    return jsonify({'message': 'Error'})

if __name__ == '__main__':
    app.run(debug=True)
