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

### Changed
- Enhanced data analysis capabilities for hazard assessment

### Deprecated

### Removed

### Fixed

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

