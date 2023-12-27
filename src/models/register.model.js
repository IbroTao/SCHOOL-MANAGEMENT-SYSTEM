const mongoose = require("mongoose");

const Register = mongoose.model(
  "registers",
  new mongoose.Schema(
    {
      admitted: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: [true, "Please provide your fullname"],
      },
      age: {
        type: Number,
        required: true,
      },
      dateOfBirth: {
        type: String,
        required: true,
      },
      nameOfFormerSchool: {
        type: String,
        required: true,
      },
      stateOfOrigin: {
        type: String,
        required: true,
      },
      localGovernment: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      yearOfEntry: {
        type: Number,
      },
      classOfEntry: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        required: true,
      },
      religion: {
        type: String,
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      nextOfKin: {
        type: String,
        required: true,
      },
      nextOfKinPhone: {
        type: Number,
        required: true,
      },
      nextOfKinAddress: {
        type: String,
        required: true,
      },
      relationshipWithNextOfKin: {
        type: String,
        required: true,
      },
      numberOfSiblings: {
        type: Number,
        required: true,
      },
      placeAmongSiblings: {
        type: String,
        required: true,
      },
      favoriteSubject: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      sponsor: {
        type: String,
        required: true,
      },
      sponsorName: {
        type: String,
        required: true,
      },
      sponsorContact: {
        type: String,
      },
      relationshipWithSponsor: {
        type: String,
      },
      parentRelationshipStatus: {
        type: String,
      },
      class: {
        type: String,
      },
      sectionId: {
        type: String,
      },
      teacherId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Register };
