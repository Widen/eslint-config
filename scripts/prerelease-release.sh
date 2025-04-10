#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Releasing is only allowed from CI."
  exit 1
fi

# Publish pre-release version
PREID=${GITHUB_EVENT_INPUTS_PREID:-beta}
echo "Create pre-release with tag: $PREID"
yarn changeset publish --tag "$PREID"