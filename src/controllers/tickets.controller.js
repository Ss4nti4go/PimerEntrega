import { ticketService } from '../service/index.js';
import  ErrorManager  from '../dao/ErrorManager.js'; // Asegúrate de tener esta clase o ajusta el manejo

class TicketController {
  constructor() {
    this.service = ticketService;
  }

  // Método para comprar un ticket
  comprar = async (req, res) => {
    try {
      const { amount, purchaser } = req.body;
      const ticket = await this.service.crearTicket({ amount, purchaser });

      res.status(201).json({ success: true, ticket });
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      res.status(error.code || 500).json({ success: false, error: error.message });
      throw new ErrorManager(error.message, error.code || 500);
    }
  };

  // Método para obtener un ticket por su ID
  getTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
      const ticket = await this.service.getTicket(ticketId);
      if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket no encontrado' });
      }
      res.status(200).json({ success: true, ticket });
    } catch (error) {
      console.error(`Error al obtener el ticket con ID ${ticketId}:`, error);
      res.status(error.code || 500).json({ success: false, error: error.message });
      throw new ErrorManager(error.message, error.code || 500);
    }
  };

  // Método para actualizar un ticket
  updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { amount, purchaser } = req.body;

    try {
      const updatedTicket = await this.service.updateTicket(ticketId, { amount, purchaser });
      if (!updatedTicket) {
        return res.status(404).json({ success: false, message: 'Ticket no encontrado para actualizar' });
      }
      res.status(200).json({ success: true, ticket: updatedTicket });
    } catch (error) {
      console.error(`Error al actualizar el ticket con ID ${ticketId}:`, error);
      res.status(error.code || 500).json({ success: false, error: error.message });
      throw new ErrorManager(error.message, error.code || 500);
    }
  };

  // Método para eliminar un ticket
  deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
      const deletedTicket = await this.service.deleteTicket(ticketId);
      if (!deletedTicket) {
        return res.status(404).json({ success: false, message: 'Ticket no encontrado para eliminar' });
      }
      res.status(200).json({ success: true, message: `Ticket con ID ${ticketId} eliminado exitosamente` });
    } catch (error) {
      console.error(`Error al eliminar el ticket con ID ${ticketId}:`, error);
      res.status(error.code || 500).json({ success: false, error: error.message });
      throw new ErrorManager(error.message, error.code || 500);
    }
  };
}

export default TicketController;
