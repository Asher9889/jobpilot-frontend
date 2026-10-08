import { apiEndPoints, apiRequest, envConfig } from "@/config"
import type { AxiosApiResponse } from "@/types/api-response.type"
import type { ConnectTelegramViaQrOptions, TelegramConnectViaQrResponse, TelegramProfile, TelegramQrCode, TelegramSseEvent } from "../types/telegram"
import type { TelegramSourceDto } from "../types/telegram-source"

const FRAME_DELIMITER = "\n\n"

function parseSseEvent(frame: string): TelegramSseEvent | null {
  let type = "message"
  const dataLines: string[] = []

  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) {
      type = line.slice("event:".length).trim()
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trim())
    }
  }

  if (dataLines.length === 0) {
    return null
  }

  const data = JSON.parse(dataLines.join("\n")) as never

  switch (type) {
    case "qr":
      return { type: "qr", data: data as TelegramQrCode }
    case "done":
      return { type: "done", data: data as TelegramConnectViaQrResponse }
    case "error":
      return { type: "error", data: data as { message: string } }
    default:
      return null
  }
}

async function readSseStream( response: Response, options: ConnectTelegramViaQrOptions): Promise<TelegramProfile> {
  if (!response.body) {
    throw new Error("Telegram login stream is not supported by this browser")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    if (options.signal?.aborted) {
      throw new DOMException("Telegram login aborted", "AbortError")
    }

    const { done, value } = await reader.read()
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true })

    const frames = buffer.split(FRAME_DELIMITER)
    buffer = frames.pop() ?? ""

    for (const frame of frames) {
      const event = parseSseEvent(frame.trim())
      if (!event) {
        continue
      }

      switch (event.type) {
        case "qr":
          options.onQrCode?.(event.data) // save url and expires in state.
          break
        case "error":
          throw new Error(event.data.message)
        case "done":
          return event.data.user
      }
    }
  }

  throw new Error("Telegram login stream closed before authentication completed")
}

export async function connectTelegramViaQr(options: ConnectTelegramViaQrOptions): Promise<TelegramProfile> {
  const endpoint = apiEndPoints.jobSources.telegram.connectViaQR;
  const url = `${envConfig.baseURL}${endpoint.url}`;

  const response = await fetch(url, {
    method: endpoint.method,
    credentials: "include",
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to start Telegram login (${response.status})`)
  }

  return readSseStream(response, options)
}

export async function getAvailableTelegramSources(): Promise<AxiosApiResponse<TelegramSourceDto[]>> {
  const endpoint = apiEndPoints.jobSources.telegram.availableSources
  return apiRequest<AxiosApiResponse<TelegramSourceDto[]>>({
    url: endpoint.url,
    method: endpoint.method,
  })
}