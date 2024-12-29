
import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [], // Stores event data
            error: null, // Stores error messages
            newEvent: { // Stores new event details
                name: '',
                description: '',
                date: '',
                time: '',
                venue: '',
            },
        };
    }

    async componentDidMount() {
        this.loadEventsFromData();
    }

    loadEventsFromData() {
        try {
            const eventsData = [
                {
                    id: 1,
                    name: "Music Concert",
                    description: "An evening of fun and music.",
                    date: "2024-12-31",
                    time: "18:00",
                    venue: "City Park",
                },
                {
                    id: 2,
                    name: "Art Exhibition",
                    description: "Explore artistic creations.",
                    date: "2024-01-15",
                    time: "10:00",
                    venue: "Art Gallery",
                },
            ];

            if (Array.isArray(eventsData) && eventsData.length > 0) {
                this.setState({ events: eventsData });
            } else {
                throw new Error("No events available in the data.");
            }
        } catch (e) {
            this.setState({ error: e.message });
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newEvent: {
                ...prevState.newEvent,
                [name]: value,
            },
        }));
    };

    addEvent = () => {
        const { events, newEvent } = this.state;

        // Trim values to avoid whitespace errors
        const trimmedEvent = {
            name: newEvent.name.trim(),
            description: newEvent.description.trim(),
            date: newEvent.date.trim(),
            time: newEvent.time.trim(),
            venue: newEvent.venue.trim(),
        };

        // Log the trimmed event to debug
        console.log(trimmedEvent);

        // Check if all fields are filled (ensure no empty strings)
        if (
            trimmedEvent.name !== '' &&
            trimmedEvent.description !== '' &&
            trimmedEvent.date !== '' &&
            trimmedEvent.time !== '' &&
            trimmedEvent.venue !== ''
        ) {
            const newEventWithId = {
                ...trimmedEvent,
                id: events.length + 1, // Assign a unique ID
            };

            this.setState({
                events: [...events, newEventWithId], // Add new event
                newEvent: { name: '', description: '', date: '', time: '', venue: '' }, // Reset form
            });
        } else {
            alert("Please fill in all fields to create an event.");
        }
    };

    render() {
        const { events, error, newEvent } = this.state;

        const eventlist = events.map((event, key) => (
            <div key={key} className="card col-md-6 col-lg-3 m-4">
                <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">{event.description}</p>
                    <a href="#" className="btn btn-outline-secondary w-100">
                        {event.date} @ {event.time} Hrs
                    </a>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{event.venue}</li>
                    </ul>
                </div>
            </div>
        ));

        if (error) {
            return (
                <div className="container mt-5">
                    <h3 className="text-center text-danger">{error}</h3>
                </div>
            );
        }

        return (
            <div>
                {/* Carousel */}
                <div
                    id="carouselExampleSlidesOnly"
                    className="carousel"
                    data-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                className="d-block w-100"
                                src={require("../../img/banner.jpg")}
                                alt="First slide"
                            />
                            <div className="carousel-caption d-none d-md-block align-center">
                                <h1 className="drop-shadow">Eventzz</h1>
                                <h3 className="drop-shadow">
                                    Your Trusted Event Manager..
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events Section */}
                <div className="container">
                    <div>
                        <h3 className="text-center mt-5">Upcoming Events...</h3>
                        <div className="row mx-auto">{eventlist}</div>
                    </div>
                </div>

                {/* Add Event Section */}
                <div className="container mt-5">
                    <h3 className="text-center">Create a New Event</h3>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={newEvent.name}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={newEvent.description}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={newEvent.date}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    className="form-control"
                                    value={newEvent.time}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    className="form-control"
                                    value={newEvent.venue}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={this.addEvent}
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
