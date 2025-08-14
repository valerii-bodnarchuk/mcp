# MCP — Multi-Component Pipeline

**MCP** (Multi-Component Pipeline) — модульный фреймворк для построения цепочек обработки запросов с использованием **LLM**, **Retrieval-Augmented Generation (RAG)** и векторного поиска (**Qdrant**).  
Каждый шаг пайплайна выполняется последовательно и может быть заменён или расширен.

---

## ✨ Возможности

- **LLM Orchestration** — пошаговая обработка запроса с логированием
- **RAG** — извлечение контекста через Qdrant
- **Streaming API** — поддержка стриминга ответов LLM
- **Модульная архитектура** — каждый шаг оформлен как отдельный модуль
- **Готовность к интеграции** — API совместим с REST-запросами

---

## 🚀 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/YOUR_USERNAME/mcp.git
cd mcp
```

### 2. Запустить с Docker Compose
```bash
docker compose up --build
```

### 3. Выполнить запрос
```bash
curl -X POST http://localhost:3001/pipeline/run \
  -H "Content-Type: application/json" \
  -d '{"query":"What is MCP?"}'
```

**Пример ответа:**
```json
{
  "result": "MCP is a graph-based system that utilizes Qdrant for managing and processing its components..."
}
```

---

## 📁 Структура проекта

```
apps/
  api/          # API сервис с эндпоинтами /pipeline/run и /pipeline/stream
  web/          # Next.js UI (если используется)
infra/          # docker-compose, конфиги сервисов
pipeline/       # шаги пайплайна
  steps/
    validate.js
    embed.js
    search.js
    llm.js
    postprocess.js
```

---

## 🛠️ Технологический стек

- **Node.js** — backend runtime
- **Qdrant** — Vector Database
- **OpenAI API** — LLM провайдер
- **Docker & Docker Compose** — контейнеризация

---

## 📊 Архитектура пайплайна

```mermaid
flowchart LR
    A[Запрос от пользователя] --> B[Validate]
    B --> C[Embed (векторизация)]
    C --> D[Search в Qdrant]
    D --> E[Формирование контекста]
    E --> F[LLM (OpenAI API)]
    F --> G[Postprocess]
    G --> H[Ответ клиенту]
```

---

## 🔧 Конфигурация

### Environment Variables
```bash
# .env
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=your_qdrant_api_key
PORT=3001
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - QDRANT_URL=http://qdrant:6333
    depends_on:
      - qdrant

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  qdrant_data:
```

---

## 📡 API Endpoints

### POST /pipeline/run
Выполняет полный пайплайн обработки запроса.

**Request:**
```json
{
  "query": "What is machine learning?",
  "options": {
    "stream": false,
    "max_results": 5
  }
}
```

**Response:**
```json
{
  "result": "Machine learning is a subset of artificial intelligence...",
  "metadata": {
    "processing_time": 1250,
    "steps_executed": ["validate", "embed", "search", "llm", "postprocess"],
    "context_sources": 3
  }
}
```

### POST /pipeline/stream
То же самое, но с потоковой передачей ответа.

**Request:**
```json
{
  "query": "Explain neural networks",
  "stream": true
}
```

**Response:** Server-Sent Events (SSE)

---

## 🔌 Расширение пайплайна

### Добавление нового шага

1. Создайте файл в `pipeline/steps/`:
```javascript
// pipeline/steps/custom-step.js
export async function customStep(context) {
  const { query, previousResults } = context;
  
  // Ваша логика обработки
  const result = await processData(query);
  
  return {
    ...context,
    customResult: result
  };
}
```

2. Зарегистрируйте шаг в пайплайне:
```javascript
// pipeline/index.js
import { customStep } from './steps/custom-step.js';

export const pipeline = [
  validateStep,
  embedStep,
  searchStep,
  customStep,      // ← новый шаг
  llmStep,
  postprocessStep
];
```

---

## 🧪 Тестирование

### Запуск тестов
```bash
npm test
```

### Интеграционные тесты
```bash
npm run test:integration
```

### Нагрузочное тестирование
```bash
npm run test:load
```

---

## 📊 Мониторинг

### Логи
```bash
# Просмотр логов API
docker compose logs -f api

# Логи Qdrant
docker compose logs -f qdrant
```

### Метрики
- Processing time по шагам
- Количество запросов в секунду
- Использование памяти векторной БД
- Latency LLM запросов

---

## 🤝 Contributing

1. Форкните репозиторий
2. Создайте feature branch: `git checkout -b feature/amazing-feature`
3. Сделайте коммит: `git commit -m 'Add amazing feature'`
4. Запушьте в branch: `git push origin feature/amazing-feature`
5. Создайте Pull Request

---

## 📄 Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)