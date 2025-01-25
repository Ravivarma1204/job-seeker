from flask import Flask, request
from flask_cors import CORS, cross_origin
from services.model import top_jobs
from flask import jsonify
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'pdfFile' not in request.files:
        return 'No file part', 400

    pdf_file = request.files['pdfFile']
    pdf_file.save('pdf/sample.pdf')  # Change the path to your desired location
    recommend_jobs=top_jobs()
    recommend_jobs=[{'job_name':t[0],'job_link':t[1],'similarity':t[2]} for t in recommend_jobs]
    return jsonify(recommend_jobs), 200

@app.route('/')
def home():
    return "Hello, Render!"

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))  # Get the port from the environment
    app.run(host='0.0.0.0', port=port)
