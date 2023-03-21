export class Shopkeeper {
  constructor(id, name, email, phone, access_token) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.access_token = access_token;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPhone() {
    return this.phone;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
    return;
  }

  setId(id) {
    this.id = id;
    return;
  }

  setEmail(email) {
    this.email = email;
    return;
  }

  setPhone(phone) {
    this.phone = phone;
    return;
  }
}
