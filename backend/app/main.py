# main.py - FastAPI Application Entry Point
#
# This file will contain:
# - FastAPI app instance creation
# - CORS middleware configuration (allow frontend origin)
# - Lifespan events for startup/shutdown:
#   - Initialize database connection pool
#   - Connect to Redis
#   - Load static GTFS data into memory
#   - Start background task for periodic MTA feed polling
# - Include routers from routers/ directory
# - Health check endpoint
from fastapi import FastAPI
from app.routers import thinking, trips

app = FastAPI()

app.include_router(thinking.router)
app.include_router(trips.router)

@app.get("/health")
async def health():
    return {"status": "ok"}