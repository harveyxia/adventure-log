#!/usr/bin/env python3

import argparse
import json
import os
import urllib.parse

import frontmatter

FRONTMATTER_DELIMITER = '---\n'


def parse_args():
    parser = argparse.ArgumentParser('gen_places.py')
    parser.add_argument('-i', '--input', metavar='relative/posts/directory',
                        help='Relative posts directory', required=True)
    return vars(parser.parse_args())


def hugo_urlize(s):
    return urllib.parse.quote_plus(s.replace(' ', '-').lower())


def main():
    args = parse_args()
    places = []
    for fname in os.listdir(args['input']):
        if fname.endswith('.md'):
            fm = frontmatter.load(args['input'] + '/' + fname)
            places.append([
                fm['lat'],
                fm['long'],
                hugo_urlize(fm['title']),
                fm['location']
            ])
    with open('static/json/places.json', 'w') as f:
        f.write(json.dumps(places, indent=2))


if __name__ == "__main__":
    main()
