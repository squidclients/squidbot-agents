#!/usr/bin/env bash
# SquidBot Brand Designer Agent — one-line installer
# Usage: curl -fsSL squidbot.app/brand-designer | bash
# Fallback: curl -fsSL https://raw.githubusercontent.com/squidclients/squidbot-agents/main/brand-designer-agent/install.sh | bash
set -euo pipefail

BOLD=$'\033[1m'; DIM=$'\033[2m'; GREEN=$'\033[32m'; PURPLE=$'\033[35m'; RESET=$'\033[0m'
REPO="https://github.com/squidclients/squidbot-agents.git"
DIR="brand-designer-agent"

echo "${PURPLE}🦑 SquidBot Brand Designer Agent — installer${RESET}"
echo "${DIM}This installs a clean, unseasoned Brand Designer agent. It learns your brand during onboarding.${RESET}"
echo ""

# 1. Fetch the repo (sparse checkout of just the agent)
if [ -d "$DIR" ] && [ -d "$DIR/.git" ]; then
  echo "• Found existing ${DIR}/ — updating..."
  (cd "$DIR" && git pull --ff-only origin main 2>/dev/null || true)
else
  echo "• Downloading agent (sparse checkout, minimal download)..."
  git clone --quiet --filter=blob:none --sparse "$REPO" squidbot-agents-tmp
  mv squidbot-agents-tmp "$DIR"
  (cd "$DIR" && git sparse-checkout set brand-designer-agent)
fi

cd "$DIR/brand-designer-agent" 2>/dev/null || cd "$DIR"

# 2. Dependencies
echo "• Installing dependencies..."
if command -v npm >/dev/null 2>&1; then
  npm install --silent
else
  echo "⚠️  npm not found. Install Node.js (nodejs.org) and re-run, or run 'npm install' manually in $DIR/brand-designer-agent"
  exit 1
fi

# 3. Health check
echo "• Running doctor check..."
npm run doctor || true

echo ""
echo "${GREEN}✅ Brand Designer installed.${RESET}"
echo ""
echo "${BOLD}Next steps:${RESET}"
echo "  1. Tell your SquidBot: ${BOLD}\"Install the Brand Designer agent from $PWD\"${RESET}"
echo "     (or add this directory to your agents config in openclaw.json)"
echo "  2. Run onboarding: it crawls your website and drafts your brand profile"
echo "  3. Review + approve the brand profile — then it designs for you"
echo ""
echo "${DIM}Docs: https://github.com/squidclients/squidbot-agents/tree/main/brand-designer-agent${RESET}"
