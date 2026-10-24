
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

const clearBtn = document.getElementById("clear-btn");
const newChatBtn = document.getElementById("new-chat-btn");
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");
const closeSidebarBtn = document.getElementById("close-sidebar");
const overlay = document.getElementById("sidebar-overlay");

function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addMessage(message, sender) {
    const row = document.createElement("div");
    row.className = `message ${sender}-message`;

    const avatar = document.createElement("div");
    avatar.className = "avatar message-avatar";
    avatar.textContent = sender === "bot" ? "🤖" : "👤";

    const body = document.createElement("div");
    body.className = "message-body";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = message;

    const time = document.createElement("time");
    time.className = "message-time";
    time.textContent = getTime();
    time.dateTime = new Date().toISOString();

    body.append(content, time);
    row.append(avatar, body);
    chatBox.appendChild(row);

    chatBox.scrollTop = chatBox.scrollHeight;
    return row;
}

function showTyping() {
    const row = addMessage("", "bot");
    const content = row.querySelector(".message-content");
    content.setAttribute("aria-label", "Bot is typing");

    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";

    for (let i = 0; i < 3; i++) {
        indicator.appendChild(document.createElement("span"));
    }

    content.appendChild(indicator);
    row.querySelector(".message-time").textContent = "";

    return row;
}

async function sendMessage(message) {
    message = message.trim();

    if (!message || sendBtn.disabled) return;

    addMessage(message, "user");

    messageInput.value = "";
    sendBtn.disabled = true;
    messageInput.disabled = true;

    const typingRow = showTyping();

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.reply || "Request failed");
        }

        const content =
            typingRow.querySelector(".message-content");

        content.replaceChildren();
        content.textContent = data.reply;

        const time = typingRow.querySelector(".message-time");
        time.textContent = getTime();
        time.dateTime = new Date().toISOString();

    } catch (error) {
        const content =
            typingRow.querySelector(".message-content");

        content.textContent =
            "Sorry, I couldn't connect. Please try again.";

        console.error("Chat error:", error);

    } finally {
        sendBtn.disabled = false;
        messageInput.disabled = false;
        messageInput.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

chatForm.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(messageInput.value);
});

document.querySelectorAll(".suggestion").forEach(button => {
    button.addEventListener("click", () => {
        sendMessage(button.dataset.message);
    });
});

// Reset the visible conversation.
function resetChat() {
    if (sendBtn.disabled) return;

    chatBox.replaceChildren();

    const welcome = document.createElement("div");
    welcome.className = "welcome";

    const icon = document.createElement("div");
    icon.className = "welcome-icon";
    icon.textContent = "✨";

    const heading = document.createElement("h2");
    heading.textContent = "How can I help you?";

    const description = document.createElement("p");
    description.textContent =
        "Ask a question to start chatting with CleverBot.";

    welcome.append(icon, heading, description);
    chatBox.appendChild(welcome);

    addMessage(
        "Hi! I'm CleverBot. How can I help you today?",
        "bot"
    );

    document.querySelectorAll(".history-item").forEach(item => {
        item.classList.add("active");
    });

    closeSidebar();
    messageInput.focus();
}

clearBtn.addEventListener("click", resetChat);
newChatBtn.addEventListener("click", resetChat);

// Light/dark theme switch.
function applyTheme(theme) {
    document.body.dataset.theme = theme;

    const isDark = theme === "dark";

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

let currentTheme = "dark";

try {
    currentTheme = localStorage.getItem("cleverbot-theme") || "dark";
} catch (error) {
    console.warn("Theme preference storage is unavailable.");
}

applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
    currentTheme =
        currentTheme === "dark" ? "light" : "dark";

    applyTheme(currentTheme);

    try {
        localStorage.setItem("cleverbot-theme", currentTheme);
    } catch (error) {
        console.warn("Could not save theme preference.");
    }
});

// Mobile sidebar.
function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
}

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("visible");
});

closeSidebarBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

messageInput.focus();
