/**
 * Retro Cyberpunk Particle Snake Game Engine v3.0 (with 8-Bit Web Audio Synthesizer)
 * Extracted & upgraded from cv project (SnakeContainer.vue / Snake.vue)
 * Zero external audio dependencies - 100% native Web Audio API square/sawtooth synthesis
 */
(function() {
  // ── 8-BIT RETRO AUDIO SYNTHESIZER ──
  var AudioSynth = (function() {
    var ctx = null;
    var soundEnabled = localStorage.getItem('cyberSnakeSound') !== 'false';

    function getContext() {
      if (!ctx && (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined')) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      return ctx;
    }

    function playTone(freq, type, duration, gainVal, slideToFreq) {
      if (!soundEnabled) return;
      var c = getContext();
      if (!c) return;

      try {
        var osc = c.createOscillator();
        var gain = c.createGain();
        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freq, c.currentTime);
        if (slideToFreq) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideToFreq), c.currentTime + duration);
        }

        gain.gain.setValueAtTime(gainVal || 0.05, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start();
        osc.stop(c.currentTime + duration);
      } catch (e) {}
    }

    return {
      turn: function() {
        playTone(180, 'square', 0.04, 0.03, 240);
      },
      eat: function() {
        playTone(440, 'square', 0.06, 0.06, 660);
        setTimeout(function() {
          playTone(660, 'square', 0.08, 0.07, 880);
        }, 50);
      },
      crash: function() {
        playTone(220, 'sawtooth', 0.35, 0.08, 40);
      },
      record: function() {
        playTone(523, 'square', 0.08, 0.06);
        setTimeout(function() { playTone(659, 'square', 0.08, 0.06); }, 70);
        setTimeout(function() { playTone(784, 'square', 0.14, 0.07); }, 140);
      },
      isEnabled: function() {
        return soundEnabled;
      },
      toggle: function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('cyberSnakeSound', soundEnabled);
        getContext();
        return soundEnabled;
      },
      set: function(val) {
        soundEnabled = !!val;
        localStorage.setItem('cyberSnakeSound', soundEnabled);
        getContext();
        return soundEnabled;
      }
    };
  })();

  window.CyberSnakeAudio = AudioSynth;

  function createCyberSnake(containerId, options) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    options = options || {};
    var isIndexMode = options.isIndexMode || false;

    var canvas = container.querySelector('canvas');
    var scoreDom = container.querySelector('.snake-score-val');
    var maxScoreDom = container.querySelector('.snake-maxscore-val');
    var replayBtn = container.querySelector('.snake-replay-btn');
    var soundBtn = container.querySelector('.snake-sound-btn');
    var statusText = container.querySelector('.snake-status-text');
    var overlay = container.querySelector('.ub-snake-overlay');
    var chassis = container.closest('.ub-snake-chassis') || container;

    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }

    var CTX = canvas.getContext('2d');
    var W = (canvas.width = 240);
    var H = (canvas.height = 320);

    var snake, food;
    var cells = 20;
    var cellSize = W / cells;
    var isGameOver = false;
    var isRunning = false;
    var isFocused = !isIndexMode;
    var score = 0;
    var maxScore = parseInt(localStorage.getItem('cyberSnakeMax') || '0', 10);
    if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
    var particles = [];
    var splashingParticleCount = 18;
    var animFrame = null;
    var isVisible = true;

    function updateSoundBtnUI() {
      if (soundBtn) {
        soundBtn.textContent = AudioSynth.isEnabled() ? 'SOUND: ON [AUDIO]🔊' : 'SOUND: OFF [MUTED]🔇';
        soundBtn.style.color = AudioSynth.isEnabled() ? '#43d9ad' : '#607b96';
      }
    }
    updateSoundBtnUI();

    if (soundBtn) {
      soundBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        AudioSynth.toggle();
        updateSoundBtnUI();
      });
    }

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

    function setFocus(active) {
      isFocused = active;
      if (chassis) {
        if (active) chassis.classList.add('is-active');
        else chassis.classList.remove('is-active');
      }
      if (overlay) {
        if (active) overlay.classList.add('is-hidden');
        else overlay.classList.remove('is-hidden');
      }
    }

    function setDirection(dir) {
      if (!isFocused && isIndexMode) {
        setFocus(true);
      }
      if (isGameOver) {
        resetGame();
        return;
      }
      var turned = false;
      if (dir === 'up' && !KEY.ArrowDown && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowUp = true;
        turned = true;
      } else if (dir === 'down' && !KEY.ArrowUp && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowDown = true;
        turned = true;
      } else if (dir === 'left' && !KEY.ArrowRight && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowLeft = true;
        turned = true;
      } else if (dir === 'right' && !KEY.ArrowLeft && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowRight = true;
        turned = true;
      }
      if (turned) {
        AudioSynth.turn();
      }
    }

    function onKeyDown(e) {
      if (!document.getElementById(containerId)) {
        destroy();
        return;
      }

      if (e.key === 'Escape' && isIndexMode) {
        setFocus(false);
        return;
      }

      if (isIndexMode && !isFocused) {
        if (e.key === 'Enter') {
          setFocus(true);
          e.preventDefault();
        }
        return;
      }

      var handledKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'];
      if (handledKeys.indexOf(e.key) !== -1) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') setDirection('up');
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') setDirection('down');
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') setDirection('left');
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') setDirection('right');
      if (e.key === ' ' && isGameOver) resetGame();
    }

    window.addEventListener('keydown', onKeyDown);

    function onContainerClick() {
      if (isIndexMode && !isFocused) {
        setFocus(true);
      }
    }
    container.addEventListener('click', onContainerClick);

    function onDocClick(e) {
      if (isIndexMode && isFocused) {
        if (!container.contains(e.target) && !chassis.contains(e.target)) {
          setFocus(false);
        }
      }
    }
    document.addEventListener('click', onDocClick);

    container.querySelectorAll('[data-dir]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        setDirection(this.getAttribute('data-dir'));
      });
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        resetGame();
      });
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
          AudioSynth.crash();
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
            AudioSynth.eat();
            food.spawn();
            this.total++;
            if (this.total % 5 === 0 && this.delay > 3) {
              this.delay--;
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
        var isNewRecord = (maxScore > 0 && score === maxScore + 1);
        maxScore = score;
        localStorage.setItem('cyberSnakeMax', maxScore);
        if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
        if (isNewRecord) {
          AudioSynth.record();
        }
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
      if (!isRunning || !isVisible) return;

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

        if (statusText) {
          if (snake.dir.x === 0 && snake.dir.y === 0) {
            statusText.textContent = isFocused ? '按方向键行动' : '待命模式';
          } else {
            statusText.textContent = '信号追踪中...';
          }
        }

        animFrame = requestAnimationFrame(loop);
      } else {
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
      isRunning = true;
      loop();
    }

    var observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          isVisible = entry.isIntersecting;
          if (isVisible && isRunning && !animFrame) {
            loop();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }

    function destroy() {
      isRunning = false;
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocClick);
      if (observer) observer.disconnect();
    }

    if (typeof window.addCleanup === 'function') {
      window.addCleanup(destroy);
    }

    resetGame();

    return {
      focus: function() { setFocus(true); },
      blur: function() { setFocus(false); },
      reset: resetGame,
      destroy: destroy
    };
  }

  var indexInstance = null;
  var notFoundInstance = null;

  function initArcade() {
    if (document.getElementById('index-snake-container')) {
      if (indexInstance) indexInstance.destroy();
      indexInstance = createCyberSnake('index-snake-container', { isIndexMode: true });
    }
    if (document.getElementById('cyber-snake-container')) {
      if (notFoundInstance) notFoundInstance.destroy();
      notFoundInstance = createCyberSnake('cyber-snake-container', { isIndexMode: false });
    }
  }

  window.activateIndexSnake = function() {
    if (indexInstance) {
      indexInstance.focus();
    }
  };

  window.initCyberSnake = function(id) {
    if (id === 'cyber-snake-container') {
      if (notFoundInstance) notFoundInstance.destroy();
      notFoundInstance = createCyberSnake(id, { isIndexMode: false });
    } else {
      initArcade();
    }
  };

  document.addEventListener('nav', initArcade);
  document.addEventListener('DOMContentLoaded', initArcade);
})();
