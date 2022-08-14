#!/usr/bin/env bash

git diff --name-only beta \
  | grep '.ts' \
  | grep -v 'test.ts' \
  | xargs -I % sh -c 'sed "s/.ts/.test.ts/g" <<< %' \
  | xargs ls 2>/dev/null 1>&2 
