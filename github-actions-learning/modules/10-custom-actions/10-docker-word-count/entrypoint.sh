#!/bin/sh
set -eu

text=$(printf '%s' "${1:-}" | tr -d '\r')
count=$(printf '%s' "$text" | wc -w | tr -d ' ')
echo "${count}"

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "count=${count}" >> "${GITHUB_OUTPUT}"
fi
