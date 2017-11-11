import User from '../models/user.model'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Validators = {
  isEmail: {
    validator: function(value) {
      return EMAIL_REGEX.test(value)
    },
    msg: 'Invalid email format'
  },

  isTaken: function(property) {
    return {
      isAsync: true,
      validator: function(value, respond) {
        User.findOne({[property]: value})
        .then(doc => {
          respond(!Boolean(doc))
        })
        .catch(err => {
          console.log(`Error occured while validating ${property}`, err);
          respond(false)
        })
      },
      msg: `${property.slice(0, 1).toUpperCase()}${property.slice(1)} already exists`
    }
  }
}

export { Validators }