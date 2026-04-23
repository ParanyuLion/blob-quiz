import { BlobResult } from '../types';

export const BLOB_RESULTS: Record<string, BlobResult> = {
  burnout: {
    id: 'burnout',
    name: 'The Burnout Blob',
    subtitle: 'ก้อนหมดไฟ สายเหนื่อย',
    description:
      'กาแฟคือเลือด วันไหนไม่ดื่มก็ไม่ใช่มนุษย์ หน้าแห้งเป็นปกติ และใครถามว่า "เป็นยังไงบ้าง?" ก็จะได้คำตอบ "โอเค" ทั้งที่ไม่โอเคเลย เจ้าก้อนนี้ทำงานหนักที่สุด แต่ถูกเห็นคุณค่าน้อยที่สุด ไม่เป็นไร... อย่างน้อยก็ยังมีกาแฟอยู่เสมอ',
    rarity: 'Common',
    badgeColor: '#9CA3AF',
    gradientFrom: '#D1D5DB',
    gradientTo: '#9CA3AF',
    emoji: '☕',
    traits: ['กาแฟคือชีวิต', 'หน้าแห้งเป็นปกติ', 'เหนื่อยแต่ไม่บอกใคร', 'Snooze เป็นอาชีพ'],
    shareText:
      'ฉันคือ The Burnout Blob ☕ เหนื่อยแต่ยังรอดอยู่ได้! ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
  buffet: {
    id: 'buffet',
    name: 'The Buffet Blob',
    subtitle: 'ก้อนตะกละ สายกิน',
    description:
      'พิกัดประจำคือร้านหมูกระทะทุกร้านในรัศมี 20 กิโล เจ้าก้อนนี้ตื่นมาพร้อมความคิดเรื่องอาหาร และหลับไปพร้อมความฝันเรื่องอาหาร ชีวิตดี ชีวิตอิ่ม ปัญหาทุกอย่างแก้ได้ด้วยการกินของอร่อย แล้วก็จริงด้วย',
    rarity: 'Common',
    badgeColor: '#22C55E',
    gradientFrom: '#86EFAC',
    gradientTo: '#22C55E',
    emoji: '🍖',
    traits: ['กินได้ทุกเวลา', 'รู้จักร้านอร่อยทุกย่าน', 'อาหารคือความสุข', 'กระเพาะไม่มีก้น'],
    shareText:
      'ฉันคือ The Buffet Blob 🍖 กินเป็นอาชีพ! ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
  sale: {
    id: 'sale',
    name: 'The Sale Hunter',
    subtitle: 'นักช้อปละลายทรัพย์',
    description:
      'บ้านเต็มไปด้วยพัสดุที่ยังไม่ได้แกะ แต่ก็ยังกดสั่งอีก ตราบใดที่มีโปรลด 50% เจ้าก้อนนี้จะไม่หยุด มีอุปกรณ์ออกกำลังกายครบชุดที่ยังไม่เคยแตะ มีเครื่องครัวชั้นดีที่ใช้ไม่เป็น แต่อย่างน้อยก็ได้ราคาดี',
    rarity: 'Rare',
    badgeColor: '#3B82F6',
    gradientFrom: '#93C5FD',
    gradientTo: '#3B82F6',
    emoji: '🛍️',
    traits: ['รู้โปรทุก App', 'พัสดุเต็มบ้าน', 'ช้อปแทนการแก้ปัญหา', 'SALE คือภาษาแม่'],
    shareText:
      'ฉันคือ The Sale Hunter 🛍️ Rare Drop! ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
  deadline: {
    id: 'deadline',
    name: 'The Deadline Warrior',
    subtitle: 'อัจฉริยะข้ามคืน',
    description:
      'พลังงานของเจ้าก้อนนี้ชาร์จได้จาก Deadline เท่านั้น เวลาปกติทำงานได้ 20% แต่พอ Deadline กระชั้นใน 3 ชั่วโมงก็ดัน 300% อย่างน่ากลัว ไม่มีใครรู้ว่าทำได้ยังไง แต่ก็ทำออกมาได้เสมอ นี่คือ Feature ไม่ใช่ Bug',
    rarity: 'Super Rare',
    badgeColor: '#A855F7',
    gradientFrom: '#D8B4FE',
    gradientTo: '#A855F7',
    emoji: '⚡',
    traits: [
      'ชาร์จพลังจาก Deadline',
      'ทำงานตีสี่ตีห้าคือปกติ',
      'ส่งงานไม่เคยเกิน 1 วินาที',
      'กาแฟกล่องใหญ่คือหมู่บ้าน',
    ],
    shareText:
      'ฉันคือ The Deadline Warrior ⚡ SUPER RARE! ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
  finalboss: {
    id: 'finalboss',
    name: 'The Final Boss Blob',
    subtitle: 'ก้อนสงบนิ่ง ไม่สนโลก',
    description:
      'เจ้าก้อนนี้มีพลังงานสูงสุด แต่เลือกจะไม่ใช้มัน ดูสงบ ดูรู้ทุกอย่าง แต่จริงๆ แค่ไม่สนใจ ทุกอย่างที่คนอื่นเครียดกัน เจ้าก้อนนี้ผ่านมาแล้วทั้งนั้น และตัดสินว่ามันไม่คุ้มกับพลังงาน ถ้าได้เจอก้อนแบบนี้ ให้ถือว่าโชคดีมาก',
    rarity: 'Legendary',
    badgeColor: '#F59E0B',
    gradientFrom: '#FDE68A',
    gradientTo: '#F59E0B',
    emoji: '👑',
    traits: ['สงบจนน่ากลัว', 'ไม่สนโลก', 'นอนได้ทุกที่ทุกเวลา', 'รู้ทุกอย่างแต่ไม่พูด'],
    shareText:
      'ฉันคือ The Final Boss Blob 👑 LEGENDARY! หายากมากๆ ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
  lucky: {
    id: 'lucky',
    name: 'The Lucky Blob',
    subtitle: 'ก้อนทองคำ ดวงดีแบบงง',
    description:
      'ไม่มีใครเข้าใจว่าทำไม แต่ทุกอย่างของเจ้าก้อนนี้มันแค่ดีเอง หาที่จอดรถได้ทันที ซื้อสลากก็ถูก ทำอาหารมั่วก็อร่อย ชีวิตแบบนี้ไม่ได้มาจากความพยายาม แต่มาจากจักรวาลที่ชอบเจ้าก้อนนี้เป็นพิเศษ คุณคือ 1% ของโลก',
    rarity: 'Mythic',
    badgeColor: '#FF6B9D',
    gradientFrom: '#FF6B9D',
    gradientTo: '#7C3AED',
    emoji: '🌈',
    traits: ['ดวงดีแบบไม่มีเหตุผล', 'จักรวาลชอบพิเศษ', 'ของดีมาเองทุกอย่าง', 'หายาก 1% ในโลก'],
    shareText:
      'ฉันคือ The Lucky Blob 🌈 MYTHIC RARE ออกยากมากที่สุด! ลองเช็กดูว่าแกเป็นก้อนสายพันธุ์ไหน 👇',
  },
};

export const RARITY_ORDER: Record<string, number> = {
  Common: 0,
  Rare: 1,
  'Super Rare': 2,
  Legendary: 3,
  Mythic: 4,
};
