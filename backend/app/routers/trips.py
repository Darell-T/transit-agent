# trips.py - Trip Query Endpoint
#
# POST /api/trip
#
# This file will contain:
# - Trip planning endpoint that accepts origin, destination, and arrive_by time
# - Workflow:
#   1. Validate request payload
#   2. Call route_calculator service to compute best routes
#   3. Apply real-time delay adjustments from MTA feed data
#   4. Call ai_advisor service to generate plain-English explanation
#   5. Compute confidence score based on current conditions and historical data
#   6. Return TripResponse with recommendation, route legs, and alternatives
# - Store trip in database
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.route_calculator import nearest_stops, possible_routes, get_schedule, combine_data
from app.services.ai_advisor import get_recommendation
from app.services.incident_monitor import get_incidents

router = APIRouter()

class TripRequest(BaseModel):
    origin: str
    destination: str

@router.post("/api/trip")
async def plan_trip(request: TripRequest):
    closest_stops = nearest_stops(request.origin, request.destination)
    route_options = possible_routes(closest_stops)

    user_schedule = await get_schedule(route_options)

    station_names = []
    for stop in closest_stops["origin_stops"]:
        station_names.append(stop["stop_name"])
    
    for stop in closest_stops["dest_stops"]:
        station_names.append(stop["stop_name"])

    incident_reports = get_incidents(station_names)

    combined_data = combine_data(route_options, user_schedule, closest_stops)
    
    route_rec = get_recommendation(combined_data, incident_reports)

    return route_rec
