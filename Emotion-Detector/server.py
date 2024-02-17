from flask import Flask, request, jsonify, render_template
from EmotionDetection.emotion_detection import emotion_predictor

app = Flask("Emotion Detector")


@app.route("/")
def render_index_page():
    return render_template('index.html')


@app.route('/emotionDetector', methods=['POST'])
def emotion_detector():
    if not request.json or 'statement' not in request.json or not request.json['statement'].strip():
        response = {'anger': None, 'disgust': None, 'fear': None,
                    'joy': None, 'sadness': None, 'dominant_emotion': None}
        return jsonify(response), 400

    data = request.json
    statement = data['statement']
    response = emotion_predictor(statement)

    dominant_emotion = response.get("dominant_emotion")
    if dominant_emotion is None:
        return jsonify({"message": "Invalid input text."}), 200

    output_string = (
        f"For the given statement, the system response is "
        f"'anger': {response['anger']}, "
        f"'disgust': {response['disgust']}, "
        f"'fear': {response['fear']}, "
        f"'joy': {response['joy']}, "
        f"'sadness': {response['sadness']}. "
        f"The dominant emotion is {dominant_emotion}."
    )

    return jsonify({"message": output_string})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
