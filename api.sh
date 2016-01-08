#!/bin/bash
curl -u "${FRESHDESK_API_KEY}:X" -H "Content-Type: application/json" -X GET https://picovico.freshdesk.com/solution/categories.json -o categories.json
