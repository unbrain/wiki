/**
 * Retro Cyberpunk Particle Snake Game
 * Extracted & refactored from cv project for Quartz 404 / Playground Easter Egg
 */
(function() {
  function initCyberSnake(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Build UI if not present
    var canvas = container.querySelector('canvas');
    var scoreDom = container.querySelector('.snake-score-val');
    var maxScoreDom = container.querySelector('.snake-maxscore-val');
    var replayBtn = container.querySelector('.snake-replay-btn');
    var statusText = container.querySelector('.snake-status-text');

    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }

    var CTX = canvas.getContext('2d');
    var W = (canvas.width = 240);
    var H = (canvas.height = 320);

    var snake, food, currentHue;
    var cells = 20;
    var cellSize = W / cells;
    var isGameOver = false;
    var score = 0;
    var maxScore = parseInt(localStorage.getItem('cyberSnakeMax') || '0', 10);
    if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
    var particles = [];
    var splashingParticleCount = 18;
    var animFrame = null;

    var Vec = function(x, y) {
      this.x = x;
      this.y = y;
    };
    Vec.prototype.add = function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    };

    function isCollision(v1, v2) {
      return Math.abs(v1.x - v2.x) < 0.1 && Math.abs(v1.y - v2.y) < 0.1;
    }

    var KEY = {
      ArrowUp: false,
      ArrowRight: false,
      ArrowDown: false,
      ArrowLeft: false,
      reset: function() {
        this.ArrowUp = this.ArrowRight = this.ArrowDown = this.ArrowLeft = false;
      }
    };

    function setDirection(dir) {
      if (isGameOver) {
        resetGame();
        return;
      }
      if (dir === 'up' && !KEY.ArrowDown && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowUp = true;
      } else if (dir === 'down' && !KEY.ArrowUp && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowDown = true;
      } else if (dir === 'left' && !KEY.ArrowRight && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowLeft = true;
      } else if (dir === 'right' && !KEY.ArrowLeft && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowRight = true;
      }
    }

    function onKeyDown(e) {
      if (!document.getElementById(containerId)) {
        window.removeEventListener('keydown', onKeyDown);
        if (animFrame) cancelAnimationFrame(animFrame);
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) !== -1) {
        e.preventDefault();
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') setDirection('up');
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') setDirection('down');
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') setDirection('left');
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') setDirection('right');
      if (e.key === ' ' && isGameOver) resetGame();
    }

    window.addEventListener('keydown', onKeyDown);

    if (typeof window.addCleanup === 'function') {
      window.addCleanup(function() {
        if (animFrame) cancelAnimationFrame(animFrame);
        window.removeEventListener('keydown', onKeyDown);
      });
    }

    // Bind touch / D-Pad buttons
    container.querySelectorAll('[data-dir]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setDirection(this.getAttribute('data-dir'));
      });
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', resetGame);
    }

    function Snake() {
      this.pos = new Vec(Math.floor(cells / 2) * cellSize, Math.floor(H / cellSize / 2) * cellSize);
      this.dir = new Vec(0, 0);
      this.delay = 6;
      this.stepCountdown = this.delay;
      this.size = cellSize;
      this.color = '#43D9AD';
      this.history = [];
      this.total = 2;
    }

    Snake.prototype.draw = function() {
      CTX.fillStyle = '#43D9AD';
      CTX.shadowBlur = 10;
      CTX.shadowColor = 'rgba(67, 217, 173, 0.7)';
      CTX.fillRect(this.pos.x + 1, this.pos.y + 1, this.size - 2, this.size - 2);
      CTX.shadowBlur = 0;

      CTX.fillStyle = 'rgba(67, 217, 173, 0.75)';
      for (var i = 0; i < this.history.length; i++) {
        var p = this.history[i];
        CTX.fillRect(p.x + 1, p.y + 1, this.size - 2, this.size - 2);
      }
    };

    Snake.prototype.walls = function() {
      if (this.pos.x >= W) this.pos.x = 0;
      if (this.pos.y >= H) this.pos.y = 0;
      if (this.pos.x < 0) this.pos.x = W - cellSize;
      if (this.pos.y < 0) this.pos.y = H - cellSize;
    };

    Snake.prototype.controls = function() {
      var d = this.size;
      if (KEY.ArrowUp) this.dir = new Vec(0, -d);
      if (KEY.ArrowDown) this.dir = new Vec(0, d);
      if (KEY.ArrowLeft) this.dir = new Vec(-d, 0);
      if (KEY.ArrowRight) this.dir = new Vec(d, 0);
    };

    Snake.prototype.selfCollision = function() {
      for (var i = 0; i < this.history.length; i++) {
        if (isCollision(this.pos, this.history[i])) {
          isGameOver = true;
        }
      }
    };

    Snake.prototype.update = function() {
      this.controls();
      this.walls();
      this.draw();

      if (--this.stepCountdown <= 0) {
        this.stepCountdown = this.delay;

        if (this.dir.x !== 0 || this.dir.y !== 0) {
          if (isCollision(this.pos, food.pos)) {
            incrementScore();
            particleSplash();
            food.spawn();
            this.total++;
            if (this.total % 5 === 0 && this.delay > 3) {
              this.delay--; // speed up
            }
          }

          this.history.push(new Vec(this.pos.x, this.pos.y));
          while (this.history.length > this.total) {
            this.history.shift();
          }

          this.pos.add(this.dir);
          if (this.total > 2) {
            this.selfCollision();
          }
        }
      }
    };

    function Food() {
      this.size = cellSize;
      this.pos = new Vec(0, 0);
      this.spawn();
    }

    Food.prototype.spawn = function() {
      var cols = Math.floor(W / cellSize);
      var rows = Math.floor(H / cellSize);
      var randX = Math.floor(Math.random() * cols) * cellSize;
      var randY = Math.floor(Math.random() * rows) * cellSize;

      if (snake) {
        for (var i = 0; i < snake.history.length; i++) {
          if (snake.history[i].x === randX && snake.history[i].y === randY) {
            return this.spawn();
          }
        }
      }
      this.pos = new Vec(randX, randY);
    };

    Food.prototype.draw = function() {
      CTX.shadowBlur = 12;
      CTX.shadowColor = '#fea55f';
      CTX.fillStyle = '#fea55f';
      CTX.fillRect(this.pos.x + 2, this.pos.y + 2, this.size - 4, this.size - 4);
      CTX.shadowBlur = 0;
    };

    function Particle(pos, vel) {
      this.pos = new Vec(pos.x, pos.y);
      this.vel = vel;
      this.size = 4;
      this.ttl = 25;
    }

    Particle.prototype.update = function() {
      this.pos.add(this.vel);
      this.size = Math.max(0, this.size - 0.15);
      this.ttl--;
      CTX.fillStyle = 'rgba(67, 217, 173, ' + (this.ttl / 25) + ')';
      CTX.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    };

    function incrementScore() {
      score++;
      if (scoreDom) scoreDom.textContent = score.toString().padStart(2, '0');
      if (score > maxScore) {
        maxScore = score;
        localStorage.setItem('cyberSnakeMax', maxScore);
        if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
      }
    }

    function particleSplash() {
      for (var i = 0; i < splashingParticleCount; i++) {
        var vel = new Vec((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
        particles.push(new Particle(food.pos, vel));
      }
    }

    function drawGrid() {
      CTX.lineWidth = 0.5;
      CTX.strokeStyle = 'rgba(30, 45, 61, 0.4)';
      for (var x = 0; x < W; x += cellSize) {
        CTX.beginPath();
        CTX.moveTo(x, 0);
        CTX.lineTo(x, H);
        CTX.stroke();
      }
      for (var y = 0; y < H; y += cellSize) {
        CTX.beginPath();
        CTX.moveTo(0, y);
        CTX.lineTo(W, y);
        CTX.stroke();
      }
    }

    function loop() {
      CTX.fillStyle = '#011221';
      CTX.fillRect(0, 0, W, H);
      drawGrid();

      if (!isGameOver) {
        snake.update();
        food.draw();

        for (var i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          if (particles[i].ttl <= 0 || particles[i].size <= 0) {
            particles.splice(i, 1);
          }
        }

        if (statusText && snake.dir.x === 0 && snake.dir.y === 0) {
          statusText.textContent = '按方向键开始行动';
        } else if (statusText) {
          statusText.textContent = '信号追踪中...';
        }

        animFrame = requestAnimationFrame(loop);
      } else {
        // Game Over screen
        CTX.fillStyle = 'rgba(1, 18, 33, 0.85)';
        CTX.fillRect(0, 0, W, H);
        CTX.fillStyle = '#ff6b6b';
        CTX.font = '16px "IBM Plex Mono", monospace';
        CTX.textAlign = 'center';
        CTX.fillText('CRASH DETECTED', W / 2, H / 2 - 15);
        CTX.fillStyle = '#e5e9f0';
        CTX.font = '12px "IBM Plex Mono", monospace';
        CTX.fillText('按空格或点击重试', W / 2, H / 2 + 15);
        if (statusText) statusText.textContent = '连接中断 · GAME OVER';
      }
    }

    function resetGame() {
      if (animFrame) cancelAnimationFrame(animFrame);
      isGameOver = false;
      score = 0;
      if (scoreDom) scoreDom.textContent = '00';
      KEY.reset();
      particles = [];
      snake = new Snake();
      food = new Food();
      loop();
    }

    resetGame();
  }

  window.initCyberSnake = initCyberSnake;
  document.addEventListener('nav', function() {
    if (document.getElementById('cyber-snake-container')) {
      initCyberSnake('cyber-snake-container');
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cyber-snake-container')) {
      initCyberSnake('cyber-snake-container');
    }
  });
})();
