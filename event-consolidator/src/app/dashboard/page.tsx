"use client";

import { useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  date: string;
};

export default function DashboardPage() {
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [radius, setRadius] = useState<number>(25);
  const [eventType, setEventType] = useState<string>("all");

  const events: Event[] = [
    {
      id: 1,
      title: "Summer Music Festival",
      description: "Live bands, food trucks, and fun in the park.",
      price: "$25",
      location: "Central Park",
      date: "Aug 20, 2025",
    },
    {
      id: 2,
      title: "Tech Meetup",
      description: "Networking for developers and startup founders.",
      price: "Free",
      location: "Downtown Co-Work",
      date: "Aug 25, 2025",
    },
    {
      id: 3,
      title: "Art Exhibition",
      description: "Local artists showcase their latest works.",
      price: "$15",
      location: "City Gallery",
      date: "Aug 28, 2025",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-white to-green-100">
      {/* Top bar */}
      <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">Event Dashboard</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Logout
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left filters */}
        <aside className="w-full lg:w-64 bg-white border-r border-gray-200 p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Price Filter
            </h2>
            <input
              type="range"
              min={0}
              max={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <p className="text-sm text-gray-600">Up to ${maxPrice}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Distance Radius
            </h2>
            <input
              type="range"
              min={1}
              max={100}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <p className="text-sm text-gray-600">Within {radius} miles</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Event Type
            </h2>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="all">All</option>
              <option value="music">Music</option>
              <option value="tech">Tech</option>
              <option value="art">Art</option>
            </select>
          </div>
        </aside>

        {/* Event list */}
        <section className="flex-1 p-6 space-y-6 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-green-800">
                  {event.title}
                </h3>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  {event.price}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{event.location}</span>
                <span>{event.date}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Right filters */}
        <aside className="hidden lg:block w-64 bg-white border-l border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            More Filters
          </h2>
          <p className="text-sm text-gray-600">Coming soon...</p>
        </aside>
      </div>
    </main>
  );
}
