"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.postEvent = exports.getEvents = void 0;
const event_1 = require("../models/event");
const EVENTS = [];
exports.getEvents = (req, res, next) => {
    res.json({ events: EVENTS });
};
exports.postEvent = (req, res, next) => {
    const eventId = Math.random().toString(32).substring(2);
    const eventName = req.body.name;
    const eventDesc = req.body.description;
    const newEvent = new event_1.Event(eventId, eventName, eventDesc);
    EVENTS.push(newEvent);
    res.status(201).json({ message: "Created Event", createdEvent: newEvent });
};
exports.updateEvent = (req, res, next) => {
    const eventId = req.params.id;
    const eventName = req.body.name;
    const eventDesc = req.body.description;
    const eventIndex = EVENTS.findIndex((event) => event.id === eventId);
    if (eventIndex < 0) {
        throw new Error("Not Found Event");
    }
    EVENTS[eventIndex] = new event_1.Event(eventId, eventName, eventDesc);
    res.json({ message: "Updated Event", updatedEvent: EVENTS[eventIndex] });
};
exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.id;
    const eventIndex = EVENTS.findIndex((event) => event.id === eventId);
    if (eventIndex < 0) {
        throw new Error("Not Found Event");
    }
    EVENTS.splice(eventIndex, 1);
    res.json({ message: "Deleted Event" });
};
