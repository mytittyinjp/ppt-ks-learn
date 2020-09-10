import { RequestHandler } from "express";
import { Event } from "../models/event";

const EVENTS: Event[] = [];

export const getEvents: RequestHandler = (req, res, next) => {
  res.json({ events: EVENTS });
};

export const postEvent: RequestHandler = (req, res, next) => {
  const eventId = Math.random().toString(32).substring(2);
  const eventName = (req.body as Event).name;
  const eventDesc = (req.body as Event).description;
  const newEvent = new Event(eventId, eventName, eventDesc);

  EVENTS.push(newEvent);

  res.status(201).json({ message: "Created Event", createdEvent: newEvent });
};

export const updateEvent: RequestHandler<{ id: string }> = (req, res, next) => {
  const eventId = req.params.id;
  const eventName = (req.body as Event).name;
  const eventDesc = (req.body as Event).description;

  const eventIndex = EVENTS.findIndex((event) => event.id === eventId);

  if (eventIndex < 0) {
    throw new Error("Not Found Event");
  }

  EVENTS[eventIndex] = new Event(eventId, eventName, eventDesc);

  res.json({ message: "Updated Event", updatedEvent: EVENTS[eventIndex] });
};

export const deleteEvent: RequestHandler<{ id: string }> = (req, res, next) => {
  const eventId = req.params.id;

  const eventIndex = EVENTS.findIndex((event) => event.id === eventId);

  if (eventIndex < 0) {
    throw new Error("Not Found Event");
  }

  EVENTS.splice(eventIndex, 1);

  res.json({ message: "Deleted Event" });
};
