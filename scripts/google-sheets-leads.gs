/**
 * Nexo Quote — append callback-form leads to Google Sheets.
 *
 * Setup (one time):
 * 1. Open https://docs.google.com/spreadsheets/d/1R6itfyu93QF1n4NrjgiOT5A74mNuc4qZ7RZ9hFEPjTk/edit
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into TrackerApp env: NEXOQUOTE_LEADS_SHEET_URL=<url>
 */

var SHEET_ID = '1R6itfyu93QF1n4NrjgiOT5A74mNuc4qZ7RZ9hFEPjTk';

function doPost(e) {
  var p = (e && e.parameter) || {};
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  ensureHeader(sheet);
  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.name || '',
    p.phone || '',
    p.zip || '',
    p.state || '',
    p.insured || '',
    p.vehicles || '',
    p.homeowner || '',
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    'timestamp',
    'name',
    'phone',
    'zip',
    'state',
    'insured',
    'vehicles',
    'homeowner',
  ]);
}
