#!/bin/bash

# Agent Benchmark Kit - Installation Script
# Installs the benchmark framework into Claude Code environment

set -e  # Exit on error

echo "🎯 Agent Benchmark Kit - Installation"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Determine script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

# Check if we're in the right place
if [ ! -f "$REPO_DIR/LICENSE" ]; then
    echo -e "${RED}Error: Cannot find repository root. Please run this script from the repository.${NC}"
    exit 1
fi

echo "📍 Repository: $REPO_DIR"
echo ""

# Check for Claude Code environment
CLAUDE_DIR="$HOME/.claude"
if [ ! -d "$CLAUDE_DIR" ]; then
    echo -e "${YELLOW}Warning: ~/.claude directory not found.${NC}"
    echo "Creating $CLAUDE_DIR..."
    mkdir -p "$CLAUDE_DIR"
fi

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p "$CLAUDE_DIR/agents"
mkdir -p "$CLAUDE_DIR/skills/agent-benchmark"
mkdir -p "$HOME/.agent-benchmarks"
mkdir -p "$HOME/.agent-benchmarks/templates"
mkdir -p "$HOME/.agent-benchmarks/examples"

# Copy agents
echo "🤖 Installing benchmark agents..."
cp "$REPO_DIR/agents/test-suite-creator.md" "$CLAUDE_DIR/agents/"
cp "$REPO_DIR/agents/benchmark-judge.md" "$CLAUDE_DIR/agents/"
cp "$REPO_DIR/agents/benchmark-orchestrator.md" "$CLAUDE_DIR/agents/"
echo -e "${GREEN}✓${NC} Installed 3 agents to ~/.claude/agents/"

# Copy skill
echo "⚡ Installing /benchmark-agent skill..."
mkdir -p "$CLAUDE_DIR/skills/benchmark-agent"
cp "$REPO_DIR/skills/benchmark-agent/SKILL.md" "$CLAUDE_DIR/skills/benchmark-agent/"
echo -e "${GREEN}✓${NC} Installed skill to ~/.claude/skills/benchmark-agent/"

# Copy templates
echo "📋 Installing templates..."
cp "$REPO_DIR/templates/test-case-template.md" "$HOME/.agent-benchmarks/templates/"
cp "$REPO_DIR/templates/ground-truth-template.json" "$HOME/.agent-benchmarks/templates/"
cp "$REPO_DIR/templates/metrics-template.md" "$HOME/.agent-benchmarks/templates/"
cp "$REPO_DIR/templates/registry-template.yml" "$HOME/.agent-benchmarks/templates/"
echo -e "${GREEN}✓${NC} Installed 4 templates to ~/.agent-benchmarks/templates/"

# Copy examples (optional)
echo ""
echo "📦 Example benchmarks available:"
echo "  1. content-quality-agent (blog post validation)"
echo "  2. code-review-agent (TypeScript code review)"
echo ""
read -p "Install example benchmarks? (y/n): " install_examples

if [[ $install_examples =~ ^[Yy]$ ]]; then
    echo "Installing examples..."
    cp -r "$REPO_DIR/examples/content-quality-agent" "$HOME/.agent-benchmarks/examples/"
    cp -r "$REPO_DIR/examples/code-review-agent" "$HOME/.agent-benchmarks/examples/"
    echo -e "${GREEN}✓${NC} Installed 2 examples to ~/.agent-benchmarks/examples/"
else
    echo "Skipped examples (you can copy them manually later)"
fi

# Create registry directory
mkdir -p "$HOME/.agent-benchmarks/registries"

# Success message
echo ""
echo -e "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "📚 What's installed:"
echo "  • 3 benchmark agents in ~/.claude/agents/"
echo "  • /benchmark-agent skill in ~/.claude/skills/"
echo "  • Templates in ~/.agent-benchmarks/templates/"
if [[ $install_examples =~ ^[Yy]$ ]]; then
    echo "  • 2 example benchmarks in ~/.agent-benchmarks/examples/"
fi
echo ""
echo "🚀 Next steps:"
echo ""
echo "1. Create your first benchmark suite:"
echo "   /benchmark-agent --create my-agent"
echo ""
echo "2. Run benchmarks:"
echo "   /benchmark-agent my-agent"
echo ""
echo "3. View documentation:"
echo "   https://github.com/BrandCast-Signage/agent-benchmark-kit"
echo ""
echo "💡 Pro tip: Start by exploring the examples:"
if [[ $install_examples =~ ^[Yy]$ ]]; then
    echo "   ls ~/.agent-benchmarks/examples/"
else
    echo "   Install examples: cp -r $REPO_DIR/examples/* ~/.agent-benchmarks/examples/"
fi
echo ""
echo -e "${GREEN}Happy benchmarking! 🎯${NC}"
