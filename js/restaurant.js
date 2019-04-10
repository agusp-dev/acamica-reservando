var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
   this.horarios = this.horarios.filter(horario => horario !== horarioReservado);
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones != null && this.calificaciones.length > 0) {
        return Math.round(this.promedio(this.calificaciones) * 10) / 10;
    }
    return 0;
}

Restaurant.prototype.promedio = function(array) {
    return (this.sumatoria(array) / array.length);
}

Restaurant.prototype.sumatoria = function(arr) {
    var acum = 0;
    arr.forEach(num => {
        acum += num;
    });
    return acum;
}



