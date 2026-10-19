const axios = require('axios');

const COLLECTOR_ID = process.env.COLLECTOR_ID || "c_mt0bxaoi1yl2y39685";

/**
 * Dispatches a scrape job to Bright Data Scraper Studio
 */
async function triggerCloudCollector(targetUrl = "https://nidhi-prayas.org") {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  if (!apiKey) {
    console.error('[BRIGHT DATA API] BRIGHTDATA_API_KEY not set. Add it to your .env file (see .env.example).');
    return { success: false, error: 'BRIGHTDATA_API_KEY not set' };
  }

  const triggerEndpoint = `https://api.brightdata.com/dca/trigger?collector=${COLLECTOR_ID}&queue_next=1`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const res = await axios.post(triggerEndpoint, [{ url: targetUrl }], { headers, timeout: 8000 });
    console.log(`[BRIGHT DATA API] Cloud Collector Dispatched: ${res.data.response_id || 'JOB_ACTIVE'}`);
    return { success: true, response_id: res.data.response_id };
  } catch (err) {
    const status = err.response ? err.response.status : null;
    console.warn(`[BRIGHT DATA API] Collector trigger failed${status ? ` (HTTP ${status})` : ''}:`, err.message);
    return { success: false, error: err.message, status, collector_id: COLLECTOR_ID };
  }
}

module.exports = { triggerCloudCollector, COLLECTOR_ID };
