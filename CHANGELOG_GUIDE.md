# Changelog Maintenance Guide

## How to Update the Changelog

The `CHANGELOG.md` file should be updated whenever you make significant changes to the project. Here's how:

### When to Update
- Adding new features
- Fixing bugs
- Making breaking changes
- Deprecating features
- Security updates
- Performance improvements

### How to Update

1. **Open `CHANGELOG.md`**
2. **Add your changes to the `[Unreleased]` section** under the appropriate category:
   - `### Added` - New features
   - `### Changed` - Changes in existing functionality
   - `### Deprecated` - Soon-to-be removed features
   - `### Removed` - Removed features
   - `### Fixed` - Bug fixes
   - `### Security` - Security fixes

3. **When releasing a new version:**
   - Move all `[Unreleased]` entries to a new version section
   - Add the release date
   - Update the version links at the bottom
   - Clear the `[Unreleased]` section

### Example Entry

```markdown
## [Unreleased]

### Added
- New population analysis feature for 25-meter elevation layer
- Export functionality for displacement reports

### Fixed
- Fixed calculation error in hazard class displacement percentages
- Resolved map layer loading issue on mobile devices
```

### Quick Update Commands

You can ask me to update the changelog by saying:
- "Update the changelog with [your changes]"
- "Add to changelog: [description of changes]"
- "Log this change: [description]"

I'll automatically update the `[Unreleased]` section with your changes!

