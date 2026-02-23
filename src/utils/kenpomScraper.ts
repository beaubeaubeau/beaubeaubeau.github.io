import type { Team } from '../types';

/**
 * Web scraping utility for KenPom.com
 * Note: Due to CORS restrictions, this will need to be run through a proxy
 * or serverless function in production. For development, you may need a CORS proxy.
 */

const KENPOM_BASE_URL = 'https://kenpom.com';

/**
 * Normalize team name for URL matching
 * KenPom URLs use lowercase with hyphens instead of spaces
 */
function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetch team data from KenPom.com
 * @param teamName - Name of the team
 * @param year - 2-digit year (e.g., "25" for 2025)
 * @returns Team data or null if not found
 */
export async function fetchTeamData(teamName: string, year: string): Promise<Team | null> {
  try {
    // KenPom uses a specific URL format: https://kenpom.com/index.php?y=YY
    // Team data is in a table on that page
    const url = `${KENPOM_BASE_URL}/index.php?y=${year}`;
    
    // Use a CORS proxy for development/testing
    // In production, this should be done server-side or via a serverless function
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch KenPom data: ${response.statusText}`);
    }
    
    const data = await response.json();
    const htmlContent = data.contents;
    
    // Parse the HTML to extract team data
    return parseTeamDataFromHTML(htmlContent, teamName);
  } catch (error) {
    console.error('Error fetching team data:', error);
    return null;
  }
}

/**
 * Parse team data from KenPom HTML table
 * KenPom table structure: Rank, Team, Conf, W-L, AdjEM, AdjO, AdjD, AdjT, Luck, SOS AdjEM, NCSOS AdjEM
 */
function parseTeamDataFromHTML(html: string, teamName: string): Team | null {
  try {
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find the rankings table - KenPom uses table#ratings-table
    const table = doc.querySelector('table#ratings-table') || doc.querySelector('table');
    if (!table) {
      console.warn('Could not find ratings table in KenPom HTML');
      return null;
    }
    
    // Get all rows (skip header row if present)
    const rows = Array.from(table.querySelectorAll('tbody tr, tr')).filter(row => {
      const cells = row.querySelectorAll('td');
      return cells.length >= 10; // Ensure we have enough columns
    });
    
    const normalizedSearchName = teamName.toLowerCase().trim();
    let bestMatch: Team | null = null;
    let bestMatchScore = 0;
    
    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll('td'));
      if (cells.length < 10) continue;
      
      // Team name is in the second cell (index 1), usually in an <a> tag
      const teamCell = cells[1];
      const teamLink = teamCell.querySelector('a');
      const foundTeamName = teamLink?.textContent?.trim() || teamCell.textContent?.trim();
      
      if (!foundTeamName) continue;
      
      const foundNameLower = foundTeamName.toLowerCase();
      
      // Calculate match score (exact match = highest, then contains, then partial)
      let matchScore = 0;
      if (foundNameLower === normalizedSearchName) {
        matchScore = 100; // Exact match
      } else if (foundNameLower.includes(normalizedSearchName) || normalizedSearchName.includes(foundNameLower)) {
        matchScore = 50; // Partial match
      } else {
        continue; // No match
      }
      
      // Extract stats from table cells
      // KenPom columns: Rank(0), Team(1), Conf(2), W-L(3), AdjEM(4), AdjO(5), AdjD(6), AdjT(7), Luck(8), SOS(9)
      const netRtgText = cells[4]?.textContent?.trim() || '';
      const offRtgText = cells[5]?.textContent?.trim() || '';
      const defRtgText = cells[6]?.textContent?.trim() || '';
      const adjTempoText = cells[7]?.textContent?.trim() || '';
      const luckText = cells[8]?.textContent?.trim() || '';
      const sosText = cells[9]?.textContent?.trim() || '';
      
      // Parse numbers (KenPom may include + signs or other formatting)
      const netRtg = parseFloat(netRtgText.replace(/[^0-9.-]/g, ''));
      const offRtg = parseFloat(offRtgText.replace(/[^0-9.-]/g, ''));
      const defRtg = parseFloat(defRtgText.replace(/[^0-9.-]/g, ''));
      const adjTempo = parseFloat(adjTempoText.replace(/[^0-9.-]/g, ''));
      const luck = parseFloat(luckText.replace(/[^0-9.-]/g, ''));
      const sos = parseFloat(sosText.replace(/[^0-9.-]/g, ''));
      
      // Validate essential stats
      if (isNaN(netRtg) || isNaN(offRtg) || isNaN(defRtg)) {
        continue; // Skip if essential stats are missing
      }
      
      // If this is a better match, save it
      if (matchScore > bestMatchScore) {
        bestMatch = {
          name: foundTeamName,
          netRtg,
          offRtg,
          defRtg,
          adjTempo: isNaN(adjTempo) ? 0 : adjTempo,
          luck: isNaN(luck) ? 0 : luck,
          sos: isNaN(sos) ? 0 : sos
        };
        bestMatchScore = matchScore;
        
        // If we found an exact match, return immediately
        if (matchScore === 100) {
          return bestMatch;
        }
      }
    }
    
    return bestMatch;
  } catch (error) {
    console.error('Error parsing KenPom HTML:', error);
    return null;
  }
}

/**
 * Alternative: Fetch team data using direct API if available
 * This is a placeholder for a potential API endpoint
 */
export async function fetchTeamDataDirect(teamName: string, year: string): Promise<Team | null> {
  // This would require a backend/serverless function to handle CORS
  // For now, we'll use the scraping approach with a proxy
  return fetchTeamData(teamName, year);
}
