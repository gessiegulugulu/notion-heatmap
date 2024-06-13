curl -X POST 'https://api.notion.com/v1/databases/d24783c24944442c9977e3c9faa4cc08/query' \
  -H 'Authorization: Bearer '"secret_gfvY7u5qDp2JLLyh2Mp6u2Frjsxyc5hggWTRiDVVUzz"'' \
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