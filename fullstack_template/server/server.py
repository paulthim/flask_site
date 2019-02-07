from flask import Flask, current_app, json, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
import logging
import os
from Exercises.Mappings import class_dispatch, ClassMapping

application = Flask(__name__, static_folder='static/dist', template_folder='static')
application.config['FILE_FOLDER'] = 'dist/files'
cors = CORS(application, resources={r"/api/*": {"origins": ["http://paulthim.com", "127.0.0.1"]}})

DEFAULT_ERROR_MESSAGE = "Oops, looks like something went wrong..."


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/api/exercises')
def get_exercise_list():
    exercise_list = [{"id": key, "title": ClassMapping[key]["title"]} for key in ClassMapping.keys()]
    # print(exercise_list)
    return jsonify(exercise_list), 200


@application.route('/api/<int:code_id>/body')
def get_body_for_exercise(code_id):
    item = ClassMapping[code_id]
    if not item:
        print("No item found.")
    dispatch = class_dispatch(code_id)
    if not dispatch:
        content = {"Error": "No matching exercise or code sample for id: " + str(code_id)}
        return jsonify(content), 404

    snippet_body = {
        "title": ClassMapping[code_id]["title"],
        "snippet": ClassMapping[code_id]["snippet"],
        "description": ClassMapping[code_id]["description"],
        "values": dispatch.generate_values()
    }
    return jsonify(snippet_body), 200


@application.route('/api/<int:code_id>/values')
def get_values_for_exercise(code_id):
    dispatch = class_dispatch(code_id)
    if not dispatch:
        content = {"Error": "No matching exercise or code sample for id: " + str(code_id)}
        return jsonify(content), 404

    values = dispatch.generate_values()
    # print(values)
    response_object = {
        'values': values
    }
    return jsonify(response_object), 200


@application.route('/api/<int:code_id>/execute', methods=["POST"])
def run_exercise_for_values(code_id):
    dispatch = class_dispatch(code_id)
    if not dispatch:
        content = {"Error": "No matching exercise or code sample for id: " + str(code_id)}
        return jsonify(content), 404

    request_data = json.loads(request.data)
    values = request_data['data']['values']
    print(values)
    try:
        result = dispatch.run(values)
        response_object = {
            'result': result
        }
        return jsonify(response_object), 200
    except Exception as e:
        print(str(e))
        return jsonify({'result': DEFAULT_ERROR_MESSAGE, 'error': str(e)}), 400


@application.route('/downloads/<path:filename>', methods=['GET'])
def download(filename):
    directory = os.path.join(current_app.template_folder, application.config['FILE_FOLDER'])
    if not os.path.exists(directory):
        content = {"Error": "Could not find file " + str(directory)}
        return jsonify(content), 404

    print(directory)
    return send_from_directory(directory=directory, filename=filename)


if __name__ == '__main__':
    logging.basicConfig(filename='cannibalturk_debug.log', level=logging.DEBUG)

    application.run()
