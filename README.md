# MCP — Multi-Component Pipeline

**MCP** (Multi-Component Pipeline) — модульный фреймворк для построения цепочек обработки запросов с использованием **LLM**, **Retrieval-Augmented Generation (RAG)** и векторного поиска (**Qdrant**).  
Каждый шаг пайплайна выполняется последовательно и может быть заменён или расширен.

---

## ✨ Возможности
- **LLM Orchestration** — пошаговая обработка запроса с логированием.
- **RAG** — извлечение контекста через Qdrant.
- **Streaming API** — поддержка стриминга ответов LLM.
- **Модульная архитектура** — каждый шаг оформлен как отдельный модуль.
- **Готовность к интеграции** — API совместим с REST-запросами.

---

## 🚀 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/YOUR_USERNAME/mcp.git
cd mcp
2. Запустить с Docker Compose
bash
Copy
Edit
docker compose up --build
3. Выполнить запрос
bash
Copy
Edit
curl -X POST http://localhost:3001/pipeline/run \
  -H "Content-Type: application/json" \
  -d '{"query":"What is MCP?"}'
Пример ответа:

json
Copy
Edit
{
  "result": "MCP is a graph-based system that utilizes Qdrant for managing and processing its components..."
}
📂 Структура проекта
bash
Copy
Edit
apps/
  api/        # API сервис с эндпоинтами /pipeline/run и /pipeline/stream
  web/        # Next.js UI (если используется)
infra/        # docker-compose, конфиги сервисов
pipeline/     # шаги пайплайна
  steps/
    validate.js
    embed.js
    search.js
    llm.js
    postprocess.js
🛠 Технологии
Node.js

Qdrant (Vector DB)

OpenAI API (LLM)

Docker & Docker Compose

📊 Архитектура пайплайна
mermaid
Copy
Edit
flowchart LR
    A[Запрос от пользователя] --> B[Validate]
    B --> C[Embed (векторизация)]
    C --> D[Search в Qdrant]
    D --> E[Формирование контекста]
    E --> F[LLM (OpenAI API)]
    F --> G[Postprocess]
    G --> H[Ответ клиенту]
📄 Лицензия
MIT

arduino
Copy
Edit

Если хочешь, могу сразу накидать сюда **раздел "Как добавить свой шаг в MCP"**, чтобы на собесе выглядело как готовый open-source фреймворк.  
Тогда вообще будет +100 к авторитету.