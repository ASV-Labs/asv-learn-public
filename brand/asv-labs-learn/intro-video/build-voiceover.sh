#!/bin/bash
# Generates one AAC voiceover clip per scene using the macOS speech synthesizer,
# then writes scene durations to timing.txt for the renderer.
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
AUDIO="$DIR/audio"
VOICE="${VOICE:-Samantha}"
RATE="${RATE:-166}"

mkdir -p "$AUDIO"
rm -f "$AUDIO"/scene-*.aiff "$AUDIO"/scene-*.m4a "$DIR/timing.txt"

declare -a LINES
LINES[1]="Python Zero to Useful, from ASV Labs Learn. If you have never written a single line of code, this is where you start."
LINES[2]="Python is a programming language. A way to write instructions that a computer will actually follow."
LINES[3]="You type plain text into a file. Python reads it, top to bottom, and does what you asked."
LINES[4]="People use it to pull data together, build reports, and automate the boring parts of a job. Small scripts, real results."
LINES[5]="So we begin with Module Zero. Python on your computer. Open a terminal, check whether Python is already there, install it if it is missing, then run your very first file."
LINES[6]="From there you build up, one step at a time. Printing and variables. Decisions and loops. Lists and dictionaries. Functions, files, and what to do when something breaks."
LINES[7]="And it ends with a capstone you can actually show someone. A progress tracker and reporting tool. That is the difference between finishing a tutorial and having something in a portfolio."
LINES[8]="You do not need a fancy setup, and you do not need to be a math person. A text editor, a terminal, and a little patience. Start with Module Zero. We will take it from there."

for i in $(seq 1 8); do
  aiff="$AUDIO/scene-$i.aiff"
  say -v "$VOICE" -r "$RATE" -o "$aiff" "${LINES[$i]}"
  # AAC/44.1k so the final mux can be a passthrough copy instead of a re-encode.
  afconvert -f m4af -d 'aac@44100' -b 96000 --src-complexity bats "$aiff" "$AUDIO/scene-$i.m4a"
  dur=$(afinfo "$aiff" | awk -F': ' '/estimated duration/ {print $2}' | awk '{print $1}')
  printf '%s %s\n' "$i" "$dur" >> "$DIR/timing.txt"
  printf 'scene %s  %ss  %s\n' "$i" "$dur" "${LINES[$i]:0:60}..."
done

total=$(awk '{s+=$2} END {printf "%.2f", s}' "$DIR/timing.txt")
printf '\nvoiceover total: %ss (voice=%s rate=%s wpm)\n' "$total" "$VOICE" "$RATE"
