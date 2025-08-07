# ---- Base Layer ----
FROM python:3.10-slim AS base

# Set working directory
WORKDIR /app

# ---- Install System Deps ----
RUN apt-get update && apt-get install -y \
    curl git unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---- Install Node.js (Optional, if using JS frontend) ----
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# ---- Install Ollama (Runtime model fetch) ----
RUN curl -fsSL https://ollama.com/install.sh | sh

# ---- Copy App Files ----
COPY . .

# ---- Install Python Deps ----
RUN pip install --no-cache-dir -r requirements.txt

# ---- Expose Ports ----
EXPOSE 11434 3000

# ---- Startup ----
CMD ["bash", "-c", "\
    ollama serve & \
    ollama run gemma:2b & \
    sleep 5 && \
    python main.py \
"]
