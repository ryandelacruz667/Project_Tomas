# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CHANGELOG.md file to track project changes
- Population analysis functionality for Numberofpeopleat24meters_12.js dataset
- Displacement calculation methodology based on hazard class percentages:
  - High hazard: 5% displacement rate
  - Medium hazard: 3% displacement rate
  - Low hazard: 1% displacement rate
- Data analysis scripts for population and displacement calculations
- Population statistics tracking:
  - Total population: 9,576 across 5,397 features
  - Affected population: 1,290 features marked as "affected": "True"
  - Displacement calculations by hazard class:
    - High hazard: 527 population → 26.35 displaced (5%)
    - Medium hazard: 412 population → 12.36 displaced (3%)
    - Low hazard: 519 population → 5.19 displaced (1%)
    - Total calculated displaced: 43.9 people
- Row numbering column ("No.") in flood exposure table for easier reference
- Charts panel on right side of map (appears automatically when flood extent is selected):
  - Pie chart showing total exposed population by hazard level (High, Medium, Low, Very Low) - shows totals when no filters selected, filtered data when barangay or exposure level is selected
  - Bar chart showing exposed population by age group (Infant, Child, Youth, Adult, Elderly, Disabled) - shows totals when no filters selected, filtered data when filters are applied
  - Charts automatically update when barangay or exposure level selection changes
  - Charts panel positioned on right side of map (no separate pane structure)

### Changed
- Enhanced data analysis capabilities for hazard assessment
- Moved "Flood Exposure" filter from table filters area to left sidebar in Flood Extent section for better organization and accessibility
- Improved layout and organization of Flood Extent controls in sidebar

### Deprecated

### Removed
- Removed "Flood Exposure" filter from table filters area (moved to sidebar)

### Fixed
- Fixed flood exposure table to show all records when filtering by Barangay and Flood Exposure dropdowns
- Removed deduplication logic that was preventing all matching records from being displayed
- Updated table counter to accurately reflect the total number of displayed records matching the selected filters
- Fixed white pane appearing on the right side by changing body/html background to dark theme and ensuring charts panel is properly hidden by default
- Fixed table overlapping with charts panel by adding proper width constraints and overflow handling to table container elements
- Adjusted table columns with fixed layout and centered headers for better fit
- Removed horizontal scrolling from table by using fixed column widths and text overflow handling
- Fixed table scrolling issue - table now scrolls vertically properly without being hidden behind charts panel by adjusting z-index and adding proper overflow handling
- Redesigned charts panel and table layout for modern, non-overlapping design:
  - Charts panel now matches table height (40vh) and aligns side-by-side
  - Added gradient backgrounds and modern styling with rounded corners
  - Enhanced visual hierarchy with improved shadows, borders, and typography
  - Chart containers have rounded corners and subtle backgrounds
  - Headers styled with uppercase text and accent borders
  - Perfect alignment with no overlapping between table and charts
- Fixed z-index and overflow issues:
  - Added proper z-index values to select elements to prevent dropdowns from floating over charts panel
  - Select dropdowns now have z-index: 1 (normal) and z-index: 100 (when focused) to ensure proper layering
  - Charts panel maintains z-index: 999, table maintains z-index: 1001
  - Sidebar has z-index: 100 to ensure proper stacking order
  - Added overflow handling to prevent content from extending beyond boundaries
- Added responsive design for multiple screen sizes:
  - Desktop (1400px+): Full width charts panel (400px)
  - Large tablets (1200px-1400px): Reduced charts panel (350px), adjusted table height (35vh)
  - Medium tablets (1024px-1200px): Further reduced charts panel (300px), smaller fonts
  - Small tablets (768px-1024px): Charts panel (280px), table height (30vh), adjusted padding
  - Mobile landscape (640px-768px): Narrower sidebar (280px), charts panel (250px), vertical filter layout
  - Mobile portrait (<640px): Charts panel moves to bottom (40vh), full width, sidebar narrows to 260px
- Fixed chart containment in right pane:
  - Added proper overflow handling to charts panel and all chart containers
  - Charts (pie and bar) now properly contained within the right pane boundaries
  - Added max-width and box-sizing constraints to prevent charts from overflowing
  - Canvas elements now respect container boundaries with proper width/height constraints
  - Chart container heights adjusted responsively for different screen sizes (280px default, 200px at 1024px, 160px at 768px, 140px at 640px)
  - Headers and chart containers now have proper text overflow handling
- Updated charts panel layout:
  - Removed height restrictions on pie and bar charts - charts now flex to fill the entire height of the right pane
  - Removed scroll from charts panel - charts spread to use all available vertical space
  - Charts use flexbox layout to evenly distribute height between pie and bar charts
  - Charts panel now extends to full viewport height (calc(100vh - 72px)) instead of 40vh, allowing charts to fill all available vertical space
  - Moved "Flood Exposure" filter back to the flood exposure table filters area (removed from sidebar)
- Fixed z-index layering for population exposure table:
  - Lowered table z-index from 1001 to 950 so modals (z-index: 1000) can appear above it
  - Table still appears above charts panel (z-index: 999) but below modals to ensure household details modal is visible
