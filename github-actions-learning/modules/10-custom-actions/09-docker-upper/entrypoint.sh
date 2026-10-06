#!/bin/sh
set -eu

text=$(printf '%s' "${1:-taskflow}" | tr -d '\r\n' | tr '[:lower:]' '[:upper:]')
echo "${text}"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "text=${text}" >> "${GITHUB_OUTPUT}"
fi
