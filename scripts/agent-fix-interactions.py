from pathlib import Path


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


source_path = Path("src/fan-poker.js")
source = source_path.read_text(encoding="utf-8")

source = replace_once(
    source,
    '''  :host(:focus-visible) .stage {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: 4px;
    border-radius: calc(var(--fan-radius) + 4px);
  }
''',
    '''  :host(:focus-visible) .card.is-current {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: -4px;
  }
''',
    "focus ring",
)

source = replace_once(
    source,
    '''    this._stage.addEventListener(
      "wheel",
      (event) => {
        if (!readBoolean(this, "wheel", true)) return;
        event.preventDefault();
        const now = performance.now();
        if (Math.abs(event.deltaY) < 8 || now - this._lastWheel < 58) return;
        this._lastWheel = now;
        this._requestStep(event.deltaY > 0 ? 1 : -1, "wheel");
      },
      { passive: false }
    );
''',
    '''    this._stage.addEventListener(
      "wheel",
      (event) => {
        if (!readBoolean(this, "wheel", true)) return;
        const path = event.composedPath();
        const currentCard = path.find(
          (node) => node instanceof Element && node.classList?.contains("is-current")
        );

        if (currentCard) {
          const content = currentCard.querySelector(".card-content");
          const nestedScroller = path.find(
            (node) =>
              node instanceof HTMLElement &&
              node !== currentCard &&
              node.scrollHeight > node.clientHeight + 1
          );

          if (!nestedScroller && content?.scrollHeight > content.clientHeight + 1) {
            event.preventDefault();
            const unit =
              event.deltaMode === WheelEvent.DOM_DELTA_LINE
                ? 16
                : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
                  ? content.clientHeight
                  : 1;
            content.scrollTop += event.deltaY * unit;
          }
          return;
        }

        event.preventDefault();
        const now = performance.now();
        if (Math.abs(event.deltaY) < 8 || now - this._lastWheel < 58) return;
        this._lastWheel = now;
        this._requestStep(event.deltaY > 0 ? 1 : -1, "wheel");
      },
      { passive: false }
    );
''',
    "wheel handler",
)

source = replace_once(
    source,
    '''    this._stage.addEventListener("pointerdown", (event) => {
      if (!readBoolean(this, "draggable", true)) return;
      const current = event.composedPath().find(
        (node) => node instanceof Element && node.classList?.contains("is-current")
      );
      if (!current || this._active || this._queue.length || this._cards.length < 2) return;
      this.focus({ preventScroll: true });
      current.setPointerCapture?.(event.pointerId);
      this._deck.classList.add("is-dragging");
      this._drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocityX: 0,
        dx: 0,
        moved: false
      };
    });

    this._stage.addEventListener("pointermove", (event) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const now = performance.now();
      const elapsed = Math.max(8, now - drag.lastTime);
      drag.velocityX = drag.velocityX * 0.7 + ((event.clientX - drag.lastX) / elapsed) * 0.3;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      drag.dx = event.clientX - drag.startX;
      drag.moved ||= Math.abs(drag.dx) > 4;
      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      this._renderTransition(direction, progress);
    });

    const finishDrag = (event) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      this._drag = null;
      this._deck.classList.remove("is-dragging");
      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      const velocity = Math.abs(drag.velocityX);
      const commit = progress > 0.22 || velocity > 0.5;
      const duration = velocity > 1.15 ? SPEED.turbo : velocity > 0.62 ? SPEED.fast : commit ? SPEED.normal : 240;
      this._startFromProgress(direction, progress, commit ? 1 : 0, duration);
      if (drag.moved) this._blockClickUntil = performance.now() + 360;
    };

    this._stage.addEventListener("pointerup", finishDrag);
    this._stage.addEventListener("pointercancel", finishDrag);
''',
    '''    const finishDrag = (event, cancelled = false) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      this._drag = null;
      this._deck.classList.remove("is-dragging");
      if (drag.target?.hasPointerCapture?.(drag.pointerId)) {
        drag.target.releasePointerCapture(drag.pointerId);
      }

      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      const velocity = Math.abs(drag.velocityX);
      const commit = !cancelled && (progress > 0.22 || velocity > 0.5);
      const duration = cancelled
        ? 180
        : velocity > 1.15
          ? SPEED.turbo
          : velocity > 0.62
            ? SPEED.fast
            : commit
              ? SPEED.normal
              : 240;

      if (progress > 0) this._startFromProgress(direction, progress, commit ? 1 : 0, duration);
      else this._renderRest();
      if (drag.moved) this._blockClickUntil = performance.now() + 360;
    };

    this._stage.addEventListener("pointerdown", (event) => {
      if (!readBoolean(this, "draggable", true) || !event.isPrimary) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const path = event.composedPath();
      const current = path.find(
        (node) => node instanceof Element && node.classList?.contains("is-current")
      );
      const scrollableContent = path.find(
        (node) =>
          node instanceof Element &&
          node.classList?.contains("card-content") &&
          node.scrollHeight > node.clientHeight + 1
      );
      if (scrollableContent || !current || this._active || this._queue.length || this._cards.length < 2) return;
      this.focus({ preventScroll: true });
      current.setPointerCapture?.(event.pointerId);
      current.addEventListener(
        "lostpointercapture",
        (lostEvent) => finishDrag(lostEvent, true),
        { once: true }
      );
      this._deck.classList.add("is-dragging");
      this._drag = {
        pointerId: event.pointerId,
        target: current,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocityX: 0,
        dx: 0,
        moved: false
      };
    });

    this._stage.addEventListener("pointermove", (event) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (event.pointerType === "mouse" && (event.buttons & 1) === 0) {
        finishDrag(event, true);
        return;
      }
      const now = performance.now();
      const elapsed = Math.max(8, now - drag.lastTime);
      drag.velocityX = drag.velocityX * 0.7 + ((event.clientX - drag.lastX) / elapsed) * 0.3;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      drag.dx = event.clientX - drag.startX;
      drag.moved ||= Math.abs(drag.dx) > 4;
      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      this._renderTransition(direction, progress);
    });

    this._stage.addEventListener("pointerup", (event) => finishDrag(event));
    this._stage.addEventListener("pointercancel", (event) => finishDrag(event, true));
''',
    "pointer handlers",
)

