# -*- coding: utf-8 -*-

import pandas as pd
# from shapely.geometry import Point, shape

from flask import Flask
from flask import render_template
from flask import request
# from flask import Blueprint
import json

app = Flask(__name__)

data_path = './data/'

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/article",view_func=Main.as_view('page'))
# def index():
#     return render_template("index_article_topic.html")

@app.route('/cool_form', methods=['GET'])
def cool_form():
    return render_template("index_article_topic.html")

@app.route("/data/data_tree.json", methods=['GET', 'POST'])
def get_articles():
    path = 'data/data_tree.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/data_tree/<string:aid>", methods=['GET', 'POST'])
def get_articles_byID(aid):
    path = 'data/data_tree.json'
    data = json.load(open(path))
    data = data[aid]
    return json.dumps(data)

@app.route("/data/gnm_articles/<string:aid>", methods=['GET', 'POST'])
def get_gnm_articles_byID(aid):
    path = 'data/gnm_articles.csv'
    df = pd.read_csv(path)
    df = df.loc[df['article_id']== int(aid)]
    return df.to_json(orient='records')

@app.route("/data/clean_gnm_comments_compact/<string:aid>", methods=['GET', 'POST'])
def get_gnm_articles_compact_byID(aid):
    path = 'data/clean_gnm_comments_compact.csv'
    df = pd.read_csv(path)
    df = df.loc[df['article_id']== int(aid)]
    return df.to_json(orient='records')

@app.route("/data_article_topic")
def get_data():
    df_clean = pd.read_csv(data_path+'topic_visulization_FINAL.csv')
    return df_clean.to_json(orient='records')

@app.route('/comment_form', methods=['GET'])
def comment_form():
    return render_template("index_surounding_topics.html")

@app.route("/data/data.json", methods=['GET', 'POST'])
def get_surrounding_topics_count():
    path = 'data/data.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_0.json", methods=['GET', 'POST'])
def get_data0():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_0.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_1.json", methods=['GET', 'POST'])
def get_data1():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_1.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_2.json", methods=['GET', 'POST'])
def get_data2():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_2.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_3.json", methods=['GET', 'POST'])
def get_data3():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_3.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_4.json", methods=['GET', 'POST'])
def get_data4():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_4.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_5.json", methods=['GET', 'POST'])
def get_data5():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_5.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_6.json", methods=['GET', 'POST'])
def get_data6():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_6.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_7.json", methods=['GET', 'POST'])
def get_data7():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_7.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_8.json", methods=['GET', 'POST'])
def get_data8():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_8.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_9.json", methods=['GET', 'POST'])
def get_data9():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_9.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_10.json", methods=['GET', 'POST'])
def get_data10():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_10.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_11.json", methods=['GET', 'POST'])
def get_data11():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_11.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_12.json", methods=['GET', 'POST'])
def get_data12():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_12.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_13.json", methods=['GET', 'POST'])
def get_data13():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_13.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_14.json", methods=['GET', 'POST'])
def get_data14():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_14.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_15.json", methods=['GET', 'POST'])
def get_data15():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_15.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_16.json", methods=['GET', 'POST'])
def get_data16():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_16.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_17.json", methods=['GET', 'POST'])
def get_data17():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_17.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_18.json", methods=['GET', 'POST'])
def get_data18():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_18.json'
    data = json.load(open(path))
    return json.dumps(data)

@app.route("/data/topic_19.json", methods=['GET', 'POST'])
def get_data19():
    # content = pd.read_json('article_comment.json')
    path = 'data/topic_19.json'
    data = json.load(open(path))
    return json.dumps(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001,debug=True)
