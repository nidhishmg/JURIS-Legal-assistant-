import { useState } from 'react';
import { Clock, Plus, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  category: 'fact' | 'hearing' | 'filing' | 'other';
}

export function TimelineBuilder() {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: '1', date: '2024-01-10', event: 'Incident occurred', category: 'fact' },
    { id: '2', date: '2024-01-15', event: 'FIR registered', category: 'filing' },
    { id: '3', date: '2024-02-01', event: 'First hearing', category: 'hearing' },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fact': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hearing': return 'bg-green-100 text-green-700 border-green-200';
      case 'filing': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Timeline Builder</h1>
          <p className="text-gray-600">Create chronological timeline of case events</p>
        </div>

        <button className="w-full mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Event
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="relative">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-4 mb-8 last:mb-0">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center z-10">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  {index < events.length - 1 && (
                    <div className="absolute top-10 left-5 w-0.5 h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <p className="text-gray-900">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Timeline
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Add to Case
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
