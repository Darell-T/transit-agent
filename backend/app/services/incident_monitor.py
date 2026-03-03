# incident_monitor.py - Grok-Powered Incident Detection
#
# This service runs as a background job (every 10 minutes) to detect
# real-time incidents near NYC subway stations that could cause delays
# before MTA officially reports them.
#
# Architecture:
#   1. Background scheduler triggers this service every 10 minutes
#   2. Sends a prompt to the xAI Grok API (grok-4.1-fast model)
#      asking about recent incidents near major subway stations
#   3. Grok has real-time access to X/Twitter posts and can scan
#      accounts like @NYCrimeNow and @CitizenAppNYC for breaking
#      incidents (fires, police activity, medical emergencies, etc.)
#   4. Parses Grok's response into structured incident data
#   5. Caches results with a timestamp so they stay fresh
#   6. When a user requests a route, cached incidents along their
#      path are pulled and fed to Claude alongside transit data
#
# Data flow:
#   Grok API -> parse response -> cache incidents -> ai_advisor.py reads cache
#
# Each cached incident will contain:
#   - location (address or cross-street)
#   - nearby_stations (list of stop_ids within ~0.3 miles)
#   - severity (low / medium / high)
#   - description (plain English summary)
#   - source (which X account or feed reported it)
#   - timestamp (when the incident was detected)
#
# Dependencies:
#   - xAI API key (from api.x.ai)
#   - geo.py for proximity calculations (station matching)
#   - A cache layer (in-memory dict for MVP, Redis for production)
