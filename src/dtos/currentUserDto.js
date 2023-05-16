class CurrentUserDto {
  constructor(user) {
    this.nombre = user.nombre;
    this.apellido = user.apellido;
    this.email = user.email;
    this.edad = user.edad;
    this._id = user._id;
    this.avatar = user.avatar;
    this.role = user.role;
    this.fecha = user.fecha;
    this.carrito = user.carrito;
  }
}

module.exports = CurrentUserDto;
