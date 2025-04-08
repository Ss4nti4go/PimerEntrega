
import { sendTicketEmail } from '../utils/mailer.js';

class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Crear ticket y enviar email
  createTicket = async ({ amount, purchaser }) => {
    // Crear ticket
    const ticket = await this.dao.create({ amount, purchaser });

    // Enviar correo
    await sendTicketEmail(purchaser, ticket);

    return ticket;
  }

  // Obtener todos los tickets
  getTickets = async () => {
    return await this.dao.get();
  }

  // Obtener un ticket por ID
  getTicketById = async (id) => {
    return await this.dao.getBy(id);
  }

  // Eliminar un ticket por ID
  deleteTicket = async (id) => {
    return await this.dao.delete(id);
  }

  // Actualizar un ticket
  updateTicket = async (id, ticketData) => {
    return await this.dao.update(id, ticketData);
  }
}

export default TicketRepository;
