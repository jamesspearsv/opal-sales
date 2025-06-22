#!/bin/bash
set -euo pipefail

# DESCRIPTION:
# Automates building and publishing the Writr.md container image to GitHub Container Registry (ghcr.io).
# Prompts for a version tag if not provided.
# Enforces strict version format: X.Y.Z (e.g., 1.2.3)
# Always builds and pushes both :latest and :<version> tags.

echo "🚀 Starting build process..."

# --- Get version tag from argument or prompt ---
if [[ $# -ge 1 ]]; then
    TAG="$1"
else
    read -rp "🔖 Enter a version tag (X.Y.Z): " TAG
fi

# --- Validate format: must match X.Y.Z where X/Y/Z are numbers ---
if [[ ! "$TAG" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ Invalid version format."
    echo "    Version must follow this pattern: X.Y.Z (e.g., 1.0.0, 2.3.1)"
    exit 1
fi

IMAGE="ghcr.io/jamesspearsv/opal-sales"

echo "📦 Using version tag: $TAG"
echo "🛠 Building image for platforms: linux/amd64, linux/arm64"

# --- Build Docker image ---
docker build --platform linux/amd64,linux/arm64 \
    -t "$IMAGE:$TAG" \
    -t "$IMAGE:latest" .

# --- Login to GHCR ---
echo "🔐 Logging into ghcr.io..."
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# --- Push both tags ---
echo "📤 Pushing tags to GHCR..."
docker push "$IMAGE:$TAG"
docker push "$IMAGE:latest"

echo "✅ Successfully published Writr.md image:"
echo "    - $IMAGE:$TAG"
echo "    - $IMAGE:latest"