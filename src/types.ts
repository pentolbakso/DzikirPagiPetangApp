export type Dzikir = {
  id: number;
  arabic: string;
  arabic_latin: string;
  faedah: string;
  // narrator: string;
  note: string;
  title: string;
  translated_id: string;
  time: string;
  from_quran?: boolean;
  is_surah?: boolean;
  max_counter?: number;
};
