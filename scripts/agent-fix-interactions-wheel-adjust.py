from pathlib import Path

source_path = Path("src/fan-poker.js")
source = source_path.read_text(encoding="utf-8")
old = '''              node instanceof HTMLElement &&
              node !== currentCard &&
              node.scrollHeight > node.clientHeight + 1
'''
new = '''              node instanceof HTMLElement &&
              node !== currentCard &&
              currentCard.contains(node) &&
              node.scrollHeight > node.clientHeight + 1
'''
if new not in source:
    if source.count(old) != 1:
        raise SystemExit(f"wheel path scope: expected one match, found {source.count(old)}")
    source = source.replace(old, new, 1)
source_path.write_text(source, encoding="utf-8")

smoke_path = Path("scripts/browser-smoke.html")
smoke = smoke_path.read_text(encoding="utf-8")
old_test = '''    firstContent.querySelector('[part="body"]').style.minHeight = "800px";
    await new Promise((resolve) => setTimeout(resolve, 0));
'''
new_test = '''    firstContent.style.flex = "0 0 80px";
    firstContent.style.height = "80px";
    firstContent.style.maxHeight = "80px";
    const firstBody = firstContent.querySelector('[part="body"]');
    firstBody.style.flex = "0 0 800px";
    firstBody.style.minHeight = "800px";
    await new Promise((resolve) => setTimeout(resolve, 0));
'''
if new_test not in smoke:
    if smoke.count(old_test) != 1:
        raise SystemExit(f"wheel test sizing: expected one match, found {smoke.count(old_test)}")
    smoke = smoke.replace(old_test, new_test, 1)
smoke_path.write_text(smoke, encoding="utf-8")
