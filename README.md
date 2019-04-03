# Topic Modeling and Sentiment Analysis on Canadian News Articles and Comments
The motivation for our project is to create a succinct summary of different views or opinions among Canadian citizens on articles, issues, or policies to help the Canadian government or organizations to make better decisions. The dataset is [SOCC](https://github.com/sfu-discourse-lab/SOCC) (The SFU Opinion and Comments Corpus) which contains articles and comments for 5 years from 2012 to 2016. 


## Features
The project answers the following three questions:
- Observe the change in hot topic for these 5 years
- Discover the surrounding topics on comments under a given article 
- Discover the constructiveness/toxicity/sentiment for the comments under a given topic

## Installation

We recommend you to install [Anaconda](https://anaconda.org/) and use [Jupyter notebook](http://jupyter.org/) to run topic modeling and comment analysis. Anaconda will automatically install most of the common libraries (i.e. `pandas`, `numpy`, `flask`). You should then install spark on your computer or use findspark in the Jupyter notebook. 
Please also include the following libraries for topic modeling through Anaconda prompt:


```
conda install -c anaconda nltk
```
```
conda install -c anaconda beautifulsoup4 
```
```
conda install -c anaconda gensim
```
```
conda install -c conda-forge scikit-learn 
```
```
pip install wikiapi 
```

## Website set up
- Clone or download website repo 
- Navigate to the folder location and run the following command to start the server

    ```
    python app.py
    ```
- Go to browser and type http://localhost:5001/
 

## Video:
<a href="https://www.youtube.com/watch?v=Kuwzw7RqQCU&feature=youtu.be" target="_blank"><img src="https://img.youtube.com/vi/Kuwzw7RqQCU/sddefault.jpg" 
alt=" " width="320" height="250" border="10" /></a>

## Tools,Libraries and Credits
1. [Apache Spark](https://spark.apache.org/) - Spark is a powerful processing engine for large datasets. 
2. [Anaconda](https://anaconda.org/) - Anaconda makes the installation of libraries easier and independent from system libraries.
  * [Jupyter Notebook](http://jupyter.org/) - The Notebook provides a interactive web interface of Python. 
3. [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/) - The articles contain HTML tags and BeautifulSoup is capable of parsing HTML documents.
4. [matplotlib](https://matplotlib.org/) - We draw some graphs about the original datasets to get a better understanding.
5. [Natural Language Toolkit](http://www.nltk.org/) - NLTK is a Python toolkit that provides many power functions for natural language processing, such as tokenize sentence, remove stop words, stemming and so on. 
5. [scikit-learn](http://scikit-learn.org) - sklearn is a machine learning library that includes TFIDF, RandomForestClassifier, etc. 
6. [gensim](https://radimrehurek.com/gensim/) - gensim includes LDA and NMF, which are the two powerful algorithms for topic modeling. 
7. [wikiapi](https://pypi.python.org/pypi/wikiapi/1.2.5) - WikiApi enables access to Wikipedia. 
6. [D3.js](http://d3js.org/) - The interactive graph and web frontend are built by D3.js.
7. [Dc.js](https://dc-js.github.io/dc.js/) - Used dc.js to create highly interactuve graphs.
8. [ZingChart](https://www.zingchart.com/) - Used ZingChart to build a word cloud of key words of a topic.
9. [Plotly](https://plot.ly/)- Used Plotly to draw a pie chart.
10. [The SFU Opinion and Comments Corpus](https://github.com/sfu-discourse-lab/SOCC) -Train our topice models on SOCC datasets.
11. [Bag of Words Meets Bags of Popcorn](https://www.kaggle.com/c/word2vec-nlp-tutorial#part-2-word-vectors) - Used the labled sentiment data to train positive/negative sentiment analysis.
12. [Toxic Comment Classification Challenge](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge)- Used the labeled toxic data to do toxicity analysis. 
13. [The Yahoo News Annotated Comments Corpus](https://github.com/cnap/ynacc)-Used the labeled constructiveness data to do constructiveness analysis.
14. [Flask](http://flask.pocoo.org/)- We used flask to built the web backend.
15. [SFU Big data program](https://www.sfu.ca/computing/current-students/graduate-students/academic-programs/bigdata.html) - The best Big Data program.

