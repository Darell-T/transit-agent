# ai_advisor.py - Claude AI Integration
#
# This file will contain:
# - Anthropic Python SDK client initialization
# - Service alert translation:
#   - Input: Raw MTA service alert text (often cryptic/technical)
#   - Output: Plain-English explanation for riders
# - Route recommendation reasoning:
#   - Synthesize delay data, route options, and context
#   - Generate natural language recommendation
#   - Include confidence explanation
# - Use Claude tool use / structured output for clean JSON responses:
#   {
#     "departure_time": "...",
#     "arrival_estimate": "...",
#     "confidence": 0.85,
#     "explanation": "...",
#     "alternatives": [...]
#   }
# - Prompt templates for consistent, helpful responses
# - Error handling for API rate limits and failures
