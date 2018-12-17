var encrypt_key = 0;
document.getElementById('name_display').innerHTML = document.getElementById('usern').innerHTML;
document.getElementById('room_key').innerHTML = document.getElementById('roo').innerHTML;
function encrypt(plaintext, key) {
    var ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var encrypted_text = ''
    for (var i = 0; i < plaintext.length; i++) {
        if (ALPH.indexOf(plaintext[i].toUpperCase()) > -1) {
            var cur_pos = ALPH.indexOf(plaintext[i].toUpperCase())
            var new_pos = cur_pos + key
            if (new_pos > 25) {
                new_pos = new_pos % 26
            }
            encrypted_text += ALPH[new_pos]
        } else {
            encrypted_text += plaintext[i]
        }
    }
    return encrypted_text
}

function decrypt(encrypted_text, key) {
    var ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var decrypted_text = ''
    for (var i = 0; i < encrypted_text.length; i++) {
        if (ALPH.indexOf(encrypted_text[i].toUpperCase()) > -1) {
            var cur_pos = ALPH.indexOf(encrypted_text[i].toUpperCase())
            var new_pos = cur_pos - key
            if (new_pos < 0) {
                new_pos = 26 + (new_pos % 26)
            }
            decrypted_text += ALPH[new_pos]
        } else {
            decrypted_text += encrypted_text[i]
        }
    }
    return decrypted_text
}

var socket = io.connect(document.domain)
// send a message
socket.on('connect', function () {
    socket.emit('my event', {
        data: 'User Connected'
    })

    var form = $('form').on('submit', function (e) {
        e.preventDefault()
        let key = select_key()
        let user_name = document.getElementById('usern').innerHTML
        let user_msg = $('input.message').val()
        let enc_user_msg = encrypt(user_msg, key)
        let room = document.getElementById('roo').innerHTML
        console.log(enc_user_msg);
        if (user_msg != '') {
            socket.emit('my event', {
                user_name: user_name,
                message: enc_user_msg,
                room: room
            })
        }
        // empty the input field
        $('input.message').val('').focus()
    })
})

// capture message
socket.on('my response', function (msg) {
    // console.log(msg)
    let key = select_key()
    let room = document.getElementById('roo').innerHTML
    if (typeof msg.user_name !== 'undefined' && msg.user_name != '' && msg.room == room) {
        console.log(msg.message)
        msg.message = decrypt(msg.message, key)
        $('.no_messages').remove()
        $('div.message_holder').append(
            '<div class="each_msg"> \
            <div class="each_msg_content" > \
              <div class="each_msg_name" style="display:inline-block;"> \
                <b style="color: #ddd;">'+ msg.user_name + '</b> \
              </div> \
              <div class="each_msg_text" style="display:inline-block;">'+ msg.message + '</div> \
            </div> \
          </div>' )
    }
})

function select_key()
{
    var ddl = document.getElementById("cardtype");
    var selectedValue = ddl.options[ddl.selectedIndex].value;
    encrypt_key = selectedValue;
    return encrypt_key;
}