from flask import Flask, jsonify, json, render_template
from flask_cors import CORS
from pathlib import Path
from datetime import datetime
from dateutil.parser import parse
from github import Github
from secrets import DATA_FOLDER_PATH, DESTINY_DATA_FILE_PATH, \
                    GITHUB_DATA_FILE_PATH, CHARACTER_DATA_GET, \
                    BUNGIE_API_KEY, GITHUB_TOKEN, WEATHER_API_URL, \
                    WEATHER_DATA_FILE_PATH, WAKATIME_DATA_FILE_PATH, \
                    WAKATIME_LANGUAGES_URL
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

    # Get last playtime. Keeping this for sake of conversion reference
    # But I doubt anyone needs to know WHEN I was last on.
    # (Not that I would ever be on at 2am on a weekday....)

    # outputdata["last_playtime"] = data["dateLastPlayed"]
    # date_format = '%m/%d/%Y %H:%M:%S %Z'
    # dt = parse(outputdata["last_playtime"])
    # localtime = dt.astimezone(pytz.timezone('US/Pacific'))
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
def get_wakatime():
    
    wakatime_data_file = Path(WAKATIME_DATA_FILE_PATH)

    if wakatime_data_file.exists():
        last_mod_time = datetime.fromtimestamp(
            wakatime_data_file.stat().st_mtime
        )
        now_time = datetime.now()
        difference = now_time - last_mod_time

        seconds = difference.total_seconds()
        hours = int(seconds // 3600)
        # minutes = int( (seconds % 3600) // 60)
        # seconds = int(seconds % 60)

        if (hours > 12):
            refresh_wakatime_data()
    else:
        refresh_wakatime_data()

    outputdata = {}
    raw_data = parse_wakatime_data()
    outputdata['languages'] = {}
    outputdata['languages'] = [item['name'] for item in raw_data['data'] if item['name'] not in outputdata['languages']]
        
    outputdata['wakablocks'] = [
        {
            "title":"Coding Activity over the last 30 days.",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/e32ac05f-3ac0-4e98-b6bb-3a47658c3f2b.svg",
        },
        {
            "title":"Languages over Last 30 Days.",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/f66ccf9e-054a-4154-8b39-a416a7beb0cd.svg",
        },
        {
            "title":"Editors over Last 30 Days",
            "type": "svg",
            "src":"https://wakatime.com/share/@EddieDover/be658075-6161-4c9a-b9c6-d9bde056201f.svg",
        }
    ]

    return outputdata;

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

def refresh_wakatime_data():
    temp_folder_path = Path(DATA_FOLDER_PATH)
    temp_path = Path(WAKATIME_DATA_FILE_PATH)

    if temp_folder_path.exists() is False:
        temp_folder_path.mkdir()

    temp_path.touch()

    r = requests.get(WAKATIME_LANGUAGES_URL)

    temp_path.write_text(r.text)

def parse_wakatime_data():
    with open(WAKATIME_DATA_FILE_PATH, "r") as f:
        raw_data = f.read()
        return json.loads(raw_data)
if __name__ == "__main__":
    app.run()
