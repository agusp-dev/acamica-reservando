var expect = chai.expect;

describe('Test de reserva de horario', function() {

    it( 'Horario encontrado', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantHorarios = restaurant.horarios.length;
        var primerHorario = restaurant.horarios[0];
        restaurant.reservarHorario(primerHorario);
        //Verifica que la cantidad de horarios disminuye.
        expect(restaurant.horarios.length).to.equal(cantHorarios - 1);
        //Verifica que el horario eliminado no esta en el array.
        expect(restaurant.horarios[0]).to.not.equal(primerHorario);
    });

    it( 'Horario no encontrado', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantHorarios = restaurant.horarios.length;
        restaurant.reservarHorario('29:00'); //horario no existente en el array
        expect(restaurant.horarios.length).to.equal(cantHorarios);
    });

    it( 'Sin parametro', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantHorarios = restaurant.horarios.length;
        restaurant.reservarHorario();
        expect(restaurant.horarios.length).to.equal(cantHorarios);
    });

    it( 'Parametro entero', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantHorarios = restaurant.horarios.length;
        restaurant.reservarHorario(10);
        expect(restaurant.horarios.length).to.equal(cantHorarios);
    });

    it( 'Parametro nulo', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantHorarios = restaurant.horarios.length;
        restaurant.reservarHorario(null);
        expect(restaurant.horarios.length).to.equal(cantHorarios);
    });
});

describe('Test de obtener puntuacion', function() {

    it('Promedio de lista de calificaciones', function() {
        var restaurant = listado.buscarRestaurante(1);
        var acum = 0;
        restaurant.calificaciones.forEach(function(c) {
            acum += c;
        });
        expect(restaurant.obtenerPuntuacion()).to.equal(acum/restaurant.calificaciones.length);
    });

    it('Promedio de lista de calificaciones vacia', function() {
        var restaurant = listado.buscarRestaurante(1);
        restaurant.calificaciones = [];
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    });
});

describe('Test de calificar', function() {

    it('Nueva calificacion - valor positivo', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(6);
        //Verifica que la cantidad de puntuaciones cambió
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes + 1);
        //Verifica que la puntuacion realmente se agrego al final del array
        var indicePuntuacion = restaurant.calificaciones.length - 1;
        expect(restaurant.calificaciones[indicePuntuacion]).to.equal(6);
    });

    it('Nueva calificacion (10)', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(10);
        //Verifica que la cantidad de puntuaciones cambió
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes + 1);
        //Verifica que la puntuacion realmente se agrego al final del array
        var indicePuntuacion = restaurant.calificaciones.length - 1;
        expect(restaurant.calificaciones[indicePuntuacion]).to.equal(10);
    });

    it('Nueva calificacion (0)', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(0);
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });

    it('Nueva calificacion - valor negativo', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(-7);
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });

    it('Nueva calificacion - valor mayor a 10', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(14);
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });

    it('Nueva calificacion - sin parametro', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar();
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });

    it('Nueva calificacion - valor String', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar('8');
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });

    it('Nueva calificacion - valor nulo', function() {
        var restaurant = listado.buscarRestaurante(1);
        var cantPuntuacionesAntes = restaurant.calificaciones.length;
        restaurant.calificar(null);
        //Verifica que la cantidad de puntuaciones no cambie
        expect(restaurant.calificaciones.length).to.equal(cantPuntuacionesAntes);
    });
});

describe('Test de buscar restaurant', function() {

    it('Id existente', function() {
        var restaurant = listado.buscarRestaurante(1);
        expect(restaurant).to.be.an('object');
        expect(restaurant).to.eql(listado.buscarRestaurante(1));
    });

    it('Id no existente', function() {
        var restaurant = listado.buscarRestaurante(-1);
        expect(restaurant).to.be.an('string');
    });

    it('Sin parametro', function() {
        var restaurant = listado.buscarRestaurante();
        expect(restaurant).to.be.an('string');
    });

    it('parametro string', function() {
        var restaurant = listado.buscarRestaurante('4');
        expect(restaurant).to.be.an('string');
    });

    it('parametro nulo', function() {
        var restaurant = listado.buscarRestaurante(null);
        expect(restaurant).to.be.an('string');
    });

});

