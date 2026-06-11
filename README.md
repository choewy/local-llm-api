# Local LLM API

## install ollama

```sh
curl -fsSL https://ollama.com/install.sh | sh

ollama --version
```

## download model

```sh
ollama pull qwen3:4b
ollama pull qwen3:8b
```

| model      |   size | resource | 성능                                       |
| ---------- | -----: | -------: | ------------------------------------------ |
| qwen3:0.6b | ~0.5GB |    1~2GB | 간단한 챗봇, FAQ, 분류기 수준              |
| qwen3:1.7b | ~1.4GB |    2~3GB | 기본 질답 가능, 단순 업무 자동화           |
| qwen3:4b   | ~2.6GB |    4~6GB | ChatGPT 3.5 하위권 느낌, 간단한 코딩 가능  |
| qwen3:8b   | ~5.2GB |   8~12GB | 실사용 가능, 코딩/RAG/에이전트 입문용      |
| qwen3:14b  |   ~9GB |  14~20GB | 꽤 똑똑함, 복잡한 코딩·추론 가능           |
| qwen3:32b  | ~20GB+ |    30GB+ | GPT-4 초기급 일부 작업 가능, 로컬 상급자용 |

## docker run

```sh
docker-compose up --build -d
```

```sh
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {
        "role": "user",
        "content": "hello"
      }
    ]
  }'
```

## local

- terminal 1

```sh
ollama serve
```

- terminal 2

```sh
ollama run qwen3:8b
```
