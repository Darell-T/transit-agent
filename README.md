# Transit Agent

An intelligent NYC subway transit assistant powered by real-time MTA data and Claude AI. Helps riders get to their destination on time by analyzing delays, suggesting optimal routes, and recommending when to leave.

## What It Does

- Accepts user origin and destination as street addresses (like Apple Maps)
- Geocodes addresses and finds the nearest subway stations
- Determines which subway routes connect the two stations (direct or with transfers)
- Fetches real-time MTA GTFS-RT feeds for relevant train lines
- Provides arrival predictions, delay information, and alternative route suggestions
- Claude AI advisor interprets the data and gives plain-language recommendations

## Project Structure

```
transitAgent/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models and Pydantic schemas
│   │   ├── routers/         # FastAPI route handlers
│   │   ├── services/        # Core business logic
│   │   │   ├── mta_feed.py        # Real-time MTA GTFS-RT feed fetcher and parser
│   │   │   ├── route_calculator.py # Route planning between stations
│   │   │   ├── delay_analyzer.py   # Historical delay analysis
│   │   │   └── ai_advisor.py       # Claude AI integration
│   │   └── utils/            # Shared utilities
│   │       ├── gtfs_static.py      # Static GTFS data loader and indexer
│   │       ├── geo.py              # Geocoding and distance calculations
│   │       └── cache.py            # Redis caching
│   ├── data/
│   │   └── gtfs_static/     # MTA static GTFS files (not committed, see Setup)
│   └── requirements.txt
└── frontend/                 # Next.js application
```

## Current Status

### Implemented

- **Static GTFS data layer** (`gtfs_static.py`) -- Loads and indexes MTA subway stops, routes, transfers, and stop-to-route mappings from CSV files. Provides lookup methods for station search, route discovery, and transfer options.
- **Real-time feed layer** (`mta_feed.py`) -- Fetches live GTFS-RT protobuf feeds from MTA endpoints. Supports parallel fetching of multiple feeds. Parses trip updates into structured data with route, stop, arrival time, and delay information.
- **Geolocation utilities** (`geo.py`) -- Geocodes street addresses to coordinates using Nominatim. Finds nearest subway stations with distance and walking time estimates. Validates addresses are within NYC bounds.

### Not Yet Implemented

- Route calculator (connecting static data, feeds, and geo into trip planning)
- FastAPI endpoints and WebSocket monitoring
- Claude AI advisor for route recommendations
- Redis caching for feed data
- Historical delay analysis
- Frontend UI

## Setup

### Prerequisites

- Python 3.12+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

### GTFS Static Data

Download the latest MTA subway GTFS static data and place the .txt files in `backend/data/gtfs_static/`:

http://web.mta.info/developers/data/nyct/subway/google_transit.zip

Required files: `stops.txt`, `routes.txt`, `trips.txt`, `stop_times.txt`, `transfers.txt`, `calendar.txt`, `calendar_dates.txt`, `shapes.txt`, `agency.txt`

### Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

## Tech Stack

- **Backend**: FastAPI, httpx, protobuf (gtfs-realtime-bindings), geopy, SQLAlchemy
- **Frontend**: Next.js
- **AI**: Anthropic Claude
- **Data**: MTA GTFS Static + GTFS-RT real-time feeds

## License

MIT
