#!/usr/bin/env bash

# A list of required files with sensitive information and thus not part of the
# git repository.
REQUIRED_FILES=(
  .env
  android/app/google-services.json
  android/app/litten.keystore
  android/keystore.properties
  android/secure.properties
  ios/GoogleService-Info.plist
)
NUM_REQUIRED_FILES=${#REQUIRED_FILES[@]}
CURRENT_DIR=$(pwd)
NUM_OK_FILES=0

# Loop through the file list and validate their existence.
for FILE in "${REQUIRED_FILES[@]}"; do
  ABS_FILE="${CURRENT_DIR%%/}/$FILE"

  echo -n "$FILE -> "

  if [ -f "$ABS_FILE" ]; then
    echo "OK"

    ((NUM_OK_FILES++))
  else
    echo "MISSING"
  fi
done

# Determine the exit code based on the number of required files.
if [ "$NUM_OK_FILES" -lt "$NUM_REQUIRED_FILES" ]; then
  exit 1
fi

exit 0
