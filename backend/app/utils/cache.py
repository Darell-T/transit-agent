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
