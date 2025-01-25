from flask import Flask, request, jsonify
from flask_cors import CORS
from services.model import top_jobs

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/upload', methods=['POST'])
def upload_pdf():
    try:
        # Check if a file is included in the request
        if 'pdfFile' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        pdf_file = request.files['pdfFile']
        
        if pdf_file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400

        # Save the uploaded PDF to a desired location
        pdf_file.save('pdf/sample.pdf')  # Change the path to your desired location
        
        # Call your model to recommend jobs
        recommend_jobs = top_jobs()
        recommend_jobs = [{'job_name': t[0], 'job_link': t[1], 'similarity': t[2]} for t in recommend_jobs]

        return jsonify(recommend_jobs), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
