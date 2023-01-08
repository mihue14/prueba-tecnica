# PRUEBA TÉCNICA

## ENDPOINTS

### Rooms
1. GET - Obtener todas las habitaciones incluyendo sus reservas.
2. POST - Crear una habitación con la información de su descripción.

### Bookings 
1. GET - Obtener todas las reservas incluyendo los datos del cliente que la hizo y la habitación reservada.
2. GET (/:id) - Obtener una reserva por su ID incluyendo los datos del cliente que la hizo y la habitación reservada. Sirve por si solo queremos encontrar una reserva.
3. POST - Crear una reserva con la información de el nombre, apellido, email y NIT del cliente que la realiza; el ID de la habitación a reservar; los días de checkIn y checkOut; la cantidad a pagar y su método de pago. Cuenta con validacion de fecha, osea que no podremos realizar una nueva reserva si los días elegidos coinciden con los días de reservas previamente realizdas.
4. PUT (/paid) - Cambiar el estado de la reserva de "Pendiente" a "Pagado". Sólo se puede cambiar una vez el estado, para evitar problemas a futuros de cambiar una reserva que ya estaba pagada a cancelada por ejemplo.
5. PUT (/deleted) - Cambiar el estadao de la reserva de "Pendiente" a "Eliminado". Al igual que la anterior ruta, esta tambien solo se puede cambiar una vez el estado.

### Clients
1. GET - Obtener todos los clientes incluyendo la informacion de sus reservas realizadas.
