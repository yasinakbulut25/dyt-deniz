import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    // Gelen form verisini al
    const formData = await req.formData();
    const file = formData.get("file");
    const customPath = formData.get("customPath") || null;

    const uploadUrlPath = customPath ? `uploads/${customPath}` : 'uploads/images';
    const uploadPath = `public/${uploadUrlPath}`;

    if (!file) {
      return new Response(JSON.stringify({ success: false, error: "Dosya bulunamadı!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Desteklenen dosya türlerini kontrol et
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (!allowedFormats.includes(file.type)) {
      return new Response(JSON.stringify({ success: false, error: "Geçersiz dosya formatı!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Yükleme dizinini oluştur
    const uploadsDir = path.join(process.cwd(), uploadPath);
    await fs.mkdir(uploadsDir, { recursive: true });

    // Dosyayı kaydet
    const filePath = path.join(uploadsDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Public erişilebilir dosya yolunu döndür
    return new Response(
      JSON.stringify({ success: true, filePath: `/${uploadUrlPath}/${file.name}` }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Yükleme hatası:", error);
    return new Response(JSON.stringify({ success: false, error: "Yükleme sırasında hata oluştu!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
