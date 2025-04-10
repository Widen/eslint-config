#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Releasing is only allowed from CI."
  exit 1
fi

echo "Publishing pre-release with tag: ${{ github.event.inputs.preid || 'beta' }}"
yarn changeset publish --tag ${{ github.event.inputs.preid || 'beta' }}