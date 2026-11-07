"""Create derivatives of the official CGSA logo WITHOUT altering it.

The source (cgsa-logo.png) is a single ink colour (#D33835) anti-aliased on
white. We "un-mix" each pixel back to (ink colour, alpha), which is an exact
inverse of the original compositing — no redraw, no recolour, no distortion.
Crops are square around the seal; resizing is uniform (aspect locked).
Source file is only read, never written.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "cgsa-logo.png"
OUT = ROOT / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)
INK = (211, 56, 53)

src = Image.open(SRC).convert("RGB")
# Square crop around the seal (measured bbox 42,35 → 433,426), 6px breathing room.
pad = 6
box = (42 - pad, 35 - pad, 433 + pad, 426 + pad)
crop = src.crop(box)

# Transparent version (exact un-mix of white background).
rgba = Image.new("RGBA", crop.size)
px = []
for r, g, b in crop.getdata():
    a = round(255 * (255 - g) / (255 - INK[1]))
    a = max(0, min(255, a))
    px.append((*INK, a))
rgba.putdata(px)

def save(img, name, size):
    img.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)

rgba.save(OUT / "cgsa-logo-transparent.png", optimize=True)  # native 403px
save(rgba, "cgsa-logo-192.png", 192)

# Opaque white-background icons (iOS ignores transparency).
white = Image.new("RGB", crop.size, (255, 255, 255))
white.paste(crop)
save(white, "apple-touch-icon.png", 180)
# favicon.ico (16/32/48) from the transparent crop
rgba.resize((48, 48), Image.LANCZOS).save(ROOT / "public" / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
save(rgba, "favicon-32.png", 32)
print("ok", crop.size)