- Fixed population exposure table data to match household details:
  - Added `calculateDemographicsFromHouseholds()` function to calculate demographic counts from household data
  - Population exposure table now calculates infant, child, youth, adult, elderly, male, female, and disabled counts from household members' AGE and SEX columns
  - Counts are aggregated by exposure_id (FAMILY-ID) to match what's shown in household details modal
  - Age groups: Infant (0-4), Child (5-14), Youth (15-24), Adult (25-64), Elderly (65+)
  - Falls back to exposure dataset values if household data is not available
- Fixed charts to reflect Population exposure table data:
  - Pie chart (Hazard Level Distribution) now counts the number of rows by hazard level (High, Medium, Low, Very Low) instead of summing population
  - Bar chart (Exposed Population by Age) now uses calculated demographics from household data (same as table) - sums infant, child, youth, adult, elderly, and disabled counts
  - Charts use the same filtering logic as the table and calculate demographics the same way
  - Tooltips updated to show whole numbers (records for pie chart, population counts for bar chart)
- Added data labels to pie and bar charts:
  - Pie chart shows count values on each segment
  - Bar chart shows population values on top of each bar
  - Disabled tooltip popups on hover (tooltips.enabled: false)
  - Added chartjs-plugin-datalabels plugin for data label functionality
  - Labels use white color with bold font for better visibility
  - Set bar chart y-axis maximum to 20,000 for consistent scaling
- Removed "Ask TOMAS" button and chat widget from the interface
- Made map legend background 80% transparent (20% opacity) and changed text color to dark (#1a1a1a) for visibility on white map background
- Adjusted legend width and height to fit content (changed from fixed min-width to auto/fit-content)
- Removed location information popup (Region, Province, Municipality, Barangay) that appeared when hovering over map features
- Added automatic highlighting of all polygons displayed in the population exposure table on the map
- Enforced hierarchical dropdown selection: Province dropdown only shows options when a Region is selected, Municipality only when Province is selected, and Barangay only when Municipality is selected
- Removed barangay polygon callout overlay from the map interface
- Population exposure table now uses the barangay selected in the top pane (display only, no table-level filter)
- Removed flood exposure level filter from the population exposure table controls
- Demographics bar chart is now interactive: clicking a bar filters the population exposure table to rows with non-zero counts for that demographic; clicking empty space clears the filter
- Bar chart data labels now show formatted counts (with thousands separators) directly above each bar
- Flood extent dropdown is disabled until a barangay is selected; clearing barangay reset hides flood layers automatically
- Selecting a row in the population exposure table no longer opens the household modal automatically
- Household navigation button once again only toggles the household polygon layer visibility
- Added filtered household overlay and barangay highlight: the households button now displays only polygons inside the chosen barangay and the selected barangay is outlined on the map
- Selecting a grid row zooms the map to its polygon; clicking the polygon on the map opens the household details modal and keeps the row selection in sync
- Created `countHouseholdsByBarangay()` function to count households by barangay, with optional municipality filtering
- Household button now toggles the `People_0` layer while keeping household polygons hidden for clearer demographic review
- Implemented FAMILY-ID based lookup that returns all matching household rows when a `People_0` polygon is clicked, and logs the full result set
- Expanded `findHouseholdDataByFamilyId()` and related helpers to handle both `FAMILY-ID` and `FAMILY_ID` fields for consistent cross-layer matching
- Barangay selector upgraded to a multi-checkbox control: zoom, highlight, filtered household overlays, population table, and charts all respond to every checked barangay; selections stay highlighted until an empty map click clears them, with detailed console logging for each update
- Household, Infographics, and Impact Report actions now remain disabled until at least one barangay is selected, preventing accidental usage without context while preserving their original functionality once enabled

### Security

---

## [1.0.0] - 2025-01-25

### Added
- Initial project setup for Project TOMAS (Tomas Disaster/Hazard Assessment System)
- Web mapping application with OpenLayers integration
- Interactive map interface with layer switching capabilities
- CRUD functionality with SQLite backend (Express.js server)
- Multiple hazard assessment layers for different flood/elevation levels (24m, 25m, 26m, 27m, 28m, 29m, 30m)
- Analysis summary layers for each elevation level
- Hazard aggregation summary layers showing risk classifications (high, medium, low, use_caution)
- Population data layers with demographic breakdowns:
  - Age groups (infant, child, youth, adult, elderly)
  - Gender distribution (male, female)
  - Special needs (under_5, over_60, disabled)
- Infrastructure layers:
  - Households data
  - Roads network
  - Schools locations
  - Regional boundaries
- QGIS2Web export integration for geospatial data visualization
- RESTful API endpoints for CRUD operations:
  - GET `/api/items` - List all items
  - GET `/api/items/:id` - Get single item
  - POST `/api/items` - Create new item
  - PUT `/api/items/:id` - Update item
  - DELETE `/api/items/:id` - Delete item
- Population displacement tracking with ratios and minimum needs calculations
- Hazard classification system (high, medium, low, use_caution)
- Geospatial data export in GeoJSON format
- Map styling and theming with custom CSS

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

[Unreleased]: https://github.com/yourusername/Project_Tomas/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/Project_Tomas/releases/tag/v1.0.0

