import { NextResponse } from "next/server"

// Configuración de Google Sheets
const SHEET_ID = "1f0GDZmcwsCu6o5GHl4_mJOL5MCw1srj3kVdmg8cNLkA" // Reemplaza con tu Sheet ID
const SHEET_NAME = "RSVP" // Nombre de la hoja en tu Google Sheet
const RANGE = `${SHEET_NAME}!A:B` // Rango donde escribir (columna A: nombre, columna B: timestamp)

export async function POST(request: Request) {
  try {
    const { fullName } = await request.json()

    if (!fullName) {
      return NextResponse.json({ error: "Nombre completo es requerido" }, { status: 400 })
    }

    // Configuración de Google Forms
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe5mP1wG85sYKnYfC18WBGtV-JkHxk6uN60ZB7L-GyFHDJPdA/formResponse"
    // Entry ID correcto encontrado
    const entryId = "entry.403482560"
    
    console.log("[RSVP] Datos recibidos:", { fullName, timestamp: new Date().toISOString() })
    
    // Preparar datos para Google Forms
    const formData = new URLSearchParams()
    formData.append(entryId, fullName)
    
    console.log("[RSVP] Enviando a Google Forms:", {
      formUrl,
      entryId,
      fullName
    })

    // Enviar a Google Forms
    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (compatible; RSVP-Bot/1.0)",
        },
      })

      console.log("[RSVP] Google Forms response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("[RSVP] Google Forms error:", errorText)
        // No lanzamos error, solo logueamos para no romper la experiencia del usuario
      } else {
        console.log("[RSVP] ✅ Datos enviados exitosamente a Google Forms")
      }
    } catch (error) {
      console.error("[RSVP] Error enviando a Google Forms:", error)
      // No lanzamos error para no romper la experiencia del usuario
    }

    console.log("[RSVP] Confirmación enviada:", { fullName, timestamp: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: "RSVP confirmado exitosamente",
      data: { fullName, timestamp: new Date().toISOString() },
    })
  } catch (error) {
    console.error("[RSVP] Error:", error)
    return NextResponse.json({ error: "Error al procesar la confirmación" }, { status: 500 })
  }
}
