#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Versioning is only allowed from CI."
  exit 1
fi

# Enter pre-release mode
echo "Create pre-release with tag: ${{ github.event.inputs.preid || 'beta' }}"
yarn changeset pre enter ${{ github.event.inputs.preid || 'beta' }}

# Update changelogs and manifests
echo "Update changelogs and manifests for pre-release version"
yarn changeset version

# Exit pre-release mode
echo "Exit pre-release mode"
yarn changeset pre exit