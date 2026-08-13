// Google Docs API integration utility
// This file handles fetching and parsing data from Google Docs

interface GoogleDocsConfig {
  docId: string;
  apiKey: string;
}

interface ServiceItem {
  organization: string;
  role: string;
  period: string;
  description?: string;
  type: 'community' | 'university' | 'academic';
}

/**
 * Fetches content from Google Docs and parses it into service items
 * @param config Google Docs configuration
 * @returns Promise<ServiceItem[]>
 */
export const fetchServiceDataFromGoogleDocs = async (config: GoogleDocsConfig): Promise<ServiceItem[]> => {
  try {
    // Option 1: Google Docs API (requires published document)
    const url = `https://docs.google.com/document/d/${config.docId}/export?format=txt`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    return parseServiceText(text);
  } catch (error) {
    console.error('Error fetching from Google Docs:', error);
    throw error;
  }
};

/**
 * Alternative: Fetch from Google Sheets (more structured approach)
 * @param config Google Sheets configuration
 * @returns Promise<ServiceItem[]>
 */
export const fetchServiceDataFromGoogleSheets = async (config: GoogleDocsConfig): Promise<ServiceItem[]> => {
  try {
    // Replace SHEET_ID with your Google Sheet ID
    const SHEET_ID = config.docId;
    const RANGE = 'Service!A2:E'; // Adjust range as needed
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${config.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return parseSheetData(data.values || []);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
};

/**
 * Parses plain text from Google Docs into structured service data
 * This is a basic parser - you may need to adjust based on your document format
 */
const parseServiceText = (text: string): ServiceItem[] => {
  const serviceItems: ServiceItem[] = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  let currentType: 'community' | 'university' | 'academic' = 'community';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section headers
    if (line.toLowerCase().includes('service to the community')) {
      currentType = 'community';
      continue;
    } else if (line.toLowerCase().includes('service to the university') || line.toLowerCase().includes('service to a university')) {
      currentType = 'university';
      continue;
    } else if (line.toLowerCase().includes('service to academic') || line.toLowerCase().includes('service within academic')) {
      currentType = 'academic';
      continue;
    }
    
    // Parse service entries (assuming format: "Organization, Role, Period")
    if (line.includes(',')) {
      const parts = line.split(',').map(part => part.trim());
      if (parts.length >= 3) {
        const [organization, role, period] = parts;
        const description = parts.length > 3 ? parts.slice(3).join(', ') : undefined;
        
        serviceItems.push({
          organization,
          role,
          period,
          description,
          type: currentType
        });
      }
    }
  }
  
  return serviceItems;
};

/**
 * Parses Google Sheets data into service items
 * Expected columns: Organization, Role, Period, Description, Type
 */
const parseSheetData = (rows: string[][]): ServiceItem[] => {
  return rows.map(row => ({
    organization: row[0] || '',
    role: row[1] || '',
    period: row[2] || '',
    description: row[3] || undefined,
    type: (row[4]?.toLowerCase() as 'community' | 'university' | 'academic') || 'community'
  })).filter(item => item.organization && item.role);
};

/**
 * Helper function to check if a Google Doc is publicly accessible
 */
export const validateGoogleDocAccess = async (docId: string): Promise<boolean> => {
  try {
    const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Setup instructions for Google Docs integration
 */
export const getSetupInstructions = () => {
  return {
    googleDocs: [
      "1. Open your Google Doc with service information",
      "2. Click 'Share' and set to 'Anyone with the link can view'",
      "3. Copy the document ID from the URL",
      "4. Replace 'YOUR_GOOGLE_DOC_ID_HERE' in the Service component",
      "5. Format your document with clear section headers and consistent formatting"
    ],
    googleSheets: [
      "1. Create a Google Sheet with columns: Organization, Role, Period, Description, Type",
      "2. Share the sheet publicly or use Google Sheets API",
      "3. Get a Google Sheets API key from Google Cloud Console",
      "4. Replace the configuration in the Service component",
      "5. Use 'community', 'university', or 'academic' in the Type column"
    ]
  };
};

// Export default configuration template
export const defaultConfig: GoogleDocsConfig = {
  docId: 'YOUR_GOOGLE_DOC_ID_HERE',
  apiKey: 'YOUR_API_KEY_HERE'
};
