export const LASER_LEVELS = {
  Easy: [
    { id: 'easy-1', name: 'Easy 1', difficulty: 'Easy', size: 6, emitter: { row: 5, col: 0, direction: 'right' }, target: { row: 0, col: 5 }, walls: [{ row: 4, col: 4 }], mirrors: [{ row: 5, col: 4, type: '\\' }, { row: 1, col: 4, type: '/' }], description: 'ปรับมุมกระจกให้ลำแสงขึ้นขวาบน' },
    { id: 'easy-2', name: 'Easy 2', difficulty: 'Easy', size: 6, emitter: { row: 0, col: 0, direction: 'right' }, target: { row: 5, col: 5 }, walls: [{ row: 0, col: 4 }, { row: 3, col: 3 }], mirrors: [{ row: 0, col: 2, type: '\\' }, { row: 4, col: 2, type: '/' }], description: 'ผ่านทางอ้อมลงมุมล่างขวา' },
    { id: 'easy-3', name: 'Easy 3', difficulty: 'Easy', size: 6, emitter: { row: 2, col: 0, direction: 'right' }, target: { row: 5, col: 4 }, walls: [{ row: 2, col: 4 }, { row: 3, col: 2 }], mirrors: [{ row: 2, col: 2, type: '\\' }, { row: 5, col: 2, type: '/' }], description: 'เลี้ยวสองครั้งเพื่อเข้าเป้าด้านล่าง' },
  ],
  Normal: [
    { id: 'normal-1', name: 'Normal 1', difficulty: 'Normal', size: 7, emitter: { row: 6, col: 1, direction: 'up' }, target: { row: 1, col: 6 }, walls: [{ row: 4, col: 1 }, { row: 3, col: 4 }], mirrors: [{ row: 5, col: 1, type: '/' }, { row: 5, col: 5, type: '/' }, { row: 1, col: 5, type: '\\' }], description: 'เปลี่ยนทิศขึ้น-ขวา-ขึ้น' },
    { id: 'normal-2', name: 'Normal 2', difficulty: 'Normal', size: 7, emitter: { row: 0, col: 3, direction: 'down' }, target: { row: 6, col: 0 }, walls: [{ row: 2, col: 3 }, { row: 4, col: 5 }, { row: 5, col: 2 }], mirrors: [{ row: 1, col: 3, type: '\\' }, { row: 1, col: 0, type: '/' }, { row: 5, col: 0, type: '/' }], description: 'หลบกำแพงแล้ววกกลับซ้ายล่าง' },
    { id: 'normal-3', name: 'Normal 3', difficulty: 'Normal', size: 7, emitter: { row: 6, col: 6, direction: 'left' }, target: { row: 0, col: 1 }, walls: [{ row: 6, col: 3 }, { row: 2, col: 2 }, { row: 1, col: 5 }], mirrors: [{ row: 6, col: 4, type: '/' }, { row: 3, col: 4, type: '\\' }, { row: 3, col: 1, type: '\\' }, { row: 0, col: 4, type: '/' }], description: 'ต้องหมุนให้เลี้ยว 3 ช่วง' },
  ],
  Hard: [
    { id: 'hard-1', name: 'Hard 1', difficulty: 'Hard', size: 8, emitter: { row: 7, col: 0, direction: 'right' }, target: { row: 0, col: 7 }, walls: [{ row: 7, col: 4 }, { row: 5, col: 6 }, { row: 3, col: 3 }], mirrors: [{ row: 7, col: 2, type: '\\' }, { row: 2, col: 2, type: '/' }, { row: 2, col: 6, type: '\\' }, { row: 0, col: 6, type: '/' }], description: 'เส้นทางยาวพร้อมหลบกำแพงกลาง' },
    { id: 'hard-2', name: 'Hard 2', difficulty: 'Hard', size: 8, emitter: { row: 0, col: 7, direction: 'down' }, target: { row: 7, col: 1 }, walls: [{ row: 2, col: 7 }, { row: 4, col: 4 }, { row: 6, col: 2 }], mirrors: [{ row: 1, col: 7, type: '\\' }, { row: 1, col: 3, type: '/' }, { row: 5, col: 3, type: '\\' }, { row: 5, col: 1, type: '/' }], description: 'หมุนให้ทะลุซ้ายลงล่าง' },
    { id: 'hard-3', name: 'Hard 3', difficulty: 'Hard', size: 8, emitter: { row: 4, col: 0, direction: 'right' }, target: { row: 7, col: 7 }, walls: [{ row: 4, col: 5 }, { row: 2, col: 4 }, { row: 6, col: 6 }, { row: 1, col: 1 }], mirrors: [{ row: 4, col: 2, type: '\\' }, { row: 7, col: 2, type: '/' }, { row: 7, col: 5, type: '\\' }, { row: 5, col: 5, type: '/' }], description: 'วางมุมสุดท้ายเพื่อยิงเข้าเป้า' },
  ],
};

export const LASER_DIFFICULTIES = Object.keys(LASER_LEVELS);
