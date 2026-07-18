from pathlib import Path

path = Path("scripts/browser-smoke.html")
text = path.read_text(encoding="utf-8")
old = '''    const firstContent = firstCard.querySelector('[part="content"]');
    const firstCover = firstCard.querySelector('[part="cover"]');
'''
new = '''    const firstContent = firstCard.querySelector('[part="content"]');
    firstContent.querySelector('[part="body"]').style.minHeight = "800px";
    await new Promise((resolve) => setTimeout(resolve, 0));
    const firstCover = firstCard.querySelector('[part="cover"]');
'''
if new not in text:
    if text.count(old) != 1:
        raise SystemExit(f"wheel test adjustment: expected one match, found {text.count(old)}")
    text = text.replace(old, new, 1)
path.write_text(text, encoding="utf-8")
