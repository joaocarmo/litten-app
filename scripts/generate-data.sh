#!/usr/bin/env bash

PHP_BIN=$(which php)
COMPOSER_BIN=$(which composer)
WORKING_DIR=$(pwd)
MODULE_DIR=$WORKING_DIR/node_modules/world-countries
OUTPUT_DIR=$WORKING_DIR/lib/data
CONVERT_FLAGS="-i name -i cca2 -f json --output-dir=$OUTPUT_DIR"

function main() {
  if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir "$OUTPUT_DIR"
  fi
  cd "$MODULE_DIR" || exit 1
  $COMPOSER_BIN install 2>/dev/null || $COMPOSER_BIN update 2>/dev/null
  $PHP_BIN countries.php convert "$CONVERT_FLAGS"
  cd - || exit 1
}

if [ -x "$PHP_BIN" ]; then
  if [ -x "$COMPOSER_BIN" ]; then
    if [ -d "$MODULE_DIR" ]; then
      main
    else
      >&2 echo "ERROR: '$MODULE_DIR' seems to be missing"
      exit 1
    fi
  else
    >&2 echo "ERROR: 'composer' seems to be not executable"
    exit 1
  fi
else
  >&2 echo "ERROR: 'php' seems to be not executable"
  exit 1
fi
