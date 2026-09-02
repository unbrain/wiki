---
title: Vue 3 Readonly 与 isReactive / isReadonly 体系
description: 探索 Vue 3 中只读响应式对象的实现机制与公共 handler 抽象设计
aliases:
  - Readonly
tags:
  - vue
  - source-code
---

# Readonly 与响应式类型推导

`readonly` 本质上是一个只读的代理对象：它拦截 `get` 操作，但**不进行依赖收集**，并在尝试 `set` 时抛出警告或直接拦截。

## 实现结构

```typescript
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: object, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }

    const res = Reflect.get(target, key, receiver);

    if (shallow) {
      return res;
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target: object, key: string | symbol, value: unknown, receiver: object) {
    const res = Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return res;
  };
}

export const mutableHandlers = {
  get: createGetter(),
  set: createSetter(),
};

export const readonlyHandlers = {
  get: createGetter(true),
  set(target: object, key: string | symbol) {
    console.warn(`key :"${String(key)}" set 失败，因为 target 是 readonly`);
    return true;
  },
};

export function readonly(target: object) {
  return new Proxy(target, readonlyHandlers);
}

export function isReactive(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_REACTIVE]);
}

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_READONLY]);
}

export function isProxy(value: unknown): boolean {
  return isReactive(value) || isReadonly(value);
}
```
