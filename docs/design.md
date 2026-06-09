# Script Doc Sync Design

## Problem

README command examples drift away from `package.json` scripts. Agents and humans copy commands from docs, so stale scripts waste time.

## Scope

`script-doc-sync` checks README Markdown against `package.json` scripts. It reports documented scripts that do not exist and important scripts that are not documented.

It does not execute scripts.

## Commands

- `scan`: read `package.json` and README from the current project.
- `demo`: generate a small drift report.

## Verification

The release gate is `npm run check`, demo generation, and `npm pack --dry-run --ignore-scripts`.
