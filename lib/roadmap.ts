import "server-only";

import { get, put } from "@vercel/blob";

export const roadmapStatuses = ["bekliyor", "yapiliyor", "tamamlandi"] as const;
export type RoadmapStatus = (typeof roadmapStatuses)[number];

export const roadmapAreas = ["Gebelik", "Doğum", "Lohusalık", "Adet döngüsü", "Menopoz", "Genel"] as const;
export type RoadmapArea = (typeof roadmapAreas)[number];

export type RoadmapItem = {
  id: string;
  title: string;
  note: string;
  area: RoadmapArea;
  status: RoadmapStatus;
  createdAt: string;
};

const BLOB_PATH = "yapilacaklar/liste.json";

const seedItems: RoadmapItem[] = ([
  {
    id: "dogum-tarihi-hesaplayici",
    title: "Tahmini doğum tarihi hesaplayıcı",
    note: "Son adet tarihinden tahmini doğum tarihini ve kaçıncı haftada olunduğunu hesaplasın; sonuç hafta hafta gebelik sayfasına bağlansın.",
    area: "Gebelik",
  },
  {
    id: "gebelik-kilo-hesaplayici",
    title: "Gebelikte kilo alımı hesaplayıcı",
    note: "Gebelik öncesi kilo ve boya göre önerilen kilo alımı aralığını haftalara yayarak göstersin.",
    area: "Gebelik",
  },
  {
    id: "adet-yumurtlama-takvimi",
    title: "Adet ve yumurtlama takvimi",
    note: "Döngü uzunluğuna göre tahmini adet ve yumurtlama günlerini takvimde göstersin; bebek planlayanlar için.",
    area: "Adet döngüsü",
  },
  {
    id: "bebek-tekme-sayaci",
    title: "Bebek tekmesi sayacı",
    note: "Üçüncü trimesterde bebek hareketlerini saymak için basit sayaç; hareket azaldığında hekime başvurma uyarısı içersin.",
    area: "Gebelik",
  },
  {
    id: "kasilma-olcer",
    title: "Kasılma süresi ölçer",
    note: "Kasılmaların süresini ve aralığını kaydetsin; ne zaman hastaneye gidileceğine dair hekim tarifini hatırlatsın.",
    area: "Doğum",
  },
  {
    id: "asi-kontrol-takvimi",
    title: "Aşı ve kontrol takvimi",
    note: "Gebelik haftasına göre sık planlanan kontrol, tarama ve aşı başlıklarını tek çizelgede göstersin.",
    area: "Gebelik",
  },
  {
    id: "dogum-plani-sablonu",
    title: "Yazdırılabilir doğum planı şablonu",
    note: "Doğum tercihleri, refakatçi, ağrı yönetimi ve bebek bakımı tercihlerini dolduran, yazdırılabilir bir form.",
    area: "Doğum",
  },
  {
    id: "menopoz-belirti-gunlugu",
    title: "Menopoz belirti günlüğü",
    note: "Sıcak basması, uyku, ruh hali ve adet düzenini günlük kaydetmek; hekime götürmek için özet çıkarmak.",
    area: "Menopoz",
  },
  {
    id: "menopoz-soru-listesi",
    title: "Doktora götürülecek soru listesi",
    note: "Menopoz görüşmesi öncesi seçilip yazdırılabilen hazır sorular.",
    area: "Menopoz",
  },
] satisfies Omit<RoadmapItem, "status" | "createdAt">[]).map((item) => ({
  ...item,
  status: "bekliyor" as const,
  createdAt: "2026-10-01",
}));

export function isRoadmapStorageReady() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readRoadmap(): Promise<RoadmapItem[]> {
  if (!isRoadmapStorageReady()) return seedItems;
  const result = await get(BLOB_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return seedItems;
  const data = (await new Response(result.stream).json()) as { items?: RoadmapItem[] };
  return Array.isArray(data.items) ? data.items : seedItems;
}

export async function writeRoadmap(items: RoadmapItem[]) {
  await put(BLOB_PATH, JSON.stringify({ items }), {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
