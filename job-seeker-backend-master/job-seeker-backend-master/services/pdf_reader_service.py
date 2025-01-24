import fitz

def get_text(pdf_file_path):
    extracted_text = ""
    with fitz.open(pdf_file_path) as pdf:
        for page_num in range(len(pdf)):
            page = pdf[page_num]
            text = page.get_text()
            extracted_text += text + " "
    return extracted_text
