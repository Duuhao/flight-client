export default function MyTripsPage() {
  const trips = [
    { id: 1, date: '2025-06-15', from: '上海', to: '北京', flight: 'CA1234' },
    { id: 2, date: '2025-07-20', from: '北京', to: '广州', flight: 'CZ3456' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的行程</h1>
      
      <div className="space-y-4">
        {trips.map(trip => (
          <div key={trip.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{trip.from} → {trip.to}</h3>
                <p className="text-gray-600">{trip.date} | 航班: {trip.flight}</p>
              </div>
              <button className="text-blue-500 hover:text-blue-700">查看详情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
