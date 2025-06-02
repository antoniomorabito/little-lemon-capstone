// Helper function to format date as YYYY-MM-DD for localStorage key
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Default times to be used if no times are found in localStorage for a new date
const getDefaultAvailableTimes = () => {
  return ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
};

/**
 * Fetches available reservation times for a given date.
 * - First, checks localStorage for previously stored times for this date.
 * - If found, returns them.
 * - If not found, generates default times, stores them in localStorage, and then returns them.
 * @param {Date} date - The date for which to fetch available times.
 * @returns {string[]} An array of available time strings.
 */
const fetchAPI = function(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error("fetchAPI: Invalid date provided", date);
    return []; // Return empty array for invalid date
  }

  const dateKey = formatDateKey(date);
  let availableTimes = [];

  try {
    const storedTimes = localStorage.getItem(dateKey);
    if (storedTimes) {
      console.log(`fetchAPI: Found times in localStorage for ${dateKey}:`, storedTimes);
      availableTimes = JSON.parse(storedTimes);
    } else {
      console.log(`fetchAPI: No times in localStorage for ${dateKey}. Generating default times.`);
      availableTimes = getDefaultAvailableTimes();
      localStorage.setItem(dateKey, JSON.stringify(availableTimes));
      console.log(`fetchAPI: Stored default times for ${dateKey} in localStorage.`);
    }
  } catch (error) {
    console.error("fetchAPI: Error accessing localStorage or parsing data:", error);
    // Fallback to default times if localStorage access fails, but don't try to store again if storing failed.
    availableTimes = getDefaultAvailableTimes();
  }
  return availableTimes;
};

/**
 * Submits reservation data.
 * For this local implementation, it always returns true to simulate success.
 * @param {object} formData - The reservation data.
 * @returns {boolean} True if submission is considered successful, false otherwise.
 */
const submitAPI = function(formData) {
  console.log("submitAPI: FormData received:", formData);
  // In a real scenario, this would interact with a backend.
  // For local simulation, we can optionally log to localStorage or just return true.
  try {
    let submissions = JSON.parse(localStorage.getItem('reservations_log')) || [];
    submissions.push({ ...formData, submissionTimestamp: new Date().toISOString() });
    localStorage.setItem('reservations_log', JSON.stringify(submissions));
    console.log("submitAPI: Reservation data logged to localStorage under 'reservations_log'.");
    return true; // Simulate successful submission
  } catch (error) {
    console.error("submitAPI: Error logging to localStorage:", error);
    return false; // Simulate failure if logging fails (optional behavior)
  }
};

// Make functions available globally if script is loaded directly
if (typeof window !== 'undefined') {
  window.fetchAPI = fetchAPI;
  window.submitAPI = submitAPI;
  console.log("api.js: fetchAPI and submitAPI are now available on the window object.");
}
