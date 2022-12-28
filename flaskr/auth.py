import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for , jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/signup', methods = ('GET','POST'))
def signup ():
    
    if request.method == 'POST':
        error = None 

        user = request.get_json()
        db = get_db()
        first_name = user['first_name']
        last_name = user['last_name']
        email = user['email']
        address = user['address_user']
        password  = generate_password_hash( user['password_user'])
        gender = user['gender']
        date_of_birth = user['date_of_birth']
        month_of_birth = user['month_of_birth']
        year_of_birth = user['year_of_birth']
        phone_number  = user['phone_number']
        
        try :
            db.execute(
                'INSERT INTO user (last_name, first_name, email, address_user, password_user,\
                 gender, date_of_birth, month_of_birth, year_of_birth, phone_number)  \
                 VALUES (?,?,?,?,?,?,?,?,?,?)',(last_name, first_name, email, address, password, gender, date_of_birth, month_of_birth, year_of_birth, phone_number),
            )
            db.commit()
        except db.IntegrityError:
            error = f"Email {email} is already registered."
            print(error)
        else:
            # return redirect(url_for('auth.login'))
            return jsonify({'redirec':url_for('auth.login')})
        flash(error)

    return render_template('auth/signup.html')



@bp.route('/login', methods = ('GET','POST'))
def login():
    if request.method == 'POST':
        error = None 
        user_req = request.get_json()
        db = get_db()
        email = user_req['email']
        password = user_req['password']
        user_db = db.execute(
            'SELECT * FROM user WHERE  email = ?',(email,)
        ).fetchone()
        if user_db is None:
            error = 'Incorrect email'
        elif not check_password_hash(user_db['password_user'], password):
            error = 'Incorrect password'
        if error is None:
            session.clear()
            session['user_id'] = user_db['id']
            # return redirect(url_for('index'))
            print(session['user_id'])
            return jsonify({'redirec':url_for('index')})
        flash(error)
    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()
        
@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))
    
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view