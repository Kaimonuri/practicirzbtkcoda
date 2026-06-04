data() {
  return {
    firstName: "Ivan",
    lastName: "Petrov"
  }
},

computed: {
  fullName() {
    return this.firstName + " " + this.lastName;
  }
}