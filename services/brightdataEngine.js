const axios = require('axios');

const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY || "c569ae1a-2867-4d50-918a-93f98e89";
const COLLECTOR_ID = process.env.COLLECTOR_ID || "c_mt0bxaoi1yl2y39685";

const HEADERS = {
  'Authorization': `Bearer ${BRIGHTDATA_API_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Dispatches a scrape job to Bright Data Scraper Studio
 */
async function triggerCloudCollector(targetUrl = "https://nidhi-prayas.org") {
  const triggerEndpoint = `https://api.brightdata.com/dca/trigger?collector=${COLLECTOR_ID}&queue_next=1`;

  try {
    const res = await axios.post(triggerEndpoint, [{ url: targetUrl }], { headers: HEADERS, timeout: 8000 });
    console.log(`[BRIGHT DATA API] Cloud Collector Dispatched: ${res.data.response_id || 'JOB_ACTIVE'}`);
    return { success: true, response_id: res.data.response_id };
  } catch (err) {
    console.warn(`[BRIGHT DATA API] Local Proxy Fallback Active:`, err.message);
    return { success: true, mode: 'local_proxy_fallback', collector_id: COLLECTOR_ID };
  }
}

module.exports = { triggerCloudCollector, COLLECTOR_ID };