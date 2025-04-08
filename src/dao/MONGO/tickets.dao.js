import TicketModel from './models/ticket.model.js';

class TicketDAO {
    constructor() {
        this.TicketModel = TicketModel
    }
  async create(data) {
    try {
      const ticket = await TicketModel.create(data);
      return ticket;
    } catch (error) {
      console.error(' Error al crear el ticket en DAO:', error);
      throw error;
    }
  }

  async getBy(id) {
    try {
      const ticket = await TicketModel.findById(id);
      return ticket;
    } catch (error) {
      console.error(' Error al buscar el ticket:', error);
      throw error;
    }
  }

  async get() {
    try {
      const tickets = await TicketModel.find();
      return tickets;
    } catch (error) {
      console.error(' Error al obtener tickets:', error);
      throw error;
    }
  }


}

export default TicketDAO;
