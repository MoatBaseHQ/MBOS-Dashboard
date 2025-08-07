FROM nvidia/cuda:12.1.1-cudnn8-runtime-ubuntu22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-pip python3-dev git git-lfs \
    libssl-dev libffi-dev \
    && apt-get clean

# Install Python packages
RUN pip install --upgrade pip
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
RUN pip install transformers accelerate peft datasets bitsandbytes

# Set working directory
WORKDIR /app
COPY . .

# Download base model (optional)
RUN python3 -c "from transformers import AutoTokenizer, AutoModelForCausalLM; AutoTokenizer.from_pretrained('google/gemma-2b'); AutoModelForCausalLM.from_pretrained('google/gemma-2b')"

CMD ["python3", "train.py"]