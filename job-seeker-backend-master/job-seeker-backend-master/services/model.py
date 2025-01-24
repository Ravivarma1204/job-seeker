import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from services.pre_processing import pre_process
from services.pdf_reader_service import get_text
df = pd.read_csv("jobs.csv")
# df.insert(0, 'id', range(1, len(df) + 1))

# def combine_text(row):
#     if isinstance(row['description'], str) and len(row['description']) > 20:
#         return f"{row['title']} {row['description']}"
#     else:
#         return row['title']

# df['combined_text'] = df.apply(combine_text, axis=1)
# df = df[df['combined_text'].str.len() >= 200]
# df.reset_index(drop=True, inplace=True)
# print(df.shape)
# pre_processed_docs = {}

# for index, row in df.iterrows():
#     preprocessed_text = pre_process(row['combined_text'])
#     print("processed ",index)
#     pre_processed_docs[row['id']] = preprocessed_text

# documents_list = [' '.join(words) for words in pre_processed_docs.values()]

# with open('model.pkl', 'wb') as f:
#     pickle.dump(documents_list, f)

def return_jobs():
    with open('model.pkl', 'rb') as f:
        documents_list = pickle.load(f)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents_list)



    pdf_text = get_text("pdf/sample.pdf")
    pre_processed_query = pre_process(pdf_text)
    query_text = ' '.join(pre_processed_query)
    query_vector = vectorizer.transform([query_text])

    cosine_similarities = cosine_similarity(query_vector,tfidf_matrix)

    similar_jobs_indices = cosine_similarities.argsort()[0][::-1]

    # Set a threshold for cosine similarity scores
    threshold = 0.01

    job_titles = df['title'].tolist()
    job_links = df['job_url'].tolist()
    # Filter jobs based on similarity score
    similar_jobs = [(job_titles[idx], job_links[idx], cosine_similarities[0][idx]) for idx in similar_jobs_indices if cosine_similarities[0][idx] >= threshold]

    similar_jobs.sort(key=lambda x: x[2], reverse=True)
    return similar_jobs

def top_jobs():
    return return_jobs()[:100]
