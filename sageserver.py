from flask import Flask, request, jsonify
import requests as req

app = Flask(__name__)


@app.route('/api/v1/random')
def get_random_word():
    #urlparse(request.url).query
    #'x=y'
    res = req.get('http://randomword.setgetgo.com/get.php')

    return res.text

# @app.route('/static/mashuphope.html')
# def get_random_word_maybe():
#     #urlparse(request.url).query
#     #'x=y'
#     res = req.get('http://randomword.setgetgo.com/get.php')
#
#     return res.text

@app.route('/dictionary/<string:word>', methods=['GET'])
def definePls(word):
    requestStr = "http://api.pearson.com/v2/dictionaries/entries?headword=" + str(word)
    res = req.get(requestStr)
    #return res.text
    return jsonify(res.text)

@app.route('/mapstuff/<string:origin>/<string:destination>')
def mappls(origin, destination):
    key = "key=AIzaSyD9uFBbA6BKRjP6Mnc8DF5j5S0uEmmKkoI"
    requestStr = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&" + key
    res = req.get(requestStr)
    return jsonify(res.text)

app.run(debug=True, host="0.0.0.0", port=8001)
