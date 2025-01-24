import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

import spacy
from nltk.corpus import wordnet
nlp = spacy.load('en_core_web_sm')
stemmer=PorterStemmer()
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()


def pre_process(text):
  def remove_punctuation(text):
      try:
        punctuation_pattern = re.compile(r'[^\w\s]')
        bullet_point_pattern = re.compile(r'^\s*[\u2022\u2023\u25E6•◦]*\s+')
        text_without_punctuation = punctuation_pattern.sub('', text)
        text_without_bulletins=bullet_point_pattern.sub('',text_without_punctuation)
        return text_without_bulletins
      except :
          pass

  def tokenize(text):
      tokens = word_tokenize(text)
      return tokens

  def remove_numbers(list):
      numeric_pattern = re.compile(r'\d')
      list_without_number = [item for item in list if not numeric_pattern.search(str(item))]
      return list_without_number

  def convert_to_lowercase(list):
      lowercased_list = [text.lower() for text in list]
      return lowercased_list

  def is_name(word):
      doc = nlp(word)
      return any(entity.label_ == 'PERSON' for entity in doc.ents)

  def remove_stop_words(list):
      stop_words = set(stopwords.words('english'))
      filtered_words = [word for word in list if len(word)>1 and word not in stop_words and not is_name(word)]
      return filtered_words

  def get_wordnet_pos(tag):
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN

  def lemmatizing(list):
      lemmatized_list=[lemmatizer.lemmatize(word, get_wordnet_pos(pos_tag)) for word, pos_tag in nltk.pos_tag(list)]
      return lemmatized_list


  punctuations_removed=remove_punctuation(text)
  tokenized=tokenize(punctuations_removed)
  without_number=remove_numbers(tokenized)
  lower_case=convert_to_lowercase(without_number)
  stop_words_removed=remove_stop_words(lower_case)
  final_text=lemmatizing(stop_words_removed)

  return final_text
