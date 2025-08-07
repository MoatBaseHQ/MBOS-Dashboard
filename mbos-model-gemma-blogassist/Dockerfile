FROM ollama/ollama

# Copy your model to the Ollama models directory
COPY .ollama /root/.ollama

# Optional: Copy a custom Modelfile if needed
COPY Modelfile /Modelfile

# Set default model to load if you're baking it in
ENV OLLAMA_MODELS=/root/.ollama

# Run Ollama server on container start
CMD ["ollama", "serve"]