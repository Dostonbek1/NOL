from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask import request
# https://flask-socketio.readthedocs.io/en/latest/
# https://github.com/socketio/socket.io-client

app = Flask(__name__)

app.config[ 'SECRET_KEY' ] = 'jsbcfsbfjefebw237u3gdbdc'
socketio = SocketIO( app )

@app.route( '/' )
def hello():
  return render_template( './login.html' )

def encrypt(plaintext, key):
  ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  encrypted_text = ''
  for char in plaintext:
    if char.upper() in ALPH:
      cur_pos = ALPH.find(char.upper())
      new_pos = cur_pos + key
      if new_pos > 25:
        new_pos = new_pos % 26
      encrypted_text += ALPH[new_pos]
    else:
      encrypted_text += char
  return encrypted_text 

def decrypt(encrypted_text, key):
  ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  decrypted_text = ''
  for char in encrypted_text:
    if char.upper() in ALPH:
      cur_pos = ALPH.find(char.upper())
      new_pos = cur_pos - key
      if new_pos < 0 or new_pos > 25:
        new_pos = new_pos % 26
        print(new_pos)
      decrypted_text += ALPH[new_pos]
    else:
      decrypted_text += char
  return decrypted_text 

app.jinja_env.globals.update(encrypt=encrypt, decrypt=decrypt)

@app.route('/', methods=['POST'])
def start_chat():
  username = request.form.get('username')
  room = request.form.get('room_key')
  if username != '' and room != '':
    return render_template('./ChatApp.html', username=username, room=room)
  else:
    return render_template('./login.html')

def messageRecived():
  print( 'message was received!!!' )

@socketio.on( 'my event' )
def handle_my_custom_event( json ):
  print( 'recived my event: ' + str( json ) )
  socketio.emit( 'my response', json, callback=messageRecived )

if __name__ == '__main__':
  socketio.run( app,port=5000,host='localhost', debug = True )