source_path.write_text(source, encoding="utf-8")

smoke_path = Path("scripts/browser-smoke.html")
smoke = smoke_path.read_text(encoding="utf-8")
smoke = replace_once(
    smoke,
    '  <fan-card tag="One" title="First" symbol="01">A</fan-card>',
    '''  <fan-card tag="One" title="First" symbol="01">
    <p>Scrollable lesson line 01</p><p>Scrollable lesson line 02</p><p>Scrollable lesson line 03</p>
    <p>Scrollable lesson line 04</p><p>Scrollable lesson line 05</p><p>Scrollable lesson line 06</p>
    <p>Scrollable lesson line 07</p><p>Scrollable lesson line 08</p><p>Scrollable lesson line 09</p>
    <p>Scrollable lesson line 10</p><p>Scrollable lesson line 11</p><p>Scrollable lesson line 12</p>
  </fan-card>''',
    "smoke scroll content",
)
smoke = replace_once(
    smoke,
    '''    checks.push(["initialStatus", status.textContent.includes("First") && status.textContent.includes("1 of 3")]);

    deck.next();
''',
    '''    checks.push(["initialStatus", status.textContent.includes("First") && status.textContent.includes("1 of 3")]);

    const styleText = deck.shadowRoot.querySelector("style").textContent;
    checks.push([
      "focusRingOnCurrentCard",
      styleText.includes(":host(:focus-visible) .card.is-current") &&
        !styleText.includes(":host(:focus-visible) .stage")
    ]);

    const firstCard = initialCards[0];
    const firstContent = firstCard.querySelector('[part="content"]');
    const firstCover = firstCard.querySelector('[part="cover"]');
    const wheelIndex = deck.currentIndex;
    firstCover.dispatchEvent(
      new WheelEvent("wheel", { deltaY: 120, bubbles: true, composed: true, cancelable: true })
    );
    checks.push([
      "wheelScrollsCardContent",
      deck.currentIndex === wheelIndex && firstContent.scrollTop > 0
    ]);

    firstCard.setPointerCapture = () => {};
    firstCard.hasPointerCapture = () => false;
    firstCard.dispatchEvent(
      new PointerEvent("pointerdown", {
        pointerId: 41,
        pointerType: "mouse",
        isPrimary: true,
        button: 0,
        buttons: 1,
        clientX: 180,
        bubbles: true,
        composed: true
      })
    );
    firstCard.dispatchEvent(
      new PointerEvent("pointermove", {
        pointerId: 41,
        pointerType: "mouse",
        isPrimary: true,
        buttons: 0,
        clientX: 130,
        bubbles: true,
        composed: true
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 50));
    checks.push([
      "releasedPointerCancelsDrag",
      deck._drag === null && !deck.shadowRoot.querySelector(".deck").classList.contains("is-dragging")
    ]);

    deck.next();
''',
    "smoke interaction checks",
)
smoke_path.write_text(smoke, encoding="utf-8")
