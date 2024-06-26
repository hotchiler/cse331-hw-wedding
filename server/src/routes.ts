import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

export interface Guest {
  id: string;
  name: string;
  association: 'James' | 'Molly';
  family: boolean;
  dietaryRestrictions?: string;
  bringingGuest?: boolean;
  additionalGuestName?: string;
  additionalGuestDietaryRestrictions?: string;
}

export let guests: Guest[] = [];
let idCounter: number = 0;

const generateId = (): string => {
  return (idCounter++).toString();
};

/**
 * Get all guests.
 * @param _req - The request object.
 * @param res - The response object.
 */
export const getGuests = (_req: SafeRequest, res: SafeResponse): void => {
  res.send(JSON.stringify(guests));
};

/**
 * Add a guest.
 * @param req - The request object.
 * @param res - The response object.
 */
export const addGuest = (req: SafeRequest, res: SafeResponse): void => {
  const { name, association, family, dietaryRestrictions, bringingGuest, additionalGuestName, additionalGuestDietaryRestrictions } = req.body as unknown as Guest;

  if (!name || !association || typeof family !== 'boolean') {
    res.status(400).send('Missing required fields');
    return;
  }

  const newGuest: Guest = {
    id: generateId(),
    name,
    association,
    family,
    dietaryRestrictions,
    bringingGuest,
    additionalGuestName,
    additionalGuestDietaryRestrictions,
  };

  guests.push(newGuest);
  res.status(201).send(JSON.stringify(newGuest));
};

/**
 * Update a guest.
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateGuest = (req: SafeRequest, res: SafeResponse): void => {
  const id = req.params.id;
  const { name, association, family, dietaryRestrictions, bringingGuest, additionalGuestName, additionalGuestDietaryRestrictions } = req.body as unknown as Guest;

  const guestIndex = guests.findIndex(guest => guest.id === id);

  if (guestIndex === -1) {
    res.status(404).send(JSON.stringify({ error: 'Guest not found' }));
    return;
  }

  if (!name || !association || typeof family !== 'boolean') {
    res.status(400).send('Invalid data format');
    return;
  }

  guests[guestIndex] = Object.assign({}, guests[guestIndex], {
    name,
    association,
    family,
    dietaryRestrictions,
    bringingGuest,
    additionalGuestName,
    additionalGuestDietaryRestrictions,
  });

  res.send(JSON.stringify(guests[guestIndex]));
};
