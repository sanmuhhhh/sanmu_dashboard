# 🏗️ FastAPI 后端架构说明

## 📂 app/ 目录结构

FastAPI 项目采用**分层架构（Layered Architecture）**，将代码按职责分离，便于维护和测试。

```text
app/
├── main.py              # 🚪 应用入口（FastAPI 实例、路由注册）
├── api/                 # 🌐 API 路由层（处理 HTTP 请求）
│   └── v1/              #    API 版本控制（v1, v2...）
├── core/                # ⚙️ 核心配置（数据库连接、安全、日志）
├── models/              # 🗄️ 数据库模型（SQLAlchemy ORM）
├── schemas/             # 📋 数据校验模型（Pydantic）
└── services/            # 🧠 业务逻辑层（纯业务代码，不涉及 HTTP）
```

---

## 🎯 各层职责详解

### 1. **main.py** - 应用入口

**作用**：创建 FastAPI 应用实例，注册路由，配置中间件。

```python
from fastapi import FastAPI

# 创建应用实例
app = FastAPI(
    title="Sanmu Dashboard",
    description="Personal Data Empire Backend",
    version="0.1.0"
)

# 注册路由（可以在这里直接写，或从 api/ 导入）
@app.get("/")
async def root():
    return {"message": "Hello"}

# 或者从子模块导入路由
from app.api.v1 import router as v1_router
app.include_router(v1_router, prefix="/api/v1")
```

---

### 2. **api/** - API 路由层

**作用**：定义 HTTP 端点，处理请求参数，调用 Service 层，返回响应。

**特点**：
- ✅ 只负责 HTTP 相关逻辑（路径、方法、状态码）
- ✅ 不包含业务逻辑（业务逻辑在 Service 层）
- ✅ 使用 Pydantic Schema 验证请求/响应

**示例结构**：
```python
# app/api/v1/endpoints/users.py
from fastapi import APIRouter, Depends
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

router = APIRouter()

@router.post("/users", response_model=UserResponse)
async def create_user(
    user_data: UserCreate,                    # Pydantic 自动验证请求体
    service: UserService = Depends()          # 依赖注入 Service
):
    # 调用 Service 层处理业务逻辑
    user = await service.create_user(user_data)
    return user
```

---

### 3. **core/** - 核心配置

**作用**：存放全局配置、数据库连接、安全设置、日志配置等。

**常见文件**：
- `config.py` - 从环境变量/YAML 加载配置
- `database.py` - SQLAlchemy 数据库连接和会话管理
- `security.py` - JWT、密码加密等安全工具
- `logging.py` - 日志配置

**示例**：
```python
# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    
    class Config:
        env_file = ".env"

settings = Settings()
```

```python
# app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(bind=engine)

# 依赖注入：每个请求自动创建数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

### 4. **models/** - 数据库模型（ORM）

**作用**：定义数据库表结构，使用 SQLAlchemy ORM。

**特点**：
- ✅ 对应数据库表
- ✅ 使用 SQLAlchemy 的 `declarative_base()`
- ✅ 定义表字段、关系、索引

**示例**：
```python
# app/models/user.py
from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String)
```

---

### 5. **schemas/** - 数据校验模型（Pydantic）

**作用**：定义 API 的请求/响应数据结构，自动进行数据验证和序列化。

**特点**：
- ✅ 用于 API 输入/输出验证
- ✅ 自动生成 OpenAPI 文档
- ✅ 与数据库模型分离（Model 是数据库结构，Schema 是 API 结构）

**示例**：
```python
# app/schemas/user.py
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):          # 创建用户的请求体
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):        # 返回给客户端的用户信息
    id: int
    username: str
    email: str
    
    class Config:
        from_attributes = True        # 允许从 ORM 模型转换
```

---

### 6. **services/** - 业务逻辑层

**作用**：实现核心业务逻辑，与 HTTP 和数据库解耦。

**特点**：
- ✅ **纯业务代码**，不涉及 HTTP 请求/响应
- ✅ 可以被 API 层、Celery 任务、CLI 工具复用
- ✅ 易于单元测试（不需要模拟 HTTP 请求）

**示例**：
```python
# app/services/user_service.py
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.database import SessionLocal

class UserService:
    def __init__(self, db: SessionLocal):
        self.db = db
    
    async def create_user(self, user_data: UserCreate) -> User:
        # 业务逻辑：检查用户名是否已存在
        existing = self.db.query(User).filter(User.username == user_data.username).first()
        if existing:
            raise ValueError("Username already exists")
        
        # 创建用户
        user = User(**user_data.dict())
        self.db.add(user)
        self.db.commit()
        return user
```

---

## 🔄 数据流向（Request Flow）

```
客户端请求
    ↓
[api/v1/endpoints/users.py]  ← 接收 HTTP 请求，验证参数（Pydantic Schema）
    ↓
[services/user_service.py]    ← 执行业务逻辑
    ↓
[models/user.py]              ← 操作数据库（SQLAlchemy ORM）
    ↓
数据库 (PostgreSQL)
    ↓
[models/user.py]              ← 返回 ORM 对象
    ↓
[services/user_service.py]    ← 返回业务对象
    ↓
[api/v1/endpoints/users.py]   ← 转换为响应 Schema，返回 JSON
    ↓
客户端收到响应
```

---

## 📝 FastAPI 编写后端的核心概念

### 1. **依赖注入（Dependency Injection）**

FastAPI 的核心特性，自动管理依赖（数据库会话、认证等）。

```python
from fastapi import Depends
from app.core.database import get_db

@router.get("/users")
async def get_users(db = Depends(get_db)):  # 自动注入数据库会话
    users = db.query(User).all()
    return users
```

### 2. **自动文档生成**

访问 `http://localhost:8000/docs` 查看 Swagger UI，`/redoc` 查看 ReDoc。

### 3. **异步支持**

FastAPI 原生支持 `async/await`，适合 I/O 密集型操作（数据库查询、API 调用）。

```python
@router.get("/users")
async def get_users():  # 异步函数
    users = await db.query(User).all()  # 异步数据库查询
    return users
```

### 4. **类型提示（Type Hints）**

利用 Python 类型提示进行自动验证和文档生成。

```python
@router.post("/users", response_model=UserResponse)
async def create_user(user_data: UserCreate) -> UserResponse:
    # FastAPI 自动验证 user_data 是否符合 UserCreate Schema
    # 自动确保返回值符合 UserResponse Schema
    pass
```

---

## 🎨 最佳实践

1. **API 层保持薄**：只做参数验证和调用 Service
2. **Service 层无状态**：不存储请求相关的状态
3. **Schema 与 Model 分离**：API 结构 ≠ 数据库结构
4. **使用依赖注入**：避免全局变量，便于测试
5. **版本控制**：使用 `api/v1/`, `api/v2/` 管理 API 版本

---

## 🚀 下一步开发建议

1. **完善 core/config.py**：从 `config/system.yaml` 加载配置
2. **创建 core/database.py**：设置 SQLAlchemy 连接池
3. **定义第一个 Model**：如 `app/models/user.py`
4. **定义对应的 Schema**：如 `app/schemas/user.py`
5. **创建第一个 Service**：如 `app/services/user_service.py`
6. **创建第一个 API 端点**：如 `app/api/v1/endpoints/users.py`

