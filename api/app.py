from flask import Flask, jsonify, json, render_template
from flask_cors import CORS
from pathlib import Path
from datetime import datetime
from dateutil.parser import parse
from github import Github
from secrets import DATA_FOLDER_PATH, DESTINY_DATA_FILE_PATH, \
                    GITHUB_DATA_FILE_PATH, CHARACTER_DATA_GET, \
                    BUNGIE_API_KEY, GITHUB_TOKEN, WEATHER_API_URL, \
                    WEATHER_DATA_FILE_PATH
import requests
import json
import pytz

app = Flask(__name__)
CORS(app) # Obviously you want to be careful enabling CORS.
application = app

@app.route("/weather")
def get_weather_data():
    weather_data = None
    weather_data_file = Path(WEATHER_DATA_FILE_PATH)

    if (weather_data_file).exists():
        last_mod_time = datetime.fromtimestamp(
            weather_data_file.stat().st_mtime
        )
        now_time = datetime.now()
        difference = now_time - last_mod_time
        seconds = difference.total_seconds()
        hours = int(seconds // 3600)

        if (hours > 3):
            refresh_weather_data()
    else:
        refresh_weather_data()
    
    weather_data = parse_weather_data()

    output = {}
    output['coord'] = weather_data['coord']
    output['current_temp'] = weather_data['main']['temp']
    output['description'] = weather_data['weather'][0]['main']

    return output

def refresh_weather_data():
    temp_folder_path = Path(DATA_FOLDER_PATH)
    temp_path = Path(WEATHER_DATA_FILE_PATH)

    if temp_folder_path.exists() is False:
        temp_folder_path.mkdir()
    
    temp_path.touch()

    r = requests.get(WEATHER_API_URL)

    temp_path.write_text(r.text)

def parse_weather_data():
    with open(WEATHER_DATA_FILE_PATH, "r") as f:
        raw_weather_data = f.read()
        return json.loads(raw_weather_data)

@app.route("/destiny")
def get_destiny_data():
    destiny_data = None
    destiny_data_file = Path(DESTINY_DATA_FILE_PATH)

    if destiny_data_file.exists():
        last_mod_time = datetime.fromtimestamp(
            destiny_data_file.stat().st_mtime
        )
        now_time = datetime.now()
        difference = now_time - last_mod_time

        seconds = difference.total_seconds()
        hours = int(seconds // 3600)
        # minutes = int( (seconds % 3600) // 60)
        # seconds = int(seconds % 60)

        if (hours > 12):
            refresh_destiny_data()
    else:
        refresh_destiny_data()

    destiny_data = parse_destiny_data()
    outputdata = {}
    data = destiny_data["Response"]["character"]["data"]
    # outputdata["last_playtime"] = data["dateLastPlayed"]

    date_format = '%m/%d/%Y %H:%M:%S %Z'
    dt = parse(outputdata["last_playtime"])
    localtime = dt.astimezone(pytz.timezone('US/Pacific'))
    # outputdata["last_playtime"] = localtime.strftime(date_format)
    outputdata["playedLast"] = {}
    outputdata["playedLast"]["Hours"] = int(
        int(data["minutesPlayedThisSession"]) // 60
    )
    outputdata["playedLast"]["Minutes"] = int(
        int(data["minutesPlayedThisSession"]) % 60
    )
    outputdata["total_hours_played"] = int(data["minutesPlayedTotal"]) // 60
    outputdata["lightlevel"] = data["light"]
    return outputdata

@app.route("/github")
def get_github_data():
    github_data_file = Path(GITHUB_DATA_FILE_PATH)

    if github_data_file.exists():
        last_mod_time = datetime.fromtimestamp(
            github_data_file.stat().st_mtime
        )
        now_time = datetime.now()
        difference = now_time - last_mod_time

        seconds = difference.total_seconds()
        hours = int(seconds // 3600)
        # minutes = int( (seconds % 3600) // 60)
        # seconds = int(seconds % 60)

        if (hours > 12):
            refresh_github_data()
    else:
        refresh_github_data()

    return parse_github_data()

@app.route("/wakatime")
def get_wakablocks():
    
    wakablocks = [
        {
            "title":"Coding Activity over the last 7 days.",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/6f6dd537-a5a9-42af-a5d3-d78a81458f98.svg",
        },
        {
            "title":"Languages over Last 7 Days.",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/ecfee35c-fd1c-4475-b4fa-37097fd8e1a5.svg",
        },
        {
            "title":"Editors over Last 7 Days",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/8be04f36-46a4-4eea-9366-1a01a36d765a.svg",
        }
    ]

    return {"wakablocks_urls": wakablocks}

def refresh_destiny_data():
    temp_folder_path = Path(DATA_FOLDER_PATH)
    temp_path = Path(DESTINY_DATA_FILE_PATH)

    if temp_folder_path.exists() is False:
        temp_folder_path.mkdir()

    temp_path.touch()

    r = requests.get(CHARACTER_DATA_GET, headers={"X-API-Key": BUNGIE_API_KEY})

    temp_path.write_text(r.text)

def parse_destiny_data():
    with open(DESTINY_DATA_FILE_PATH, "r") as f:
        raw_destiny_data = f.read()
        return json.loads(raw_destiny_data)

def refresh_github_data():
    github_data = {}
    temp_folder_path = Path(DATA_FOLDER_PATH)
    temp_path = Path(GITHUB_DATA_FILE_PATH)

    if temp_folder_path.exists() is False:
        temp_folder_path.mkdir()

    temp_path.touch()

    g = Github(GITHUB_TOKEN)

    github_data['hireable'] = g.get_user().hireable
    github_data['avatar_url'] = g.get_user().avatar_url
    
    current_issues = g.get_user().get_issues()

    account_repos = g.get_user().get_repos(visibility="public")
    repos = []
    for repo in account_repos:
        commits = repo.get_commits(author=g.get_user())

        if commits.totalCount > 0:
            issues = []
            for issue in [i for  i in current_issues if i.repository.id == repo.id]:
                issues.append(
                    {
                        'title':issue.title,
                        'url':issue.url
                    }
                )

            repo_data = {
                'commits':str(commits.totalCount),
                'description': repo.description,
                'issues': issues,
                'name': repo.name,
                'open_issues_count':repo.open_issues_count,
                'subscribers_count':repo.subscribers_count,
                'url': repo.html_url,
                'homepage': repo.homepage
            }

            bExists = False
            for item in repos:
                if (item['name'] == repo.name):
                    bExists = True
            if not bExists:
                repos.append(repo_data)

    github_data['repos'] = repos

    temp_path.write_text(json.dumps(github_data))

def parse_github_data():
    with open(GITHUB_DATA_FILE_PATH, "r") as f:
        raw_data = f.read()
        return json.loads(raw_data)

if __name__ == "__main__":
    app.run()