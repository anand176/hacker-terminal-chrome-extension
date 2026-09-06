// Terminal New Tab - pure aesthetic, no real functionality.
(function () {
  "use strict";

  // ---------- Matrix rain ----------
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  let columns, drops;
  const glyphs = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ$#%&";

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / 16);
    drops = new Array(columns).fill(0).map(() => Math.random() * -50);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  let rainSpeed = 1;
  function drawMatrix() {
    ctx.fillStyle = "rgba(2, 4, 3, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "14px monospace";

    for (let i = 0; i < columns; i++) {
      const text = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * 16;
      const y = drops[i] * 16;
      ctx.fillStyle = Math.random() > 0.94 ? "#d6ffe6" : "#1f7a3f";
      ctx.fillText(text, x, y);
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += rainSpeed;
    }
    requestAnimationFrame(drawMatrix);
  }
  requestAnimationFrame(drawMatrix);

  // ---------- DOM refs ----------
  const output = document.getElementById("output");
  const typedEl = document.getElementById("typed");
  const hiddenInput = document.getElementById("hiddenInput");
  const terminal = document.getElementById("terminal");

  function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  function appendLine(text, className) {
    const div = document.createElement("div");
    if (className) div.className = className;
    div.textContent = text;
    output.appendChild(div);
    scrollToBottom();
    return div;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeLine(text, className, speed) {
    const div = document.createElement("div");
    if (className) div.className = className;
    output.appendChild(div);
    for (let i = 0; i < text.length; i++) {
      div.textContent += text[i];
      scrollToBottom();
      await sleep(speed);
    }
  }

  // ---------- Boot sequence ----------
  const bootLines = [
    { text: "[ OK ] Initializing kernel modules...", cls: "line-dim", speed: 4 },
    { text: "[ OK ] Mounting virtual filesystem...", cls: "line-dim", speed: 4 },
    { text: "[ OK ] Spoofing MAC address... done.", cls: "line-dim", speed: 4 },
    { text: "[WARN] Firewall integrity check failed.", cls: "line-warn", speed: 6 },
    { text: "[ OK ] Establishing encrypted tunnel...", cls: "line-dim", speed: 4 },
    { text: "[ OK ] Bypassing mainframe security...", cls: "line-dim", speed: 6 },
    { text: "", cls: "", speed: 0 },
    { text: "ACCESS GRANTED.", cls: "line-bright", speed: 18 },
    { text: "", cls: "", speed: 0 },
    { text: "Welcome back, root. Type 'help' to see available commands.", cls: "line-dim", speed: 6 },
    { text: "", cls: "", speed: 0 },
  ];

  async function runBoot() {
    for (const line of bootLines) {
      if (line.text === "") {
        appendLine("");
        await sleep(120);
      } else {
        await typeLine(line.text, line.cls, line.speed);
        await sleep(90);
      }
    }
    hiddenInput.focus();
  }

  // ---------- Fake filesystem for jokes ----------
  const fakeFiles = {
    "secrets.txt": "There are no secrets. This is a new tab page.",
    "passwords.db": "Permission denied: nice try though.",
    "nuclear_codes.enc": "Decryption failed. Codes are: probably not real.",
    "readme.txt": "This terminal does nothing except look cool. Enjoy your coffee.",
  };

  const helpText = [
    "Available commands:",
    "  help          show this list",
    "  whoami        check your totally real clearance level",
    "  date          show the current date and time",
    "  ls            list files in this very fake directory",
    "  cat <file>    read a fake file",
    "  hack          initiate a dramatic but pointless hacking sequence",
    "  matrix        intensify the rain (it does nothing else)",
    "  sudo <thing>  attempt a very serious command",
    "  clear         clear the screen",
    "  exit          leave the simulation (you can't, it's a new tab)",
  ];

  function randomHex(len) {
    const chars = "0123456789ABCDEF";
    let s = "";
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  function randomIp() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join(".");
  }

  const dataTemplates = [
    () => "0x" + randomHex(8) + "  decrypting fragment " + Math.floor(Math.random() * 9999) + "/9999",
    () => "pinging " + randomIp() + " ... " + (Math.random() > 0.3 ? "OK" : "TIMEOUT"),
    () => "injecting payload -> /usr/lib/core_" + randomHex(4) + ".sys",
    () => "bypassing node " + randomHex(6) + " firewall layer " + Math.ceil(Math.random() * 7),
    () => "cracking hash " + randomHex(16),
    () => "extracting table users_" + randomHex(3) + " [" + Math.floor(Math.random() * 500) + " rows]",
    () => "rerouting traffic via proxy " + randomIp() + ":" + (1000 + Math.floor(Math.random() * 9000)),
    () => randomHex(2) + " " + randomHex(2) + " " + randomHex(2) + " " + randomHex(2) + " " + randomHex(2) + " " + randomHex(2) + " " + randomHex(2) + " " + randomHex(2),
  ];

  function randomDataLine() {
    const tpl = dataTemplates[Math.floor(Math.random() * dataTemplates.length)];
    return tpl();
  }

  async function runHackSequence() {
    appendLine("Initiating breach protocol...", "line-dim");
    await sleep(200);

    const dataContainer = document.createElement("div");
    output.appendChild(dataContainer);

    const bar = appendLine("[                    ] 0%", "line-bright");

    const dataLoop = setInterval(() => {
      const line = document.createElement("div");
      line.className = "line-dim";
      line.textContent = randomDataLine();
      dataContainer.appendChild(line);
      while (dataContainer.children.length > 10) {
        dataContainer.removeChild(dataContainer.firstChild);
      }
      scrollToBottom();
    }, 70);

    let pct = 0;
    while (pct < 100) {
      await sleep(140);
      pct = Math.min(100, pct + Math.floor(Math.random() * 9) + 3);
      const filled = Math.round(pct / 5);
      bar.textContent = "[" + "#".repeat(filled) + " ".repeat(20 - filled) + "] " + pct + "%";
    }

    clearInterval(dataLoop);
    dataContainer.remove();

    await sleep(150);
    appendLine("");
    await typeLine("ACCESS GRANTED — you now have root on absolutely nothing.", "line-bright", 8);
    appendLine("");
  }

  function handleCommand(raw) {
    const trimmed = raw.trim();
    if (trimmed === "") return;

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const lower = cmd.toLowerCase();

    switch (lower) {
      case "help":
        helpText.forEach((l) => appendLine(l, "line-dim"));
        break;

      case "whoami":
        appendLine("root@anonymous — clearance level: MAXIMUM (self-assigned)", "line-bright");
        break;

      case "date":
        appendLine(new Date().toString(), "line-dim");
        break;

      case "ls":
        appendLine(Object.keys(fakeFiles).join("    "));
        break;

      case "cat":
        if (!arg) {
          appendLine("cat: missing filename", "line-error");
        } else if (fakeFiles[arg]) {
          appendLine(fakeFiles[arg], "line-bright");
        } else {
          appendLine("cat: " + arg + ": No such file or directory", "line-error");
        }
        break;

      case "hack":
        runHackSequence();
        break;

      case "matrix":
        rainSpeed = rainSpeed >= 4 ? 1 : rainSpeed + 1;
        appendLine("Rain intensity set to " + rainSpeed + "x.", "line-dim");
        break;

      case "sudo":
        if (!arg) {
          appendLine("sudo: a command is required", "line-error");
        } else {
          appendLine(
            "Permission granted, but '" + arg + "' doesn't actually do anything here.",
            "line-warn"
          );
        }
        break;

      case "clear":
        output.innerHTML = "";
        break;

      case "exit":
      case "quit":
        appendLine("There is no escape. (Open a new tab if you really want out.)", "line-warn");
        break;

      default:
        appendLine(lower + ": command not found", "line-error");
    }
  }

  // ---------- Input handling ----------
  let currentValue = "";

  function refreshTyped() {
    typedEl.textContent = currentValue;
  }

  hiddenInput.addEventListener("input", () => {
    currentValue = hiddenInput.value;
    refreshTyped();
  });

  hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const promptLabel = document.getElementById("promptLabel").textContent;
      appendLine(promptLabel + " " + currentValue);
      handleCommand(currentValue);
      currentValue = "";
      hiddenInput.value = "";
      refreshTyped();
      scrollToBottom();
    }
  });

  document.addEventListener("click", () => hiddenInput.focus());
  window.addEventListener("load", () => hiddenInput.focus());

  runBoot();
})();
