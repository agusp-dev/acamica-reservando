var Reserva = function(horario, cantidadPersonas, precioXpersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioXpersona = precioXpersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.precioBase = function() {
    return this.cantidadPersonas * this.precioXpersona;
}

Reserva.prototype.precioFinal = function() {
    return (this.precioBase() - this.descuentos() + this.adicionales());
}

/**
 * Calcula monto de porcentaje.
 */
Reserva.prototype.calcularPorcentajeMonto = function(monto, porcentaje) {
    return (porcentaje * monto / 100);
}

/**
 * Devuelve descuentos a aplicar.
 */
Reserva.prototype.descuentos = function() {
    return this.descuentoPorCantidadPersonas(this.precioBase(), this.cantidadPersonas) + 
            this.descuentoXCodigo(this.precioBase(), this.codigoDescuento, this.precioXpersona);
}

/**
 * Devuelve monto a descontar a partir de la cantidad de personas.
 */
Reserva.prototype.descuentoPorCantidadPersonas = function(precioBase, personas) {
    var porcentaje = this.descuentoPorcentajeXCantidadPersonas(personas);
    return this.calcularPorcentajeMonto(precioBase, porcentaje);
}

/**
 * Devuelve porcentaje de descuento a partir de la cantidad de personas.
 */
Reserva.prototype.descuentoPorcentajeXCantidadPersonas = function(personas) {
    if (personas >= 4 && personas < 7) {
        return 5;
    } else if (personas == 7 || personas == 8) {
        return 10;
    } else if (personas > 8) {
        return 15;
    } else {
        return 0;
    }
}

/**
 * Devuelve monto a descontar a partir del codigo de descuento.
 */
Reserva.prototype.descuentoXCodigo = function(precioBase, codigo, precioXpersona) {
    switch (codigo) {
        case 'DES15': return this.calcularPorcentajeMonto(precioBase, 15);
        case 'DES200': return 200;
        case 'DES1': return precioXpersona;
        default: return 0;
    }
}

/**
 * Devuelve adicionales a aplicar.
 */
Reserva.prototype.adicionales = function() {
    var porcentajeAdicionales = this.adicionalPorcentajeFinDeSemana(this.horario.getDay()) + 
                                this.adicionalPorcentajeHoraMasConcurrida(this.horario.getHours());
    return this.calcularPorcentajeMonto(this.precioBase(), porcentajeAdicionales);
}

/**
 * Devuelve porcentaje de adicional pasando codigo de dia.
 */
Reserva.prototype.adicionalPorcentajeFinDeSemana = function(dia) {
    return (dia === 5 || dia === 6 || dia === 0) ? 10 : 0;
}

/**
 * Devuelve porcentaje de adicional pasando hora.
 */
Reserva.prototype.adicionalPorcentajeHoraMasConcurrida = function(hora) {
    return (hora === 13 || hora === 20) ? 5 : 0;
}