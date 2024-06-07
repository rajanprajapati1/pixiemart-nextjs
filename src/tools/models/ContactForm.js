import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },
  Issue: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  message : {
    type: String,
    required: true,
  }
});

export const Form = mongoose.models.contactform || mongoose.model('contactform',FormSchema);

