import { Layers, Plus } from 'lucide-react';

export function StrategyBoard() {
  const columns = ['Facts', 'Issues', 'Law', 'Arguments', 'Counter-Arguments', 'Weaknesses', 'Strategy'];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Strategy Board</h1>
          <p className="text-gray-600">Visual canvas to organize case strategy and arguments</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {columns.map((column, index) => (
              <div key={index} className="w-64 flex-shrink-0">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <h3 className="text-blue-900">{column}</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-move">
                    <p className="text-sm text-gray-700">
                      Click to add {column.toLowerCase()}...
                    </p>
                  </div>
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Board
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
