#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Versioning is only allowed from CI."
  exit 1
fi

# Enter pre-release mode
PREID=${GITHUB_EVENT_INPUTS_PREID:-beta}
echo "Create pre-release with tag: $PREID"
yarn changeset pre enter "$PREID"

# Update changelogs and manifests
echo "Update changelogs and manifests for pre-release version"
yarn changeset version

# Exit pre-release mode
echo "Exit pre-release mode"
yarn changeset pre exit