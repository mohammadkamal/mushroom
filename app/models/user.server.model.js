var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({ // Page 119 add enum validation for roles
    firstName: String,
    lastName: String,
    email: { type: String, index: true, match: /.+\@.+\..+/ },
    username: { type: String, trim: true, unique: true, required: true },
    password: {type: String,validate:[
        function(password){
            return password.length >= 6;
        },
        'Password should equal or be longer than 6 letters'
    ]},
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        get: function (url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    }
});

UserSchema.virtual('fullName').get(
    function () {
        return this.firstName + ' ' + this.lastName;
    }
); // Page 114 to add setter to virtual attribute

UserSchema.set('toJSON', { getters: true, virtuals: true });
mongoose.model('User', UserSchema);