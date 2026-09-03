---
title: Vue 3 响应式系统 Reactive 与 Effect 原理实现
description: 手写实现 Vue 3 响应式核心：Proxy、track 依赖收集、trigger 依赖触发与 effect 副作用函数
aliases:
  - Reactive
tags:
  - vue
  - source-code
  - reactive
---

# Reactive & Effect 响应式系统

> [!abstract] 语言底层核心关联
> 响应式依赖收集机制深度利用了 JavaScript 的词法作用域闭包与 WeakMap 垃圾回收。关于闭包内存机制及属性描述符的演进，可对比参阅 [[朝花夕拾/closure|朝花夕拾 · 深入理解闭包]] 与 [[朝花夕拾/面向对象程序设计（一）|朝花夕拾 · 面向对象与访问器属性]]。

响应式的核心在于：当数据发生变化时，能够自动执行依赖了该数据的副作用函数（`effect`）。

```javascript
let dummy = { age: 0 };
let curAge;

const dummyProxy = reactive({ age: 0 });
effect(() => {
  curAge = dummyProxy.age;
});

dummyProxy.age++; // 触发 effect，curAge 自动更新为 1
```

## 核心实现结构

### 1. Reactive Proxy 代理

使用 ES6 `Proxy` 拦截对象的 `get` 与 `set` 操作：

```typescript
export function reactive(target: object) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      // 收集依赖
      track(target, key);
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      // 触发依赖
      trigger(target, key);
      return res;
    }
  });
}
```

### 2. Track 依赖收集

使用 `targetMap (WeakMap -> Map -> Set)` 存储对象键与对应 `effect` 集合的关系：

```typescript
type KeyToDepMap = Map<any, Set<ReactiveEffect>>;
const targetMap = new WeakMap<object, KeyToDepMap>();

let activeEffect: ReactiveEffect | undefined;

export function track(target: object, key: unknown) {
  if (!activeEffect || !shouldTrack) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  trackEffects(dep);
}

export function trackEffects(dep: Set<ReactiveEffect>) {
  if (dep.has(activeEffect!)) return;
  dep.add(activeEffect!);
  activeEffect!.deps.push(dep);
}
```

### 3. Trigger 依赖触发

```typescript
export function trigger(target: object, key: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    triggerEffects(dep);
  }
}

export function triggerEffects(dep: Set<ReactiveEffect>) {
  const effects = new Set(dep);
  effects.forEach((effect) => {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  });
}
```

### 4. ReactiveEffect 类封装

```typescript
export class ReactiveEffect {
  private _fn: Function;
  deps: Set<ReactiveEffect>[] = [];
  active = true;
  onStop?: () => void;
  public scheduler: Function | undefined;

  constructor(fn: Function, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    if (!this.active) {
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}
```
