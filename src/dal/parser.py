import pandas as pd
import json

def exportCsvToCollection(csv_file, collection_file):
    #Read CSV file into Pandas DataFrame, Skips to specified start line
    df = pd.read_csv(csv_file, names=['id', 'artist', 'song_name', 'year', 'total', 'usa', 'uk', 'eur', 'row'], header=None, index_col=False)
    songData = df.to_json(orient='records', indent=4)
    songData = json.loads(songData)
    indexedData = {}
    for song in songData:
        indexedData[song['id']] = song
    with open(collection_file, 'w') as f:
        json.dump(indexedData, f, indent=4)

                   

exportCsvToCollection('./data/TopSongs.csv', './data/songs.json')
