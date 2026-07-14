import { getUpload } from "@/lib/data/uploads-repo";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const upload = await getUpload(id);
  if (!upload) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(upload.buffer), {
    headers: {
      "Content-Type": upload.contentType,
      // Ids are random UUIDs, so content at a URL never changes
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
