export async function POST(req) {
  const body = await req.json();
  // Burada gerçek hesaplama yapılabilir
  return new Response(JSON.stringify({
    power: "150hp",
    torque: "320Nm",
    ...body
  }), { status: 200 });
}