describe('Test de obtener restaurantes', function() {

    //Filtros generales

    it('Con los 3 filtros nulos, se espera obtener todos los restaurantes, sin filtro.', function() {
        var cantidadRestaurantes = listado.restaurantes.length;
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, null);
        expect(restaurantesFiltrados.length).to.equal(cantidadRestaurantes);
    });

    it('Pasando solo dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Pasando solo un filtro nulo, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con los 3 filtros vacios, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('', '', '');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Pasando solo dos filtros vacios, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('', '');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Pasando solo un filtro vacios, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con los 3 filtros integer, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(4, 2, 43);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Pasando solo dos filtros integer, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(44, 2);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Pasando solo un filtro integer, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(34);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('No pasando parametros, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(34);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Filtro Rubro

    it('Con el filtro rubro "Pizza" y los otros dos filtros nulos, se espera obtener todos los restaurantes de "Pizza"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', null, null);
        var restaurantesDePizza = listado.restaurantes.filter(restaurant => restaurant.rubro === 'Pizza');
        expect(restaurantesFiltrados).to.eql(restaurantesDePizza);
    });

    it('Con un rubro no existente y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Casa', null, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con un rubro vacio y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('', null, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el primer parametro integer y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(4, null, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Filtro Ciudad

    it('Con el filtro ciudad "Londres" y los otros dos filtros nulos, se espera obtener todos los restaurantes de "Londres"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Londres', null);
        var restaurantesDeLondres = listado.restaurantes.filter(restaurant => restaurant.ubicacion === 'Londres');
        expect(restaurantesFiltrados).to.eql(restaurantesDeLondres);
    });

    it('Con un filtro de ciudad no existente y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Chicago', null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con un filtro ciudad vacio y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, '', null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el segundo parametro integer y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 5, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Filtro Horario

    it('Con el filtro horario "13:00" y los otros dos filtros nulos, se espera obtener todos los restaurantes con horario de "13:00"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, '13:00');
        var restaurantesALas13Hs = listado.restaurantes.filter(function(res) {
            return res.horarios.some(horario => horario == '13:00');
        });
        expect(restaurantesFiltrados).to.eql(restaurantesALas13Hs);
    });

    it('Con un filtro de horario no existente y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, '01:00');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con un filtro horario vacio y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, '');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el tercer parametro integer y los otros dos filtros nulos, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, null, 10);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Dos filtros (primero y segundo)

    it('Con el filtro rubro "Pizza", el filtro ciudad "Londres", y el filtro horario nulo, se espera obtener todos los restaurantes de "Pizza" de "Londres"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', 'Londres', null);
        var restaurantesDePizza = listado.restaurantes.filter(restaurant => restaurant.rubro === 'Pizza');
        restaurantesDePizzaYLondres = restaurantesDePizza.filter(restaurant => restaurant.ubicacion === 'Londres');
        expect(restaurantesFiltrados).to.eql(restaurantesDePizzaYLondres);
    });

    it('Con el filtro rubro "Pizza", el filtro de ciudad no existente, y el filtro horario nulo , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', 'Cordoba', null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });
    
    it('Con el filtro rubro "Pizza", el filtro de ciudad vacio, y el filtro horario nulo , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', '', null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el filtro rubro "Pizza", el segundo parametro integer, y el filtro horario nulo , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', 5, null);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Dos filtros (primero y tercero)

    it('Con el filtro rubro "Pizza", el filtro ciudad nulo, y el filtro horario "12:00", se espera obtener todos los restaurantes de "Pizza" que tengan horario "12:00"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', null, '12:00');
        var restaurantesDePizza = listado.restaurantes.filter(restaurant => restaurant.rubro === 'Pizza');
        restaurantesDePizza12hs = restaurantesDePizza.filter(function(res) {
            return res.horarios.some(horario => horario == '12:00');
        });
        expect(restaurantesFiltrados).to.eql(restaurantesDePizza12hs);
    });

    it('Con el filtro rubro "Pizza", el filtro de ciudad nulo, y el filtro horario no existente , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', null, '01:00');
        expect(restaurantesFiltrados.length).to.equal(0);
    });
    
    it('Con el filtro rubro "Pizza", el filtro de ciudad nulo, y el filtro horario vacio , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', null, '');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el filtro rubro "Pizza", el filtro de ciudad nulo, y el tercer filtro como integer, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', null, 5);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Dos filtros (segundo y tercero)

    it('Con el filtro rubro nulo, el filtro ciudad "Londres", y el filtro horario "12:00", se espera obtener todos los restaurantes de "Londres" que tengan horario "12:00"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Londres', '12:00');
        var restaurantesDeLondres = listado.restaurantes.filter(restaurant => restaurant.ubicacion === 'Londres');
        var restaurantesDeLondres12hs = restaurantesDeLondres.filter(function(res) {
            return res.horarios.some(horario => horario == '12:00');
        });
        expect(restaurantesFiltrados).to.eql(restaurantesDeLondres12hs);
    });

    it('Con el filtro rubro nulo, el filtro de ciudad "Londres", y el filtro horario no existente , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Londres', '01:00');
        expect(restaurantesFiltrados.length).to.equal(0);
    });
    
    it('Con el filtro rubro nulo, el filtro de ciudad "Londres", y el filtro horario vacio , se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Londres', '');
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    it('Con el filtro rubro null, el filtro de ciudad "Londres", y el tercer filtro como integer, se espera obtener una lista vacia', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes(null, 'Londres', 5);
        expect(restaurantesFiltrados.length).to.equal(0);
    });

    //Tres filtros
    
    it('Con el filtro rubro "Pizza", el filtro ciudad "Londres", y el filtro horario "12:00", se espera obtener todos los restaurantes de "Pizza" de Londres" que tengan horario "12:00"', function() {
        var restaurantesFiltrados = listado.obtenerRestaurantes('Pizza', 'Londres', '12:00');
        var restaurantesDePizza = listado.restaurantes.filter(restaurant => restaurant.rubro === 'Pizza');
        var restaurantesDePizzaDeLondres = restaurantesDePizza.filter(restaurant => restaurant.ubicacion === 'Londres');
        var restaurantesDePizzaDeLondres12Hs = restaurantesDePizzaDeLondres.filter(function(res) {
            return res.horarios.some(horario => horario == '12:00');
        });
        expect(restaurantesFiltrados).to.eql(restaurantesDePizzaDeLondres12Hs);
    });
});