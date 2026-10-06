#!/bin/sh
set -eu

who=$(printf '%s' "${1:-TaskFlow}" | tr -d '\r\n')
greeting="Hello, ${who}"
echo "${greeting}"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "greeting=${greeting}" >> "${GITHUB_OUTPUT}"
fi
