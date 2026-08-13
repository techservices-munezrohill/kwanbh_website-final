# Google Docs Integration Setup

This guide explains how to set up dynamic content integration for the Professional Service page using Google Docs or Google Sheets.

## Option 1: Google Docs Integration (Recommended for ease)

### Step 1: Prepare Your Google Document
1. Create a new Google Document
2. Structure your content with clear section headers:
   ```
   Service to the Community
   
   Out Loud & United, Chair Board of Trustees, 2025–present, Leading governance and strategic direction for LGBTQ+ advocacy organization
   
   Foundation of Freedom, Research Director, 2021–present, Directing research initiatives focused on criminal justice reform
   
   Service to the University
   
   Arizona State University, Faculty Search Committee Member, 2023–2025, Participating in faculty recruitment
   
   Service to the Academic Profession
   
   Race and Justice, Editorial Board Member, 2024–present, Providing peer review and editorial guidance
   ```

### Step 2: Make Document Public
1. Click the "Share" button in your Google Doc
2. Change access to "Anyone with the link can view"
3. Copy the document ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Document ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 3: Update Code
1. Open `src/pages/Service.tsx`
2. Replace `YOUR_GOOGLE_DOC_ID_HERE` with your actual document ID
3. Update the `loadServiceData` function to use the Google Docs API:

```typescript
const loadServiceData = async () => {
  setLoading(true);
  try {
    const config = {
      docId: 'YOUR_ACTUAL_DOC_ID',
      apiKey: '' // Not needed for public docs
    };
    
    const data = await fetchServiceDataFromGoogleDocs(config);
    setServiceData(data);
    setLastUpdated(new Date().toLocaleDateString());
  } catch (error) {
    console.error('Error loading service data:', error);
    setServiceData(mockServiceData); // Fallback
  } finally {
    setLoading(false);
  }
};
```

## Option 2: Google Sheets Integration (Recommended for structure)

### Step 1: Create Google Sheet
1. Create a new Google Sheet
2. Set up columns:
   - Column A: Organization
   - Column B: Role
   - Column C: Period
   - Column D: Description
   - Column E: Type (community/university/academic)

### Step 2: Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API

### Step 3: Make Sheet Public
1. Share your Google Sheet
2. Set to "Anyone with the link can view"
3. Copy the Sheet ID from URL

### Step 4: Update Code
```typescript
const loadServiceData = async () => {
  setLoading(true);
  try {
    const config = {
      docId: 'YOUR_SHEET_ID',
      apiKey: 'YOUR_API_KEY'
    };
    
    const data = await fetchServiceDataFromGoogleSheets(config);
    setServiceData(data);
    setLastUpdated(new Date().toLocaleDateString());
  } catch (error) {
    console.error('Error loading service data:', error);
    setServiceData(mockServiceData);
  } finally {
    setLoading(false);
  }
};
```

## Option 3: Simple Embedded Approach

For the simplest setup, you can embed the Google Doc directly:

```tsx
<div className="w-full h-96">
  <iframe
    src={`https://docs.google.com/document/d/YOUR_DOC_ID/pub?embedded=true`}
    width="100%"
    height="400"
    frameBorder="0"
  />
</div>
```

## Benefits

✅ **Zero website maintenance** - Update content in Google Docs
✅ **Real-time updates** - Changes reflect immediately
✅ **Collaborative editing** - Multiple people can update
✅ **Version history** - Google Docs tracks all changes
✅ **Mobile editing** - Update from anywhere
✅ **No coding required** for content updates

## Troubleshooting

### Document Not Loading
- Ensure document is public ("Anyone with the link can view")
- Check that the document ID is correct
- Verify document contains properly formatted content

### CORS Issues
- Google Docs export might have CORS restrictions
- Consider using a serverless function as a proxy
- Alternative: Use Google Sheets API which has better CORS support

### Parsing Issues
- Ensure consistent formatting in your document
- Use clear section headers
- Follow the expected format for entries

## Next Steps

1. Choose your preferred integration method
2. Set up your Google document/sheet
3. Update the configuration in the code
4. Test the integration
5. Add content to your document and verify it appears on the website

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider using Google Apps Script for server-side processing
- Regularly rotate API keys

For questions or issues, refer to the Google Docs/Sheets API documentation or create an issue in the project repository.
