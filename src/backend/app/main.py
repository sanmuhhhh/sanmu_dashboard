# ==========================================
# 🚪 FastAPI 应用入口文件
# ==========================================

from fastapi import FastAPI
import uvicorn

# 创建 FastAPI 应用实例
app = FastAPI(
    title="Sanmu Dashboard",
    description="Personal Data Empire Backend",
    version="0.1.0"
)

@app.get("/")
async def root():
    """根路径：返回欢迎信息"""
    return {
        "message": "Welcome to Sanmu Dashboard API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """健康检查端点：用于监控系统状态"""
    return {"status": "ok"}

if __name__ == "__main__":
    # 启动开发服务器（代码修改后自动重启）
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
