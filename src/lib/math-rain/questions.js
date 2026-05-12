const DIFFICULTY_CONFIG = {
  Easy: { ops: ['+', '-'], min: 1, max: 20, spawnInterval: 2200, baseSpeed: 11, speedJitter: 3, scorePerCorrect: 10, lives: 5 },
  Normal: { ops: ['+', '-', '×'], min: 1, max: 50, spawnInterval: 1800, baseSpeed: 15, speedJitter: 4, scorePerCorrect: 15, lives: 4 },
  Hard: { ops: ['+', '-', '×', '÷'], min: 5, max: 99, spawnInterval: 1300, baseSpeed: 20, speedJitter: 5, scorePerCorrect: 20, lives: 3 },
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export function getMathRainConfig(difficulty) { return DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Easy; }
export function createMathQuestion(difficulty, id) {
  const cfg = getMathRainConfig(difficulty);
  const op = cfg.ops[Math.floor(Math.random() * cfg.ops.length)];
  let expression = ''; let answer = 0;
  if (op === '÷') {
    const divisor = randomInt(2, 12); const quotient = randomInt(2, 15); const dividend = divisor * quotient;
    expression = `${dividend} ÷ ${divisor}`; answer = quotient;
  } else {
    const a = randomInt(cfg.min, cfg.max); const b = randomInt(cfg.min, cfg.max);
    if (op === '+') { expression = `${a} + ${b}`; answer = a + b; }
    else if (op === '-') { expression = `${a} - ${b}`; answer = a - b; }
    else { expression = `${a} × ${b}`; answer = a * b; }
  }
  return { id, expression, answer, x: randomInt(5, 82), y: -8, speed: cfg.baseSpeed + Math.random() * cfg.speedJitter, difficulty, createdAt: Date.now() };
}
export const MATH_RAIN_DIFFICULTIES = Object.keys(DIFFICULTY_CONFIG);
