# Carbon Qt Theme

> Builds assets based on IBM's [Carbon Design System](https://www.carbondesignsystem.com) for use with [Qt](https://www.qt.io) applications

Qt Style Sheets are a powerful mechanism that allows you to customize the appearance of widgets, in addition to what is already possible by subclassing QStyle. The concepts, terminology, and syntax of Qt Style Sheets are heavily inspired by HTML Cascading Style Sheets (CSS) but adapted to the world of widgets.

## Reference

- [Carbon Design System](https://www.carbondesignsystem.com)
- [Qt Style Sheet Syntax](https://doc.qt.io/qt-5/stylesheet-syntax.html)

## Setup

### Node.js

1. Install Node.js
1. Install Yarn

## Components

### Buttons

In Qt Designer you will need to manually set the heights to ensure a snug layout.

Default is `48px`
Small is `32px`

See the [carbon design specs](https://www.carbondesignsystem.com/components/button/style#structure) for more details.

Buttons have different types of [variants](https://www.carbondesignsystem.com/components/button/usage#variations),
these are translated into Qt Properties on a QPushButton.

> Note: Due to the way QDialogButtonBox works, I'm not sure I can target specific buttons,
so you will need to set these manually.

Variation | Qt Property | QSS Selector
--- | --- | ---
Primary | `primary` | `[variant="primary"]`
Secondary | `primary` | `[variant="secondary"]`
Danger | `primary` | `[variant="danger"]`

