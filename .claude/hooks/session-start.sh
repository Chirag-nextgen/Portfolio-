#!/bin/bash
# SessionStart hook: ensure Node dependencies are installed so that
# typecheck, lint, build, and dev all work immediately in a web session.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}"

# Idempotent: npm install is a no-op when node_modules is already in sync,
# and benefits from the cached container state. Quiet flags keep logs clean.
npm install --no-audit --no-fund

echo "Dependencies installed — ready to run: npm run dev | build | lint | typecheck"
