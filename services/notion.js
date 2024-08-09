const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID
const today = new Date().toISOString().split('T')[0]; // 获取当天日期
console.log(today)

module.exports = async function getPomo() {

  const createdResults = await notion.databases.query({
    database_id: `${database_id}`,
    filter: {
      "timestamp": "created_time",
      "created_time": {
        "is_not_empty": true, 
        "on_or_before": today
      }
    },
    sorts: [{
      "timestamp": "created_time",
      "direction": "ascending"
    }]
  });

  const editedResults = await notion.databases.query({
    database_id: `${database_id}`,
    filter: {
      "timestamp": "last_edited_time",
      "last_edited_time": {
        "is_not_empty": true, 
        "on_or_before": today
      }
    },
    sorts: [{
      "timestamp": "last_edited_time",
      "direction": "ascending"
    }]
  });

  const combinedResults = [...createdResults.results, ...editedResults.results];

  const pomoMap = new Map();

  combinedResults.forEach(page => {
    const date = page.properties["Created time"]?.created_time || page.properties["Last edited time"]?.last_edited_time;
    if (date) {
      const dateString = new Date(date).toISOString().split('T')[0];
      if (pomoMap.has(dateString)) {
        pomoMap.set(dateString, pomoMap.get(dateString) + 1);
      } else {
        pomoMap.set(dateString, 1);
      }
    }
  });

  const rawPomos = Array.from(pomoMap.entries()).map(([date, pomos]) => {
    return { date, pomos };
  });

  return rawPomos;
}