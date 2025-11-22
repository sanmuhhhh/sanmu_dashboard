# ==========================================
# 🔨 C++ 核心模块构建配置
# 用于编译高性能 C++ 扩展，供 Python 调用
# ==========================================

# CMake 最低版本要求（3.10 支持现代 C++ 特性）
cmake_minimum_required(VERSION 3.10)

# 项目名称（用于生成库文件，如 libsanmu_cpp_core.so）
project(sanmu_cpp_core)

# C++ 标准版本（C++17 提供现代特性：结构化绑定、if constexpr 等）
set(CMAKE_CXX_STANDARD 17)

# ==========================================
# 📝 待实现部分
# 以下代码将在后续开发中启用
# ==========================================

# TODO: 集成 pybind11（Python-C++ 绑定库）
# 步骤：
#   1. 下载 pybind11 到 cpp_core/pybind11/ 目录
#   2. 取消注释下面的 add_subdirectory 行
#   3. 取消注释 pybind11_add_module 行
#   4. 创建 src/main.cpp 实现 Python 接口

# add_subdirectory(pybind11)                    # 引入 pybind11 子项目
# pybind11_add_module(cpp_core src/main.cpp)   # 创建 Python 模块 "cpp_core"

# ==========================================
# 📚 使用示例（未来参考）
# ==========================================
# 编译命令：
#   mkdir build && cd build
#   cmake ..
#   make
#
# 生成的 Python 模块：
#   build/cpp_core.cpython-311-x86_64-linux-gnu.so
#
# 在 Python 中使用：
#   import cpp_core
#   result = cpp_core.add(1, 2)  # 调用 C++ 函数
