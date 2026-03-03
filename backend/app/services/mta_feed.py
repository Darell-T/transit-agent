# mta_feed.py - MTA GTFS-RT Feed Fetcher
#
# This file will contain:
# - Functions to fetch and parse MTA GTFS-RT protobuf feeds:
#   - Trip Updates: Real-time arrival/departure predictions per stop
#   - Service Alerts: Planned work, delays, suspensions
#   - Vehicle Positions: Live train/bus locations
# - Use gtfs-realtime-bindings package to parse protobuf responses
# - Cache parsed feed data in Redis with 30-60 second TTL
# - Handle feed fetch errors gracefully with fallback to cached data
# - Periodic background task to poll feeds and update cache
# - Feed URLs:
#   - Subway: https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs
#   - Bus: https://bustime.mta.info/api/siri/vehicle-monitoring.json

from google.transit import gtfs_realtime_pb2
from datetime import datetime, timezone, timedelta
import httpx
import asyncio

EST = timezone(timedelta(hours=-5))

BASE_URL = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs"

route_to_feed = {
    "A": "ace", "C": "ace", "E": "ace",
    "B": "bdfm", "D": "bdfm", "F": "bdfm", "M": "bdfm",
    "G": "g",
    "J": "jz", "Z": "jz",
    "N": "nqrw", "Q": "nqrw", "R": "nqrw", "W": "nqrw",
    "L": "l",
    "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "",
    "SI": "si",
}


async def fetch_feeds(routes: list) -> list:
    # get unique feed URLs needed for the given routes
    unique_suffixes = set()
    for route in routes:
        if route in route_to_feed:
            unique_suffixes.add(route_to_feed[route])

    if not unique_suffixes:
        print("Error: No valid train routes provided.")
        return []

    # build URLs from unique suffixes
    urls = []
    for suffix in unique_suffixes:
        url = f"{BASE_URL}-{suffix}" if suffix else BASE_URL
        urls.append(url)

    # fetch all feeds in parallel
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)

    return [r.content for r in responses]
    


def parse_bytes(rawBytes: bytes) -> list:
    user_feed = gtfs_realtime_pb2.FeedMessage()
    user_feed.ParseFromString(rawBytes)

    trip_updates  = []


    for entity in user_feed.entity:
        if entity.HasField("trip_update"):
            trip = entity.trip_update
            
            trip_id = trip.trip.trip_id
            route_id = trip.trip.route_id

            for stop in trip.stop_time_update:
                trip_updates.append({"route_id": route_id,
                "trip_id": trip_id,
                "stop_id": stop.stop_id,
                "arrival_time": datetime.fromtimestamp(stop.arrival.time, tz=EST).strftime("%I:%M %p") if stop.arrival.time else None,
                "delay": stop.arrival.delay})
            
    
    return trip_updates



