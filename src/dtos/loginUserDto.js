class LoguinUserDto {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.avatar = user.avatar;
    this.role = user.role;
  }
}

module.exports = LoguinUserDto;
