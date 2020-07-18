import { Router } from 'express';

import { startOfHour, parseISO } from 'date-fns';

import AppoimentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appoimentsRepository = new AppoimentsRepository();

// interface é para descobrir o tipo de uma info composta

appointmentsRouter.get('/', (req, res) => {
  const appointments = appoimentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parserdDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appoimentsRepository.findByDate(
    parserdDate,
  );

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointmet is already booked' });
  }
  const appointment = appoimentsRepository.create({ provider, date });
  return res.json(appointment);
});

export default appointmentsRouter;
