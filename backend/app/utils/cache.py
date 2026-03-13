# cache.py - Redis Caching Wrapper
#
# This file will contain:
# - Redis client initialization from REDIS_URL
# - Caching wrapper with TTL management:
#   - cache_get(key) -> Optional[bytes]
#   - cache_set(key, value, ttl_seconds)
#   - cache_delete(key)
#   - cache_get_or_set(key, factory_fn, ttl_seconds)
#
# - Specific caching functions for MTA data:
#   - cache_trip_updates(feed_data, ttl=30)
#   - cache_service_alerts(feed_data, ttl=60)
#   - cache_vehicle_positions(feed_data, ttl=15)
#   - get_cached_trip_updates() -> Optional[FeedData]
#
# - JSON serialization helpers for complex objects
# - Error handling for Redis connection issues

import redis
import os

redis_client = redis.from_url(os.getenv("REDIS_URL"))

def cache_get(key):

    cached_entry = redis_client.get(key)

    return cached_entry

def cache_set(key, value, ttl_seconds):

    redis_client.setex(key, ttl_seconds, value)

def cache_delete(key):
    redis_client.delete(key)

def cache_trip_updates(key, feed_data, ttl = 30):
    cache_set(key, feed_data, ttl)

def cache_incidents(key, incident_data, ttl = 3600):
    cache_set(key, incident_data, ttl)

def cache_service_alerts(feed_data, ttl = 60):
    cache_set(feed_data, ttl)
