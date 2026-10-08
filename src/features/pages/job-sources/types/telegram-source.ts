export type TelegramSourceDto = {
  id: string | null
  name: string | null
  title: string | null
  isUser: boolean
  isGroup: boolean
  isChannel: boolean
  isCommunity: boolean
  pinned: boolean
  archived: boolean
  folderId: number | null
  unreadCount: number
  unreadMentionsCount: number
  lastMessageText: string | null
  lastMessageDate: number | null
}

export type TelegramSourceKind = "channel" | "group"

export type TelegramSourceFilter = "all" | "channel" | "group"

export type TelegramSource = {
  id: string
  name: string
  kind: TelegramSourceKind
  pinned: boolean
  archived: boolean
  unreadCount: number
  lastMessageText: string | null
  lastMessageDate: number | null
}

export type TelegramSourceSection = {
  kind: TelegramSourceKind
  label: string
  sources: TelegramSource[]
}
