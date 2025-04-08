import { Router } from "express";
import TicketController from "../../controllers/tickets.controller.js";

export const TicketRouter = Router();
const {
    comprar,
    getTicket,
    updateTicket,
    deleteTicket
} = new TicketController();

TicketRouter.post('/', comprar);  // Para crear un nuevo ticket (comprar)
TicketRouter.get('/:ticketId', getTicket);  // Para obtener un ticket específico por ID
TicketRouter.put('/:ticketId', updateTicket);  // Para actualizar un ticket por ID
TicketRouter.delete('/:ticketId', deleteTicket);  // Para eliminar un ticket por ID
