#!/usr/bin/env python
import requests
import json
import os

FRESHDESK_API_KEY = os.getenv('FRESHDESK_API_KEY')

def api(url):
    cache_dir = 'api_cache/{}'.format(url)
    cache_path = '{}/response.json'.format(cache_dir)

    if not os.path.exists(cache_dir):
        _dirbase = ""
        for dd in cache_dir.split('/'):
            _dirbase = os.path.join(_dirbase, dd)
            try:
                os.mkdir(_dirbase)
            except Exception as e:
                pass

    if os.path.exists(cache_path):
        with open(cache_path, 'r') as cache_f:
            return json.load(cache_f)
    r = requests.get('https://picovico.freshdesk.com/api/v2/{}'.format(url), auth=(FRESHDESK_API_KEY, 'X'))
    with open(cache_path, 'w') as cache_f:
        cache_f.write(json.dumps(r.json()))

    return r.json()


cats = api('solutions/categories')

for category in cats:
    cat_name = category.get('name')
    cat_id = category.get('id')

    print "-- Fetching category {} {}".format(cat_name, cat_id)

    folders = api('solutions/categories/{}/folders'.format(cat_id))

    for folder in folders:
        f_name = folder.get('name')
        f_id = folder.get('id')
        print "-- -- Fetching folder {} {}".format(f_name, f_id)

        articles = api("solutions/folders/{}/articles".format(f_id))

        for article in articles:
            article_id = article.get('id')
            question = article.get('title')
            print "-- -- -- Fetching article {} {}".format(question, article_id)
            faq = api("solutions/articles/{}".format(article_id))
