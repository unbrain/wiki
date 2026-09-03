import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const rawBaseDir = ctx.argv.serve ? "/" : url.pathname
  const baseDir = rawBaseDir.endsWith("/") ? rawBaseDir : `${rawBaseDir}/`

  return (
    <article class="popover-hint not-found-article">
      <div class="not-found-layout">
        <div class="not-found-info">
          <div class="not-found-tag">[ 404 · 空间信标丢失 ]</div>
          <h1 class="not-found-title">404</h1>
          <p class="not-found-desc">{i18n(cfg.locale).pages.error.notFound}</p>
          <p class="not-found-sub">
            当前坐标未能定位到目标卷轴。您可以返回核心枢纽，或通过右侧信标小游戏校准传感器信号。
          </p>
          <div class="not-found-links">
            <a href={baseDir} class="not-found-btn not-found-btn--primary">
              返回知识枢纽 ↗
            </a>
            <a href={`${baseDir}关于我`} class="not-found-btn">
              关于我 / 简历
            </a>
            <a href={`${baseDir}朝花夕拾/`} class="not-found-btn">
              朝花夕拾归档
            </a>
            <a href={`${baseDir}javascript-算法/`} class="not-found-btn">
              JavaScript 算法
            </a>
            <a href={`${baseDir}tags/`} class="not-found-btn">
              全站标签库
            </a>
          </div>
        </div>

        {/* CYBER SNAKE EASTER EGG */}
        <div class="snake-panel" id="cyber-snake-container">
          <div class="snake-hud-header">
            <span class="snake-hud-title">[ BEACON_SNAKE.EXE ]</span>
            <span class="snake-status-text">按方向键行动</span>
          </div>
          <div class="snake-canvas-box">
            <canvas width="240" height="320" class="snake-canvas"></canvas>
          </div>
          <div class="snake-hud-footer">
            <div class="snake-metrics">
              <span class="snake-metric-label">SCORE:</span>
              <span class="snake-score-val">00</span>
              <span class="snake-metric-sep">|</span>
              <span class="snake-metric-label">BEST:</span>
              <span class="snake-maxscore-val">00</span>
            </div>
            <button class="snake-replay-btn" type="button">重置信标 ↺</button>
          </div>
          <div class="snake-dpad">
            <button class="dpad-btn dpad-up" data-dir="up">▲</button>
            <div class="dpad-mid">
              <button class="dpad-btn dpad-left" data-dir="left">◀</button>
              <button class="dpad-btn dpad-down" data-dir="down">▼</button>
              <button class="dpad-btn dpad-right" data-dir="right">▶</button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .not-found-article {
          max-width: 900px;
          margin: 2rem auto;
        }
        .not-found-layout {
          display: flex;
          flex-wrap: wrap;
          gap: 2.5rem;
          align-items: center;
          justify-content: space-between;
        }
        .not-found-info {
          flex: 1 1 360px;
        }
        .not-found-tag {
          font-family: var(--codeFont);
          color: #43d9ad;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.08em;
        }
        .not-found-title {
          font-size: 4.5rem;
          line-height: 1;
          margin: 0.2rem 0 1rem 0;
          color: var(--secondary);
          font-family: var(--headerFont);
        }
        .not-found-desc {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.6rem;
        }
        .not-found-sub {
          font-size: 0.95rem;
          color: var(--darkgray);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .not-found-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .not-found-btn {
          display: inline-block;
          font-size: 0.85rem;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          background: var(--lightgray);
          border: 1px solid var(--gray);
          color: var(--dark) !important;
          text-decoration: none !important;
          transition: all 0.2s;
        }
        .not-found-btn:hover {
          border-color: var(--secondary);
          transform: translateY(-1px);
        }
        .not-found-btn--primary {
          background: var(--secondary);
          color: #fff !important;
          border-color: var(--secondary);
        }

        /* ── SNAKE GAME PANEL ── */
        .snake-panel {
          flex: 0 0 280px;
          background: #011221;
          border: 1px solid #1e2d3d;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 12px 32px rgba(0,0,0,0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .snake-hud-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-family: var(--codeFont);
          font-size: 0.75rem;
          color: #607b96;
          margin-bottom: 0.6rem;
        }
        .snake-hud-title {
          color: #43d9ad;
          font-weight: bold;
        }
        .snake-canvas-box {
          background: #010c17;
          border: 1px solid #1e2d3d;
          border-radius: 6px;
          overflow: hidden;
          line-height: 0;
        }
        .snake-canvas {
          display: block;
        }
        .snake-hud-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.8rem;
          font-family: var(--codeFont);
          font-size: 0.8rem;
        }
        .snake-metrics {
          color: #e5e9f0;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .snake-metric-label {
          color: #607b96;
        }
        .snake-score-val, .snake-maxscore-val {
          color: #43d9ad;
          font-weight: bold;
        }
        .snake-replay-btn {
          background: #1c2b3a;
          color: #fea55f;
          border: 1px solid #314457;
          border-radius: 4px;
          padding: 0.2rem 0.5rem;
          font-size: 0.75rem;
          font-family: var(--codeFont);
          cursor: pointer;
          transition: background 0.2s;
        }
        .snake-replay-btn:hover {
          background: #25394e;
        }
        .snake-dpad {
          display: none;
          flex-direction: column;
          align-items: center;
          margin-top: 0.8rem;
          gap: 0.2rem;
        }
        .dpad-mid {
          display: flex;
          gap: 0.3rem;
        }
        .dpad-btn {
          width: 38px;
          height: 34px;
          background: #1c2b3a;
          border: 1px solid #314457;
          border-radius: 4px;
          color: #43d9ad;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media (max-width: 600px) {
          .snake-panel {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
          .snake-dpad {
            display: flex;
          }
        }
        `
      }} />

      <script src={`${baseDir}static/scripts/snake.js`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof initCyberSnake === "function") {
            initCyberSnake("cyber-snake-container");
          }
          if (typeof fetchData !== "undefined") {
            fetchData.then(function(index) {
              var basePath = document.body.dataset.basepath || "";
              if (basePath.length > 1 && basePath.endsWith("/")) {
                basePath = basePath.slice(0, -1);
              }
              var pathname = window.location.pathname;
              var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
              if (hasBasePrefix) {
                pathname = pathname.slice(basePath.length);
              }
              if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
              }
              if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
              }
              if (pathname.endsWith(".html")) {
                pathname = pathname.slice(0, -5);
              }
              if (pathname.endsWith("/index")) {
                pathname = pathname.slice(0, -6);
              }
              var lowered = pathname.toLowerCase();
              if (lowered !== pathname && index[lowered] != null) {
                var prefix = hasBasePrefix ? basePath : "";
                var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                window.location.replace(target);
              }
            });
          }
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
