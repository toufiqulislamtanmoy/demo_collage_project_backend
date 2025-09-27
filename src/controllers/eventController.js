import Event from "../models/eventModel.js";
import University from "../models/universityModel.js";

//  Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("university");
    res.status(200).json({
      status: "success",
      reason: "Fetched all events successfully",
      status_code: 200,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};

//  Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("university");
    if (!event) {
      return res.status(404).json({
        status: "failed",
        reason: "Event not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Fetched event successfully",
      status_code: 200,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};

//  Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, date, university } = req.body;

    // check if university exists
    const uni = await University.findById(university);
    if (!uni) {
      return res.status(404).json({
        status: "failed",
        reason: "University not found",
        status_code: 404,
        data: null
      });
    }

    const newEvent = new Event({ title, date, university });
    const savedEvent = await newEvent.save();

    // Add event reference to university.events array
    uni.events.push(savedEvent._id);
    await uni.save();

    res.status(201).json({
      status: "success",
      reason: "Event created successfully",
      status_code: 201,
      data: savedEvent
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null
    });
  }
};

//  Update event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({
        status: "failed",
        reason: "Event not found",
        status_code: 404,
        data: null
      });
    }
    res.status(200).json({
      status: "success",
      reason: "Event updated successfully",
      status_code: 200,
      data: updatedEvent
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      reason: err.message,
      status_code: 400,
      data: null
    });
  }
};

//  Delete event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({
        status: "failed",
        reason: "Event not found",
        status_code: 404,
        data: null
      });
    }

    // Remove reference from university.events array
    await University.findByIdAndUpdate(
      deletedEvent.university,
      { $pull: { events: deletedEvent._id } }
    );

    res.status(200).json({
      status: "success",
      reason: "Event deleted successfully",
      status_code: 200,
      data: deletedEvent
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      reason: err.message,
      status_code: 500,
      data: null
    });
  }
};
