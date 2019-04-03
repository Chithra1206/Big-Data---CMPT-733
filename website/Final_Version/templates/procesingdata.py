import pandas as pd
import yaml

location = "/Users/ting/Documents/CMPT733/Project/SOCC/raw/gnm_articles.csv"
data = pd.read_csv(location)

df_topicA = pd.read_csv("cleaned_article_topic.csv")
subdata = data[['article_id','ncomments']]
f_df = df_topicA.merge(subdata, how='left', on='article_id')


def get_ncomment_segment(c):
    if c <= 50:
        return '50-'
    elif c <= 100:
        return '50-100'
    elif c <= 300:
        return '100-300'
    elif c <= 600:
        return '300-600'
    elif c <= 1000:
        return '600-1000'
    else:
        return '1000+'
    
def get_topic_names(topic_names,t):
    return topic_names[t]

df_topicAdict = pd.read_csv("cleaned_article_topic_dict.csv")
topic_names = list(df_topicAdict.topic_name)
topic_keywords = list(df_topicAdict.hot_topics)

topic_keywords_dict=[]
for i in range(len(topic_keywords)):
    str1 = topic_keywords[i]
    str2dict = yaml.load(str1)
    topic_key_words = ""
    for key, value in str2dict.items():
        key += " "
        topic_key_words += key*int(value)
    topic_keywords_dict.append(topic_key_words)
    
f_df['ncomments_segment'] = f_df['ncomments'].apply(lambda c: get_ncomment_segment(c))
f_df['topic_names'] = f_df['topic_index'].apply(lambda t: get_topic_names(topic_names,t))
f_df['topic_keywords'] = f_df['topic_index'].apply(lambda t: get_topic_names(topic_keywords_dict,t))
subset_df = f_df[['article_id','article_date','topic_names','ncomments_segment','topic_keywords']].dropna()

# subset_df.shape
# subset_df.to_csv("topic_visulization.csv", index = False)
subset_df

df_sentiment = pd.read_csv("/Users/ting/Documents/CMPT733/Project/sentimentAnalysis/comment_w_sentiment_bw.csv")
df_sentiment_sub = subset_df.merge(df_sentiment, how='left', on='article_id')[['topic_names','sentiment']]
df_sentiment_pos = df_sentiment_sub[df_sentiment_sub.sentiment == 1]
df_sentiment_neg = df_sentiment_sub[df_sentiment_sub.sentiment == 0]

positive_sum = df_sentiment_pos.groupby(['topic_names']).count()
negative_sum = df_sentiment_neg.groupby(['topic_names']).count()

positive_sum = positive_sum.rename(columns={'sentiment': 'positive'})
positive_sum['topic_names'] = positive_sum.index
positive_subfinal=subset_df.merge(positive_sum, how='left', on='topic_names')

negative_sum = negative_sum.rename(columns={'sentiment': 'negative'})
negative_sum['topic_names'] = negative_sum.index
negative_subfinal=subset_df.merge(negative_sum, how='left', on='topic_names')
final_sentiment = positive_subfinal.merge(negative_subfinal, how='left', on=['article_id', 'article_date','topic_names','ncomments_segment','topic_keywords'])
final_sentiment_sub = final_sentiment[['article_date','topic_names','ncomments_segment','topic_keywords','positive','negative']]

final_sentiment_sub.to_csv("topic_visulization_FINAL.csv", index = False)
