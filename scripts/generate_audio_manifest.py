#!/usr/bin/env python3
"""
Scans assets/audio/ for audio files (.mp3, .wav, .ogg, .m4a) and updates
assets/audio/samples.json while preserving existing metadata when available.
"""
import json
import os
from pathlib import Path

AUDIO_DIR = Path(__file__).resolve().parent.parent / "assets" / "audio"
MANIFEST_PATH = AUDIO_DIR / "samples.json"
EXTENSIONS = {".mp3", ".wav", ".ogg", ".m4a"}


def slug_to_title(filename: str) -> str:
    stem = Path(filename).stem
    return stem.replace("-", " ").replace("_", " ").title()


def main() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    existing = []
    if MANIFEST_PATH.exists():
        try:
            existing = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            existing = []

    by_file = {item.get("file"): item for item in existing if item.get("file")}
    files = sorted(
        [p.name for p in AUDIO_DIR.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS]
    )

    updated = []
    for idx, fname in enumerate(files, start=1):
        rel_path = f"assets/audio/{fname}"
        if rel_path in by_file:
            updated.append(by_file[rel_path])
        else:
            fallback_title = slug_to_title(fname)
            updated.append({
                "id": f"sample-{idx}",
                "file": rel_path,
                "title_bn": fallback_title,
                "title_en": fallback_title,
                "category_bn": "ভয়েস স্যাম্পল",
                "category_en": "Voice Sample",
                "description_bn": "নতুন যুক্ত করা অডিও নমুনা।",
                "description_en": "Newly added audio sample."
            })

    MANIFEST_PATH.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {MANIFEST_PATH} with {len(updated)} sample(s).")


if __name__ == "__main__":
    main()
