from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('news', __name__)


@bp.route('/')
def index():
    db = get_db()
    

    return render_template('news/index.html')

@bp.route('/create', methods = ('GET', 'POST'))
def create():
    if request.method == 'POST':
        news = request.get_json()
        print(news)

    return render_template('news/create_news.html')
