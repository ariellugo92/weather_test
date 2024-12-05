export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
  
    if (!city) {
      return new Response(JSON.stringify({ error: "La ciudad es requerida" }), {
        status: 400,
      });
    }
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_OPENWEATHER_API_URL;
      const response = await fetch(
        `${apiUrl}/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`
      );
  
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: "Ciudad no encontrada" }),
          { status: response.status }
        );
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ error: "Hubo un problema al conectar con el servidor" }),
        { status: 500 }
      );
    }
  }
  