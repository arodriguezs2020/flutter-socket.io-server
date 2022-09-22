
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metalica'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
     });
    
     client.on('mensaje', (payload) => {
        console.log('Mensaje', payload.nombre)

        io.emit('mensaje', {admin: 'Nuevo mensaje'})
     } );

     client.on('emitir', (payload) => {
      console.log(payload);
      io.emit('nuevo', payload);
     });

     client.on('vote-band', (payload) => {
         bands.voteBand(payload.id);
         io.emit('active-bands', bands.getBands());
     });

     client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());  
     });

      client.on('delete-band', (payload) => {

         bands.deleteBand(payload.id);
         console.log(bands.getBands());
         io.emit('active-bands', bands.getBands());  
         });
  });
