import pymongo
from pymongo import MongoClient
import pandas as pd
import json

def exportCsvToCollection(csv_file, dbName=None, collection=None):
    # define mongo objects
    mongoClient = MongoClient("localhost", 27017, maxPoolSize=50)
    db = mongoClient[dbName]
    collection = db[collection]
    df = pd.read_csv(csv_file, names=['id', 'artist', 'song_name', 'year', 'total', 'usa', 'uk', 'eur', 'row'], header=None, index_col=False)
    songData = df.to_dict('records')
    collection.insert_many(songData, ordered=False)
    print('data exported!')

exportCsvToCollection('./data/TopSongs.csv', 'test', 'songs')
