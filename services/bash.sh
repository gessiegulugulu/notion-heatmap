curl -X POST 'https://api.notion.com/v1/databases/<Database_ID>/query' \
  -H 'Authorization: Bearer '"<Notion_API>"'' \
  -H 'Notion-Version: 2022-06-28' \
  -H "Content-Type: application/json" \
--data '{
  "filter": {
    "property": "Last edited time",
    "date": {
        "is_not_empty": true,
        "on_or_before": "2022-06-28T00:00:00Z"
    }
  }
}'
