#!/usr/bin/env bash
# Measure per-beat VO clips into timing.txt for SketchVideo / CourseIntroSketch.
# Discovers vo/beat-01.* … beat-NN.* (mp3/m4a/wav/aiff/caf).
# Prefers ffprobe; falls back to macOS afinfo when ffmpeg is not installed.
#
# Usage:
#   ./measure-vo.sh              # workdir = script directory (python-zero pilot)
#   ./measure-vo.sh <workdir>    # e.g. courses/<slug>/intro-video
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "${1:-$SCRIPT_DIR}" && pwd)"
VO="$ROOT/vo"
OUT="$ROOT/timing.txt"
: > "$OUT"

duration_of() {
  local f="$1"
  if command -v ffprobe >/dev/null 2>&1; then
    ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f"
    return
  fi
  if command -v afinfo >/dev/null 2>&1; then
    afinfo "$f" | awk -F': ' '/estimated duration/ {print $2; exit}' | awk '{print $1}'
    return
  fi
  echo "Need ffprobe or afinfo to measure durations" >&2
  return 1
}

# Count beats from beat-NN.txt (source of truth for script length)
BEAT_COUNT=0
for t in "$VO"/beat-*.txt; do
  [[ -f "$t" ]] || continue
  base=$(basename "$t" .txt) # beat-01
  n=${base#beat-}
  n=$((10#$n))
  if (( n > BEAT_COUNT )); then BEAT_COUNT=$n; fi
done
if (( BEAT_COUNT < 1 )); then
  echo "No beat-*.txt found in $VO" >&2
  exit 1
fi

missing=0
for i in $(seq 1 "$BEAT_COUNT"); do
  n=$(printf "%02d" "$i")
  f=""
  # Prefer ElevenLabs mp3 when both human m4a and mp3 exist
  for ext in mp3 m4a wav aiff caf; do
    if [[ -f "$VO/beat-$n.$ext" ]]; then f="$VO/beat-$n.$ext"; break; fi
  done
  if [[ -z "$f" ]]; then
    echo "missing beat-$n.*" >&2
    missing=1
    continue
  fi
  dur=$(duration_of "$f")
  if [[ -z "${dur:-}" ]]; then
    echo "could not measure $f" >&2
    missing=1
    continue
  fi
  printf "%d %s\n" "$i" "$dur" | tee -a "$OUT"
done
if [[ "$missing" -eq 1 ]]; then
  echo "Some beats missing — timing.txt is partial. Record the rest, then re-run." >&2
  exit 1
fi
echo "Wrote $OUT ($BEAT_COUNT beats)"
